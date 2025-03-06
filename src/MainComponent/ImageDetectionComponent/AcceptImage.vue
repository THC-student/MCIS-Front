<template>
  <div class="acceptImage" style="overflow-y: auto;">
    <p>检测结果</p>
    <div class="ImageList">
      <div class="demo-image__preview" v-for="(item, index) in store.state.AcceptImageFileList" :key="index">
        <el-image style="width: 100px; height: 100px;position: absolute;left: 30px;" :src="item.picture.pictureAddr"
          :zoom-rate="1.2" :max-scale="5" :min-scale="0.2"
          :preview-src-list="store.state.AcceptImageFileList.map((item: any) => item.picture.pictureAddr)"
          :initial-index="index" fit="cover" />
        <label>编号: {{ item.picture.pictureId }}</label><br>
        <label>井盖数量: {{ item.map.count }}</label><br>
        <label>问题井盖数: {{ item.map.broke + item.map.uncovered + item.map.lose + item.map.circle }}</label><br>
        <button style="position: absolute;left: 150px;width:160px;height:30px;line-height: 1px;" @click="AddData(item)">添加官方数据集</button>
        <el-button class="button-download" type="primary" @click="handleDownload(item.picture.pictureAddr)" plain>下载图片</el-button>
        <el-popconfirm width="220" confirm-button-text="识别错误上报" cancel-button-text="井盖修理上报" :icon="InfoFilled"
          icon-color="#626AEF" title="请选择你需要上报的类型" @confirm="handleReport(item)" @cancel="handleCancel(item)">
          <template #reference>
            <el-button class="button-error" type="danger" plain>错误上报</el-button>
          </template>
        </el-popconfirm>
        <el-popover ref="popover" placement="right" title="详细检测信息" :width="200" trigger="focus">
          <template #reference>
            <el-button class="button-look" type="success" plain>检测详情</el-button>
          </template>
          井盖总数: {{ item.map.count }}<br>
          井盖损坏: {{ item.map.broke }}<br>
          井盖未盖: {{ item.map.uncovered }}<br>
          井盖丢失: {{ item.map.lose }}<br>
          边缘损坏: {{ item.map.circle }}<br>
          正常无损: {{ item.map.good }}<br>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore();
import { InfoFilled } from '@element-plus/icons-vue'

async function handleDownload(url: any) {
  try {  
    // 直接设置窗口的location.href来跳转到链接  
    window.location.href = url;  
  } catch (error) {  
    console.error('跳转到链接出错：', error);  
  }  
}


function UploadError(file: any) {
  store.state.ImageId = file.picture.pictureId
  store.state.beforeUrl = file.picture.originAddr
  store.state.afterUrl = file.picture.pictureAddr
}
import { useRouter } from 'vue-router';
const router = useRouter();

function handleReport(item: any){
  UploadError(item)
  console.log("识别错误")
  if (router.currentRoute.value.path !== "/AppMain/Feedback/ErrorEscalation") {
        router.replace( "/AppMain/Feedback/ErrorEscalation");
      }
}
function handleCancel(item: any){
  UploadError(item)
  console.log("井盖修理")
  if (router.currentRoute.value.path !== "/AppMain/Feedback/ProblemEscalation") {
        router.replace( "/AppMain/Feedback/ProblemEscalation");
      }
}

import axios from "axios";
import { serverAddress } from '../config.ts'
function AddData(item:any){
  axios({
            url: `${serverAddress}/official/addToOfficial`,
            /* url: "https://mock.apifox.com/m2/4101048-0-default/155886176", */
            method: "POST",
            data:{
              pictureAddr:item.picture.pictureAddr,
              pictureStatus:item.picture.pictureStatus,
            },
        })
        
}
</script>

<style scoped>
p {
  color: #409EFF;
}

button {
  height: 1.7rem;
  width: 4.4rem;
  position: relative;
}

.button-download {
  top: -70px;
  left: 230px;
}

.button-look {
  top: -35px;
  left: 65px;
}

.button-error {
  left: 147px;
}

label {
  width: 150px;
  text-align: left;
  font-size: 15px;
  margin-bottom: -10px;
  white-space: nowrap;
  /* 不允许换行 */
  overflow: hidden;
  /* 不允许超出 */
  text-overflow: ellipsis;
  /* 超出时省略号显示 */
  position: relative;
  top: -2px;
  left: 10px;
}

.ImageList {
  position: absolute;
  padding: 13px;
  top: 30px;
}

::v-deep .el-image-viewer {
  z-index: 1000 !important;
}

.demo-image__preview {
  width: 25rem;
  height: 100px;
  border: 0.5px solid rgb(96, 136, 206);
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 7px;
  margin-top: 10px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

.acceptImage::-webkit-scrollbar {
  width: 6px;
}

.acceptImage::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* 设置滚动条轨道背景色 */
}

.acceptImage::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  /* 设置滚动条滑块颜色 */
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
}

.acceptImage::-webkit-scrollbar-thumb:hover {
  background-color: #989898;
  /* 设置滚动条滑块在悬停时的颜色 */
}
</style>