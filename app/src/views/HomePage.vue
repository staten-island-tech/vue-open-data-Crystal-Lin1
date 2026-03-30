<template >
   <header class="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
  <div class="flex items-center gap-3">
    <div class="bg-emerald-50 p-2 rounded-xl">
      <img :src="utensilsImg" class="w-7 h-7" />
    </div>
    <div>
      <h1 class="font-bold text-gray-900">Sketchy Restaurant Detector</h1>
      <p class="text-xs text-gray-400">NYC health inspection scores</p>
    </div>
  </div>
  <div class="flex items-center gap-2">
    <button
      @click="showBoroData = true"
      class="px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transition-all shadow-sm"
    >
      Select Borough
    </button>
    <button
      @click="showAPIInfo = true"
      class="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
    >
      API Parameter Info
    </button>
  </div>
</header>
    <BoroughData v-if="showBoroData" @close="showBoroData = false"></BoroughData>
    <GradeCharts :boros='selectedBoros' :inspections="filteredData" v-if="showGradeCharts"/>
    <APIInfo v-if="showAPIInfo" @close="showAPIInfo = false"/>
</template>

<script setup lang="ts">
import utensilsImg from '@/assets/utensils.png'
import { selectedBoros, getAllData, filterOutBadData} from '@/store/functions'
import {ref, onMounted, watch} from 'vue'
import BoroughData from '@/components/BoroughData.vue'
import GradeCharts from '@/components/GradeCharts.vue'
import APIInfo from '@/components/APIInfo.vue'

let showAPIInfo = ref(false)
let showGradeCharts = ref(false)
let showBoroData = ref(false)
const data = await getAllData()
const filteredData = await filterOutBadData(data)

watch(selectedBoros, (newValue) => {
  showGradeCharts.value = newValue.length > 0
})
</script>

<style scoped>

</style>