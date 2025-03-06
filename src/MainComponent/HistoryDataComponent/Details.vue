<template>
  <div>
    <div class="container">
      <div class="top">
        <img :src="url" />
        <ul>
          <li>
            <span>
              <p>保存地址</p>
            </span>
            <input type="text" :value="address" readonly />
          </li>
          <li>
            <span>
              <p>上传时间</p>
            </span>
            <input type="text" :value="time" readonly />
          </li>
          <li>
            <span>
              <p>用户Id</p>
            </span>
            <input type="text" :value="store.state.userId" readonly style="width: 50px" />
          </li>
          <li style="list-style: none;">
            <span>
              <p>图片Id</p>
            </span>
            <input type="text" :value="store.state.pictureId" readonly style="width: 50px" />
          </li>
          <li>
            <span>
              <p>状态识别</p>
            </span>
            <input type="text" :value="status" readonly />
          </li>
        </ul>
      </div>
      <div class="bottom">
        <textarea name="message" rows="13" cols="95" v-model="textContent"></textarea>
        <li>
          <el-button type="primary" @click="showManage" plain>管理员</el-button>
          <el-button type="success" @click="showUser" plain>用户</el-button>
        </li>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const props = defineProps(["pictureId"]);
const store = useStore();
const router = useRouter();
const route = useRoute();
const pictureId = ref(props.pictureId);
let time = ref("");
let address = ref("");
let Mgecontent = ref("");
let Usecontent = ref("");
let status = ref("");
let textContent = ref("");
const url=ref("")
//获取信息
onMounted(() => {
  console.log(store.state.pictureId,"sjsjjs");
  store.dispatch("getDetails",store.state.pictureId).then((res) => {
    console.log("aaa",res)
    if(res.time==null){
      time.value=res.pictureTime;
    }else
    time.value = res.time;
    address.value = res.areas+res.street;
    Mgecontent.value = res.content;
    Usecontent.value = res.message;
    textContent.value = res.message;
    url.value=res.pictureAddr;
    switch (res.status) {
      case 1:
        status.value = " broke";
        break;
      case 2:
        status.value = "circle";
        break;
      case 3:
        status.value = "good";
        break;
      case 4:
        status.value = "lose";
        break;
      default:
        status.value = "uncovered";
    }
  });
});

//显示管理员留言
function showManage() {
  textContent.value = Mgecontent.value;
}
function showUser() {
  textContent.value = Usecontent.value;
}
</script>
<style lang="scss" scoped>
div {
  border-radius: 0.4rem;
  background-color: rgb(255, 255, 255);
  height: 650px;
  width: 1210px;
  position: relative;
  top: 10px;
  left: 10px;
  justify-content: center;
  align-items: center;

  .container {
    height: 600px;
    width: 700px;
    position: relative;
    top: 30px;
    left: 50px;

    .top {
      position: absolute;
      top: 50px;
      left: 200px;
      width: 100%;
      height: 40%;
      display: flex;
      align-items: center;

      img {
        position: absolute;
        top:20px;
        right: 30px;
        width: 160px;
        height: 160px;
        float: left;
      }

      ul {
        position: absolute;
        left: 0;
        width: 60%;
        height: 100%;

        li {
          margin-bottom: 20px;
          text-align: left;
          height: 30px;

          span {
            display: inline-block;
            width: 107px !important;
            height: 20px;
            text-align: center;

            p {
              font-weight: 500;
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
              /* 设置字体系列 */
            }
          }

          input {
            outline: none;
            width: 245px;
            margin-left: 15px;
            height: 25px;
            padding-left: 10px;
          }
        }

        li:nth-child(3),
        li:nth-child(4) {
          width: 45%;
        }

        li:nth-child(3) {
          float: left;
        }

        li:nth-child(4) {
          float: right;
          margin-right: 36px;
        }
      }
    }

    .bottom {
      position: absolute;
      top: 50%;
      left: 28.5%;
      height: 40%;
      width: 100%;

      textarea {
        width: 650px;
        height: 150px;
        ;
        outline: none;
        position: absolute;
        top: 3%;
        left: 20px;
        font-size: 16px;
        /* 这里可以设置你想要的任何合法的字体大小值 */
        font-family: Arial, sans-serif;
        /* 还可以设置字体类型 */
      }

      li {
        position: absolute;
        bottom: 0%;
        width: 200px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        Button {
          height: 90%;
          width: 80px;
          border-radius: 17px;
          outline: none;
          border: none;
          cursor: pointer;
          position: relative;
          left: 240px;
          // margin-left: 50px;
        }
      }
    }
  }
}
</style>
