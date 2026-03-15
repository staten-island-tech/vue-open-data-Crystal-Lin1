<template>
    <header class="bg-red-200 py-5 flex justify-between shadow">
        <div class="ml-2">
            <h1 class="font-bold text-xl">Sketchy Restaurant Detector</h1>
            <h2 class="italic">health inspection scores</h2>
        </div>
        <img :src='utensilsImg' class="w-[4%]">
    </header>
    
</template>

<script setup lang="ts">
import utensilsImg from '@/assets/utensils.png'
async function getAllData(): Promise<void> {
    const url = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json'
    //NOTE: the dataset has 297k rows but default amount u can get is 1k. but thats still a lot
    //if i have extra time ill look into how to get the rest of the data
    //TODO: error handling (some of them were inspected in 1900, which is prob a filler date) and some r missing data
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    }
getAllData()
</script>

<style scoped>

</style>