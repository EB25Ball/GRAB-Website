<template>
    <div class="popup" id="popup">
        <div class="popup-inner">
            <div class="cell-title" id="popup-title">Report Level</div><br>
            <div class="cell-description" id="popup-description">Why should this level be removed?</div><br>
            <form>
                <select id="popup-reason" @submit.prevent="SendLevelReport" style="width: 70%" v-model="selectedReason">
                    <option value="">- Select -</option>
                    <option v-for="(option, key) in options" :key="key" :value="key">{{ option }}</option>
                </select>
            </form>
            <br>
            <button id="popup-button-cancel" @click="TogglePopup()">Cancel</button>
            <button id="popup-button-ok" @click="SendLevelReport">OK</button>
        </div>
    </div>
</template>


<script>
import { reportLevel } from '../requests/ReportLevelRequest.js';

export default {
    inject: ['accessToken'],
    emits: ['togglePopup'],
    data() {
        return {
            options: {
                sexual: "Sexual Content / Genitals",
                violence: "Detailed Violence",
                hatespeech: "Offensive Language",
                loweffort: "Very low effort level",
                glitch: "Requires to use a Glitch to finish",
                tips: "Asking for Tips",
                other: "Other"
            },
            selectedReason: ''
        };
    },
    methods: {
        async SendLevelReport() {
            await reportLevel(this.$api_server_url, this.accessToken, this.selectedReason)
            this.TogglePopup()
        },
        TogglePopup(){
            this.$emit('togglePopup');
        }
    }
}
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100svh;
    display: grid;
    place-content: center;
    height: fit-content;
    z-index: 1002;
    color: #000000;
}

.popup-inner {
    background-color: white;
    border-radius: 10px;
    border: 3px solid grey;
    padding: 10px;
}

.popup[open="open"] {
    display: grid;
}
</style>