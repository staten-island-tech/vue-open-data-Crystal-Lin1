<template>
    <div class="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-10">
        <div class="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 w-[50%]">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-900 mb-1">Grade Explanation</h2>
                <button @click='$emit("close")' class="text-gray-400 hover:text-gray-700 font-bold transition-colors">X</button>
            </div>
        
        <p class="text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-4">Health Inspection Scoring</p>

        <p class="text-sm text-gray-600 mb-4">Letter grades are assigned based on the total number of violation points found during inspection. The higher the score, the more violations were found.</p>

        <div class="flex flex-col gap-2 mb-6">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <span class="font-bold text-emerald-500 w-4">A</span>
            <span class="text-xs text-gray-500">score 0–13</span>
            <span class="text-sm text-gray-700">Excellent compliance, very low risk of foodborne illness.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <span class="font-bold text-amber-400 w-4">B</span>
            <span class="text-xs text-gray-500">score 14–27</span>
            <span class="text-sm text-gray-700">Good compliance with some minor violations that need addressing.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
            <span class="font-bold text-red-500 w-4">C</span>
            <span class="text-xs text-gray-500">score 28+</span>
            <span class="text-sm text-gray-700">Fair compliance with several violations requiring attention.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-violet-50 border border-violet-100">
            <span class="font-bold text-violet-500 w-4">Z</span>
            <span class="text-xs text-gray-500">pending</span>
            <span class="text-sm text-gray-700">Inspected but awaiting re-inspection before a final grade is issued.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <span class="font-bold text-blue-500 w-4">P</span>
            <span class="text-xs text-gray-500">pending</span>
            <span class="text-sm text-gray-700">Grade pending re-opening — restaurant was closed and is waiting to reopen.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span class="font-bold text-gray-500 w-4">N</span>
            <span class="text-xs text-gray-500">—</span>
            <span class="text-sm text-gray-700">Not yet graded.</span>
        </div>
        </div>

        <p class="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Violation Points</p>
        <div class="flex flex-col gap-2">
        <div class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <span class="text-sm text-gray-700">Critical violations (e.g. improper food temperature, pest activity): <span class="font-semibold">5–28 points</span> each.</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <span class="text-sm text-gray-700">Non-critical violations (e.g. improper sanitation, equipment issues): <span class="font-semibold">2–9 points</span> each.</span>
        </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
defineEmits(['close'])

</script>