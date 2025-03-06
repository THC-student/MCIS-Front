<template>
  <div class="container">
    <LeftUserMain></LeftUserMain>
    <RightUserMain></RightUserMain>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LeftUserMain from "./HomeComponent/LeftUserMain.vue";
import RightUserMain from "./HomeComponent/RightUserMain.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.container {
  width: 1220px;
  height: 660px;
  background: linear-gradient(to bottom right, #d9ecff, #ecf5ff);
  border-radius:10px;
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: auto;
  left:5px;
  top:5px;
}
.container::-webkit-scrollbar {
    width: 6px;
}

.container::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* 设置滚动条轨道背景色 */
}

.container::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    /* 设置滚动条滑块颜色 */
    border-radius: 4px;
    /* 设置滚动条滑块的圆角 */
}

.container::-webkit-scrollbar-thumb:hover {
    background-color: #989898;
    /* 设置滚动条滑块在悬停时的颜色 */
}

</style>