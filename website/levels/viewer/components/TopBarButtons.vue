<template>
    <div id="buttons" class="buttons">
        <form>
            <BackButton />
            <CopyButtons />
            <LeaderboardButton />
            <!--<FullscreenButton />
            <FogButton />
            -->
            <!--
            <input type="button" value="Fullscreen" id="fullscreen" class="fullscreen-button">
            <input type="button" id="fog-button" class="fog-button" value="Toggle Fog">
            <input type="button" id="location-button" class="location-button" value="Copy POV URL">
            <input type="button" id="leaderboard-button" value="Leaderboard">
            -->
        </form>
    </div>
</template>
<script>
import BackButton from './BackButton.vue'
import CopyButtons from './CopyButtons.vue'
import LeaderboardButton from './LeaderboardButton.vue'
/*
    import { FullscreenButton } from './FullscreenButton.vue'
    import { FogButton } from './FogButton.vue'
*/

export default {
    components: {
        BackButton,
        // FullscreenButton,
        CopyButtons,
        //FogButton,
        LeaderboardButton
    },

}
</script>
<style scoped>
.buttons {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    text-align: left;
    z-index: 100;
    gap: 10px; /* Add space between buttons */
}

#buttons form * {
    cursor: pointer;
    margin: 0 5px; /* Add margin to buttons for spacing */
}
</style>
