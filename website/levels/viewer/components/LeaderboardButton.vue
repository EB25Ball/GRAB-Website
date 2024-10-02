<template>
    <input type="button" id="leaderboard-button" value="Leaderboard" @click="showLeaderboard = true">
    <teleport v-if="isMounted" to="#level-viewer">
        <LeaderboardPopup :visible="showLeaderboard" @close="showLeaderboard = false" />
    </teleport>
</template>

<script>
import LeaderboardPopup from './LeaderboardPopup.vue';
import { ref } from 'vue';

export default {
    data() {
        return {
            isMounted: false
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.isMounted = true;
        })
    },
    components: {
        LeaderboardPopup,
    },
    setup() {
        const showLeaderboard = ref(false);
        return {
            showLeaderboard
        };
    }
}
</script>

<style scoped>
.leaderboard-button {
    font-weight: bold;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #f15a5a;
    color: #FFFFFF;
    text-align: center;
    border: none;
    cursor: pointer;
    margin-inline: 5px;
}

#leaderboard-button {
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
