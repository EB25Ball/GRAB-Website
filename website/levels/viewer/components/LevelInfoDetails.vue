<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    props: {
        levelDetails: {
            type: Object,
            required: true
        },
        levelStatistics: {
            type: Object,
            required: true
        }
    },
    computed: {
        creators() {
            if (this.levelDetails.creators && this.levelDetails.creators.length > 0)
                return 'by ' + this.levelDetails.creators.join(', ')

            return ''
        },

        tags() {
            if (this.levelDetails.tags && this.levelDetails.tags.length > 0) {
                return this.levelDetails.tags.filter(t => t !== 'ok')
            }
            return []
        },

        ...mapState(useUserStore, ['isVerifier', 'isAdmin', 'isSuperModerator', 'isModerator', 'accessToken'])
    },
}
</script>

<template>
    <div id="title">{{ levelDetails.title }}</div>

    <div id="tags">
        <button id="tagButton" v-if="accessToken && (isSuperModerator|| isModerator||isAdmin)">Edit Tags</button>
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div id="creators">{{ creators }}</div>
    <div id="description">{{ levelDetails.description }}</div>
    <div id="complexity">complexity: {{ levelDetails.complexity }}</div>
    <div id="checkpoints">checkpoints: {{levelDetails?.checkpoints ?? 0 }}</div>
    <div id="date">created: {{ (new Date( levelDetails.creation_timestamp)).toDateString() }}</div>

    <div id="statistics">
        <div id="total-finished-count">total finished: <b>{{ levelStatistics.total_finished_count }} / {{ levelStatistics.total_played_count }}</b> </div>
        <div id="players-finished-count">players finished: <b>{{ levelStatistics.finished_count }} / {{ levelStatistics.played_count }}</b></div>
        <div id="players-liked-count">players liked: <b>{{ levelStatistics.liked_count }} /  {{levelStatistics.rated_count}}</b></div>
        <div id="average-time">average time: <b>{{ Math.round(levelStatistics.average_time*100)/100  }}s</b></div>
    </div>
</template>

<style scoped>
#tags {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 2px;
    padding-top: 2px;
    margin-bottom: 2px;
    
}

.tag {
    font-style: italic;
    color: #000000ca;
    background-color: #00000018;
    padding: 0 8px;
    border-radius: 50px;
    height: max-content;
}

#title {
    font-weight: bold;
    color: #000000;
    font-size: 20px;
}
#tagButton {
    font-weight: bold;
    width: fit-content;
    padding: 0 8px;
    min-height: 15px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    height: max-content;
}
#creators, #description, #date {
    margin-bottom: 5px;
}
#description {
    font-size: 14px;
}

</style>