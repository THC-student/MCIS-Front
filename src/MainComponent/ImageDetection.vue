<template>
    <UploadImage class="uploadImage"></UploadImage>
    <DecisionComponent class="decisionComponent"></DecisionComponent>
    <AcceptImage class="acceptImage"></AcceptImage>
    <Statistics class="statistic"></Statistics>
</template>

<script lang="ts" setup>
import UploadImage from "./ImageDetectionComponent/UploadImage.vue";
import AcceptImage from "./ImageDetectionComponent/AcceptImage.vue";
import DecisionComponent from "./ImageDetectionComponent/DecisionComponent.vue";
import Statistics from "./ImageDetectionComponent/Statistics.vue";
</script>

<style scoped>
.uploadImage ,.decisionComponent{
  border:1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  background-color: rgb(255, 255, 255);
  padding-top: 15px;
  padding-left: 15px;
}
.uploadImage{
  width:20rem;
  height:39.7rem;
  position: absolute;
  top:10px;
  left: 10px;
}
.decisionComponent{
  width:  26.2rem;
  height: 9rem;
  position: absolute;
  top:10px;
  left: 377px;
}
.acceptImage{
  background-color:  rgb(255, 255, 255);
  border: 1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  width: 27.2rem;
  height: 29.7rem;
  position: absolute;
  left: 376px;
  top:185px;
}
.statistic{
  width: 24.1875rem;
  height: 40.7rem;
  border:1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  background-color: rgb(255, 255, 255);
  position: absolute;
  left:829px;
  top:10px;
}
</style>