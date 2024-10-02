<template>
    <div>
        <button id="reportButton" @click="togglePopup(true)">Report</button>
        <button id="favoriteButton" v-if="!isLevelFavorited" @click="addFavoriteLevel()">Favorite</button>
        <button id="unfavoriteButton" v-else @click="removeFavoriteLevel()">Unfavorite</button>
        <teleport v-if="isMounted"  to="#level-viewer">
            <PopupReport  v-if="reportTrigger" @togglePopup="togglePopup(false)" />
        </teleport>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import PopupReport from './PopupReport.vue';
import { setUserFavorites } from '../requests/SetUserFavoritesRequest.js';
import { removeUserFavorites } from '../requests/RemoveUserFavoritesRequest.js';

export default {
    inject: ['accessToken', 'levelID'],
    components: {
        PopupReport,
    },
    data() {
        return {
            reportTrigger: false,
            isMounted: false,
        };
    },
    computed: {
        isLevelFavorited() {
            return useUserStore().isFavorited(this.levelID);
        },
    },
    async mounted() {
        await this.$nextTick();
        this.isMounted = true;
    },
    methods: {
        togglePopup(bool) {
            this.reportTrigger = bool
        },
        async addFavoriteLevel() {
            if (this.accessToken) {
                const userStore = useUserStore();
                const result = await setUserFavorites(this.$api_server_url, this.levelID, this.accessToken);
                if (result === true) {
                    userStore.addFavoriteLevel(this.levelID);
                }
            }
        },
        async removeFavoriteLevel() {
            if (this.accessToken) {
                const userStore = useUserStore();
                const result = await removeUserFavorites(this.$api_server_url, this.levelID, this.accessToken);
                if (result === true) {
                    userStore.removeFavoriteLevel(this.levelID);
                }
            }
        },
    },
};
</script>


<style scoped>
#reportButton {
    height: 30px;
    width: fit-content;
    padding-right: 20px;
    padding-left: 20px;
    font-weight: bold;
    background-color: red;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}
#favoriteButton, #unfavoriteButton {
    height: 30px;
    width: fit-content;
    padding-right: 20px;
    padding-left: 20px;
    font-weight: bold;
    background-color: #FFAE00;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 5px;
}

#unfavoriteButton {
    background-color: red;
}

</style>
