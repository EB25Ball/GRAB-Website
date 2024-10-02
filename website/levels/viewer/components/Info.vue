<template>
    <div id="info-container">
        <div id="info" class="info">
            <br>
            <img v-if="!isScheduledForDeletion && hasImage" :src="imageSource" class="previewImage">
            <br>
            <ScheduledForDeletion v-if="isScheduledForDeletion" />
            <LevelInfoDetails v-if="levelDetails && levelStatistics" :levelStatistics="levelStatistics"
                :levelDetails="levelDetails" />
            <UserTools  />
            <LevelTools />
            <ModerationTools />
            <!-- <ModerationTools />
            <div id="moderationcontainer" class="moderationinfo">
                <button id="verifyButton" style="display: none;">Verify</button>
                <button id="unverifyButton" style="display: none;">Unverify</button>
                <button id="verifySkipButton" style="display: none;">Skip</button>
                <button id="verifySkipSuccessButton" style="display: none;">Skipped</button>
                <div id="hidecontainer" style="display: none;">
                        <div id="reports" style="display: none;">
                        <b>
                            <p id="reportsTitle">Reports:</p>
                        </b>
                        <div id="reportlist"></div>
                    </div>
                    <br>
                    <b>Hide Level</b>
                    <form id="hideForm">
                        <select id="hideReason" style="width: 70%;">
                            <option value="">- Reason -</option>
                            <option id="level_sexual" value="level_sexual">Sexual Content / Genitals</option>
                            <option id="level_violence" value="level_violence">Detailed Violence</option>
                            <option id="level_hatespeech" value="level_hatespeech">Inappropriate Language</option>
                            <option id="level_tips" value="level_tips">Asking for Tips</option>
                            <option id="level_loweffort" value="level_loweffort">Very low effort level</option>
                            <option id="level_glitch" value="level_glitch">Requires to use a Glitch to finish</option>
                            <option id="level_other" value="level_other">Other</option>
                            <option id="no_punish" value="no_punish">Don't punish</option>
                        </select>
                    </form>
                    <button id="hideButton">Hide</button>
                    <button id="approveButton">Approve</button>
                    <br>
                </div>
            </div> -->

            <img class="info-stamp-ok" v-if="hasOKStamp" :src="imageStampOk">
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';

import ScheduledForDeletion from './ScheduledForDeletion.vue';
import LevelInfoDetails from './LevelInfoDetails.vue';
import UserTools from './UserTools.vue';
import LevelTools from './LevelTools.vue';
import ModerationTools from './ModerationTools.vue';

import { getLevelDetails } from '../requests/GetLevelDetailsRequest.js';
import { getLevelStatistics } from '../requests/GetLevelStatisticsRequest.js';

import imageStampOk from '../../../src/assets/stamp_ok.png';

export default {
    inject:['levelID'],
    components: {
        ScheduledForDeletion,
        LevelInfoDetails,
        LevelTools,
        UserTools,
        ModerationTools
    },
    data() {
        return {
            levelDetails: null,
            levelStatistics: null,
            imageStampOk:imageStampOk
        };
    },
    computed: {
        isScheduledForDeletion() {
            return this.levelDetails?.scheduled_for_deletion ?? false;
        },
        hasOKStamp() {
            return this.levelDetails?.tags?.includes('ok') ?? false;
        },
        hasImage() {
            return this.levelDetails?.images?.thumb != null;
        },
        imageSource() {
            return this.levelDetails?.images ? `${this.$images_server_url}${this.levelDetails.images.thumb.key}` : '';
        },
        ...mapState(useUserStore, ['isLoggedIn', 'isVerifier', 'isAdmin', 'isSuperModerator', 'isModerator', 'accessToken'])
    },
    async created() {
        this.levelDetails = await getLevelDetails(this.$api_server_url);
        this.levelStatistics = await getLevelStatistics(this.$api_server_url);
    },
    provide() {
        return {
            isLoggedIn: this.isLoggedIn,
            isVerifier: this.isVerifier,
            isAdmin: this.isAdmin,
            isSuperModerator: this.isSuperModerator,
            isModerator: this.isModerator,
            accessToken: this.accessToken,
        }
    }
};
</script>

<style scoped>
.previewImage {
    border-radius: 15px;
    width: 100%;
}

.info-stamp-ok {
    position: absolute;
    top: 20%;
    right: 5%;
    width: 30%;
    transform: rotate(-20deg);
    display: block;
}

#info-container {
    position: fixed;
    top: 50px;
    left: 10px;
    height: 100%;
    max-width: 30%;
}

.info {
    background-color: #ffffff40;
    border-radius: 20px;
    padding: 0px 15px 0px 15px;
    width: 100%;
    text-align: left;
    overflow-y: scroll;
    display: block;
    max-height: 87.5%;
    box-sizing: initial;
}

:deep(button) {
    margin-right: 5px;
    margin-top: 10px;
}
</style>
