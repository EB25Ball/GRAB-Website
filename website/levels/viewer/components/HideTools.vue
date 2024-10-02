<script>
export default {

}
</script>

<template>
    <div id="hidecontainer">
        <div id="reports">
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
</template>

<style scoped>
.creatorButton, #approveButton,#hideButton {
    height: 30px;
    font-weight: bold;
    width: fit-content;
    padding-right: 20px;
    padding-left: 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}
#hideButton {
    background-color: red;
}
#hideForm {
    margin-bottom: 5px;
}
#hideReason {
    height: 30px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}



</style>