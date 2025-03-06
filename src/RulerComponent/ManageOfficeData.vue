<template>
  <div class="container">
    <TopOffice></TopOffice>
    <BottomOffice></BottomOffice>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TopOffice from "@/RulerComponent/ManageOfficeData/TopOffice.vue";
import BottomOffice from "@/RulerComponent/ManageOfficeData/BottomOffice.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.container {
  width: 1220px;
  height: 660px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 1;
  position: relative;
  top:5px;
  left:5px;
  display: flex;
  justify-content: center;
  overflow: auto;
}
.container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
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
