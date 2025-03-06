<template>
  <div class="container">
    <nav>
      <div
        class="transbtn"
        @click="store.state.change = !store.state.change"
       style="color:white;font-size: 15px;padding-top: 5px;">切换</div>
      <h3 style="position: relative;left:-50px;">数 据 集 展 示</h3>
    </nav>
    <ShowDataList v-show="change"></ShowDataList>
    <MenuDataList v-show="!change"></MenuDataList>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ShowDataList from "@/RulerComponent/ManageDataList/ShowDataList.vue";
import MenuDataList from "@/RulerComponent/ManageDataList/MenuDataList.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const change = computed(() => store.state.change);
// 现在可以监听这两个计算属性的变化
watch(change, (newValues, oldValues) => {
  console.log("变化", change.value);
  // 在这里执行你的逻辑
});
</script>
<style lang="scss" scoped>
.container {
  border:1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  height:660px;
  width:1220px;
  background-color: #ffffff;
  position: relative;
  top:5px;
  left:5px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  //   align-items: center;
  nav {
    height: 57px;
    width: 84%;
    display: flex;
    align-items: center;
    position: fixed; /* 或 absolute 若需相对于父元素定位 */
    z-index: 999;
    background-color: #fff;
    // justify-content: center;
    .transbtn {
      height: 27px;
      width: 60px;
      cursor: pointer;
      margin-left: 50px;
      border-top-right-radius: 8px;
      background: linear-gradient(to bottom right, #409EFF, #409EFF);
      z-index: 1000 !important;
    }
    .transbtn:hover {
      opacity: 0.7;
    }
    h3 {
      margin: auto;
      color: #409EFF;
    }
  }
}
</style>
