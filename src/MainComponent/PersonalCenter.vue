<template>
  <div class="container">
    <UserPersonTop></UserPersonTop>
    <UserPersonBottom></UserPersonBottom>
  </div>
</template>
<script setup>
import UserPersonTop from "@/MainComponent/PersonalCenterComponent/UserPersonTop.vue";
import UserPersonBottom from "@/MainComponent/PersonalCenterComponent/UserPersonBottom.vue";
</script>
<style lang="scss" scoped>
.container {
  border:1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  height:650px;
  width:1210px;
  background-color: #ecf1fc;
  z-index: 1;
  position: absolute;
  top:10px;
  left:9px;
  display: flex;
  justify-content: center;
}
</style>