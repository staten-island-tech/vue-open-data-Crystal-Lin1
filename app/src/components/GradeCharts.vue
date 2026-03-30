<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-6">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-1">
        NYC Health Inspections
      </p>
      <h1 class="text-3xl font-bold text-gray-900">
        Restaurant <span class="text-emerald-600">Analysis</span>
      </h1>
    </div>

    <!-- Group by selector -->
    <div class="flex gap-2 mb-8">
      <button
        v-for="option in groupByOptions"
        :key="option.value"
        @click="selectedGroupBy = option.value"
        :class="selectedGroupBy === option.value
          ? 'bg-emerald-500 text-white border-emerald-500'
          : 'bg-white text-gray-700 border-gray-200'"
        class="px-4 py-2 rounded-full border text-sm font-medium transition-all"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Pills -->
    <div class="flex flex-wrap gap-3 mb-8">
      <div
        v-for="(count, key) in groupCounts"
        :key="key"
        class="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
        :style="{
          borderColor: groupColor(key) + '99',
          backgroundColor: groupColor(key) + '22',
          color: groupColor(key),
        }"
      >
        <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: groupColor(key) }" />
        {{ key }}
        <span class="ml-1 text-gray-400 font-normal">{{ count }}</span>
      </div>
    </div>

    <!-- Charts grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Pie card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Distribution</p>
        <h2 class="text-lg font-bold text-gray-900 mb-6">{{ selectedGroupBy.replace(/_/g, ' ').toUpperCase() }} PROPORTION — {{ props.boros.join(', ') }}</h2>
        <div class="flex justify-center">
          <div class="w-72 h-72">
            <Pie :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <!-- Bar card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">By Borough</p>
        <h2 class="text-lg font-bold text-gray-900 mb-6">{{ selectedGroupBy.replace(/_/g, ' ').toUpperCase() }} PER BORO</h2>
        <div class="h-72">
          <Bar :data="barData" :options="barOptions" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const props = defineProps<{
  inspections: Record<string, any>[]
  boros: string[]
}>()

const groupByOptions = [
  { label: 'Grade', value: 'grade' },
  { label: 'Critical Flag', value: 'critical_flag' },
  { label: 'Cuisine', value: 'cuisine_description' },
  { label: 'Score', value: 'score' },
]

const selectedGroupBy = ref('grade')

const GRADE_COLORS: Record<string, string> = {
  A: '#10b981',
  B: '#f59e0b',
  C: '#ef4444',
  Z: '#8b5cf6',
  P: '#3b82f6',
  N: '#6b7280',
  Critical: '#ef4444',
  'Not Critical': '#10b981',
  'N/A': '#6b7280',
  '0–13 (A)': '#10b981',
  '14–27 (B)': '#f59e0b',
  '28+ (C)': '#ef4444',
}

const FALLBACK_COLORS = [
  '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#3b82f6', '#6b7280', '#f43f5e', '#14b8a6',
  '#f97316', '#a855f7',
]

const colorCache: Record<string, string> = {}
let colorIndex = 0

function groupColor(key: string | number | symbol): string {
  const k = String(key)
  if (GRADE_COLORS[k]) return GRADE_COLORS[k]
  if (!colorCache[k]) {
    colorCache[k] = FALLBACK_COLORS[colorIndex % FALLBACK_COLORS.length]
    colorIndex++
  }
  return colorCache[k]
}

const validRows = computed(() =>
  props.inspections.filter(r =>
    r.grade?.trim() && props.boros.includes(r.boro as string)
  )
)

function getScoreBucket(score: number): string {
  if (score <= 13) return '0–13 (A)'
  if (score <= 27) return '14–27 (B)'
  return '28+ (C)'
}

const groupCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of validRows.value) {
    let key: string
    if (selectedGroupBy.value === 'score') {
      key = getScoreBucket(Number(r.score))
    } else {
      key = String(r[selectedGroupBy.value] ?? 'Unknown')
    }
    counts[key] = (counts[key] ?? 0) + 1
  }
  return counts
})

const groupKeys = computed(() => Object.keys(groupCounts.value))

const sharedLegend = {
  position: 'bottom' as const,
  labels: {
    color: '#374151',
    font: { size: 12 },
    padding: 16,
    usePointStyle: true,
    pointStyleWidth: 8,
  },
}

const pieData = computed(() => ({
  labels: groupKeys.value,
  datasets: [{
    data: groupKeys.value.map(k => groupCounts.value[k]),
    backgroundColor: groupKeys.value.map(k => groupColor(k) + 'bb'),
    borderColor: groupKeys.value.map(k => groupColor(k)),
    borderWidth: 2,
    hoverOffset: 10,
  }],
}))

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

const barData = computed(() => ({
  labels: props.boros,
  datasets: groupKeys.value.map(key => ({
    label: key,
    data: props.boros.map(boro =>
      validRows.value.filter(r => {
        if (r.boro !== boro) return false
        if (selectedGroupBy.value === 'score') {
          return getScoreBucket(Number(r.score)) === key
        }
        return String(r[selectedGroupBy.value] ?? 'Unknown') === key
      }).length,
    ),
    backgroundColor: groupColor(key) + 'bb',
    borderColor: groupColor(key),
    borderWidth: 2,
    borderRadius: 4,
  })),
}))

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  scales: {
    x: {
      ticks: { color: '#6b7280', font: { size: 11 } },
      grid: { color: '#f3f4f6' },
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#6b7280', stepSize: 1, font: { size: 11 } },
      grid: { color: '#f3f4f6' },
    },
  },
  plugins: {
    legend: sharedLegend,
  },
}
</script>