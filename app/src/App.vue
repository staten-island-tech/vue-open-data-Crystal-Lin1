<template>
  <Suspense> <!--needed bc async functions r used-->
    <RouterView></RouterView>
    <template #fallback>
      <div>Loading...</div> 
    </template>
  </Suspense>
  
</template>

<script setup lang="ts"></script>

<style scoped></style>
