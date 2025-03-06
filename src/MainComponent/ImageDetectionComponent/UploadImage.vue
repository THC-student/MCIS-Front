<template>
  <div class="uploadImage">
    <el-upload v-model:file-list="store.state.UploadImageFileList" class="upload-demo" action="#"
      :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :auto-upload="false"
      @change="changeFileList">
      <el-icon>
        <Plus />
      </el-icon>
      <template #tip>
        <div class="el-upload__tip">
          上传 jpg/png 等图片文件 
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { useStore } from 'vuex'
import axios from "axios";
const store = useStore();

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  store.state.UploadImageFileList=store.state.UploadImageFileList.filter((file: UploadUserFile) => file.url !== uploadFile.url);
  console.log("删除后的数组为：" + store.state.UploadImageFileList)
  console.log(uploadFile, uploadFiles)
  if(Array.isArray(store.state.UploadImageFileList) && store.state.UploadImageFileList.length === 0){
    store.state.step=0
  }else{
    store.state.step=1
  }
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

function changeFileList(file:any) {
  store.state.UploadImageFileList.push(file);
  console.log("更改后数组为：" + JSON.stringify(store.state.UploadImageFileList))
  let formData = new FormData();
  formData.append('file', file.raw);
  if(Array.isArray(store.state.UploadImageFileList) && store.state.UploadImageFileList.length === 0){
    store.state.step=0
  }else{
    store.state.step=1
  }
}
</script>
<style scoped>
.uploadImage {
  overflow-y: auto;
  padding-right: 15px;
}

.uploadImage::-webkit-scrollbar {
  width: 6px;
}

.uploadImage::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* 设置滚动条轨道背景色 */
}

.uploadImage::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  /* 设置滚动条滑块颜色 */
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
}

.uploadImage::-webkit-scrollbar-thumb:hover {
  background-color: #989898;
  /* 设置滚动条滑块在悬停时的颜色 */
}

.upload-demo {
  overflow-y: auto;
}
</style>