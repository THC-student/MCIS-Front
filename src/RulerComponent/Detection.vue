<template>
    <div class="container">
        <div class="Kuang">
            <ImageKuang></ImageKuang>
        </div>
        <div style="width:2px;height:570px;background-color: #409EFF;position:relative;top:-360px;left:680px;"></div>
        <div class="information">
            <h3 style="position:relative;top:-30px;left:-40px;">人工检测信息填写</h3>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>
                <el-form-item label="井盖图片编号" prop="pictureId" style="position: relative;top:20px;">
                    <el-input v-model="ruleForm.pictureId" placeholder="图片编号"
                        style="width:240px;position: relative;top:-5px;left:10px;" />
                </el-form-item>
                <el-form-item label="人工识别类型" prop="type" style="position:relative;top:50px;">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio value="1" name="type">井盖损坏</el-radio>
                        <el-radio value="5" name="type">井盖未盖</el-radio>
                        <el-radio value="4" name="type">井盖丢失</el-radio>
                        <el-radio value="2" name="type">边缘损坏</el-radio>
                        <el-radio value="3" name="type">正常无损</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="position: relative;top:90px;left:150px;">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        提交
                    </el-button>
                    <el-button @click="resetForm">清空</el-button>
                </el-form-item>
            </el-form>
            <p style="position:relative;width:350px;top:120px;left:40px;font-size: 15px;color:#F56C6C">
                请在图片上将检测的井盖框选并提前确认图片,选择检测井盖的人工检测类型后提交并加入官方数据集</p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ImageKuang from './DetectionComponent/ImageKuang.vue'
import { ref, reactive, onMounted,onBeforeUnmount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {reqexceptionPictureMQGet} from "@/api"

import { useStore } from 'vuex'
const store = useStore();


const gridData=ref([]);
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
    type: string,
    pictureId: string,
}
const ruleForm = reactive<RuleForm>({
    type: '',
    pictureId: store.state.ImageId,
})
const rules = reactive<FormRules<RuleForm>>({
    pictureId: [
        { required: true, message: '请输入图片ID', trigger: 'blur' },
    ],
    type: [
        {
            required: true,
            message: '图片人工检测结果至少为一个种类',
            trigger: 'change',
        },
    ],
})
const resetForm = () => {
    ruleForm.pictureId = '',
        ruleForm.type = ''
}

onMounted(()=>{
    fetchData();
})

const fetchData = async () => {
  let res = await reqexceptionPictureMQGet();
};


// 在组件离开之前执行的操作
onBeforeUnmount(() => {
  // 在这里执行一些清理操作，比如取消订阅、清除定时器等
  for (let [key, item] of Object.entries(store.state.reportData)) {
    if(item.pictureId!==ruleForm.pictureId){
    axios({
      url: `${serverAddress}/pictureUpload/exceptionPictureMQSet`,
      /* url: "https://mock.apifox.com/m2/4101048-0-default/154600763?apifoxApiId=154600763", */
      method: "POST",
      data: {
        pictureId: item.pictureId,
        pictureAddr: item.pictureAddr,
        pictureStatus: item.pictureStatus,
        time: item.time,
        judge: item.judge,
      }
    }).then((response) => {
      if (response.data.code === 1) {
        console.log(response.data)
      } else {
        console.log(response.data)
      }
    }).catch(error => {
      alert("出现" + error + "错误，请重新操作")
    })
  }
  console.log("离开前操作");
}
});
import axios from "axios";
import { serverAddress } from '@/MainComponent/config.ts'
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')

            let formData = new FormData();
            formData.append('newOriginPicture', store.state.file)
            formData.append('pictureId', ruleForm.pictureId)
            formData.append('newStatus', ruleForm.type)
            axios({
                url: `${serverAddress}/picture/changeOriginPicture`,
                /* url: "https://mock.apifox.com/m2/4101048-0-default/156908267", */
                method: "POST",
                data: formData,
            }).then((response) => {
                if (response.data.code === 1) {
                    console.log(response.data)
                    alert('提交成功')
                } else {
                    console.log(response.data)
                    alert('提交失败')
                }
            }).catch(error => {
                alert("出现" + error + "错误，请重新操作")
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>
<style scoped>
.container {
    border: 1.5px solid rgb(148, 191, 239);
    border-radius: 0.4rem;
    background-color: rgb(255, 255, 255);
    height: 650px;
    width: 1210px;
    position: absolute;
    top: 5px;
    left: 9px;
}

.Kuang {
    height: 400px;
    position: relative;
    top: 70px;
    left: -250px;
}

.information {
    position: absolute;
    width: 500px;
    top: 100px;
    left: 740px;
}
</style>