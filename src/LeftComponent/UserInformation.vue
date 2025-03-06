<template>
   <div class="block" style="position: absolute; top: 5px; right: 50px" @click="ToPersonalCenter">
    <el-avatar :size="50" :src="store.state.userHead" @error="errorHandler">
      <img
        src="../assets/默认头像.png"
      />
    </el-avatar>
    <br>
    <label class="name">
      {{ store.state.userName }}
    </label>
    <br>
    <label class="account">
      {{ store.state.userAccount }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore();
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const errorHandler = () => true;
function ToPersonalCenter(){
      if (router.currentRoute.value.path !== "/AppMain/PersonalCenter") {
        router.replace( "/AppMain/PersonalCenter");
      }
}
</script>

<style scoped>
.name{
  text-align: center;
  position: relative;
  left: -1px;
  top:15px;
  font-size: 23px;
  font-weight: 500;
}
.account{
  text-align: center;
  position: relative;
  left: -1px;
  top:8px;
  font-size: 17px;
  font-weight: 100;
}
label {
  display: inline-block;
  width:130px;
  font-size: 20px;
  color:#409EFF;
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis;/* 超出长度时使用省略号 */
}
.block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.block {
  flex: 1;
}
</style>