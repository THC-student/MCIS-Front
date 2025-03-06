<template>
  <div class="leftbottonPerson">
    <div class="echart" ref="chart"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { reqGetAreas } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref(null);
let chartInstance = null;
let option = reactive({
  title: {
    text: "本月检测统计",
    subtext: "Fake Data",
    left: "center",
    top:"8%"
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    bottom:50,
    left: "center",
    itemWidth: 30, // 设置每个图例项的宽度
    itemGap: 30, // 设置图例项之间的间距
  },
  series: [
    {
      top: 50,
      name: "Access From",
      type: "pie",
      radius: "40%",
      center: ["50%", "43%"], //图的位置，距离左跟上的位置
      data: [
        { value: 0, name: "永定区", itemStyle: { color: "#e3716e" } },
        { value: 0, name: "武陵源区", itemStyle: { color: "#eca680" } },
        { value: 0, name: "慈利县", itemStyle: { color: "#7ac7e2" } },
        { value: 0, name: "桑植县", itemStyle: { color: "#f7df87" } },
      ],
      label: {
        formatter: "{b}: {d}%",
      },
    },
  ],
});

//使用echarts
function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}

const fetchData = async () => {
  let res = await reqGetAreas();
  if (res.code == 1) {
    load(res.data);
    chartInstance.setOption(option);
    sessionStorage.setItem("cachedManageleftdata", JSON.stringify(res.data));
  } else {
    alert("图表数据获取失败,请刷新重试");
  }
};

function load(res) {
  // console.log(res[0].yongNum, "永", res);
  option.series[0].data[0].value = res[0].yongNum;
  option.series[0].data[1].value = res[0].wuNum;
  option.series[0].data[2].value = res[0].ciNum;
  option.series[0].data[3].value = res[0].sangNum;
}

onMounted(() => {
  createChart();
  var cachedUsers = sessionStorage.getItem("cachedManageleftdata");
  if (cachedUsers) {
    load(JSON.parse(cachedUsers));
    chartInstance.setOption(option);
  } else {
    //如果不存在,就发送请求获取
    fetchData();
  }
});
</script>
<style lang="scss" scoped>
.leftbottonPerson {
  position: absolute;
  border-radius: 5px;
  height: 74%;
  top: 27%;
  left: 16px;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  .echart {
    border-radius: 4px;
    height: 90%;
    width: 95%;
    background-color: #fff;
    position: relative;
    canvas {
      //   left: 32px !important;
      top: 30px !important;
    }
  }
}
</style>
