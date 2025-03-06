<template>
  <p style="color:grey;font-size:15px;position: absolute;left: 220px;">{{ store.state.navigation }}</p>
  <template v-if="identity === '用户'">
    <el-badge :is-dot="showDot" class="item" @click="ToHistoryData">
    <el-button class="share-button" :icon="Bell" type="primary"
      style="width:20px;height:20px;color:#409EFF;background-color: white;border:none;size:30;outline: none;" />
  </el-badge>
    </template>
  <div class="block" style="position: absolute; top: 5px; right: 50px" @click="ToPersonalCenter">
    <el-avatar :size="40" :src="store.state.userHead" @error="errorHandler">
      <img src="../assets/默认头像.png" />
    </el-avatar>
    <label>
      {{ store.state.userName }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const identity=localStorage.getItem('identity')
import { Bell } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
const store = useStore();
import { useRouter } from 'vue-router';
const router = useRouter();
const showDot = ref(false)
import { onMounted } from 'vue'
onMounted(() => {
  console.log("skkk",store.state.userHead)
  if (router.currentRoute.value.path === "/AppMain/PersonalCenter") {
    store.state.navigation = "井盖检测用户 > 个人中心"
  }
  else if (router.currentRoute.value.path === "/AppMain" && store.state.identity === '用户') {
    store.state.navigation = "井盖检测用户 > 首页"
  }
  else if (router.currentRoute.value.path === "/AppMain" && store.state.identity === '管理员') {
    store.state.navigation = "井盖检测管理员 > 个人中心"
  }
  else if (router.currentRoute.value.path === "/AppMain/ImageDetection") {
    store.state.navigation = "井盖检测用户 > 图片检测"
  }
  else if (router.currentRoute.value.path === "/AppMain/Feedback/ProblemEscalation") {
    store.state.navigation = "井盖检测用户 > 反馈上报 > 井盖维修上报"
  }
  else if (router.currentRoute.value.path === "/AppMain/Feedback/ErrorEscalation") {
    store.state.navigation = "井盖检测用户 > 反馈上报 > 检测错误上报"
  }
  else if (router.currentRoute.value.path === "/AppMain/HistoricalData") {
    store.state.navigation = "井盖检测用户 > 历史数据"
  }
  else if (router.currentRoute.value.path === "/AppMain/details") {
    store.state.navigation = "井盖检测用户 > 历史数据 >查看数据详情"
  }
  else if (router.currentRoute.value.path === "/AppMain/ManagePerson") {
    store.state.navigation = "井盖检测管理员 > 个人中心"
  }
  else if (router.currentRoute.value.path === "/AppMain/ManageUser") {
    store.state.navigation = "井盖检测管理员 > 用户管理"
  }
  else if (router.currentRoute.value.path === "/AppMain/Detection") {
    store.state.navigation = "井盖检测管理员 > 人工检测"
  }
  else if (router.currentRoute.value.path === "/AppMain/DataList") {
    store.state.navigation = "井盖检测管理员 > 数据展示 > 官方数据集"
  }
  else if (router.currentRoute.value.path === "/AppMain/ManageUserFeedback") {
    store.state.navigation = "井盖检测管理员 > 数据展示 > 维修上报数据"
  }
  else if (router.currentRoute.value.path === "/AppMain/ManageReport") {
    store.state.navigation = "井盖检测管理员 > 数据展示 > 错误反馈数据"
  }
  else if (router.currentRoute.value.path === "/AppMain/ManageOfficeData") {
    store.state.navigation = "井盖检测管理员 > 数据展示 > 模型数据"
  }
});


import { ref } from "vue";
const errorHandler = () => true;
function ToPersonalCenter() {
  if (router.currentRoute.value.path !== "/AppMain/PersonalCenter") {
    store.state.navigation = "井盖检测用户 > 历史数据"
    router.replace("/AppMain/PersonalCenter");
  }
}
function ToHistoryData() {
  // if (router.currentRoute.value.path !== "/AppMain/HistoryData") {
  //   store.state.navigation = "井盖检测用户 > 历史 > "
  //   router.replace("/AppMain/HistoryData");
  // }
  window.open('https://m.thepaper.cn/baijiahao_19581689','_blank')
}
</script>

<style scoped>
label {
  display: inline-block;
  text-align: left;
  width: 130px;
  font-size: 20px;
  color: #409EFF;
  position: relative;
  top: -7px;
  left: 8px;
  white-space: nowrap;
  /* 防止换行 */
  overflow: hidden;
  /* 隐藏超出部分 */
  text-overflow: ellipsis;
  /* 超出长度时使用省略号 */
}

.block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.block {
  flex: 1;
}

.item {
  position: relative;
  top: 18px;
  left: 450px;
}
</style>