<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="Current Email" prop="currentEmail" class="CurrentEmail">
      <el-input
        v-model="ruleForm.currentEmail"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="New Email" prop="newEmail" class="NewEmail">
      <el-input v-model="ruleForm.newEmail" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item style="position: relative;left:125px;top:-25px">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="closeEmailDialog">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, defineProps, reactive, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const emit = defineEmits(["closeEmailDialog"]);
const ruleForm = reactive({
  currentEmail: "", // 添加 currentEmail 和 newEmail 属性
  newEmail: "",
});

function closeEmailDialog() {
  console.log("关闭邮箱修改");
  //向父组件发送自定义事件
  emit("closeEmailDialog");
}

const ruleFormRef = ref<FormInstance>();

const validateOldEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the email address"));
  } else {
    const reg = /^[a-zA-Z0-9_]+@qq.com$/; // 正则表达式匹配QQ邮箱地址
    if (!reg.test(value)) {
      callback(new Error("Please input a valid QQ email address"));
    } else {
      callback();
    }
  }
};

const validateNewEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the new QQ email address again"));
  } else if (value !== ruleForm.currentEmail) {
    callback(
      new Error("The new QQ email address doesn't match the current one")
    );
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof ruleForm>>({
  currentEmail: [{ validator: validateOldEmail, trigger: "blur" }],
  newEmail: [{ validator: validateNewEmail, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      store
        .dispatch("UpdateEmail", {newEmail:ruleForm.newEmail})
        .catch(() => {
          alert("修改邮箱成功");
        })
        .catch(() => {
          alert("修改失败");
        });
    } else {
      console.log("error submit!");
      alert("两次输入不匹配,请再试一次");
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.el-form {
  margin-top: -80px;
  margin-left: 450px;
  width: 430px;
  height: 230px;
  border: 1px solid rgb(106, 155, 247);
  border-radius: 10px;
  background-color: #fff;
  z-index: 9999;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  .el-form-item {
    margin-top: 40px;
    padding-left: 10px;
    .el-input {
      width: 80%;
      position: relative;
      left:20px;
    }
  }
  .NewEmail{
    margin-top: 20px;
  }
}
</style>
