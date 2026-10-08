<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { schedule } from './data/schedule'

const scheduleData = reactive(schedule)

/**
 * Estado temporal del bloque que se está arrastrando.
 */
const dragState = ref(null)

/**
 * Indica si el último movimiento del puntero
 * fue suficientemente grande como para considerarlo un drag.
 */
const isDragging = ref(false)

/**
 * Fecha que estamos mostrando actualmente.
 *
 * Se mantiene en formato YYYY-MM-DD para poder utilizarla
 * directamente como clave dentro del horario.
 */
const currentDate = ref('2026-10-08')

/**
 * Nombres de los días de la semana.
 */
const dayNames = [
  'DOMINGO',
  'LUNES',
  'MARTES',
  'MIÉRCOLES',
  'JUEVES',
  'VIERNES',
  'SÁBADO'
]

/**
 * Nombres de los meses del año.
 */
const monthNames = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE'
]

/**
 * Fecha utilizada como referencia para determinar
 * qué día se considera "hoy".
 *
 * Más adelante se obtendrá automáticamente del sistema.
 */
const today = '2026-10-08'

/**
 * Escala visual de la timeline.
 *
 * 1 hora = 70 píxeles.
 */
const pixelsPerHour = 70

/**
 * Resolución mínima para colocar bloques en la timeline.
 *
 * Aunque visualmente solo mostramos las horas completas,
 * las tareas pueden comenzar cada 30 minutos.
 */
const timelineStepMinutes = 30

/**
 * Hora habitual de inicio del día.
 *
 * Los bloques de estudio que no tienen una hora
 * concreta se intentarán colocar a partir de aquí.
 */
const defaultDayStart = 9 * 60

/**
 * Obtiene la información básica del día que estamos visualizando.
 */
const currentDay = computed(() => {
  const [year, month, day] = currentDate.value.split('-')

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  )

  return {
    weekday: dayNames[date.getDay()],
    date: day,
    month: monthNames[date.getMonth()],
    year: year
  }
})

/**
 * Obtiene todos los datos del día seleccionado.
 *
 * Si no existe información para esa fecha, se considera
 * un día libre sin bloques programados.
 */
const currentDayData = computed(() => {
  return scheduleData[currentDate.value] || {
    status: 'free',
    blocks: []
  }
})

/**
 * Obtiene los bloques originales del día seleccionado.
 */
const daySchedule = computed(() => {
  return currentDayData.value.blocks
})

/**
 * Convierte una hora en formato HH:MM a minutos.
 *
 * Por ejemplo:
 * 10:30 → 630 minutos.
 *
 * @param {string} time - Hora en formato HH:MM.
 * @returns {number} Hora convertida a minutos.
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
}

/**
 * Convierte una cantidad de minutos a una hora HH:MM.
 *
 * @param {number} minutes - Minutos desde medianoche.
 * @returns {string} Hora en formato HH:MM.
 */
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
}

/**
 * Calcula la duración de un bloque que tiene una hora
 * de inicio y una hora de finalización.
 *
 * @param {string} start - Hora de inicio en formato HH:MM.
 * @param {string} end - Hora de finalización en formato HH:MM.
 * @returns {number} Duración del bloque en minutos.
 */
function getBlockDuration(start, end) {
  return timeToMinutes(end) - timeToMinutes(start)
}

/**
 * Obtiene la duración de cualquier bloque.
 *
 * Los bloques de trabajo tienen start y end.
 * Los bloques de estudio tienen directamente duration.
 *
 * @param {Object} block - Bloque del horario.
 * @returns {number} Duración del bloque en minutos.
 */
function getDuration(block) {
  if (block.duration) {
    return block.duration
  }

  return getBlockDuration(block.start, block.end)
}

/**
 * Obtiene la etiqueta que se mostrará encima
 * del nombre del bloque.
 *
 * @param {Object} block - Bloque del horario.
 * @returns {string} Etiqueta del bloque.
 */
function getBlockLabel(block) {
  if (block.category === 'ia') {
    return 'IA & BIG DATA'
  }

  if (block.category === 'renfe') {
    return 'RENFE'
  }

  return 'TRABAJO'
}

