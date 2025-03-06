<template>
  <div class="container">
    <UserPersonTop></UserPersonTop>
    <LeftBottonManagePerson></LeftBottonManagePerson>
    <RightBottomManagePerson></RightBottomManagePerson>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import UserPersonTop from "@/MainComponent/PersonalCenterComponent/UserPersonTop.vue";
import LeftBottonManagePerson from "@/RulerComponent/ManagePerson/LeftBottonManagePerson.vue";
import RightBottomManagePerson from "@/RulerComponent/ManagePerson/RightBottomManagePerson.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.container {
  border: 1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  background-color: rgb(234, 242, 250);
  height: 655px;
  width: 1210px;
  z-index: 1;
  position: relative;
  top: 5px;
  left: 8px;
  display: flex;
  justify-content: center;
}
</style>
