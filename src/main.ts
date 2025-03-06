import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/index.css';
import store from './store/index.js'
import router from './router/index.ts'   
import ECharts from 'vue-echarts'  // 引入ECharts
import "echarts";  

const app = createApp(App);

// 使用 Element Plus 组件
app.use(ElementPlus);
app.use(store)
app.use(router) 
app.component('ECharts',ECharts)  


// 挂载应用
app.mount('#app');
