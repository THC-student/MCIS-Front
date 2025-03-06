<template>
  <div class="top-container">
    <div class="block">
      <div class="img-box" @click="changeAvatar">
        <el-avatar :size="108" :src="store.state.userHead" style="cursor: pointer" @mouseenter="showOverlay"
          @mouseleave="hideOverlay" />
          <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
      </div>
    </div>
    <div class="user-box">
      <div class="message-box">
        <h3 style="margin-top: 10px">001</h3>
        <p style="margin-top: 10px; color: #c8c9cc;">邮箱:{{ store.state.userAccount }}</p>
        <span>
          <p style="margin-left: 7px; margin-top: -4px">{{ store.state.userName }}</p>
        </span>
      </div>
      <div class="edit-box">
        <el-button type="primary" @click="showDialog = true">修改个人信息</el-button>
        <el-button type="success" style="margin-left: 0" @click="showChangeEmail = true">修改绑定邮箱</el-button>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="showDialog || showChangeEmail"></div>
    <!-- 使用条件渲染显示对话框 -->
    <template v-if="showDialog">
      <ModifyInfoDialog @closeDialog="handle"></ModifyInfoDialog>
    </template>
    <template v-if="showChangeEmail">
      <ModifyEmailDialog @closeEmailDialog="handle"></ModifyEmailDialog>
    </template>
  </div>
</template>


<script lang="ts" setup>
import { ref, defineProps, onMounted, Ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqUpdateAvatar } from "@/api/index.js";
import ModifyInfoDialog from "@/MainComponent/PersonalCenterComponent/ModifyInfoDialog.vue";
import ModifyEmailDialog from "@/MainComponent/PersonalCenterComponent/ModifyEmailDialog.vue";
const props = defineProps({});
const store = useStore();
const router = useRouter();
let showDialog = ref(false); //控制对角化框显示与隐藏
let showChangeEmail = ref(false);
let show = ref(false);
//上传图片
let fileInput: Ref<HTMLInputElement | null> = ref(null);
//头像

//接收自定义组件
function handle() {
  console.log("接收自定义");
  showDialog.value = false;
  showChangeEmail.value = false;
}

//鼠标悬停,显示遮盖层
function showOverlay() {
  show.value = true;
}

function hideOverlay() {
  show.value = false;
}

function changeAvatar() {
  console.log(store.state)
  console.log("修改头像");
  // 通过引用(ref)来获取文件选择器元素，并模拟点击事件
  if (fileInput.value) {
    fileInput.value.click();
  } else {
    // 处理 fileInput.value 为 null 的情况  
    console.error('fileInput is null and cannot be clicked.');
    alert('修改头像失败')
  }
}

const handleFileChange = async (event: any) => {
  console.log("hhhhh")
  const file = event.target.files[0];
  console.log("选择文件", file);
  console.log(store.state.userHead);
  try {
    let result = await reqUpdateAvatar(file,store.state.userId);
    if (result.code == 1) {
      console.log("修改成功");
      // store.state.userHead=
      store.state.userHead = URL.createObjectURL(file);
      alert('修改头像成功')
    } else {
      console.log("修改失败");
      alert("修改失败,请再试一次");
    }
  } catch (error) {
    console.log("修改失败");
    alert("修改失败,请再试一次");
  }
};
</script>
<style lang="scss" scoped>
.top-container {
  position: absolute;
  margin-top: 20px;
  background-color: #fff;
  width: 95%;
  height: 25%;
  border-radius: 5px;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,
        0,
        0,
        0.5);
    /* 这里的 0.5 表示半透明，您可以根据需求调整这个值 */
    z-index: 999;
  }

  .block {
    margin-top: 30px;
    width: 13%;
    margin-left: 50px;

    .img-box {
      width: 108px;
      height: 108px;

      .overlay {
        position: absolute;
        top: 30px;
        left: 49px;
        z-index: 999;
        width: 108px;
        height: 108px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;

        button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px 20px;
          color: #fff;
          background-color: transparent;
          /* 方法一：设置背景颜色为透明 */
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  .user-box {
    position: absolute;
    left: 22%;
    top: 23px;
    width: 75%;
    height: 75%;
    border-bottom: 1px solid #dedfe0;

    .message-box {
      width: 60%;
      height: 100%;
      position: relative;

      h3 {
        position: absolute;
        left: 20px;
        top: -10px;
      }

      p {
        position: absolute;
        left: 20px;
        top: 30px;
      }

      span {
        display: flex;
        margin-top: 10px;
        vertical-align: middle;
        position: relative;
        top: 50px;
        left: -5px;
      }
    }

    .edit-box {
      display: inline-block;
      width: 200px;
      height: 80%;
      position: absolute;
      right: 40px;
      top: 10%;

      .el-button {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
