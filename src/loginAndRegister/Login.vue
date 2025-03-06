<template>
  <div class="container">
    <div class="login-box" :style="{ backgroundColor: !isAdminLogin ? '#fff' : '' }">
      <img src="@/assets/left-login.png" alt="" v-if="!isAdminLogin" />
      <transition name="slide">
        <div class="login-message">
          <div class="login-in-message">
            <h2 style="margin-bottom: 10px">BTW井盖系统检测平台</h2>
            <p style="color: #79bbff">welcome 欢迎登录</p>
            <!-- 登录选择,管理员,用户 -->
            <button :class="{ active: !isAdminLogin }" class="option" @click="switchToUserLogin"
              style="margin-left: 10px">
              User
            </button>
            <button :class="{ active: isAdminLogin }" class="option" @click="switchToAdminLogin"
              style="margin-left: 60px">
              Admin
            </button>
            <form class="login-form" @submit.prevent="login">
              <div class="form_item">
                <span class="svg-container">
                  <img src="@/assets/user.svg" style="width: 100%; height: 100%" />
                  <!-- <svg-icon icon-class="user" /> -->
                </span>
                <input type="text" maxlength="20" oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')"
                  placeholder="请输入用户名" v-model="username" data-value="username" />
              </div>

              <div class="form_item">
                <span class="svg-container">
                  <!-- <v-icon name="password"></v-icon> -->
                  <!-- <i class="v-icon-password"></i> -->
                  <img src="@/assets/password.svg" style="width: 100%; height: 100%" />
                </span>
                <input maxlength="15" minlength="8" type="password" v-model="password"
                  oninput="value=value.replace(/[\u4e00-\u9fa5\s]/g,'')" placeholder="请输入密码" />
              </div>

              <button type="submit">立即登录</button>
            </form>
            <div class="tips">
              <router-link to="/register" v-if="!isAdminLogin" style="
                    color: #4c95fe;
                    margin-top: 10px;
                    display: block;
                    font-weight: bold;
                    position: relative;
                    left:15px;
                  ">注册</router-link>
            </div>
          </div>
        </div>
      </transition>
      <img src="@/assets/admin-left.png" alt="" v-if="isAdminLogin" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, defineProps } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

name: "login";
const props = defineProps({});
let { state, dispatch } = useStore();
const router = useRouter();
let isAdminLogin = ref(false);
const username = ref("");
const password = ref("");
let option = ref(2);

onMounted(() => {
  console.log("登录组件已挂载到 DOM 中！", state.token);
});
function switchToAdminLogin() {
  isAdminLogin.value = true;
  option.value=1;
  console.log(isAdminLogin.value, option.value);
}
function switchToUserLogin() {
  isAdminLogin.value = false;
  option.value=2;
  console.log(isAdminLogin.value, option.value);
}
// watch(isAdminLogin, (newValue, oldValue) => {
//   option.value = isAdminLogin == "true" ? 1 : 2;
// });
function login() {
  console.log("登录",option.value);
  dispatch("userLogin", {
    username: username.value,
    password: password.value,
    option: option.value,
  })
    .then(() => {
      const token = state.token;
      localStorage.setItem("token", token);
      localStorage.setItem("password",password.value)
      localStorage.setItem("account",username.value)
      localStorage.setItem("option",option.value)
      localStorage.setItem("id",state.userId)
      console.log("去灯枯")
      //登录成功进行路由跳转,2是用户,1是管理员
      if (option.value == 1) {
        console.log(state.identity, "管理员")
        if (router.currentRoute.value.path !== "/AppMain/ManagePerson") {
          router.replace("/AppMain/ManagePerson");
        }
        state.identity = "管理员"
        console.log(state.identity)
      }

      else if(option.value==2) {
        console.log(state.identity, "df")
        console.log("用户")
        if (router.currentRoute.value.path !== "/AppMain") {
          router.replace("/AppMain");
        }
        state.identity = "用户"
        console.log(state.identity)
      }
      console.log("option---"+option.value)
       localStorage.setItem("identity", state.identity); 
      // localStorage.setItem("identity", '管理员');
      console.log('state.identity', state.identity)
      
    })
    // .catch(() => {
    //   alert("登录失败，请检查用户名和密码");
    // });
}
</script>
<style scoped lang="scss">
input::-webkit-input-placeholder {
  /*Webkit browsers*/
  color: #dedede;
  font-size: 14px;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1500px;
  min-height: 700px;
  background: url(@/assets/login-base.jpg) no-repeat;
  background-size: cover;
  background-attachment: 100% 100%;
  overflow: hidden;
  

  .login-box {
    position: absolute;
    left: 50%;
    /* 定位父级的50% */
    top: 50%;
    transform: translate(-50%, -50%);
    /*自己的50% */
    width: 640px;
    height: 390px;
    border-radius: 20px;
    border: 1px solid #415398;
    box-shadow: -5px 5px 9px #7687db;
    display: flex;
    align-items: center;

    /* 垂直居中对齐 */
    img {
      // float: left;
      width: 50%;
      height: 100%;
      //让图片涂满并保持比例
      object-fit: cover;
    }

    .slide-enter-active,
    .slide-leave-active {
      transition: transform 2.5s ease;
    }

    .slide-enter,
    .slide-leave-to {
      transform: translateX(50%);
    }

    .slide-enter-to,
    .slide-leave {
      transform: translateX(0);
    }

    .login-message {
      height: 100%;
      width: 50%;

      .login-in-message {
        position: relative;
        left:-10px;
        height: 80%;
        width: 90%;
        margin: auto;
        margin-top: 30px;

        h2,
        p {
          position: relative;
          left:10px;
          margin: 0;
          /* 去除默认的外边距 */
          padding: 0;
          /* 去除默认的内边距 */
        }

        .option {
          border:none;
          outline:none;
          //border: none;
          padding-top: 10px;
          background-color: transparent;
          /* 方法一：设置背景颜色为透明 */
          font-family: Arial, sans-serif;
          cursor: pointer;
          font-size: 18px;
        }

        .active {
          font-weight: bold;
          color: #6790fc;
        }

        //表单
        .login-form {
          position: relative;
          left: 20px;
          width: 520px;
          max-width: 100%;
          padding: 18px 0px 0;
          margin: 0 auto;
          overflow: hidden;

          .form_item {
            // padding-bottom: 5px;
            margin-bottom: 27px;
            border-bottom: 1px solid #f5f5f5;
            color: #454545;

            .svg-container {
              padding-left: 4px;
              color: #889aa4;
              vertical-align: middle;
              width: 25px;
              height: 25px;
              display: inline-block;
              overflow: hidden;
            }

            input {
              margin-left: 10px;
              height: 30px;
              width: 70%;
              /* 去掉边框 */
              border: 0;
              /* 去除选中状态边框 */
              outline: none;
            }
          }

          button {
            margin-top: 10px;
            height: 40px;
            width: 80%;
            padding: 10px 20px;
            background-color: #4c95fe;
            color: white;
            border: none;
            border-radius: 38px;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;
            outline: none;
          }

          button:hover {
            background-color: darkblue;
          }
        }
      }
    }
  }
}
</style>