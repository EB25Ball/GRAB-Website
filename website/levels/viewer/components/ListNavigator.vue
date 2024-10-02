<template>
    <div id="listButtons">
      <button id="prevListItem" v-if="showBackButton" @click="goToPreviousItem">Previous</button>
       <button id="nextListItem" v-if="showNextButton" @click="goToNextItem">Next</button>
      <br>
      <p>
        <span id="currentListItem">{{ currentIndex + 1 }}</span> / 
        <span id="totalListItems">{{ list.length }}</span>
      </p>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/user';
  
  export default {
    data() {
      return {
        userStore: useUserStore(),
      };
    },
    computed: {
      list() {
        return this.userStore.list;
      },
      currentIndex() {
        return this.userStore.listIndex;
      },
      showNextButton() {
        return this.currentIndex < this.list.length - 1;
      },
      showBackButton() {
        return this.currentIndex > 0;
      },
    },
    methods: {
      goToNextItem() {
        let nextListItem = this.list[this.currentIndex + 1];
        if (nextListItem && "object_info" in nextListItem) {
          nextListItem = nextListItem["object_info"];
        }
        location.href = "/levels/viewer/?level=" + nextListItem.identifier + (window.location.href.includes('verify_queue') ? '&verify_queue' : '');
        this.userStore.setListIndex(this.currentIndex + 1);
      },
      goToPreviousItem() {
        let previousListItem = this.list[this.currentIndex - 1];
        if (previousListItem && "object_info" in previousListItem) {
          previousListItem = previousListItem["object_info"];
        }
        location.href = "/levels/viewer/?level=" + previousListItem.identifier + (window.location.href.includes('verify_queue') ? '&verify_queue' : '');
        this.userStore.setListIndex(this.currentIndex - 1);
      },
    },
  };
  </script>
  
  <style scoped>
  #listButtons > button  {
    cursor: pointer;
    width: 100px;
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
p{
  margin-top: 15px;
}
  </style>
  