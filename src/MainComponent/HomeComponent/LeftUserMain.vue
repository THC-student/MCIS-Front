<template>
  <div class="leftcontainer">
    <LeftTopUser></LeftTopUser>
    <LeftCenterUser></LeftCenterUser>
    <LeftBottomUser></LeftBottomUser>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LeftTopUser from "./LeftTopUser.vue";
import LeftCenterUser from "@/MainComponent/HomeComponent/LeftCenterUser.vue";
import LeftBottomUser from "@/MainComponent/HomeComponent/LeftBottomUser.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.leftcontainer {
  position: absolute;
  height: 100%;
  width: 70%;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
