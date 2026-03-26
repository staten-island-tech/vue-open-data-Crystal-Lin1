<template>
    <div class="bg-white shadow-lg w-[50%] p-8 m-auto rounded-2xl border border-gray-100">
        <h1>Parameters are</h1>

        <h2 class="text-xl font-bold mb-4">Grade Explanation</h2>
        <p class="mb-2">The health inspection grading system assigns letter grades to restaurants based on their compliance with health and safety regulations. The grades are as follows:</p>
        <ul class="list-disc list-inside mb-4">
            <li class="text-emerald-500">A (score 0–13): Excellent compliance, very low risk of foodborne illness.</li>
            <li class="text-amber-400">B (score 14–27): Good compliance with some minor violations that need addressing.</li>
            <li class="text-red-500">C (score 28+): Fair compliance with several violations requiring attention.</li>
            <li class="text-violet-500">Z: Grade pending — inspected but awaiting re-inspection before a final grade is issued.</li>
            <li class="text-blue-500">P: Grade pending re-opening — restaurant was closed and is waiting to reopen.</li>
            <li class="text-gray-500">N: Not yet graded.</li>
        </ul>
        <p class="mb-2">Scores are calculated by adding points for each violation found during inspection. Common violations and their point values include:</p>
        <ul class="list-disc list-inside">
            <li>Critical violations (e.g. improper food temperature, pest activity): 5–28 points each.</li>
            <li>Non-critical violations (e.g. improper sanitation, equipment issues): 2–9 points each.</li>
        </ul>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>