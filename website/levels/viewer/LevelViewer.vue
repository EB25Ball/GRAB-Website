<script>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

import Info from './components/Info.vue';
import TopBarButtons from './components/TopBarButtons.vue';
import Slider from './components/Slider.vue';
import Terms from '../../src/components/Terms.vue';

export default {
    components: {
        Info,
        TopBarButtons,
        Slider,
        Terms,
    },
    data() {
        return {
            userID: null,
            urlParams: null,
            url: null,
            levelID: null,
        };
    },
    mounted() {
        this.getUrlData();
        this.getUserID();
    },
    provide() {
        return {
            userID: computed(() => this.userID),
            urlParams: computed(() => this.urlParams),
            url: computed(() => this.url),
            levelID: computed(() => this.levelID),
        };
    },
    methods: {
        getUserID() {
            if (this.levelID) {
                const levelIdentifierParts = this.levelID.split(':');
                this.userID = levelIdentifierParts[0];
            }
        },
        getUrlData() {
            this.urlParams = new URLSearchParams(window.location.search);
            this.url = window.location.href.split("?")[0];
            this.levelID = this.urlParams.get("level");
        }
    }
};
</script>

<template>
    <div id="level-viewer">
        <Info />
        <TopBarButtons />
        <Slider />
        <Terms />
    </div>
</template>

<style scoped>
#level-viewer {
    margin: 0;
    touch-action: pan-x pan-y;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    font-family: 'Roboto', sans-serif;
}

</style>
