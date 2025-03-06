<template>
  <div class="menucontainer">
    <div class="menu-box">
      <LeftMenu></LeftMenu>
      <RightShow></RightShow>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LeftMenu from "./LeftMenu.vue";
import RightShow from "./RightShow.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.menucontainer {
  width: 100%;
  height: 90%;
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-box {
    height: 90%;
    width: 90%;
    // border: 1px solid #808080;
    // box-shadow: 0 4px 6px #969797; /* 阴影参数 */
  }
}
</style>
