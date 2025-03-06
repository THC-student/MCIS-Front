<template>
  <div class="box">
    <div class="back">
      <span class="message-box">
        <li>
          用户Id: &nbsp;&nbsp;&nbsp;<span>{{ item.userId }}</span>
        </li>
        <li>
          图片Id:&nbsp;&nbsp;&nbsp; <span>{{ item.pictureId }}</span>
        </li>
        <li>
          时间: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{ item.time }}</span>
        </li>
        <li>
          状态:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <template v-if="item.pictureStatus === 1"> Broke </template>
            <template v-else-if="item.pictureStatus === 1"> Circle </template>
            <template v-else-if="item.pictureStatus === 3"> Good </template>
            <template v-else-if="item.pictureStatus === 4"> Lose </template>
            <template v-else> Uncovered </template>
          </span>
        </li>
        <li>
          地点: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
            >{{ item.areas }}{{ item.street }}</span
          >
        </li>
      </span>
      <el-button type="primary" @click="deal(item.pictureId)">处理</el-button>
      <div class="bottom">
        <div class="tips">
          <p style="margin-top: -5px;">用户留言</p>
          <p style="margin-top: -5px;">管理员留言</p>
        </div>

        <textarea name="message" rows="7" cols="15">{{
          item.message
        }}</textarea>
        <textarea name="message" rows="7" cols="50">{{
          item.content
        }}</textarea>
      </div>
    </div>
    <el-image
      style="width: 250px; height: 280px"
      :src="item.pictureAddr"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :initial-index="4"
      fit="cover"
    />
    <img
      src="@/assets/15 红包_叉掉.svg"
      alt=""
      class="close"
      @click="closeDetail"
    />
  </div>
</template>
<script lang="ts" setup scoped>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({
  item: {
    type: Object,
    default: "我是默认值",
  },
});
const store = useStore();
const router = useRouter();
//生命自定义组件
const emit = defineEmits(["closeDetail"]);
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
function closeDetail() {
  //向父组件发送自定义事件
  emit("closeDetail");
}
//跳转上报
function deal(){
   store.state.feedback=1;
}

onMounted(() => {
  console.log(props.item);
});
</script>
<style lang="scss" scoped>
.box {
  width: 700px;
  height: 540px;
  //   background-color: #fff;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
  z-index: 1000;
  display: flex;
  .el-image {
    position: absolute;
    left: 40px;
  }
  .close {
    z-index: 1000;
    height: 30px;
    width: 30px;
    position: absolute;
    right: 5px;
    top: 86px;
    cursor: pointer;
  }
  .back {
    position: absolute;
    bottom: 0;
    height: 460px;
    width: 100%;
    background-color: #fff;
   display: flex;
    .message-box {
      text-align: left;
      position: absolute;
      left: 315px;
      top: 2px;
      width: 270px;
      li {
        margin-bottom: 20px;
        list-style: none;
      }
    }
    .el-button {
      position: absolute;
      right: 55px;
      top: 130px;
    }
    .bottom {
      background-color: #fff;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 260px;
      display: flex;
      justify-content: center;
      align-items: center;
      .tips {
        display: flex;
        justify-content: space-around;
        height: 10%;
        width: 100%;
        position: absolute;
        top: 5%;
      }
      textarea {
        margin-right: 20px !important;
        height: 80%;
        font-size: 18px !important;
        outline: none;
        margin-top: 30px;
        width: 45%;
        border: 1px solid #757679;
      }
      textarea:nth-child(2) {
        margin-left: 10px !important;
      }
    }
  }
}
</style>
