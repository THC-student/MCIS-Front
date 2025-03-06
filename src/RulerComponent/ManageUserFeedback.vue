<template>
  <div class="container">
    <TopNav></TopNav>
    <ShowFeedback></ShowFeedback>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TopNav from "@/RulerComponent/ManageUserFeedback/TopNav.vue";
import ShowFeedback from "@/RulerComponent/ManageUserFeedback/ShowFeedback.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
// const canvas = computed(() => store.state.canvas);
// watch(canvas, (newValues, oldValues) => {
//   console.log(" changed:", newValues, oldValues);
//   // console.log("total changed:", newTotal, oldTotal, newDeleteflag);
//   // console.log("变化", tableData.value, total.value);
//   // 在这里执行你的逻辑
// });
</script>
<style lang="scss" scoped>
.container {
  width: 1220px;
  height: 660px;
  border-radius: 5px;
  //   background-color: #f0f0f0;
  z-index: 1;
  position: relative;
  top:5px;
  left:5px;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    /* 创建一个半透明白色层 */ url("@/assets/6.jpg");
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  background-blend-mode: normal, overlay; /* 第一个背景层（半透明白层）与背景图片正常叠加，第二个背景图片使用overlay模式 */
}
</style>
