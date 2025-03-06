<template>
  <div class="dialog">
    <h2>修改信息</h2>
    <form>
      <div class="form-group">
        <label for="username"><span style="color: red">*</span>用户名:</label>
        <input type="text" id="username" v-model="FormData.username" required />
      </div>

      <div class="form-group">
        <label for="password1"><span style="color: red">*</span>设置密码:</label>
        <input type="password" id="password1" v-model="FormData.password1"
          oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')" required />
      </div>

      <div class="form-group">
        <label for="password2"><span style="color: red">*</span>确认密码:</label>
        <input type="password" id="password2" v-model="FormData.password2"
          oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')" required />
      </div>

      <div class="form-group">
        <label for="age">年龄:</label>
        <input type="number" id="age" v-model="FormData.age" min="0" max="150" />
      </div>

      <div class="form-group sex-group">
        <label for="sex">性别:</label>
        <el-radio-group v-model="FormData.sex" id="sex" @update:model-value="handleSexChange">
          <el-radio value="女" size="large">女</el-radio>
          <el-radio value="男" size="large">男</el-radio>
        </el-radio-group>
      </div>
    </form>
    <div class="btn">
      <!-- <button type="button" @click="Update">保存</button> -->
      <el-button type="primary" round @click="Update">保存</el-button>
      <!-- <button type="button" @click="closeDialog">取消</button> -->
      <el-button type="info" round @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, reactive, defineEmits, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
const props = defineProps({});
const store = useStore();
const router = useRouter();
//生命自定义组件
const emit = defineEmits(["closeDialog"]);
const FormData = reactive({
  username: "",
  password1: "",
  password2: "",
  sex: "",
  age: "",
});

onMounted(() => {
  if (store.state.userSex === "女") {
    FormData.sex = "女";
  } else {
    FormData.sex = "男";
  }
  FormData.age = store.state.userAge;
});

//切换性别
function handleSexChange(newSex) {
  FormData.sex = newSex;
  console.log("性别切换为:", newSex, FormData.sex);
}
//提交保存按钮
function Update() {
  console.log(FormData.age, "erg");
  console.log(FormData.age != "");
  console.log(FormData.sex != "");
  if (FormData.username && FormData.password1 && FormData.password2) {
    console.log(FormData, "dj",FormData.username);
    //仓库中处理
    store
      .dispatch("UpdateMessage", {
        username: FormData.username,
        password1: FormData.password1,
        password2: FormData.password2,
        age: FormData.age,
        sex: FormData.sex,
      })
      .then((res) => {
        if (res == 1) {
          ElNotification({
            title: "error",
            message: "密码必须由数字和字母构成,且不少于8位",
            type: "error",
          });
          console.log("密码必须由数字和字母构成,且不少于8位");
        } else if (res == 2) {
          ElNotification({
            title: "succes",
            message: "修改成功",
            type: "succes",
          });
          console.log("修改成功");
        } else if (res == 3) {
          ElNotification({
            title: "warn",
            message: "两次密码输入不相同",
            type: "warn",
          });
          console.log("两次密码输入不相同");
        }
      });
  } else {
    console.log("错误");
    ElNotification({
      title: "error",
      message: "请输入完整",
      type: "error",
    });
  }
}

function closeDialog() {
  //向父组件发送自定义事件
  emit("closeDialog");
}
</script>
<style lang="scss" scoped>
label {
  font-size: 15px;
}

.dialog {
  margin-top: -100px;
  margin-left: 400px;
  position: relative;
  display: flex;
  width: 500px;
  height: 540px;
  flex-direction: column;
  text-align: center;
  border: 1px solid rgb(106, 155, 247);
  border-radius: 10px;
  z-index: 1000;
  background-color: #fff;

  h2 {
    width: 100%;
    color: black;
    font-size: 20px;
  }

  form {
    width: 70%;
    height: 70%;
    padding-left: 45px;
    position: relative;
    top: -20px;

    .form-group {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: baseline;
      margin: 16px;
      /* 根据需要添加间距 */
      margin-left: 85px;
    }

    .form-group:not(.sex-group) {
      label {
        font-weight: 500;
        margin: 5px 0;
      }

      input {
        outline: none;
        border: 1px solid rgb(113, 159, 245);
        width: 230px;
        height: 8px;
        padding: 12px 10px;
        border-radius: 4px;
        font-size: 15px;
      }

      input:focus {
        transform: translate(4px);
      }
    }

    .sex-group {
      display: flex;

      label {
        font-weight: 500;
      }

      .el-radio-group {
        margin-right: 5px;

        label {
          font-weight: 600;
        }
      }
    }
  }

  .btn {
    position: absolute;
    bottom: 30px;
    left: 75px;
    display: flex;
    justify-content: space-around;

    .el-button {
      width: 100px;
      height: 35px;
      line-height: 40px;
      font-size: 15px;
      font-weight: 800;
      margin-left: 50px;
    }
  }
}
</style>
