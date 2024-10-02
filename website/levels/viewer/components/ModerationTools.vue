<template>
    <br>
    <div id="moderationcontainer" class="moderationinfo">
        <VerifyTools/>
        <HideTools/>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import VerifyTools from './VerifyTools.vue';
import HideTools from './HideTools.vue';

export default {
    components: {
        VerifyTools,
        HideTools
  },
    computed: {
        ...mapState(useUserStore, ['isVerifier']),
        ...mapState(useUserStore, ['isLoggedIn']),
        ...mapState(useUserStore, ['isAdmin']),
        ...mapState(useUserStore, ['isSuperModerator']),
        ...mapState(useUserStore, ['isModerator']),
        ...mapState(useUserStore, ['accessToken']),
    },

}

</script>

<style scoped></style>