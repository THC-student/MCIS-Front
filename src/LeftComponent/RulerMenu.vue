<template>
    <el-scrollbar style="position: absolute; top: 250px; width: 201px;">
      <el-menu :default-openeds="['4']">
        <el-menu-item index="2">
          <template #title>
            <img src="../assets/个人中心.png" class="img" />
            <span @click="ToPersonalCenter">个人中心</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="4">
          <template #title>
            <img src="../assets/检测反馈.png" class="img" />
            <span @click="ToData">数据展示</span>
          </template>
          <el-menu-item-group>
              <el-menu-item index="4-1" @click="ToData">
                &nbsp;&nbsp;数据集详情
                <img src="../assets/数据展示.png" class="img" />
              </el-menu-item>
              <el-menu-item index="4-2" @click="ToFeedBack">
                &nbsp;&nbsp;维修上报数据
                <img src="../assets/数据展示.png" class="img" />
              </el-menu-item>
              <el-menu-item index="4-2" @click="ToError">
                &nbsp;&nbsp;错误反馈数据
                <img src="../assets/数据展示.png" class="img" />
              </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="3">
          <template #title>
            <img src="../assets/完善反馈.png" class="img" />
            <span @click="ToImageDetection">人工检测</span>
          </template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>
            <img src="../assets/模型更新.png" class="img" />
            <span @click="ToModel">模型更新</span>
          </template>
        </el-menu-item>
        <el-menu-item index="6">
          <template #title>
            <img src="../assets/历史数据.png" class="img" />
            <span @click="ToUserDetectionData">用户检测数据</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1">
          <template #title>
            <img src="../assets/用户管理.png" class="img" />
            <span @click="ToUserInformation">用户管理</span>
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
        if (router.currentRoute.value.path !== "/AppMain/ManagePerson") {
          store.state.navigation="井盖检测管理员 > 个人中心"
          router.replace( "/AppMain/ManagePerson");
        }
  }
  function ToUserInformation(){
        if (router.currentRoute.value.path !== "/AppMain/ManageUser") {
          store.state.navigation="井盖检测管理员 > 用户管理"
          router.replace( "/AppMain/ManageUser");
        }
  }
  function ToImageDetection(){
        if (router.currentRoute.value.path !== "/AppMain/Detection") {
          store.state.navigation="井盖检测管理员 > 人工检测"
          router.replace( "/AppMain/Detection");
        }
  }
  function ToData(){
        if (router.currentRoute.value.path !== "/AppMain/DataList") {
          store.state.navigation="井盖检测管理员 > 数据展示 > 数据集详情"
          router.replace( "/AppMain/DataList");
        }
  }
  function ToFeedBack(){
        if (router.currentRoute.value.path !== "/AppMain/ManageUserFeedback") {
          store.state.navigation="井盖检测管理员 > 数据展示 > 维修上报数据"
          router.replace( "/AppMain/ManageUserFeedback");
        }
  }
  function ToError(){
        if (router.currentRoute.value.path !== "/AppMain/ManageReport") {
          store.state.navigation="井盖检测管理员 > 数据展示 > 错误反馈数据"
          router.replace( "/AppMain/ManageReport");
        }
  }
  function ToModel(){
        if (router.currentRoute.value.path !== "/AppMain/ManageOfficeData") {
          store.state.navigation="井盖检测管理员 > 数据展示 > 模型数据"
          router.replace( "/AppMain/ManageOfficeData");
        }
  }
  function ToUserDetectionData(){
    if (router.currentRoute.value.path !== "/AppMain/UserDetectionData") {
          store.state.navigation="井盖检测管理员 > 数据展示 > 用户检测数据"
          router.replace( "/AppMain/UserDetectionData");
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