<template>
  <div class="rightbottom-container">
    <div class="echart" ref="chart"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { reqGetSammary } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref(null);
let chartInstance = null;
let option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ["LastMonth", "ThisMonth", "Amplification"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Bro", "Cir", "Los", "Unc", "Goo", "Fee", "Rep"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "DetecNumber",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} 个",
      },
    },
    {
      type: "value",
      name: "Amplification",
      min: -500,
      max: 500,
      interval: 100,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  series: [

    {
      name: "LastMonth",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " 个";
        },
      },
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "ThisMonth",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " 个";
        },
      },
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Amplification",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      data: [0, 0, 0, 0, 0, 0, 0],
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
  let res = await reqGetSammary();
  if (res.code == 1) {
    chartSetoption(res.data);
    sessionStorage.setItem("cachedManagerightdata", JSON.stringify(res.data));
  } else {
    alert("图表数据获取失败,请刷新重试");
  }
};
function chartSetoption(data) {
  // 获取 res.data.records[0] 对象的值数组
  const values = Object.values(data.records[1]);
  // 遍历值数组，并将每个值添加到 option.series[0].data 对象中
  values.forEach((item, index) => {
    option.series[0].data[index] = {
      value: item, // 假设对象中有一个 value 属性
    };
  });
  const values1 = Object.values(data.records[0]);
  // 遍历值数组，并将每个值添加到 option.series[0].data 对象中
  values1.forEach((item, index) => {
    option.series[1].data[index] = {
      value: item, // 假设对象中有一个 value 属性
    };
  });

  // 假设 values 和 values1 是两个数组，长度相同
  const result = [];
  for (let i = 0; i < values1.length; i++) {
    const quotient = values1[i] / values[i] - 1;
    const quotientFixed = quotient.toFixed(2) * 100;
    result.push(Number(quotientFixed));
  }
  option.series[2].data = result;
  chartInstance.setOption(option);
}

onMounted(() => {
  createChart();
  var cachedUsers = sessionStorage.getItem("cachedManagerightdata");
  if (cachedUsers) {
    chartSetoption(JSON.parse(cachedUsers));
  } else {
    //如果不存在,就发送请求获取
    fetchData();
  }
});

</script>
<style lang="scss" scoped>
.rightbottom-container {
  position: absolute;
  border-radius: 5px;
  height: 78.3%;
  width: 53.5%;
  right:15px;
  top: 162px;;
  display: flex;
  justify-content: center;
  align-items: center;
  .echart {
    position: relative;
    border-radius: 3px;
    height: 85% ;
    width: 95% !important;
    background-color: #fff;
    canvas {
      position: relative;
      top: 40px !important;
    }
  }
}
</style>
