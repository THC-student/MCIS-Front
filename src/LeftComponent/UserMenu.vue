<template>
  <el-scrollbar style="position: absolute; top: 250px; width: 201px;">
    <el-menu :default-openeds="['4']"><!-- :default-openeds="['1', '3']" 默认情况下展开的菜单项的索引 -->
      <el-menu-item index="1">
        <template #title>
          <img src="../assets/首页1.png" class="img" />
          <span @click="ToHome">首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <template #title>
          <img src="../assets/图片检测.png" class="img" />
          <span @click="ToImageDetection">图片检测</span>
        </template>
      </el-menu-item>
        <el-sub-menu index="4">
        <template #title>
          <img src="../assets/检测反馈.png" class="img" />
          <span @click="ToFeedbackProblem">检测反馈</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="4-1" @click="ToFeedbackProblem">
              &nbsp;&nbsp;井盖维修上报
              <img src="../assets/错误上报.png" class="img" />
            </el-menu-item>
            <el-menu-item index="4-2" @click="ToFeedbackError">
              &nbsp;&nbsp;识别错误上报
              <img src="../assets/错误上报.png" class="img" />
            </el-menu-item>
          </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="5">
        <template #title>
          <img src="../assets/历史数据.png" class="img" />
          <span @click="ToHistoricalData">历史数据</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <template #title>
          <img src="../assets/个人中心.png" class="img" />
          <span @click="ToPersonalCenter">个人中心</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
import { useStore } from "vuex";
const store = useStore();
function ToPersonalCenter(){
  console.log(router.currentRoute.value.name)
      if (router.currentRoute.value.path !== "/AppMain/PersonalCenter") {
        store.state.navigation="井盖检测用户 > 个人中心"
        router.replace( "/AppMain/PersonalCenter");
      }
}
function ToHome(){
   if (router.currentRoute.value.path !== "/AppMain") {
    store.state.navigation="井盖检测用户 > 首页"
        router.replace( "/AppMain");
      } 
       
}
function ToImageDetection(){
      if (router.currentRoute.value.path !== "/AppMain/ImageDetection") {
        store.state.navigation="井盖检测用户 > 图片检测"
        router.replace( "/AppMain/ImageDetection");
      }
}
function ToFeedbackProblem(){
      if (router.currentRoute.value.path !== "/AppMain/Feedback/ProblemEscalation") {
        store.state.navigation="井盖检测用户 > 反馈上报 > 井盖维修上报"
        router.replace( "/AppMain/Feedback/ProblemEscalation");
      }
}
function ToFeedbackError(){
      if (router.currentRoute.value.path !== "/AppMain/Feedback/ErrorEscalation") {
        store.state.navigation="井盖检测用户 > 反馈上报 > 检测错误上报"
        router.replace( "/AppMain/Feedback/ErrorEscalation");
      }
}
function ToHistoricalData(){
      if (router.currentRoute.value.path !== "/AppMain/HistoricalData") {
        store.state.navigation="井盖检测用户 > 历史数据"
        router.replace( "/AppMain/HistoricalData");
      } 
}
</script>

<style scoped>
.img {
  width: 23px;
  margin-left: 20px;
}
.el-menu-item::before{
  display: none !important;
}span{
  position: relative;
  left: 25px;
}
</style>