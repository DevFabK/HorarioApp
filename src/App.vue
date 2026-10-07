<script setup>
import { computed, ref } from 'vue'
import { schedule } from './data/schedule'

const currentDate = ref('2026-10-08')

const dayNames = [
  'DOMINGO',
  'LUNES',
  'MARTES',
  'MIÉRCOLES',
  'JUEVES',
  'VIERNES',
  'SÁBADO'
]

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

const today = '2026-10-08'

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

const daySchedule = computed(() => {
  return schedule[currentDate.value] || []
})

const dayNumber = computed(() => {
  return currentDay.value.date
})

const isToday = computed(() => {
  return currentDate.value === today
})

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
          :class="`schedule-item--${item.type}`"
        >

          <div class="schedule-time">
            {{ item.start }} — {{ item.end }}
          </div>

          <div class="schedule-marker">
            <span></span>
          </div>

          <div class="schedule-content">

            <div class="schedule-label">
              {{
                item.type === 'work'
                  ? 'TRABAJO'
                  : item.type === 'study'
                    ? 'IA & BIG DATA'
                    : 'RENFE'
              }}
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