/**
 * Busca el primer hueco disponible para un bloque flexible.
 *
 * @param {number} duration - Duración del bloque en minutos.
 * @param {number} preferredStart - Hora desde la que queremos buscar.
 * @param {Array} occupiedBlocks - Bloques que ya ocupan espacio.
 * @returns {number} Hora de inicio disponible.
 */
function findAvailableStart(duration, preferredStart, occupiedBlocks) {
  let startTime = preferredStart

  while (true) {
    const endTime = startTime + duration

    const conflictingBlock = occupiedBlocks.find(
      block =>
        startTime < block.timelineEnd &&
        endTime > block.timelineStart
    )

    if (!conflictingBlock) {
      return startTime
    }

    startTime = conflictingBlock.timelineEnd
  }
}

/**
 * Construye los bloques de la timeline.
 *
 * Los bloques de trabajo tienen start y end.
 *
 * Los bloques flexibles tienen duration.
 *
 * Si un bloque flexible tiene start, se respeta esa posición.
 * Si no tiene start, se coloca automáticamente en el primer
 * hueco disponible.
 */
const timelineBlocks = computed(() => {
  const blocks = currentDayData.value.blocks

  /**
   * Bloques con horario fijo.
   */
  const fixedBlocks = blocks
    .filter(block => block.start && block.end)
    .map(block => ({
      ...block,
      timelineStart: timeToMinutes(block.start),
      timelineEnd: timeToMinutes(block.end),
      originalBlock: block
    }))
    .sort((a, b) => a.timelineStart - b.timelineStart)

  /**
   * Bloques flexibles que ya tienen una posición.
   *
   * Esto ocurrirá cuando el usuario haya movido una tarea
   * mediante drag & drop.
   */
  const positionedFlexibleBlocks = blocks
    .filter(
      block =>
        block.duration &&
        block.start &&
        !block.end
    )
    .map(block => {
      const timelineStart = timeToMinutes(block.start)
      const timelineEnd = timelineStart + block.duration

      return {
        ...block,
        end: minutesToTime(timelineEnd),
        timelineStart,
        timelineEnd,
        originalBlock: block
      }
    })

  /**
   * Bloques flexibles que todavía no tienen una posición.
   */
  const unpositionedFlexibleBlocks = blocks.filter(
    block =>
      block.duration &&
      !block.start
  )

  /**
   * Todos los bloques que ya ocupan una posición.
   */
  const placedBlocks = [
    ...fixedBlocks,
    ...positionedFlexibleBlocks
  ]

  /**
   * Empezamos normalmente a las 09:00.
   *
   * Si existe un bloque anterior, adaptamos el comienzo
   * para poder mostrarlo correctamente.
   */
  let currentTime = defaultDayStart

  if (placedBlocks.length > 0) {
    const firstBlock = Math.min(
      ...placedBlocks.map(block => block.timelineStart)
    )

    if (firstBlock < currentTime) {
      currentTime = firstBlock
    }
  }

  /**
   * Colocamos automáticamente los bloques que todavía
   * no tienen una hora asignada.
   */
  for (const block of unpositionedFlexibleBlocks) {
    const startTime = findAvailableStart(
      block.duration,
      currentTime,
      placedBlocks
    )

    const endTime = startTime + block.duration

    placedBlocks.push({
      ...block,
      start: minutesToTime(startTime),
      end: minutesToTime(endTime),
      timelineStart: startTime,
      timelineEnd: endTime,
      originalBlock: block
    })

    currentTime = endTime
  }

  return placedBlocks.sort(
    (a, b) => a.timelineStart - b.timelineStart
  )
})

/**
 * Determina la hora desde la que empieza visualmente la timeline.
 *
 * Normalmente empieza a las 09:00.
 * Si existe un bloque antes de esa hora, se adapta
 * para poder mostrarlo.
 */
const timelineStart = computed(() => {
  if (timelineBlocks.value.length === 0) {
    return defaultDayStart
  }

  const firstBlock = Math.min(
    ...timelineBlocks.value.map(block => block.timelineStart)
  )

  return Math.min(defaultDayStart, firstBlock)
})

