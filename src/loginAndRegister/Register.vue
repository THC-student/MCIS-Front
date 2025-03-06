<template>
    <div class="container">
      <div class="register-box">
        <img src="@/assets/left-register.png" alt="" />
        <div class="register-message">
          <div class="register-in-message">
            <h2 style="margin-bottom: 10px; color: #375a6d">
              BTW井盖系统检测注册
            </h2>
            <form class="register-form" @submit.prevent="onSubmit">
              <div class="form_item">
                <input
                  type="text"
                  maxlength="20"
                  v-model="email"
                  oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')"
                  placeholder="邮箱"
                />
              </div>
  
              <div class="form_item">
                <input
                  maxlength="15"
                  minlength="8"
                  type="password"
                  v-model="password"
                  @blur="validatePassword"
                  oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')"
                  placeholder="密码"
                />
              </div>
              <div class="form_item">
                <input
                  maxlength="5"
                  minlength="1"
                  class="i3"
                  type="text"
                  v-model="code1"
                  oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')"
                  placeholder="验证码"
                />
                <div class="register_send" @click="sendEmail" :disabled="disable">
                  {{ getCode ? "获取验证码" : `${countDownTime}s后获取` }}
                </div>
              </div>
              <button type="submit">注册</button>
            </form>
            <router-link
              to="/"
              style="
                display: block;
                color: #25cad8;
                margin-top: 10px;
                font-weight: bold;
                float: right;
              "
              >已有账号?</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { onMounted, ref, defineProps } from "vue";
  import { useStore } from "vuex";
  import { ElMessage } from "element-plus";
  import { useRouter } from "vue-router";
  name: "register";
  const props = defineProps({});
  const store = useStore();
  const router = useRouter();
  let getCode = ref(true);
  const email = ref("");
  const password = ref("");
  //剩余时间
  let countDownTime = ref(60);
  let code = ref("");
  const code1 = ref("");
  let time = null; //全局定时器
  let timer = null;
  let disable = ref(false);
  onMounted(() => {
  console.log("注册组件已挂载到 DOM 中！");
});
// 定时禁用按钮
const intervalShowButton = () => {
  timer = setTimeout(() => {
    disable.value = true;
  }, 60000);
};
//获取短信验证码
const codeCountDown = (endMsRes) => {
  countDownTime.value = Math.ceil((endMsRes - new Date().getTime()) / 1000); //剩余多少秒
  time = setTimeout(() => {
    countDownTime.value--;
    if (countDownTime.value < 1) {
      getCode.value = true;
      countDownTime.value = 60;
      disable.value = false;
      localStorage.removeItem("loginSendTime");
      clearTimeout(time);
    } else {
      codeCountDown(endMsRes);
    }
  }, 1000);
};
//获取验证码
const sendEmail = () => {
  console.log(email.value, "fdjskv");
  if (email.value != "") {
    //禁用按钮
    disable.value = true;
    console.log(email.value);
    //开启倒计时
    intervalShowButton();
    getCode.value = false;
    let endMsRes = new Date().getTime() + 60000; //当前时间戳加上一分钟的时间戳，相当于当前时间一分钟以后的时间戳
    localStorage.setItem("loginSendTime", JSON.stringify(endMsRes)); // 把这个一分钟时候的事件戳存起来
    codeCountDown(endMsRes); // 调用封装的方法，传入当前60秒时间
    //获取接口
    store
      .dispatch("getCode", { email: email.value })
      .then((result) => {
        code = result;
        console.log(code, "获得验证码");
      })
      .catch(() => {
        console.log("获取验证码失败");
        alert("获取验证码失败,请再试一次");
      });
  } else {
    console.log("请输入邮箱");
    alert("请输入邮箱");
    // ElMessage.error("登录失败，请检查用户名和密码");
  }
};
const validatePassword = () => {
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  if (
    password.value.length < 8 ||
    !letterRegex.test(password.value) ||
    !numberRegex.test(password.value)
  ) {
    return false;
  } else {
    return true;
  }
};
const onSubmit = () => {
  console.log(code1.value == code);
  if (code1.value == code) {
    console.log("密码", password.value);
    if (validatePassword()) {
      store
        .dispatch("userRegister", {
          email: email.value,
          password: password.value,
        })
        .then(() => {
          console.log("注册成功");
          alert("注册成功!");
          router.push({
            name: "login",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(" 密码必须由数字和字母构成,且不少于8位");
      alert(" 密码必须由数字和字母构成,且不少于8位");
    }
  } else {
    console.log("验证码错误");
    alert("验证码错误");
  }
};


  </script>
  <style scoped lang="scss">
  input::-webkit-input-placeholder {
    /*Webkit browsers*/
    color: #dedede;
    font-size: 14px;
  }
  .el-message {
    z-index: 9999; /* 设置一个较高的 z-index 值 */
  }
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    min-width: 1500px;
    min-height: 700px;
    background: url(../assets/images/2.jpg) no-repeat;
    background-size: cover;
    background-attachment: 100% 100%;
    overflow: hidden;
    .register-box {
      position: absolute;
      left: 50%; /* 定位父级的50% */
      top: 50%;
      transform: translate(-50%, -50%); /*自己的50% */
      width: 640px;
      height: 390px;
      background-color: #fff;
      border-radius: 20px;
      display: flex;
      align-items: center; /* 垂直居中对齐 */
      img {
        float: left;
        width: 54%;
        height: 75%;
        //让图片涂满并保持比例
        object-fit: cover;
      }
      .register-message {
        height: 100%;
        width: 46%;
        .register-in-message {
          height: 80%;
          width: 90%;
          margin: auto;
          margin-top: 37px;
          //表单
          .register-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 24px 0px 0;
            margin: 0 auto;
            overflow: hidden;
            .form_item {
              padding-bottom: 10px;
              margin-bottom: 8px;
              color: #454545;
              input {
                height: 37px;
                width: 80%;
                padding-left: 10px;
                border: 1px solid #f4f4f4;
                border-radius: 15px;
                /* 去除选中状态边框 */
                outline: none;
              }
              .register_send {
                display: inline-block;
                margin-left: 20px;
                border: 1px solid #509afe;
                background-color: #509afe;
                border-radius: 8px;
                height: 33px;
                width: 90px;
                line-height: 33px;
                text-align: center;
                color: #fff;
                cursor: pointer;
              }
              .i3 {
                width: 50%;
              }
            }
            button {
              transition: background-color 0.3s ease;
              background: linear-gradient(to right, #68acfd, #0360ff);
              margin-top: 5px;
              height: 40px;
              width: 100%;
              padding: 10px 20px;
              color: white;
              border: none;
              border-radius: 38px;
              cursor: pointer;
              text-align: center;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
            }
            button:hover {
              background: linear-gradient(to right, #ff3399, #3366ff);
            }
          }
        }
      }
    }
  }
  </style>
  