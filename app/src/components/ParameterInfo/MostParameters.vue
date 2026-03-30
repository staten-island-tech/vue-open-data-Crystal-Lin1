<!-- ParameterModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-10">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-[40%]">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-900">{{ name }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700 font-bold transition-colors">✕</button>
      </div>
      <p class="text-gray-700 mb-2">{{ explanation }}</p>
      <p v-if="moreInfo" class="text-gray-500 text-sm">{{ moreInfo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
defineProps<{
  name: string
  explanation: string
  moreInfo?: string
}>()
</script>