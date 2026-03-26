<template>
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
    <GradeCharts :boros='boros' :inspections="filteredData" v-if="showGradeCharts"/>
    <APIInfo v-if="showAPIInfo" @close="showAPIInfo = false"/>
</template>

<script setup lang="ts">
import utensilsImg from '@/assets/utensils.png'
import { getAllData, filterOutBadData, getBoroData} from '@/store/functions'
import {ref, onMounted} from 'vue'
import BoroughData from '@/components/BoroughData.vue'
import GradeCharts from '@/components/GradeCharts.vue'
import APIInfo from '@/components/APIInfo.vue'

let showAPIInfo = ref(false)
let showGradeCharts = ref(false)
let showBoroData = ref(false)
const data = await getAllData()
const filteredData = await filterOutBadData(data)
let boroData = ref<any>(null)
let boros = ref(['Brooklyn', 'Staten Island'])
onMounted(async () => {
  boroData.value = await getBoroData(filteredData, 'Brooklyn')
})

</script>

<style scoped>

</style>