<script setup>
import { computed, ref } from 'vue'
import { schedule } from './data/schedule'

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
 * Obtiene la información básica del día que estamos visualizando.
 *
 * Devuelve el nombre del día, número, mes y año.
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
  return schedule[currentDate.value] || {
    status: 'free',
    blocks: []
  }
})

/**
 * Obtiene los bloques planificados para el día seleccionado.
 */
const daySchedule = computed(() => {
  return currentDayData.value.blocks
})

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
 * Convierte una hora en formato HH:MM a minutos.
 *
 * Por ejemplo:
 * 10:30 → 630 minutos.
 *
 * Esto nos permitirá realizar cálculos de tiempo
 * sin depender directamente del formato de la hora.
 *
 * @param {string} time - Hora en formato HH:MM.
 * @returns {number} Hora convertida a minutos.
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)

  return hours * 60 + minutes
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

          <button
            type="button"
            aria-label="Día anterior"
            @click="changeDay(-1)"
          >
            ←
          </button>

          <span>{{ currentDay.date }} / 31</span>

          <button
            type="button"
            aria-label="Día siguiente"
            @click="changeDay(1)"
          >
            →
          </button>

        </div>

      </div>

      <div class="day-line">

        <span>DAILY SCHEDULE</span>

        <span>
          {{ daySchedule.length.toString().padStart(2, '0') }}
          BLOCKS
        </span>

      </div>

      <section class="schedule">

        <article
          v-for="(item, index) in daySchedule"
          :key="item.id"
          class="schedule-item"
          :class="`schedule-item--${item.category || item.type}`"
        >

          <div class="schedule-time">
            <template v-if="item.start && item.end">
              {{ item.start }} — {{ item.end }}
            </template>

            <template v-else>
              {{ Math.floor(item.duration / 60) }}H
            </template>
          </div>

          <div class="schedule-marker">
            <span></span>
          </div>

          <div class="schedule-content">

            <div class="schedule-label">
              {{ getBlockLabel(item) }}
            </div>

            <h2>{{ item.title }}</h2>

          </div>

          <div class="schedule-index">
            {{ (index + 1).toString().padStart(2, '0') }}
          </div>

        </article>

        <div
          v-if="daySchedule.length === 0"
          class="empty-day"
        >

          <span class="empty-day-mark">+</span>

          <div class="empty-day-content">
            <strong>NO SCHEDULE</strong>
            <span>Nothing planned for this day.</span>
          </div>

        </div>

      </section>

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
