<template>
  <div class="topnav-container">
    <div class="m-4"></div>
    <div class="time">
      <el-date-picker
        v-model="time"
        type="daterange"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
        size="default"
      />
    </div>
    <el-button color="#409EFF" style="margin-left: 20px" @click="handleFilter"
      >筛选</el-button
    >
    <!-- <el-button color="#417ca1" style="margin-left: 20px">查询</el-button> -->
  </div>
</template>
<script lang="ts" setup>
import moment from "moment";
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const time = ref([]);
const start1 = ref();
const end1 = ref();
const optionpage = computed(() => store.state.optionpage);
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

function handleFilter() {
  console.log(time.value[0]);
  // 在这里可以处理选择的数据，比如发送到后端进行筛选操作
  const startDate = formatDate(time.value[0]);
  const endDate = formatDate(time.value[1]);
  if (startDate == "NaN-NaN-NaN" || endDate == "NaN-NaN-NaN") {
    alert("请选择时间范围!!");
  } else {
    start1.value = startDate;
    end1.value = endDate;
    store
      .dispatch("searchfeedback", {
        pagesize: 1,
        startTime: startDate,
        endTime: endDate,
      })
      .then((res) => {})
      .catch(() => {
        alert("搜索失败,请重试");
      });
  }
}

//格式化时间成XXXX-XX-XX
function formatDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  // console.log(formattedDate); // 输出格式化后的日期 "2024-03-13"
  return formattedDate;
}
// 现在可以监听这两个计算属性的变化
watch(optionpage, (newValues, oldValues) => {
  console.log("userData changed:", newValues, oldValues);
  if (store.state.optionpage == 1) {
    store
      .dispatch("searchfeedback", {
        pagesize: 1,
        startTime: start1.value,
        endTime: end1.value,
      })
      .then((res) => {})
      .catch(() => {
        alert("搜索失败,请重试");
      });
  }
  // 在这里执行你的逻辑
});
</script>
<style lang="scss" scoped>
.topnav-container {
  height: 10%;
  width: 95%;
  margin: auto;
  display: flex;
  position: absolute;
  //   justify-content: center;
  align-items: center;
  .time {
    margin-left: 50px;
  }
  //   background-color: red;
  // ::v-deep .el-date-editor.el-input,
  // .el-date-editor.el-input__inner {
  //   width: 146px;
  //   margin: 0 10px;
  // }
  // .date-input >>> .el-input__inner {
  //   width: 170px;
  //   height: 40px;
  // }
}
</style>
