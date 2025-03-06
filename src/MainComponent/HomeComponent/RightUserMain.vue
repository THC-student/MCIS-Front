<template>
  <div class="rightcontainer">
    <RightTopUser></RightTopUser>
    <RightBottomUser></RightBottomUser>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RightTopUser from "./RightTopUser.vue";
import RightBottomUser from "@/MainComponent/HomeComponent/RightBottomUser.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.rightcontainer {
  position: absolute;
  height: 100%;
  width: 28%;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
