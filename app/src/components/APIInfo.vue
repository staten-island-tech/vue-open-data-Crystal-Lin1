<template class="bg-gray-50">
    <div class="shadow-lg w-[50%] p-8 m-auto rounded-2xl border border-gray-100">
        <h1 class="text-xl font-bold mb-4 text-center">Parameters </h1>
        <ul class="list-disc list-inside mb-4">
            <label v-for="parameter in parameters" :key="parameter.name"
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
                @click="editAssociatedVariable(parameter.name)">
                <span class="text-gray-700 font-medium">{{ parameter.name}}</span>
            </label>
        </ul>
        <h2 class="text-xs text-gray-400 mt-4">
            Only the less self explanatory parameters have an explanation when hovered over
        </h2>
    </div>
    <InspectionGrade></InspectionGrade>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let showCamis= ref(true);
let showDba = ref(false);
let showAction = ref(false);
let showCriticalFlag = ref(false);
let showBuilding = ref(false)

const parameters = [
  { name: 'CAMIS', explanation: 'Unique identifier for the restaurant', associatedVariable: 'showCamis'},
  { name: 'DBA', explanation: 'Restaurant name', associatedVariable: 'showDba'},
  { name: 'BUILDING', explanation: 'Building number', associatedVariable: 'showBuilding'},
  { name: 'ACTION', explanation: 'Actions associated with inspection (like nothing or closing down restaurant)', associatedVariable: 'showAction' },
  { name: 'CRITICAL FLAG', explanation: 'Critical, N/A, or Not Critical', associatedVariable: 'showCriticalFlag' },
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

function editAssociatedVariable(name: String) {
    parameters.forEach((parameter) => {
        console.log('r')
        if ('associatedVariable' in parameter && name === parameter.name) {
            if (parameter.associatedVariable.value ==='showCamis') {
                showCamis.value = true
            } else if (parameter.associatedVariable.value ==='showDba') {
                showDba.value = true
            }else if (parameter.associatedVariable.value ==='showBuilding') {
                showBuilding.value = true
            } else if (parameter.associatedVariable.value ==='showAction') {
                showAction.value = true
            } else if (parameter.associatedVariable.value ==='showCriticalFlag') {
                showCriticalFlag.value = true
            }

        }
    })
}
import InspectionGrade from './ParameterInfo/InspectionGrade.vue';
</script>

<style scoped>

</style>