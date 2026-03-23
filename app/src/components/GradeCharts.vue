<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-1">
        NYC Health Inspections
      </p>
      <h1 class="text-3xl font-bold text-white">
        Restaurant Grade <span class="text-emerald-400">Analysis</span>
      </h1>
    </div>

    <!-- Grade pills -->
    <div class="flex flex-wrap gap-3 mb-8">
      <div
        v-for="(count, grade) in gradeCounts"
        :key="grade"
        class="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
        :style="{
          borderColor: gradeColor(grade as string) + '66',
          backgroundColor: gradeColor(grade as string) + '18',
          color: gradeColor(grade as string),
        }"
      >
        <span
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: gradeColor(grade as string) }"
        />
        Grade {{ grade }}
        <span class="ml-1 text-slate-400 font-normal">{{ count }}</span>
      </div>
    </div>

    <!-- Charts grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Pie card -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p class="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-1">Distribution</p>
        <h2 class="text-lg font-bold text-white mb-6">Grade Proportion</h2>
        <div class="flex justify-center">
          <div class="w-72 h-72">
            <Pie :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <!-- Line card -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p class="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-1">Over Time</p>
        <h2 class="text-lg font-bold text-white mb-6">Grades by Month</h2>
        <div class="h-72">
          <Line :data="lineData" :options="lineOptions" />
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
// ── Types & module-level constants (hoisted safely) ───────────────────────
interface Inspection {
  camis: string
  dba: string
  boro: string
  inspection_date: string
  grade: string
  grade_date: string
  score: string
  [key: string]: unknown
}

// Sample data lives outside <script setup> so it's available when defineProps
// is hoisted. Remove / replace with your real data source.
const SAMPLE_DATA: Inspection[] = [
  { camis: '1',  dba: 'A', boro: 'Manhattan', inspection_date: '2025-01-10T00:00:00.000', grade: 'A', grade_date: '2025-01-10T00:00:00.000', score: '9' },
  { camis: '2',  dba: 'B', boro: 'Brooklyn',  inspection_date: '2025-01-22T00:00:00.000', grade: 'A', grade_date: '2025-01-22T00:00:00.000', score: '10' },
  { camis: '3',  dba: 'C', boro: 'Queens',    inspection_date: '2025-02-05T00:00:00.000', grade: 'B', grade_date: '2025-02-05T00:00:00.000', score: '18' },
  { camis: '4',  dba: 'D', boro: 'Bronx',     inspection_date: '2025-02-14T00:00:00.000', grade: 'A', grade_date: '2025-02-14T00:00:00.000', score: '12' },
  { camis: '5',  dba: 'E', boro: 'Manhattan', inspection_date: '2025-03-01T00:00:00.000', grade: 'C', grade_date: '2025-03-01T00:00:00.000', score: '40' },
  { camis: '6',  dba: 'F', boro: 'Brooklyn',  inspection_date: '2025-03-18T00:00:00.000', grade: 'A', grade_date: '2025-03-18T00:00:00.000', score: '8' },
  { camis: '7',  dba: 'G', boro: 'Queens',    inspection_date: '2025-04-02T00:00:00.000', grade: 'B', grade_date: '2025-04-02T00:00:00.000', score: '20' },
  { camis: '8',  dba: 'H', boro: 'Manhattan', inspection_date: '2025-04-19T00:00:00.000', grade: 'A', grade_date: '2025-04-19T00:00:00.000', score: '7' },
  { camis: '9',  dba: 'I', boro: 'Brooklyn',  inspection_date: '2025-05-07T00:00:00.000', grade: 'C', grade_date: '2025-05-07T00:00:00.000', score: '38' },
  { camis: '10', dba: 'J', boro: 'Bronx',     inspection_date: '2025-05-21T00:00:00.000', grade: 'A', grade_date: '2025-05-21T00:00:00.000', score: '11' },
  { camis: '11', dba: 'K', boro: 'Queens',    inspection_date: '2025-06-04T00:00:00.000', grade: 'B', grade_date: '2025-06-04T00:00:00.000', score: '22' },
  { camis: '12', dba: 'L', boro: 'Manhattan', inspection_date: '2025-06-30T00:00:00.000', grade: 'Z', grade_date: '2025-06-30T00:00:00.000', score: '28' },
  { camis: '13', dba: 'M', boro: 'Brooklyn',  inspection_date: '2025-07-15T00:00:00.000', grade: 'A', grade_date: '2025-07-15T00:00:00.000', score: '6' },
  { camis: '14', dba: 'N', boro: 'Bronx',     inspection_date: '2025-08-08T00:00:00.000', grade: 'B', grade_date: '2025-08-08T00:00:00.000', score: '19' },
  { camis: '15', dba: 'O', boro: 'Queens',    inspection_date: '2025-09-05T00:00:00.000', grade: 'C', grade_date: '2025-09-05T00:00:00.000', score: '50' },
]
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { Pie, Line } from 'vue-chartjs'

