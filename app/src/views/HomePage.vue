<template>
    <div>
        <h1 class="bg-red-50">tes</h1>
    </div>
</template>

<script setup lang="ts">
async function getAllData() {
    const url = 'https://data.cityofnewyork.us/api/v3/views/43nn-pn8j/query.json'
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