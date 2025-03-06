<template>
  <div class="lefttop-container">
    <ul>
      <li style="background-color: #9ec3ce">
        <p style="left: 72px;top:38px;">井盖完好</p>
        <img src="@/assets/防御机制.svg" alt="" style="left: 90px;top:25px;" />
        <h3 style="left: 93px">{{ goodNum }}</h3>
      </li>
      <li style="background-color: #4a91af">
        <p style="left: 227px;top:38px;">井圈损坏</p>
        <img src="@/assets/境外IP.svg" alt="" style="left: 245px;top:25px;" />
        <h3 style="left: 253px">{{ circleNum }}</h3>
      </li>
      <li style="background-color: #4c6a88">
        <p style="left: 382px;top:38px;">井盖没盖</p>
        <img src="@/assets/数据集.svg" alt="" style="left: 400px;top:25px;" />
        <h3 style="left: 408px">{{ uncoveredNum }}</h3>
      </li>
      <li style="background-color: #ccaac8">
        <p style="left: 533px;top:38px;">井盖破损</p>
        <img src="@/assets/数据检索.svg" alt="" style="left: 550px;top:25px;" />
        <h3 style="left: 553px">{{ brokeNum }}</h3>
      </li>
      <li style="background-color: #906a9c">
        <p style="left: 688px;top:38px;">井盖缺失</p>
        <img src="@/assets/指纹验证.svg" alt="" style="left: 705px;top:25px;" />
        <h3 style="left: 713px">{{ loseNum }}</h3>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetCountNumber } from "@/api/index";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const goodNum = ref(0);
const circleNum = ref(0);
const brokeNum = ref(0);
const loseNum = ref(0);
const uncoveredNum = ref(0);
onMounted(() => {
  var cachedUsers = sessionStorage.getItem("cachedCountNumber");
  if (cachedUsers) {
    let data = null;
    //如果存在缓存直接用
    data = JSON.parse(cachedUsers);
    // renderUserList(JSON.parse(cachedUsers));
    goodNum.value = data[0].goodNum;
    circleNum.value = data[0].circleNum;
    brokeNum.value = data[0].brokeNum;
    loseNum.value = data[0].loseNum;
    uncoveredNum.value = data[0].uncoveredNum;
  } else {
    //如果不存在,就发送请求获取
    fetchData();
  }
});

const fetchData = async () => {
  let res = await reqGetCountNumber(store.state.userId);
  if (res.code == 1) {
    goodNum.value = res.data[0].goodNum;
    circleNum.value = res.data[0].circleNum;
    brokeNum.value = res.data[0].brokeNum;
    loseNum.value = res.data[0].loseNum;
    uncoveredNum.value = res.data[0].uncoveredNum;
    sessionStorage.setItem("cachedCountNumber", JSON.stringify(res.data));
  }
};

</script>
<style lang="scss" scoped>
.lefttop-container {
  height: 15%;
  width: 95%;
  position: absolute;
  top: 0px;
  // background-color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      flex: 1;
      border-radius: 16px;
      height: 90%;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      // flex-direction: column;
      p {
        color: white;
        position: absolute;
        top: 30px;
      }
      h3 {
        position: absolute;
        top: 57px;
      }
      img {
        position: absolute;
        top: 20px;
        width: 30px;
        height: 30px;
      }
    }
    // li:hover {
    //   background-color: #f0f2ff;
    // }
  }
}
</style>
