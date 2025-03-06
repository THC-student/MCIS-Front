<template>
  <div>
    <div class="top">
      <img :src="otherUser.userHead" alt="" />
      <div class="show-message">
        <ul>
          <li>用户名:{{ otherUser.userName }}</li>
          <li>账号:{{ otherUser.userEmail }}</li>
          <li>ID:{{ otherUser.userId }}</li>
          <li>性别:{{ otherUser.userSex }}</li>
          <li>年龄:{{ otherUser.userAge }}</li>
        </ul>
      </div>
    </div>
    <div class="botton">
      <h3>Storage</h3>
      <div>&nbsp;&nbsp;:&nbsp;&nbsp;</div>
      <div ref="chart" class="pie"></div>
      <div class="right-bottom">
        <ul style="padding-top: 10px">
          <li>
            <span style="background-color: #4e4e8c"></span>
            <h5>Uncovered</h5>
            <p>{{ well.uncoveredNum }}</p>
          </li>
          <li>
            <span style="background-color: #626c78"></span>
            <h5>Broke</h5>
            <p>{{ well.brokeNum }}</p>
          </li>
        </ul>
        <ul>
          <li>
            <span style="background-color: #f4d98c"></span>
            <h5>Lose</h5>
            <p>{{ well.loseNum }}</p>
          </li>
          <li>
            <span style="background-color: #f0b4da"></span>
            <h5>Circle</h5>
            <p>{{ well.circleNum }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import * as echarts from "echarts";

import { reqGetUsersInformationI } from "@/api/index.js";
const props = defineProps(["id"]);
const store = useStore();
const router = useRouter();
const id = ref(props.id);
const chart = ref(null);
let chartInstance = null;
const otherUser = ref([]);
const well = ref([]);

let option = reactive({
  // 添加占比显示
  tooltip: {
    trigger: "item",
    formatter: "{b}: ({d}%)", // {b}表示名称，{c}表示值，{d}%表示占比
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"], // 设置圆环的内外半径
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
          formatter: "{b}: {c} {d}%",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 0, name: "goodNum", itemStyle: { color: "#8bb6a2" } },
        { value: 0, name: "brokeNum", itemStyle: { color: "#626c78" } },
        { value: 0, name: "loseNum", itemStyle: { color: "#f4d98c" } },
        { value: 0, name: "uncoveredNum", itemStyle: { color: "#4e4e8c" } },
        { value: 0, name: "circleNum", itemStyle: { color: "#f0b4da" } },
      ],
    },
  ],
});

//使用echarts
function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}

const getOtherUser = async () => {
  let result = await reqGetUsersInformationI(store.state.userId, id.value);
  if (result.code == 1) {
    console.log("用户", result.data);
    otherUser.value = result.data.user;
    well.value = result.data.chart[0];
    console.log(result.data.chart[0], "s");
    console.log(well.value, "qdsv");
    // console.log(result.data.chart.goodNum);
    option.series[0].data[0].value = result.data.chart[0].goodNum;
    option.series[0].data[1].value = result.data.chart[0].brokeNum;
    option.series[0].data[2].value = result.data.chart[0].loseNum;
    option.series[0].data[3].value = result.data.chart[0].uncoveredNum;
    option.series[0].data[4].value = result.data.chart[0].circleNum;
    // // 现在，data数组中的value属性已经更新为wellData中的值
    console.log(option.series[0].data, "结果");
    chartInstance.setOption(option, true);
  }
};

onMounted(() => {
  console.log(id.value);
  createChart();
  getOtherUser();
});

</script>
<style lang="scss" scoped>
div {
  width: 1210px;
  height: 650px;
  border-radius:5px;
  background-color: rgb(246, 253, 255);
  z-index: 1;
  position: relative;
  top:10px;
  left:10px;

  .top {
    width: 95%;
    height: 35%;
    img {
      border-radius: 4px;
      position: absolute;
      top: 40px;
      left: 250px;
      width: 180px;
      height: 180px;
    }
    .show-message {
      width: 50%;
      height: 90%;
      float: right;
      position: relative;
      left:-50px;
      ul {
        display: inline-block;
        text-align: left;
        width: 70%;
        margin-top: 10px;
        li {
          width: 60%;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 30px;
          border-bottom: 1px solid #8ccafa;
          p {
            font-size: 20px !important;
          }
        }
      }
    }
  }
  .botton {
    position: absolute;
    top: 45%;
    left: 10%;
    height: 50%;
    width: 80%;
    background-color: #fff;
    border-radius: 16px;
    z-index: 2;
    h3 {
      position: absolute;
      left: 50px;
      top: 0px;
    }
    div {
      width: 23px;
      height: 22px;
      position: absolute;
      display: inline-block;
      right: 25px;
      top: 25px;
      background-color: #f2f2f2;
      border-radius: 9px;
    }
    .pie {
      width: 40%;
      height: 70%;
      position: absolute;
      left: 0 !important;
      margin-top: 20px;
      margin-left: 20px;;
      background-color: #fff !important;
      div {
        width: 80% !important;
        height: 100% !important;
        background-color: #fff;
        margin-left: 40px !important;
        margin-top: -20px !important;
        canvas {
          position: absolute;
          left: 25px !important;
          background-color: #fff;
          top: -24px !important;
        }
      }
    }
    .right-bottom {
      position: absolute;
      left:430px;
      top:0px;
      width: 50%;
      height: 80%;
      right: 0 !important;
      background-color: #fff;
      border-radius: 16px;
      margin-top: 0px;
      ul {
        height: 50%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        li {
          height: 90%;
          width: 30%;
          list-style: none;
          span {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 4px;
            vertical-align: middle;
          }
          h5 {
            display: inline-block;
            width: 80px;
            margin-left: 12px;
          }
          p {
            color: #cecece;
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
