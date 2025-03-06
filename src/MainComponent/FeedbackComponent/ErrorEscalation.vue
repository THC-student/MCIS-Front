<template>
    <div>
        <h2>井盖识别错误上报</h2>
        <div class="form-container">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="井盖初始图片" prop="url">
                    <el-form-item>
                        <el-upload class="avatar-uploader" list-type="picture-card" :show-file-list="false"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.url" :src="ruleForm.url" title="点击重新上传图片" class="avatar-preview" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="井盖图片编号" prop="imageId">
                    <el-input v-model="ruleForm.imageId" placeholder="图片编号" />
                </el-form-item>
                <el-form-item label="识别错误类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio value="1" name="type">井盖损坏</el-radio>
                        <el-radio value="5" name="type">井盖未盖</el-radio>
                        <el-radio value="4" name="type">井盖丢失</el-radio>
                        <el-radio value="2" name="type">边缘损坏</el-radio>
                        <el-radio value="3" name="type">正常无损</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上报时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date"
                                placeholder="Pick a date" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col class="text-center" :span="2">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time"
                                style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="position: relative;left: 250px;top:70px">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        上报
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore();

interface RuleForm {
    url: string
    imageId: string
    type: string
    judge: number
    date1: string
    date2: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    url: store.state.beforeUrl,
    imageId: store.state.ImageId,
    type: '',
    judge: 1,
    date1: '',
    date2: '',
})


const rules = reactive<FormRules<RuleForm>>({
    url: [
        { required: true, message: '请选择图片', trigger: 'blur' },
    ],
    imageId: [
        { required: true, message: '请输入图片ID', trigger: 'blur' },
    ],
    type: [
        {
            required: true,
            message: '请按图片检测错误的结果选择一个种类',
            trigger: 'change',
        },
    ],
})

import axios from "axios";
import { serverAddress } from '../config.ts'


//提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            let datePart = new Date(ruleForm.date1).toISOString().split('T')[0];
            let date2Str = ruleForm.date2; // 获取原始字符串  

            // 首先，将字符串解析为 Date 对象  
            let date2Obj = new Date(date2Str);

            // 然后，提取小时、分钟和秒，并格式化为 "hh:mm:ss"  
            let hours = date2Obj.getHours().toString().padStart(2, '0'); // 转换为两位数字并补零  
            let minutes = date2Obj.getMinutes().toString().padStart(2, '0'); // 同上  
            let seconds = date2Obj.getSeconds().toString().padStart(2, '0'); // 同上  

            // 拼接时间部分  
            let timePart = `${hours}:${minutes}:${seconds}`;
            let combinedStr = `${datePart} ${timePart}`;
            axios({
                url: `${serverAddress}/pictureUpload/exceptionPictureMQSet`,
                /* url: "https://mock.apifox.com/m2/4101048-0-default/154600763?apifoxApiId=154600763", */
                method: "POST",
                data: {
                    pictureId: ruleForm.imageId,
                    pictureAddr: ruleForm.url,
                    pictureStatus: ruleForm.type,
                    time: combinedStr,
                    judge: ruleForm.judge,
                }
            }).then((response) => {
                if (response.data.code === 1) {
                    console.log(ruleForm.url)
                    alert('上报成功')
                    store.state.beforeUrl = ''
                    ruleForm.url = ''
                    ruleForm.date1 = ''
                    ruleForm.date2 = ''
                } else {
                    console.log(ruleForm.url)
                    alert('上报失败，请重新上报')
                }
            }).catch(error => {
                alert("出现" + error + "错误，请重新操作")
            })
        } else {
            console.log(ruleForm.url)
            alert('上报失败，请重新上报')
            console.log('error submit!', fields)
        }
    })
}

//清空表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    store.state.beforeUrl = ''
    ruleForm.url = ''
    ruleForm.date1 = ''
    ruleForm.date2 = ''
}

//获取和修改图片
function beforeAvatarUpload(file: File) {
    store.state.beforeUrl = URL.createObjectURL(file);
    ruleForm.url = store.state.beforeUrl
    return false;
}



</script>
<style scoped>
.form-container {
    height: 300px;
    display: flex;
    justify-content: center;
    position: relative;
    top: 80px;
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

.avatar-uploader .avatar-preview {
    width: 100px;
    /* 根据需要调整图片的宽度 */
    height: 100px;
    /* 根据需要调整图片的高度 */
    object-fit: cover;
    /* 根据需要调整图片的填充方式 */
}
</style>