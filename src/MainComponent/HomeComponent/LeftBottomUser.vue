<template>
  <div class="leftbottom-container">
    <div class="box">
      <div class="echart" ref="chart"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { reqGetMonthRatio } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref(null);
let chartInstance = null;
let option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 閸ф劖鐖ｆ潪瀛樺瘹缁€鍝勬珤閿涘苯娼楅弽鍥叡鐟欙箑褰傞張澶嬫櫏
      type: "shadow", // 姒涙ǹ顓绘稉铏规纯缁惧尅绱濋崣顖炩偓澶夎礋閿涳拷'line' | 'shadow'
    },
    formatter(params) {
      let list = [];
      let listItem = "";
      let name = "";
      params.forEach((item, i) => {
        name = item.name;
        list.push(
          "<span>" + item.seriesName + "数量</span>: " + item.value + " 个<br/>"
        );
      });
      listItem = list.join("");
      return '<div class="showBox">' + listItem + "</div>";
    },
  },
  color: ["#64C7BF", "#73A0FA"],
  legend: {
    y: "top",
    data: ["检测", "上报"],
  },
  grid: {
    left: "0",
    right: "0",
    bottom: "5",
    containLabel: true,
  },
  xAxis: [
    {
      data: ["Good", "Broke", "Circle", "Lose", "Uncovered"],
      axisTick: {
        show: false, //闂呮劘妫岄崚璇插缁撅拷
      },
      axisLine: {
        //闂呮劘妫寉鏉烇拷
        show: false,
      },
      axisLabel: {
        //濡亜娼楅弽鍥у弿闁劍妯夌粈锟� 娑撳秹娈у鈧弰鍓с仛
        interval: 0,
      },
    },
  ],
  yAxis: [
    {
      name: "检测量",
      nameTextStyle: {
        padding: [10, 10, 10, 30], // 閸ユ稐閲滈弫鏉跨摟閸掑棗鍩嗘稉杞扮瑐閸欏厖绗呭锔跨瑢閸樼喍缍呯純顔跨獩缁傦拷
      },
      splitArea: {
        //闂呮劘妫岄懗灞炬珯缂冩垶鐗搁崠鍝勭厵
        show: false,
      },
      splitLine: {
        //闂呮劘妫岄懗灞炬珯缂冩垶鐗哥痪锟�
        show: false,
      },
      axisTick: {
        show: false, //闂呮劘妫岄崚璇插缁撅拷
      },
      axisLine: {
        //闂呮劘妫寉鏉烇拷
        show: false,
      },
    },
  ],
  series: [
    {
      name: "检测",
      type: "bar",
      data: [
        {
          name: "Good",
          value: 0,
        },
        {
          name: "Broke",
          value: 0,
        },
        {
          name: "Circle",
          value: 0,
        },
        {
          name: "Lose",
          value: 0,
        },
        {
          name: "Uncovered",
          value: 0,
        },
      ],
    },
    {
      name: "上报",
      type: "bar",
      data: [
        {
          name: "Good",
          value: 0,
        },
        {
          name: "Broke",
          value: 0,
        },
        {
          name: "Circle",
          value: 0,
        },
        {
          name: "Lose",
          value: 0,
        },
        {
          name: "Uncovered",
          value: 0,
        },
      ],
    },
  ],
});

function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}
const fetchData = async () => {
  var cachedUsers = sessionStorage.getItem("cachedMonthSammary");
  if (cachedUsers) {
    const a=JSON.parse(cachedUsers);
    console.log("wyeruq",a)
      option.series[0].data[0].value =a.countNumber.goodNum;
    option.series[0].data[1].value = a.countNumber.brokeNum;
    option.series[0].data[2].value = a.countNumber.circleNum;
    option.series[0].data[3].value = a.countNumber.loseNum;
    option.series[0].data[4].value = a.countNumber.uncoveredNum;
    option.series[1].data[0].value = a.countRed.goodNum;
    option.series[1].data[1].value = a.countRed.brokeNum;
    option.series[1].data[2].value = a.countRed.circleNum;
    option.series[1].data[3].value = a.countRed.loseNum;
    option.series[1].data[4].value = a.countRed.uncoveredNum;
    chartInstance.setOption(option);
  } else {
    alert("首页获取失败,请刷新重试")
  }
};


onMounted(() => {
  createChart();
  fetchData();
});
</script>
<style lang="scss" scoped>
.leftbottom-container {
  height: 60%;
  width: 95%;
  position: absolute;
  top: 74%;

  display: flex;
  justify-content: center;
  .box {
    height: 95%;
    width: 100%;
    background-color: #fff;
    border-radius: 16px;
    .echart {
      position: absolute;
      top: 10px;
      left:80px;
      width: 80%;
      height: 85%;
      canvas {
        width: 90% !important;
        margin-left: 35px !important;
      }
    }
  }
}
</style>
