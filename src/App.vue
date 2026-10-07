<script setup>
const day = {
  weekday: 'MIÉRCOLES',
  date: '08',
  month: 'OCTUBRE',
  year: '2026'
}

const schedule = [
  {
    time: '06:00 — 14:00',
    type: 'work',
    label: 'TRABAJO',
    title: 'Turno de mañana'
  },
  {
    time: '16:00 — 18:00',
    type: 'study',
    label: 'IA & BIG DATA',
    title: 'Tiempo de estudio'
  },
  {
    time: '18:00 — 20:00',
    type: 'renfe',
    label: 'RENFE',
    title: 'Tiempo de estudio'
  }
]
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
        <span>2026 / 10 / 08</span>
      </div>
    </header>

    <section class="day-card">

      <div class="day-header">

        <div>
          <span class="eyebrow">TODAY</span>

          <h1>{{ day.weekday }}</h1>

          <div class="date">
            <span>{{ day.date }}</span>
            <span>{{ day.month }}</span>
            <span>{{ day.year }}</span>
          </div>
        </div>

        <div class="day-navigation">
          <button>←</button>

          <span>08 / 31</span>

          <button>→</button>
        </div>

      </div>

      <div class="day-line">
        <span>DAILY SCHEDULE</span>
        <span>03 BLOCKS</span>
      </div>

      <section class="schedule">

        <article
          v-for="(item, index) in schedule"
          :key="index"
          class="schedule-item"
          :class="`schedule-item--${item.type}`"
        >

          <div class="schedule-time">
            {{ item.time }}
          </div>

          <div class="schedule-marker">
            <span></span>
          </div>

          <div class="schedule-content">

            <div class="schedule-label">
              {{ item.label }}
            </div>

            <h2>{{ item.title }}</h2>

          </div>

          <div class="schedule-index">
            0{{ index + 1 }}
          </div>

        </article>

      </section>

      <footer class="day-footer">
        <span>HORARIOAPP / DAY 008</span>

        <span>
          <strong>00%</strong>
          COMPLETE
        </span>
      </footer>

    </section>

  </main>
</template>

