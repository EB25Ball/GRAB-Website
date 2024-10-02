<template>
    <div v-show="visible" class="overlay" @click="closeLeaderboard"></div>
    <div v-show="visible" class="leaderboard">
        <div class="leaderboard-header">Leaderboard</div>
        <div class="leaderboard-content">
            <div v-if="leaderboardData.length === 0" class="leaderboard-placeholder">
                No data yet!<br>Be the first to set a record!
            </div>
            <div v-else>
                <div v-for="(entry, index) in leaderboardData" :key="index" class="leaderboard-row" :class="{'leaderboard-row-removed': removedTimes.some(item => item[0] === entry.user_id)}">
                    <div class="leaderboard-position">{{ entry.position + 1 }}</div>
                    <a :href="`/levels?tab=tab_other_user&user_id=${entry.user_id}`" class="leaderboard-name">{{ entry.user_name }}</a>
                    <div class="leaderboard-time">{{ formatTime(entry.best_time) }}</div>
                    <button v-show="(isModerator || isAdmin || isSuperModerator) && accessToken" @click="toggleRemoved(entry)" class="leaderboard-button">x</button>
                </div>
            </div>
        </div>
        <div class="leaderboard-close" @click="closeLeaderboard">&times;</div>
        <button v-if="removedTimes.length > 0" @click="removeLeaderboardTimes" id="applyLeaderboardModifications" class="leaderboard-button">Confirm</button>
    </div>
</template>

<script>
import { removeLeaderboardTimes } from '../requests/RemoveLeaderboardTimesRequest.js';
import { loadLeaderboardData } from '../requests/GetLeaderboardRequest.js';
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close'],
    data() {
        return {
            leaderboardData: [],
            removedTimes: [],
        };
    },
    computed: {
        ...mapState(useUserStore, ['isModerator', 'isSuperModerator', 'isAdmin', 'accessToken']),
    },
    async created() {
        this.leaderboardData = await loadLeaderboardData(this.$api_server_url);
    },
    methods: {
        async removeLeaderboardTimes() {
            this.removedTimes = await removeLeaderboardTimes(this.$api_server_url, this.removedTimes, this.accessToken);
        },
        closeLeaderboard() {
            this.removedTimes = [];
            this.$emit('close');
        },
        toggleRemoved(entry) {
            const index = this.removedTimes.findIndex(item => item[0] === entry.user_id);
            if (index !== -1) {
                this.removedTimes.splice(index, 1);
            } else {
                this.removedTimes.push([entry.user_id]);
            }
        },
        formatTime(time) {
            let minutes = Math.floor(time / 60);
            let seconds = (time % 60).toFixed(Math.max(0, (time.toString().split('.')[1] || '').length));
            return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        },
    }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 200;
}
.leaderboard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-height: 70%;
    height: fit-content;
    max-width: 600px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 300;
}
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
.leaderboard-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.leaderboard-placeholder {
    font-size: 16px;
    font-style: italic;
    margin-top: 10px;
    color: #999999;
}

.leaderboard-content {
    max-height: 50vh;
    overflow-y: scroll;
    margin-bottom: 15px;
}

.leaderboard-row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
}

.leaderboard-row:nth-of-type(even) {
    background-color: #f5f5f5;
    /* light gray */
}

.leaderboard-row:nth-of-type(odd) {
    background-color: #ffffff;
    /* white */
}

.leaderboard-position,
.leaderboard-name,
.leaderboard-time {
    flex: 1;
    text-align: center;
    font-size: 18px;
}

.leaderboard-name {
    font-weight: bold;
    color: #000000;
    text-decoration: none;
}

.leaderboard-time {
    font-style: italic;
    color: #999999;
}

.leaderboard-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    font-size: 20px;
    cursor: pointer;
}
#applyLeaderboardModifications {
    font-weight: bold;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #f15a5a;
    color: #FFFFFF;
    text-align: center;
    border: none;
    cursor: pointer;
    float: left;
}

.leaderboard-row.leaderboard-row-removed {
    background-color: #FA8072;
}
</style>