/**
 * Determina hasta qué hora debe llegar visualmente
 * la timeline.
 */
const timelineEnd = computed(() => {
  const minimumEnd = 23 * 60

  if (timelineBlocks.value.length === 0) {
    return minimumEnd
  }

  const latestBlock = Math.max(
    ...timelineBlocks.value.map(block => block.timelineEnd)
  )

  return Math.max(
    minimumEnd,
    Math.ceil(latestBlock / 60) * 60
  )
})

/**
 * Genera las horas que aparecerán como referencias
 * en el lateral de la timeline.
 */
const timelineHours = computed(() => {
  const hours = []

  for (
    let minutes = timelineStart.value;
    minutes <= timelineEnd.value;
    minutes += 60
  ) {
    hours.push({
      label: minutesToTime(minutes),
      minutes
    })
  }

  return hours
})

/**
 * Devuelve la posición vertical de una hora.
 *
 * @param {number} minutes - Minutos desde medianoche.
 * @returns {number} Posición en píxeles.
 */
function getTimelinePosition(minutes) {
  return (
    ((minutes - timelineStart.value) / 60) *
    pixelsPerHour
  )
}

/**
 * Devuelve la altura visual de un bloque.
 *
 * @param {Object} block - Bloque de la timeline.
 * @returns {number} Altura en píxeles.
 */
function getBlockHeight(block) {
  return (getDuration(block) / 60) * pixelsPerHour
}

/**
 * Obtiene el número del día que estamos visualizando.
 */
const dayNumber = computed(() => {
  return currentDay.value.date
})

/**
 * Comprueba si el día seleccionado coincide con el día actual.
 */
const isToday = computed(() => {
  return currentDate.value === today
})

/**
 * Cambia el día que estamos visualizando.
 *
 * @param {number} amount - Número de días que queremos
 * avanzar o retroceder.
 */
function changeDay(amount) {
  const [year, month, day] = currentDate.value.split('-')

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  )

  date.setDate(date.getDate() + amount)

  const newYear = date.getFullYear()
  const newMonth = String(date.getMonth() + 1).padStart(2, '0')
  const newDay = String(date.getDate()).padStart(2, '0')

  currentDate.value = `${newYear}-${newMonth}-${newDay}`
}

function toggleBlock(blockId) {
  const block = currentDayData.value.blocks.find(
    item => item.id === blockId
  )

  if (!block) {
    return
  }

  block.completed = !block.completed

  saveSchedule()
}

function saveSchedule() {
  localStorage.setItem(
    'horarioapp-schedule',
    JSON.stringify(scheduleData)
  )
}

function loadSchedule() {
  const savedSchedule = localStorage.getItem(
    'horarioapp-schedule'
  )

  if (!savedSchedule) {
    return
  }

  const parsedSchedule = JSON.parse(savedSchedule)

  Object.keys(parsedSchedule).forEach(date => {
    scheduleData[date] = parsedSchedule[date]
  })
}

/**
 * Inicia el arrastre de un bloque flexible.
 *
 * Los bloques fijos, como Trabajo, no pueden moverse.
 */
function startDrag(event, item) {
  if (item.type === 'work') {
    return
  }

  if (!item.duration) {
    return
  }

  const block = currentDayData.value.blocks.find(
    currentBlock => currentBlock.id === item.id
  )

  if (!block) {
    return
  }

  dragState.value = {
    blockId: item.id,
    pointerStartY: event.clientY,
    originalStart: item.timelineStart
  }

  isDragging.value = false

  event.currentTarget.setPointerCapture(event.pointerId)
}

/**
 * Actualiza la posición del bloque mientras se arrastra.
 *
 * La posición se ajusta automáticamente a intervalos
 * de 30 minutos.
 */
function dragBlock(event, item) {
  if (!dragState.value) {
    return
  }

  const deltaY = event.clientY - dragState.value.pointerStartY

  /*
   * Evitamos interpretar un pequeño movimiento como drag.
   */
  if (!isDragging.value && Math.abs(deltaY) < 5) {
    return
  }

  isDragging.value = true

  const deltaMinutes =
    (deltaY / pixelsPerHour) * 60

  const rawStart =
    dragState.value.originalStart + deltaMinutes

  const snappedStart =
    Math.round(rawStart / timelineStepMinutes) *
    timelineStepMinutes

  const block = currentDayData.value.blocks.find(
    currentBlock =>
      currentBlock.id === dragState.value.blockId
  )

  if (!block) {
    return
  }

  block.start = minutesToTime(
    Math.max(0, snappedStart)
  )
}

