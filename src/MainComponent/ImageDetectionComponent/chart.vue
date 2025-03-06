<template>
	<div>
		<e-charts id="main" class="chart" :option="option" />
	</div>
</template>

<script setup>
import { onMounted, ref,computed,watch } from "vue";
import * as echarts from 'echarts';
import { useStore } from 'vuex'
const store = useStore();
const option = ref(null);

const step=computed(() => store.state.step)

onMounted(() => {
	var chartDom = document.getElementById('main');
	var myChart = echarts.init(chartDom);
	var option;

	option = {
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)' // 显示名称、数值和百分比
		},
		legend: {
			top: 'bottom'
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: '井盖检测饼状图',
				type: 'pie',
				radius: [20, 100],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 5
				},
				data: [
					{ value: store.state.chartData[0], name: '正常无损' },
					{ value: store.state.chartData[1], name: '边缘损坏' },
					{ value: store.state.chartData[2], name: '井盖丢失' },
					{ value: store.state.chartData[3], name: '井盖未盖' },
					{ value: store.state.chartData[4], name: '井盖损坏' }
				]
			}
		]
	};
	option && myChart.setOption(option);
});
watch(step, (newValues, oldValues) => {
    console.log(newValues,oldValues)
    componentKey.value++;
   renewData()
  });
</script>

<style scoped>
.chart {
	width: 390px;
	height: 370px;
}
</style>
