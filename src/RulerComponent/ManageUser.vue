<template>
  <div class="container">
    <div class="container-box">
      <TopNav></TopNav>
      <TableMain></TableMain>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TopNav from "./ManageUserComponent/TopNav.vue";
import TableMain from "./ManageUserComponent/TableMain.vue";

const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.container {
  width: 1210px;
  height: 650px;
  background-color: #ffffff;
  z-index: 1;
  position: relative;
  left: 10px;
  top:10px;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  .container-box {
    height: 98%;
    width: 97%;
    border: 2px solid #cedefa;
    border-radius: 0.3rem;
    display: flex;
    justify-content: center;
    position: relative;
    top:5px;
  }
}
</style>
