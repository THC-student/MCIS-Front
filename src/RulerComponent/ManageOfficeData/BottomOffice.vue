<template>
  <div class="bottomcontainer">
    <div class="left-box">
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="right-box">
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const value = ref();
const chart = ref();
const size = computed(() => store.state.chartSize);
let chartInstance = ref(null);
const option = reactive({
  title: {
    text: "模型图表",
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
      dataView: { show: true, readOnly: false },
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
  series: [],
});
const options = reactive([]);

const fetchData = async () => {
  option.series = [];
  console.log(option.series, "111", value.value);
  console.log(store.state.chartData);
  // 定义要获取的属性名数组
  const properties = [
    "average",
    "broke",
    "circle",
    "good",
    "lose",
    "uncovered",
  ];

  // 获取 res.data.records 数组中每个对象的指定属性值
  const propertyValues = store.state.chartData.map((record) => {
    const { broke, circle, good, lose, uncovered, average } = record;
    return { broke, circle, good, lose, uncovered, average };
  });
  const values = Object.values(propertyValues[value.value]);
  const seriesItem = {
    name: "Model" + (value.value + 1),
    type: "line",
    stack: "Total",
    areaStyle: {},
    emphasis: {
      focus: "series",
    },
    data: values.map((item) => ({ value: item })),
  };
  option.series.push(seriesItem);
  option.legend.data.push("Model" + (value.value + 1));
  chartInstance.setOption(option);
  console.log("assd", option.series);
};

//使用echarts
function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}

// 现在可以监听这两个计算属性的变化
watch([value, size], (newValues, oldValues) => {
  const [newvalue, newsize] = newValues;
  const [oldvalue, oldsize] = oldValues;
  console.log("选择框", newsize, oldsize, newvalue, oldvalue);
  if (newsize != oldsize) {
    for (let i = 0; i < size.value; i++) {
      options.push({
        value: i,
        label: "Model" + (i + 1),
      });
    }
    console.log("xuanze ", options);
  }
  if (newvalue != oldvalue) fetchData();
});

onMounted(() => {
  createChart();
});
</script>
<style lang="scss" scoped>
.bottomcontainer {
  height: 400px;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #fff;
  .left-box {
    width: 300px;
    height: 100px;
    margin-left: 70px;
    margin-top: 100px;
  }
  .right-box {
    width: 80%;
    height: 100%;
    position: absolute;
    top: 50px;
    left: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    .chart {
      width: 70%;
      height: 100%;
    }
  }
}
</style>
