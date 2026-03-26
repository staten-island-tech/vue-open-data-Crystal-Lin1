<template class="bg-gray-50">
    <div class="shadow-lg w-[50%] p-8 m-auto rounded-2xl border border-gray-100">
        <h1 class="text-xl font-bold mb-4 text-center">Parameters </h1>
        <ul class="list-disc list-inside mb-4">
            <label v-for="parameter in parameters" :key="parameter.name"
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all">
                <span class="text-gray-700 font-medium">{{ parameter.name}}</span>
            </label>
        </ul>
        <h2 class="text-xs text-gray-400 mt-4">
            Only the less self explanatory parameters have an explanation when hovered over
        </h2>

    </div>
</template>

<script setup lang="ts">
const parameters = [
  { name: 'CAMIS', explanation: 'Unique identifier for the restaurant' },
  { name: 'DBA', explanation: 'Restaurant name' },
  { name: 'BUILDING', explanation: 'Building number' },
  { name: 'ACTION', explanation: 'Actions associated with inspection (like nothing or closing down restaurant)' },
  { name: 'CRITICAL FLAG', explanation: 'Critical, N/A, or Not Critical' },
  { name: 'SCORE', explanation: '' },
  { name: 'GRADE', explanation: '' },
  { name: 'BORO', explanation: '' },
  { name: 'STREET', explanation: '' },
  { name: 'ZIPCODE', explanation: '' },
  { name: 'VIOLATION CODE', explanation: '' },
  { name: 'VIOLATION DESCRIPTION', explanation: '' },
  { name: 'PHONE', explanation: '' },
  { name: 'CUISINE DESCRIPTION', explanation: 'Optional' },
  { name: 'INSPECTION DATE', explanation: '' },
]
</script>

<style scoped>

</style>