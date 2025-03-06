<template>
    <div>
        <el-button type="primary" :loading="stateOfDetection" @click="StartDetection">{{ detection }}</el-button>
        <el-button @click="ClearUploadImageFileList">清空图片</el-button>
        <el-button @click="DownloadAcceptImageFileList">一键下载</el-button>
        <el-steps class="mb-4" style="width: 300px;position: relative;left: 18px;top:30px" :space="200"
            :active="store.state.step" simple>
            <el-step title="上传" />
            <el-step title="检测" />
            <el-step title="统计" />
        </el-steps>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
const store = useStore();
import { ref } from 'vue'
import axios from "axios";
import { serverAddress } from '../config.ts'
const detection = ref('开始检测')
const stateOfDetection = ref(false)

function StartDetection() {
    if (store.state.UploadImageFileList && store.state.UploadImageFileList.length > 0 && store.state.step >= 1) {
        stateOfDetection.value = true
        let formData = new FormData();
        for (let file of store.state.UploadImageFileList) {
            formData.append('files', file.raw);
        }
        formData.append('userId', store.state.userId);
        console.log(JSON.stringify(store.state.UploadImageFileList))
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios({
            url: `${serverAddress}/pictureUpload/upload`,
            /* url: "https://mock.apifox.com/m2/4101048-0-default/155886176", */
            method: "POST",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            if (response.data.code === 1) {
                store.state.AcceptImageFileList = response.data.data
                store.state.UploadImageFileList = response.data.data.map((item: any) => ({
                    uid: String(item.picture.originAddr),
                    url: item.picture.originAddr
                }));
                stateOfDetection.value = false
                store.state.step = 3
                console.log('Accept' + JSON.stringify(store.state.AcceptImageFileList))
            } else {
                stateOfDetection.value = false
                alert('检测失败')
            }
        }).catch(error => {
            alert("出现" + error + "错误，请重新操作")
        })
    } else {
        alert('请先上传图片')
    }
}
function ClearUploadImageFileList() {
    store.state.UploadImageFileList = []
    store.state.step = 0
    console.log(store.state.UploadImageFileList)
}
async function DownloadAcceptImageFileList() {
    for (let i = 0; i < store.state.AcceptImageFileList.length; i++) {
        const url = store.state.AcceptImageFileList[i].picture.pictureAddr
        /* 
        //下载图片
        try {
            const response = await fetch(url, { method: 'GET' });
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', '');
            console.log(link.href);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('下载图片出错：', error);
        } */
        try {
            // 直接设置窗口的location.href来跳转到链接  
            window.location.href = url;
        } catch (error) {
            console.error('跳转到链接出错：', error);
        }
    }
}
</script>
<style scoped>
.step {
    position: absolute;
}
</style>