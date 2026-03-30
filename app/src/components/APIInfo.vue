<template>
  <div class="shadow-lg w-[50%] p-8 m-auto rounded-2xl border border-gray-100">
    <div class="flex items-center justify-between mb-4">
        <div></div>
        <h1 class="text-xl font-bold text-center ">Parameters</h1>
        <button class="text-gray-400 hover:text-gray-700 font-bold transition-colors" @click="$emit('close')">X</button>
    </div>
    <ul class="list-disc list-inside mb-4">
      <label
        v-for="parameter in parameters"
        :key="parameter.name"
        class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
        @click="selected = parameter.name"
      >
        <span class="text-gray-700 font-medium">{{ parameter.name }}</span>
      </label>
    </ul>
    <p v-if="selectedExplanation" class="text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
      {{ selectedExplanation }}
    </p>
    <h2 class="text-xs text-gray-400 mt-4">
      Only the less self explanatory parameters have an explanation when clicked
    </h2>
  </div>
  <MostParameters 
  v-if="['CAMIS', 'DBA', 'BUILDING', 'ACTION'].includes(selected)"
  :name="selected"
  :explanation="parameters.find(p => p.name === selected)?.explanation ?? ''"
  :more-info="moreInfo"
  @close="selected = ''"
  />
  <InspectionGrade @close='selected = ""' v-if="selected ==='GRADE' || selected === 'SCORE' "/>
    
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InspectionGrade from './ParameterInfo/InspectionGrade.vue'
import MostParameters from './ParameterInfo/MostParameters.vue'
const selected = ref<string>('')
defineEmits(['close'])
const parameters = [
  { name: 'CAMIS', explanation: 'Unique identifier for the restaurant', moreInfo: 'Always an 8 digit number like 41670224' },
  { name: 'DBA', explanation: 'Restaurant name', moreInfo: 'The name of the restaurant as it appears to consumers' },
  { name: 'BUILDING', explanation: 'Building number', moreInfo: 'Just the number part of the address, no street name or anything else' },
  { name: 'ACTION', explanation: 'Consequences of the inspection', moreInfo: 'Examples include nothing or closing' },
  { name: 'CRITICAL FLAG', explanation: 'Critical, N/A, or Not Critical', moreInfo: 'Indicates whether a violation is critical, not critical, or not applicable' },
  { name: 'SCORE', explanation: '' },
  { name: 'GRADE', explanation: '' },
  { name: 'BORO', explanation: '' },
  { name: 'STREET', explanation: '' },
  { name: 'ZIPCODE', explanation: '' },
  { name: 'VIOLATION CODE', explanation: '' },
  { name: 'VIOLATION DESCRIPTION', explanation: '' },
  { name: 'PHONE', explanation: '' },
  { name: 'CUISINE DESCRIPTION', explanation: '' },
  { name: 'INSPECTION DATE', explanation: '' },
]

const selectedExplanation = computed(() =>
  parameters.find(p => p.name === selected.value)?.explanation ?? ''
)
const moreInfo = computed(() =>
  parameters.find(p => p.name === selected.value)?.moreInfo ?? ''
)
</script>