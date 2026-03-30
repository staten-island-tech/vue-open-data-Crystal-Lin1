<template class="bg-gray-50">
    <header class="bg-red-200 py-5 flex justify-between shadow">
        <div class="flex">
        <img :src='utensilsImg' class="w-[4%]">
            <div class="ml-2">
                <h1 class="font-bold text-xl">Sketchy Restaurant Detector</h1>
                <h2 class="italic">health inspection scores</h2>
            </div>
        </div>
        <button @click='showBoroData = true' class="font-bold">Get Data by Borough</button>
        <button class="font-bold">Guessing Game</button> 
        <button @click="showAPIInfo = true">API Parameter Info</button>
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