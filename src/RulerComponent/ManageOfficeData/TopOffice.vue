<template>
  <div class="topcontainer">
    <el-button
      @click="update"
      type="primary"
      style="
        position: absolute;
        top: 6px;
        right: 202px;
        cursor: pointer;
        z-index: 200;
      "
      :disabled="flag"
      >模型更新</el-button
    >

    <div class="chart" ref="chart"></div>
  </div>
</template>
<script lang="ts" setup scoped>
import { ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetModle } from "../../api";
import * as echarts from "echarts";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref();
let chartInstance = ref(null);
let timer=null;
const flag = ref(false);
const option = reactive({
  title: {
    text: "模型更新图表",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: [],
  },
  toolbox: {
    feature: {
      dataView: {
        show: true,
        readOnly: false,
      },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },

  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["broke", "circlr", "good", "lose", "uncovered", "average"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
  ],
});
// 定义要获取的属性名数组
const properties = ["average", "broke", "circle", "good", "lose", "uncovered"];


function update() {
  // 获取 res.data.records 数组中每个对象的指定属性值
  const propertyValues = store.state.chartData.map((record) => {
    const { broke, circle, good, lose, uncovered, average } = record;
    return { broke, circle, good, lose, uncovered, average };
  });
  const values = Object.values(propertyValues[store.state.chartSize - 1]);
  const seriesItem = {
    name: "Model" + (store.state.chartSize),
    type: "line",
    stack: "Total",
    areaStyle: {},
    emphasis: {
      focus: "series",
    },
    data: values.map((item) => ({ value: item })),
  };
  option.series.push(seriesItem);
  option.legend.data.push("Model" + (store.state.chartSize));
  chartInstance.setOption(option);
  flag.value = true;
}


const fetchData = async () => {
  let res = await reqGetModle();
  console.log("模型1", res.data[0]);
  if (res.code == 1) {
    chartSetoption(res.data);
    store.state.chartData = res.data;
    console.log(option.series, "111", res.data.length);
    store.state.chartSize = res.data.length;
    console.log(res.data);
    chartInstance.setOption(option);
  } else {
    alert("模型图表获取失败,请刷新重试");
  }
};


function chartSetoption(data) {
  console.log("s", data);

  // 获取 res.data.records 数组中每个对象的指定属性值
  const propertyValues = data.map((record) => {
    const { broke, circle, good, lose, uncovered, average } = record;
    return { broke, circle, good, lose, uncovered, average };
  });

  // for (let i = 0; i < data.length; i++) {
  let currentIndex = 0;
  timer = setInterval(() => {
    console.log("as", currentIndex);
    if (currentIndex < data.length - 1) {
      const values = Object.values(propertyValues[currentIndex]);
      const seriesItem = {
        name: "Model" + (currentIndex + 1),
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: values.map((item) => ({ value: item })),
      };
      option.series.push(seriesItem);
      option.legend.data.push("Model" + (currentIndex + 1));
      chartInstance.setOption(option);
      currentIndex++;
      console.log("ad", option);
    } else {
      clearIntervalTimer();
    }
  }, 3000);
  // console.log("ajs", option);
}


//清除定时器
function clearIntervalTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}


//使用echarts
function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}

onMounted(() => {
  createChart();
  var cachedUsers = sessionStorage.getItem("cachedOfficeData");
  if (cachedUsers) {
    // chartSetoption(JSON.parse(cachedUsers));
  } else {
    //如果不存在,就发送请求获取
    fetchData();
  }
});
</script>
<style lang="scss" scoped>
.topcontainer {
  height: 500px;
  width: 95%;
  position: absolute;
  top:500px;
  left:20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .chart {
    width: 80%;
    height: 95%;
  }
}
</style>
