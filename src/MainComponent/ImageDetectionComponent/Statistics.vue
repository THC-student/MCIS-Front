<template>
  <div :key="store.state.AcceptImageFileList">
    <h4>检测结果统计</h4>
    <chart class="chart" :key="componentKey"/>
    <div class="countInformation">
      <h3>检测图片总数量：{{ store.state.AcceptImageFileList.length }}</h3>
      <h3>检测井盖总数量：{{ store.state.chartData[5] }}</h3>
      <h3>正常井盖数量：{{ store.state.chartData[0]}}</h3>
      <h3></h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import chart from './chart.vue'
import { useStore } from 'vuex'
import { onMounted,ref,computed,watch } from 'vue'
const store = useStore();
const componentKey=ref(0)
const problemCount=ref(0)
const step=computed(() => store.state.step)
function renewData(){
  store.state.chartData=[0,0,0,0,0,0]
  if(store.state.AcceptImageFileList!=null){
    console.log(store.state.chartData,"aasf",store.state.chartData[1])
  store.state.chartData.fill(0);
  for (let i = 0; i < store.state.AcceptImageFileList.length; i++){
    store.state.chartData[0]+=store.state.AcceptImageFileList[i].map.good
    store.state.chartData[1]+=store.state.AcceptImageFileList[i].map.circle
    store.state.chartData[2]+=store.state.AcceptImageFileList[i].map.lose
    store.state.chartData[3]+=store.state.AcceptImageFileList[i].map.uncovered
    store.state.chartData[4]+=store.state.AcceptImageFileList[i].map.broke
    store.state.chartData[5]+=store.state.AcceptImageFileList[i].map.count
    console.log(store.state.AcceptImageFileList[i].map.count)
  }
  console.log("aaa",store.state.chartData)
  componentKey.value++;
  console.log(componentKey.value,"hhhhh")
}else{
  alert('无可统计内容，请先进行检测')
}
}
onMounted(() => {
  renewData()
  console.log('已更新')
});

  // 现在可以监听这两个计算属性的变化
  watch(step, (newValues, oldValues) => {
    console.log(newValues,oldValues)
    componentKey.value++;
   renewData()
  });
</script>
<style scoped>
.chart{
  position: absolute;
  left: -5px;
  top:20px;
}
.countInformation{
  position: absolute;
  top:430px;
  left: 115px;
}
</style>
