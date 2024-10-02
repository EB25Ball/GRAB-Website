<script>
import ListNavigator from './ListNavigator.vue'

export default {
    components: {
        ListNavigator
    }
}
</script>
<template>
    <button id="startButton" class="startButton">Go To Start</button>
     
    <button id="finishButton" class="finishButton">Go To Finish</button>
    <br>
    <ListNavigator />
</template>

<style scoped>
#startButton  {
    cursor: pointer;
    width: 100px;
    height: 30px;
    font-weight: bold;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #00BC87;
    color: #FFFFFF;
    text-align: center;
    border: none;
}
#finishButton  {
    cursor: pointer;
    width: 100px;
    height: 30px;
    font-weight: bold;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #FA8072;
    color: #FFFFFF;
    text-align: center;
    border: none;
}

</style>