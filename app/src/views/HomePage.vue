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
import { getAllData, filterOutBadData } from '@/store/functions'

</script>

<style scoped>

</style>