/**
 * Finaliza el arrastre del bloque.
 */
function endDrag(event) {
  if (!dragState.value) {
    return
  }

  if (isDragging.value) {
    saveSchedule()
  }

  dragState.value = null
}

onMounted(() => {
  loadSchedule()
})

</script>

<template>
  <main class="blueprint">

    <header class="topbar">

      <div class="brand">
        <span class="brand-mark">H</span>
        <span>HORARIO</span>
      </div>

      <div class="topbar-info">
        <span>DAY PLAN</span>
        <span>{{ currentDate.replaceAll('-', ' / ') }}</span>
      </div>

    </header>

    <section class="day-card">

      <div class="day-header">

        <div>

          <span class="eyebrow">
            {{ isToday ? 'TODAY' : 'DAY PLAN' }}
          </span>

          <h1>{{ currentDay.weekday }}</h1>

          <div class="date">
            <span>{{ currentDay.date }}</span>
            <span>{{ currentDay.month }}</span>
            <span>{{ currentDay.year }}</span>
          </div>

        </div>

        <div class="day-navigation">

          <button type="button" aria-label="Día anterior" @click="changeDay(-1)">
            ←
          </button>

          <span>{{ currentDay.date }} / 31</span>

          <button type="button" aria-label="Día siguiente" @click="changeDay(1)">
            →
          </button>

        </div>

      </div>

      <div class="day-line">

        <span>DAILY SCHEDULE</span>

        <span>
          {{ timelineBlocks.length.toString().padStart(2, '0') }}
          BLOCKS
        </span>

      </div>

      <section v-if="timelineBlocks.length > 0" class="timeline" :style="{
        '--timeline-height': `${getTimelinePosition(timelineEnd)}px`
      }">

        <div v-for="hour in timelineHours" :key="hour.minutes" class="timeline-hour" :style="{
          top: `${getTimelinePosition(hour.minutes)}px`
        }">
          <span>{{ hour.label }}</span>
          <div></div>
        </div>

        <article v-for="(item, index) in timelineBlocks" :key="item.id" class="timeline-block" :class="[
          `timeline-block--${item.category || item.type}`,
          {
            'timeline-block--completed': currentDayData.blocks.find(
              block => block.id === item.id
            )?.completed,
            'timeline-block--dragging':
              dragState?.blockId === item.id && isDragging
          }
        ]" :style="{
    top: `${getTimelinePosition(item.timelineStart)}px`,
    height: `${getBlockHeight(item)}px`
  }" @pointerdown="startDrag($event, item)" @pointermove="dragBlock($event, item)" @pointerup="endDrag($event)"
          @pointercancel="endDrag($event)" @click="!isDragging && toggleBlock(item.id)">
          <div class="timeline-block-line"></div>

          <div class="timeline-block-content">
            <span class="timeline-block-label">
              {{ getBlockLabel(item) }}
            </span>

            <h2>{{ item.title }}</h2>

            <span class="timeline-block-time">
              {{ item.start }} — {{ item.end }}
            </span>
          </div>

          <span class="timeline-block-index">
            {{ (index + 1).toString().padStart(2, '0') }}
          </span>

          <div class="timeline-block-status">
            {{currentDayData.blocks.find(block => block.id === item.id)?.completed ? '✓' : '○'}}
          </div>
        </article>

      </section>

      <div v-else class="empty-day">

        <span class="empty-day-mark">+</span>

        <div class="empty-day-content">
          <strong>NO SCHEDULE</strong>
          <span>Nothing planned for this day.</span>
        </div>

      </div>

      <footer class="day-footer">

        <span>
          HORARIOAPP / DAY {{ dayNumber }}
        </span>

        <span>
          <strong>00%</strong>
          COMPLETE
        </span>

      </footer>

    </section>

  </main>
</template>
