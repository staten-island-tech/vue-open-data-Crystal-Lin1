<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 p-6">

    <!-- Header -->
    <div class="mb-8">
      <p class="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-1">
        NYC Health Inspections
      </p>
      <h1 class="text-3xl font-bold text-gray-900">
        Restaurant Grade <span class="text-emerald-600">Analysis</span>
      </h1>
    </div>

    <!-- Grade pills -->
    <div class="flex flex-wrap gap-3 mb-8">
      <div
        v-for="(count, grade) in gradeCounts"
        :key="grade"
        class="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
        :style="{
          borderColor: gradeColor(grade) + '99',
          backgroundColor: gradeColor(grade) + '22',
          color: gradeColor(grade),
        }"
      >
        <span
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: gradeColor(grade) }"
        />
        Grade {{ grade }}
        <span class="ml-1 text-gray-400 font-normal">{{ count }}</span>
      </div>
    </div>

    <!-- Charts grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Pie card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Distribution</p>
        <h2 class="text-lg font-bold text-gray-900 mb-6">Grade Proportion — {{ props.boros.join(', ') }}</h2>
        <div class="flex justify-center">
          <div class="w-72 h-72">
            <Pie :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <!-- Bar card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">By Borough</p>
        <h2 class="text-lg font-bold text-gray-900 mb-6">Grades per Boro</h2>
        <div class="h-72">
          <Bar :data="barData" :options="barOptions" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
  boros: String[]
}>()

const GRADE_COLORS: Record<string, string> = {
  A: '#10b981',
  B: '#f59e0b',
  C: '#ef4444',
  Z: '#8b5cf6',
  P: '#3b82f6',
  N: '#6b7280',
}

function gradeColor(grade: string | number | symbol): string {
  return GRADE_COLORS[String(grade)] ?? '#6b7280'
}

const validRows = computed(() =>
  props.inspections.filter(r => 
    r.grade?.trim() && props.boros.includes(r.boro as string)
  ),
)

const gradeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const r of validRows.value) {
    counts[r.grade] = (counts[r.grade] ?? 0) + 1
  }
  return counts
})

const grades = computed(() => Object.keys(gradeCounts.value))

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
  labels: grades.value.map(g => `Grade ${g}`),
  datasets: [{
    data: grades.value.map(g => gradeCounts.value[g]),
    backgroundColor: grades.value.map(g => gradeColor(g) + 'bb'),
    borderColor: grades.value.map(g => gradeColor(g)),
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
  datasets: grades.value.map(grade => ({
    label: `Grade ${grade}`,
    data: props.boros.map(boro =>
      validRows.value.filter(r => r.boro === boro && r.grade === grade).length,
    ),
    backgroundColor: gradeColor(grade) + 'bb',
    borderColor: gradeColor(grade),
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