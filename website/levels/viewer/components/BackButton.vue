<script>
export default {
    inject: ['userID'],
    props:{
        userID: {
            type: String,
            required: true
        }
    },
    methods: {
        backButtonPressed() {
            let newURL = new URL(window.location);
            newURL.pathname = "/levels";
            console.log(this.userID)
            if (this.userID) {
                newURL.search = "?tab=user&user_id=" + this.userID;
            } else {
                newURL.search = "";
            }
            window.location.href = newURL.href;
        }
    }
}
</script>

<template>
    <input v-if="userID" type="button" id="back-button" class="back-button" value="User Levels" @click="backButtonPressed()">
</template>

<style scoped>
.back-button {
    width: 90px;
    height: 30px;
    font-weight: bold;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    background-color: #FFAE00;
    color: #FFFFFF;
    text-align: center;
    border: none;
}
</style>
