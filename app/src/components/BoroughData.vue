<template>
    <div class="shadow w-[50%] p-10 m-auto flex justify-center">
        <form @submit.prevent="" >
            <div class="flex">
                <input class='mr-2'id='statenIsland' name='boro' value='statenIsland' type="checkbox">
                <label for="statenIsland">Staten Island</label>
            </div>
            <div class="">
                <input class='mr-2' id='manhattan' name='boro' value='manhattan' type="checkbox">
                <label for="manhattan">Manhattan</label>
            </div>
            <div class="">
                <input class='mr-2' id='brooklyn' name='boro' value='brooklyn' type="checkbox">
                <label for="brooklyn">Brooklyn</label>
            </div>
            <div class="">
                <input class='mr-2' id='bronx' name='boro' value='bronx' type="checkbox">
                <label for="bronx">Bronx</label>
            </div>
            <div class="">
                <input class='mr-2'id='queens' name='boro' value='queens' type="checkbox">
                <label for="queens">Queens</label>
            </div>
        </form>
        
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>