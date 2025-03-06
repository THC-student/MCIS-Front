<template>
  <div class="showpicture-container">
    <div class="picture-box">
      <ul>
        <el-card shadow="hover" @click="handleActive(11)"
          ><span style="left:75px;">01</span
          ><img src="@/assets/井盖正常.jpg" alt="" style="left:115px"
        /></el-card>
        <el-card shadow="hover" @click="handleActive(21)"
          ><span style="left: 312px">02</span
          ><img src="@/assets/边缘损坏.jpg" alt="" style="left: 354px"
        /></el-card>
        <el-card shadow="hover" @click="handleActive(31)"
          ><span style="left: 550px">03</span
          ><img
            src="@/assets/井盖损坏.jpg"
            alt=""
            style="left: 590px"
        /></el-card>
        <el-card shadow="hover" @click="handleActive(41)"
          ><span style="left: 785px">04</span
          ><img src="@/assets/井盖丢失.png" alt="" style="left: 827px"
        /></el-card>
        <el-card shadow="hover" @click="handleActive(51)"
          ><span style="left: 1023px">05</span
          ><img src="@/assets/井盖未盖.jpg" alt="" style="left: 1065px"
        /></el-card>
      </ul>
    </div>
    <div class="text-box">
      <div class="shdow"></div>
      <div class="white"></div>
      <ul>
        <li>
          <p>{{ photos.goodNum }}</p>
          <p>G o o d</p>
        </li>
        <li>
          <p>{{ photos.circleNum }}</p>
          <p>C i r c l e</p>
        </li>
        <li>
          <p>{{ photos.brokeNum }}</p>
          <p>B r o k e</p>
        </li>
        <li>
          <p>{{ photos.loseNum }}</p>
          <p>L o s e</p>
        </li>
        <li>
          <p>{{ photos.uncoveredNum }}</p>
          <p>U n c o v e r e d</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetDataList } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const photos = ref({});

function handleActive(index) {
  store.commit("setActiveTreeNode", index);
  store.state.change = false;
}
onMounted(() => {
  var cachedHistoryData = sessionStorage.getItem("cachedOffcial");
  if (cachedHistoryData) {
    //如果存在缓存直接用
    console.log("缓存");

    const parsedCachedData = JSON.parse(cachedHistoryData);
    photos.value = parsedCachedData;
    console.log(JSON.parse(cachedHistoryData));
  } else {
    //如果不存在,就发送请求获取
    fetchPhotos();
    console.log("发送");
  }
});
const fetchPhotos = async () => {
  let res = await reqGetDataList();
  console.log(res, "sdv");
  if (res.code == 1) {
    photos.value = res.data;
    console.log(photos.value);
    sessionStorage.setItem("cachedOffcial", JSON.stringify(res.data));
  } else {
    alert("图片获取失败");
  }
};
</script>
<style lang="scss" scoped>
.showpicture-container {
  width: 100%;
  height: 90%;
  position: absolute;
  top: 4%;

  .picture-box {
    position: absolute;
    top:20px;
    width: 100%;
    height: 53%;
    left:-40px;
    border-bottom: 2px solid #eceff7;
    ul {
      position: absolute;
      bottom: 0px;
      display: flex;
      flex-direction: row;
      .el-card {
        flex: 1;
        width: 200px;
        height: 230px;
        margin-left: 35px;
        img {
          max-width: 120px;
          max-height:150px;
          position: absolute;
          top: 60px;
          z-index: 1;
        }
        span {
          text-align: center;
          width: 45px;
          height: 25px;
          display: inline-block;
          background: linear-gradient(to right, #409EFF,  #337ecc);
          z-index: 1;
          border-top-right-radius: 13px;
          border-bottom-right-radius: 13px;
          position: absolute;
          
        }
      }
    }
  }
  .text-box {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 55%;
    .white {
      width: 90%;
      height: 40px;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 96.4%;
      height: 200px;
      background-color: #337ecc;
      border: 2px solid #7aabda;
      li {
        text-align: center;
        flex: 1;
        color: white;
        p {
          margin-bottom: 10px;
        }
        p:nth-child(1) {
          font-size: 25px;
          color: #e89e3c;
        }
      }
    }
  }
}
</style>
