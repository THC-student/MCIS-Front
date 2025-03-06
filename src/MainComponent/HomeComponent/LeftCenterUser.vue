<template>
  <div class="leftcenter-container">
    <div class="echart" ref="chart"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetMonthRatio } from "../../api";
import * as echarts from "echarts";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const chart = ref(null);
let chartInstance = null;
let option = reactive({
  tooltip: {
    //
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
    // position: ["10%", "50%"], // 设置tooltip的位置，竖直居中靠左
    confine: true, // 防止tooltip超出图表边界
  },
  legend: {
    right: "7%", // 控制图例在容器的左侧
    orient: "vertical", // 设置图例竖着排列
    itemGap: 25,
    align: "right", // 文字靠左，颜色块靠右
    itemHeight: 25, // 设置图例标记的图形高度，默认为14
    data: [
      { name: "Good", itemStyle: { color: "#9ec3ce" } },
      { name: "Broke", itemStyle: { color: "#ccaac8" } },
      { name: "Lose", itemStyle: { color: "#906a9c" } },
      { name: "Circle", itemStyle: { color: "#4a91af" } },
      { name: "Uncovered", itemStyle: { color: "#c46a88" } },
      { name: "Feedback", itemStyle: { color: "#f3e19c" } },
    ],
  },

  series: [
    {
      name: "来源",
      type: "pie",
      selectedMode: "single", //是否支持多个选中
      //   radius: [0, "30%"],
      radius: [0, "30%"],
      center: ["41%", "45%"], //图的位置，距离左跟上的位置
      label: {
        position: "inner", //饼图扇区内部
        fontSize: 14,
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 0, name: "Broke", itemStyle: { color: "#ccaac8" } },
        { value: 0, name: "Good", itemStyle: { color: "#9ec3ce" } },
        {
          value: 0,
          name: "Feedback",
          itemStyle: { color: "#f3e19c" },
          selected: true,
        }, //调节使其默认被选中
      ],
    },
    {
      name: "来源",
      type: "pie",
      radius: ["45%", "60%"],
      center: ["40.2%", "46.8%"], //图的位置，距离左跟上的位置
      labelLine: {
        length: 30,
      },
      label: {
        formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}:}{c}  {per|{d}%}  ", //富文本显示
        // backgroundColor: "#F6F8FC", //文字块背景色
        // backgroundColor: "#dceeff",
        borderColor: "#8C8D8E", //文字块边框颜色
        borderWidth: 1, //文字块边框宽度
        borderRadius: 4,

        rich: {
          a: {
            //标题名的样式
            color: "#6E7079",
            lineHeight: 22, //标签的表格的上高度
            align: "center", //文字水平对齐方式
          },
          hr: {
            //分割线
            borderColor: "#8C8D8E",
            width: "100%",
            borderWidth: 1,
            height: 0,
          },
          b: {
            //数据名的样式
            color: "#4C5058",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 33, //表格高度，行高
          },
          per: {
            //自定义百分比的样式
            color: "#fff",
            backgroundColor: "#4C5058",
            // backgroundColor: "#dceeff",
            padding: [3, 4], //文字块内边距，[3,4,3,4]
            borderRadius: 4,
          },
        },
      },
      data: [
        { value: 0, name: "Good", itemStyle: { color: "#9ec3ce" } },
        { value: 0, name: "Broke", itemStyle: { color: "#ccaac8" } },
        { value: 0, name: "Lose", itemStyle: { color: "#906a9c" } },
        { value: 0, name: "Circle", itemStyle: { color: "#4a91af" } },
        { value: 0, name: "Uncovered", itemStyle: { color: "#c46a88" } },
        { value: 0, name: "Feedback", itemStyle: { color: "#f3e19c" } },
      ],
    },
  ],
});

function createChart() {
  if (!chart.value) return;
  chartInstance = echarts.init(chart.value);
  chartInstance.setOption(option);
}

onMounted(() => {
  createChart();
  var cachedUsers = sessionStorage.getItem("cachedMonthSammary");
  if (cachedUsers) {
    chartSetoption(JSON.parse(cachedUsers));
  } else {
    //如果不存在,就发送请求获取
    fetchData();
  }
});

function chartSetoption(data) {
  //映射表
  const mapping = {
    Good: "goodNum",
    Broke: "brokeNum",
    Lose: "loseNum",
    Circle: "circleNum",
    Uncovered: "uncoveredNum",
  };
  // 遍历 mapping 中的键值对
  Object.entries(mapping).forEach(([name, propName]) => {
    // 在 option.series[1].data 数组中找到对应名称的对象
    const targetObj = option.series[1].data.find((obj) => obj.name === name);
    // 如果找到了对应的对象，则将 res.data.countNumber 中对应属性的值赋给该对象的 value 属性
    if (targetObj && data.countNumber.hasOwnProperty(propName)) {
      targetObj.value = data.countNumber[propName];
    }
  });
  // 计算 feedbackNum 的值，将 data.countRed 中的所有属性值相加
  let feedbackNum = 0;
  for (let prop in data.countRed) {
    feedbackNum += data.countRed[prop];
  }
  // 找到 name 为 "Feedback" 的对象，并将 feedbackNum 的值赋给它的 value 属性
  const feedbackObj = option.series[1].data.find(
    (obj) => obj.name === "Feedback"
  );
  if (feedbackObj) {
    feedbackObj.value = feedbackNum;
  }
  // 找到 res.data.countNumber 中对应的属性值，并赋给 option.series[0].data 数组中的元素
  option.series[0].data.forEach((item, index) => {
    switch (item.name) {
      case "Broke":
        item.value = data.countNumber.brokeNum;
        break;
      case "Good":
        item.value = data.countNumber.goodNum;
        break;
      case "Feedback":
        item.value = feedbackNum;
        break;
      default:
        break;
    }
  });
  chartInstance.setOption(option);
}

const fetchData = async () => {
  let res = await reqGetMonthRatio(store.state.userId);
  console.log(res,"aaaa")
  if (res.code == 1) {
    console.log("左中",res.data)
    chartSetoption(res.data);
    sessionStorage.setItem("cachedMonthSammary", JSON.stringify(res.data));
  }
};

</script>
<style lang="scss" scoped>
.leftcenter-container {
  height: 51%;
  width: 95%;
  position: absolute;
  top: 20%;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  .echart {
    position: absolute;
    top: 20px;
    width: 100%;
    height: 90%;
    canvas {
      height: 250px !important;
    }
    // div {
    //   margin-top: -100px !important;
    // }
  }
}
</style>
