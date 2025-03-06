<template>
  <div class="righttop-container">
    <h3 style="width:200px;position:absolute;top:10px;">排行榜成员检测折线图</h3>
    <div class="chart" ref="chart"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { reqGetLineChart } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref();
let myChart = ref(null);
function createDynamicLineChart() {
  if (!chart.value) return;
  myChart = echarts.init(chart.value);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const seriesData = [];
  // 生成随机数据
  for (let i = 0; i < 9; i++) {
    const data = [];
    for (let j = 0; j < 9; j++) {
      data.push(0);
    }
    seriesData.push({
      type: "line",
      name: "User " + (i + 1), // 设置系列名称
      data: data,
    });
  }

  // 添加 emphasis 配置，用于定义鼠标 hover 或点击时的样式
  seriesData.forEach((serie, index) => {
    serie.emphasis = {
      focus: "series", // 设置鼠标 hover 或点击时，只高亮当前系列
      lineStyle: { width: 3 }, // 可以自定义高亮时线条宽度等样式
      itemStyle: { color: "highlightColor" }, // 可以自定义高亮时的颜色
    };
  });

  let option = {
    animationDuration: 3000, // 设置动画时间为 3 秒
    xAxis: {
      type: "category",
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const month = params[0].axisValue;
        let content = month + "<br>";
        params.forEach((item) => {
          content += item.seriesName + ": " + item.value + "<br>";
        });
        return content;
      },
    },
  };
  myChart.setOption(option);
  var cachedUsers = sessionStorage.getItem("cachedLine");
  if (cachedUsers) {
    const res = JSON.parse(cachedUsers);
    let i = 0;
    Object.keys(res.data).forEach((key) => {
      const value = res.data[key];
      option.series[i].data = res.data[key].map((item) => item.number);
      i++;
      // 在这里可以对每个键值对进行进一步处理
    });
    myChart.setOption(option);
    // chartSetoption(JSON.parse(cachedUsers), option);
  } else {
    //如果不存在,就发送请求获取
    fetchData(option);
  }
  // 添加 click 事件响应函数
  onClick: (e) => {
    const seriesIndex = e.seriesIndex;

    // 清除所有系列的高亮状态
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: "*",
    });

    // 高亮当前点击的系列
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex,
    });
  };
}

const fetchData = async (option) => {
  let res = await reqGetLineChart();
  if (res.code == 1) {
    let i = 0;
    Object.keys(res.data).forEach((key) => {
      const value = res.data[key];
      option.series[i].data = res.data[key].map((item) => item.number);
      i++;
      // 在这里可以对每个键值对进行进一步处理
    });
    myChart.setOption(option);
    sessionStorage.setItem("cachedLine", JSON.stringify(res));
    console.log(option.series);
  } else {
    alert("图表数据获取失败,请刷新重试");
  }
};


onMounted(() => {
  createDynamicLineChart();
});
</script>
<style lang="scss" scoped>
.righttop-container {
  height: 43%;
  width: 100%;
  position: absolute;
  top: 25px;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  .chart {
    width: 95%;
    height: 95%;
    position: relative;
    left:10px;
    top:30px;
  }
}
</style>
