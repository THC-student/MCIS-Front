<template>
  <div class="rightshow-container">
    <ul>
      <div style="background-color: #337ecc;width:0px;height:2px;position: relative;left:-310px;"></div>
      <li v-for="(item, index) in srcList">
        <el-image
          style="width: 100px; height: 100px"
          :src="item"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
          lazy
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetDataList2 } from "../../api";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const selectedId = computed(() => store.state.menuId);
const srcList = ref([]);
const JudgeCategory = (id) => {
  if (id.toString().startsWith("1")) {
    fetchData(3, id - 11);
  } else if (id.toString().startsWith("2")) {
    fetchData(2, id - 21);
  } else if (id.toString().startsWith("3")) {
    fetchData(1, id - 31);
  } else if (id.toString().startsWith("4")) {
    fetchData(4, id - 41);
  } else {
    fetchData(5, id - 51);
  }
};

const fetchData = async (status, num) => {
  let res = await reqGetDataList2(status);
  console.log("res.data", res.data);
  // 清空数组
  srcList.value.length = 0;
  console.log(res.data[0]);
  console.log(res.data[1]);
  res.data.forEach((item, index) => {
    console.log("num", num, "judge", item.judge);
    if (item.judge === num && item.officialAddr) {
      // 确保judge为1且有图片地址
      srcList.value.push(item.officialAddr);
    }
  });
  console.log(srcList.value, "数据集图片"); // 输出包含所有judge为1的图片地址的数组
  // if(res.code==1{

  // }else{
  //   alert("获取失败,请重试")
  // }
  store.commit("GETPHOTOS", 0);
};

// 现在可以监听这两个计算属性的变化
watch(selectedId, (newValues, oldValues) => {
  console.log("changed:", newValues, oldValues);
  if (newValues != 0) {
    JudgeCategory(newValues);
  }
  // 在这里执行你的逻辑
});
</script>
<style lang="scss" scoped>
.rightshow-container {
  height: 80%;
  width: 66%;
  position: absolute;
  right: 61px;
  top: 30px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      margin-right: 20px;
      margin-top: 30px;
      height: 137px;
      width: 236px;
      border-radius: 8px;
      list-style: none;
      .el-image {
        height: 100% !important;
        width: 100% !important;
      }
    }
    li :nth-child(1){
      margin-right: 0;
    }
  }
}
</style>
