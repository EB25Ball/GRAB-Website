<script>
export default {
    inject: ['url', 'levelID'],
    methods: {
        async copyLevelURL() {
            await navigator.clipboard.writeText(this.url + "?level=" + this.levelID);
        },
        copyPov() {
            const cameraPosition = camera.position;
            const cameraRotation = controls.eulerVector;
            const positionString = `camera_position=${cameraPosition.x},${cameraPosition.y},${cameraPosition.z}`;
            const rotationString = `camera_rotation=${cameraRotation.x},${cameraRotation.y}`;
            const newUrl = `${this.url}?level=${this.levelID}&${positionString}&${rotationString}`;
            navigator.clipboard.writeText(newUrl);
        }
    }

}
</script>
<template>
    <input type="button" id="copy-button" class="copy-button" value="Copy Level URL" @click="copyLevelURL">
    <input type="button" id="location-button" class="location-button" value="Copy POV URL" @click="copyPov">
</template>

<style scoped>
.copy-button {
    width: 120px;
    height: 30px;
    font-weight: bold;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #FFAE00;
    color: #FFFFFF;
    text-align: center;
    border: none;
    float: right;
}

.location-button {
    width: 120px;
    height: 30px;
    font-weight: bold;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #FFAE00;
    color: #FFFFFF;
    text-align: center;
    border: none;
    float: right;
}
</style>