ChartJS.register(
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Filler,
)

// ── Props ──────────────────────────────────────────────────────────────────
// SAMPLE_DATA is declared in the normal <script> block above, so it's safely
// available when defineProps is hoisted.
const props = withDefaults(
  defineProps<{ inspections?: Inspection[] }>(),
  { inspections: () => SAMPLE_DATA },
)

// ── Grade colour map ───────────────────────────────────────────────────────
const GRADE_COLORS: Record<string, string> = {
  A: '#34d399', // emerald-400
  B: '#fbbf24', // amber-400
  C: '#f87171', // red-400
  Z: '#a78bfa', // violet-400
  P: '#60a5fa', // blue-400
  N: '#94a3b8', // slate-400
}

function gradeColor(grade: string): string {
  return GRADE_COLORS[grade] ?? '#64748b'
}

// ── Derived: counts ────────────────────────────────────────────────────────
const validRows = computed(() =>
  props.inspections.filter(r => r.grade?.trim()),
)

const gradeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of validRows.value) {
    counts[r.grade] = (counts[r.grade] ?? 0) + 1
  }
  return counts
})

// ── Shared legend config ───────────────────────────────────────────────────
const sharedLegend = {
  position: 'bottom' as const,
  labels: {
    color: '#94a3b8',
    font: { size: 12 },
    padding: 16,
    usePointStyle: true,
    pointStyleWidth: 8,
  },
}

// ── Pie chart ──────────────────────────────────────────────────────────────
const pieData = computed(() => {
  const labels = Object.keys(gradeCounts.value)
  return {
    labels: labels.map(g => `Grade ${g}`),
    datasets: [{
      data: labels.map(g => gradeCounts.value[g]),
      backgroundColor: labels.map(g => gradeColor(g) + 'bb'),
      borderColor: labels.map(g => gradeColor(g)),
      borderWidth: 2,
      hoverOffset: 10,
    }],
  }
})

const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: sharedLegend,
    tooltip: {
      callbacks: {
        label: (ctx: { label: string; parsed: number; dataset: { data: number[] } }) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0)
          const pct = ((ctx.parsed / total) * 100).toFixed(1)
          return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`
        },
      },
    },
  },
}

// ── Line chart ─────────────────────────────────────────────────────────────
const monthlyData = computed(() => {
  const map: Record<string, Record<string, number>> = {}

  for (const r of validRows.value) {
    const d = new Date(r.grade_date)
    if (isNaN(d.getTime())) continue
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map[key]) map[key] = {}
    map[key][r.grade] = (map[key][r.grade] ?? 0) + 1
  }

  return {
    months: Object.keys(map).sort(),
    grades: Object.keys(gradeCounts.value),
    map,
  }
})

const lineData = computed(() => {
  const { months, grades, map } = monthlyData.value
  return {
    labels: months,
    datasets: grades.map(grade => ({
      label: `Grade ${grade}`,
      data: months.map(m => map[m]?.[grade] ?? 0),
      borderColor: gradeColor(grade),
      backgroundColor: gradeColor(grade) + '22',
      pointBackgroundColor: gradeColor(grade),
      pointRadius: 5,
      pointHoverRadius: 8,
      tension: 0.4,
      fill: false,
      borderWidth: 2.5,
    })),
  }
})

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  scales: {
    x: {
      ticks: { color: '#64748b', font: { size: 11 } },
      grid:  { color: '#1e293b' },
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#64748b', stepSize: 1, font: { size: 11 } },
      grid:  { color: '#1e293b' },
    },
  },
  plugins: {
    legend: sharedLegend,
  },
}
</script>