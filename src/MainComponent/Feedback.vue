<template>
  <div class="feedback-main">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import ErrorEscalation from './FeedbackComponent/ErrorEscalation.vue';
</script>

<style scoped>
.feedback-main{
  border:1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  background-color: rgb(255, 255, 255);
  height:650px;
  width:1210px;
  position: absolute;
  top:10px;
  left:9px;
}
</style>