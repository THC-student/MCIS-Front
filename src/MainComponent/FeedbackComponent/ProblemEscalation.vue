<template>
    <div>
        <h2>井盖维修上报</h2>
        <div class="form-container">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="检测错误图片" prop="url">
                    <el-form-item>
                        <el-upload class="avatar-uploader" list-type="picture-card" :show-file-list="false"
                            :before-upload="beforeAvatarUpload_t">
                            <img v-if="ruleForm.url" :src="ruleForm.url" title="点击重新上传图片" class="avatar-preview" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="井盖图片编号" prop="imageId">
                    <el-input v-model="ruleForm.imageId" placeholder="图片编号" />
                </el-form-item>
                <el-form-item label="井盖地址" prop="region1">
                    <el-select v-model="ruleForm.region1" placeholder="请选择井盖所在区域">
                        <el-option v-for="(region, index) in regions" :key="index" :label="region.label"
                            :value="region.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="井盖详细地址" prop="region2">
                    <el-input v-model="ruleForm.region2" placeholder="详细地址" />
                </el-form-item>
                <el-form-item label="图片井盖数量" prop="count">
                    <el-select-v2 v-model="ruleForm.count" placeholder="井盖数量" :options="options" />
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
                <el-form-item label="识别维修类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio value="1" name="type">
                            井盖损坏
                        </el-radio>
                        <el-radio value="5" name="type">
                            井盖未盖
                        </el-radio>
                        <el-radio value="4" name="type">
                            井盖丢失
                        </el-radio>
                        <el-radio value="2" name="type">
                            边缘损坏
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="详细描述" prop="desc">
                    <el-input v-model="ruleForm.desc" type="textarea" />
                </el-form-item>
                <el-form-item style="position: relative;left: 250px;">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        上报
                    </el-button>
                    <el-button @click="resetForm">清空</el-button>
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
    region1: string
    region2: string
    count: string
    date1: string
    date2: string
    type: string
    desc: string
    userId: string
}
//选择地区
const regions = [ // 定义一个包含区级地址的数组  
    { label: '永定区', value: '永定区' },
    { label: '武陵源区', value: '武陵源区' },
    { label: '慈利县', value: '慈利县' },
    { label: '桑植县', value: '桑植县' },
]

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    url: store.state.afterUrl,
    imageId: store.state.ImageId,
    region1: '',
    region2: '',
    count: '',
    date1: '',
    date2: '',
    type: '',
    desc: '无更详细描述',
    userId: store.state.userId,
})

const rules = reactive<FormRules<RuleForm>>({
    url: [
        { required: true, message: '请选择图片', trigger: 'blur' },
    ],
    imageId: [
        { required: true, message: '请输入图片ID', trigger: 'blur' },
    ],
    region1: [
        {
            required: true,
            message: '请选择井盖所在区域',
            trigger: 'change',
        },
    ],
    region2: [
        {
            required: true,
            message: '请填写井盖详细地址',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: '请输入图片中井盖的数量',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: '请填写上报时间',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: '请填写上报时间',
            trigger: 'change',
        },
    ],
    type: [
        {
            required: true,
            message: '请按图片检测错误的结果选择至少一个种类',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})


import axios from "axios";
import { serverAddress } from '../config.ts'
//提交
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
            let combinedStr = `${datePart} ${timePart}`;// 拼接日期和时间字符串
            let a = {
                pictureId: ruleForm.imageId,
                pictureAddr: ruleForm.url,
                pictureStatus: ruleForm.type,
                street: ruleForm.region2,
                areas: ruleForm.region1,
                userId: ruleForm.userId,
                time: combinedStr,
                message: ruleForm.desc,
                count: ruleForm.count
            }
            console.log(a)
            axios({
                url: `${serverAddress}/red/reportPicture`,
                /* url: "https://mock.apifox.com/m2/4101048-0-default/156908267", */
                method: "POST",
                data: {
                    pictureId: ruleForm.imageId,
                    pictureAddr: ruleForm.url,
                    pictureStatus: ruleForm.type,
                    street: ruleForm.region2,
                    areas: ruleForm.region1,
                    userId: ruleForm.userId,
                    time: combinedStr,
                    message: ruleForm.desc,
                    count: ruleForm.count
                }
            }).then((response) => {
                if (response.data.code === 1) {
                    console.log(ruleForm.url)
                    alert('上报成功')
                    resetForm();
                } else {
                    console.log(ruleForm)
                    alert('上报失败，请重新上报')
                }
            }).catch(error => {
                alert("出现" + error + "错误，请重新操作")
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
//清空
const resetForm = () => {
    ruleForm.url = '',
        ruleForm.imageId = '',
        ruleForm.region1 = '',
        ruleForm.region2 = '',
        ruleForm.count = '',
        ruleForm.date1 = '',
        ruleForm.date2 = '',
        ruleForm.type = ''
}

//数量
const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))
//获取图片或换图片

function beforeAvatarUpload_t(file: File) {
    store.state.afterUrl = URL.createObjectURL(file);
    ruleForm.url = store.state.afterUrl
    console.log(ruleForm)
    return false;
}

</script>
<style scoped>
.form-container {
    height: 480px;
    display: flex;
    justify-content: center;
    position: relative;
    top: 25px;
    overflow-y: auto;
}

.form-container::-webkit-scrollbar {
    width: 6px;
}

.form-container::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* 设置滚动条轨道背景色 */
}

.form-container::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    /* 设置滚动条滑块颜色 */
    border-radius: 4px;
    /* 设置滚动条滑块的圆角 */
}

.form-container::-webkit-scrollbar-thumb:hover {
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