<template>
    <div class="bg-white shadow-lg w-[50%] p-8 m-auto rounded-2xl border border-gray-100">
        
        <form @submit.prevent="" class="w-full" >
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-xl my-2 font-bold">Borough Options</h1>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 text-xl font-bold transition-colors">X</button>
            </div>
    
            <label v-for="boro in boroOptions" :key="boro"
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 cursor-pointer transition-all">
                <input v-model="selectedBoros" type="checkbox" :value="boro" class="w-4 h-4 accent-emerald-500" />
                <span class="text-gray-700 font-medium">{{ boro }}</span>
            </label>
            <p class="text-xs text-gray-400 mt-4">{{ selectedBoros.length }} borough{{ selectedBoros.length !== 1 ? 's' : '' }} selected</p>
        </form>
        
    </div>
</template>

<script setup lang="ts">
import {ref, watch } from 'vue'
const emits = defineEmits(['boros', 'close'])
const boroOptions = ['Staten Island', 'Manhattan', 'Brooklyn', 'Bronx', 'Queens']
const selectedBoros = ref<string[]>([])
watch(selectedBoros, (newValue) => {
  emits('boros', newValue)
})

</script>

<style scoped>

</style>