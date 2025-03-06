<template>
  <div class="rightbottom-container">
    <p>排行榜</p>
    <ul class="rank-body">
      <li
        v-for="(user, index) in users"
        :key="index"
        @click="goIntoUser(user.userId)"
      >
        <div class="num">{{ index + 1 }}</div>
        <dl class="author">
          <dt class="avatar">
            <!-- <img src="@/assets/images/huangguan-1.svg" class="img-bg" /> -->
            <template v-if="index < 3">
              <img :src="getImage(index)" class="img-bg" />
            </template>
            <img :src="user.userHead" />
          </dt>
          <dd>{{ user.userName }}</dd>
        </dl>
        <div class="rank-ability">{{ user.number }}检测量</div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import h1 from "@/assets/huangguan-1.svg";
import h2 from "@/assets/huangguan-2.svg";
import h3 from "@/assets/huangguan-3.svg";
const props = defineProps({});
const store = useStore();
const router = useRouter();

const images = ref([h1, h2, h3]);
const users = ref([]);

function getImage(index) {
  return images.value[index] || null;
}
onMounted(() => {
  //获取排行榜
  var cachedUsers = sessionStorage.getItem("cachedUsersRank");
  if (cachedUsers) {
    //如果存在缓存直接用
    // renderUserList(JSON.parse(cachedUsers));
    users.value = JSON.parse(cachedUsers);
    console.log(JSON.parse(cachedUsers));
  } else {
    //如果不存在,就发送请求获取
    fetchUserData();
  }
});

function goIntoUser(id) {
  router.push({ name: "viewuser", query: { id: id } });
}

//获取数据
function fetchUserData() {
  store.dispatch("getChart").then((res) => {
    let users1=res.slice(0, 9); 
    //将获取到的存到localStorage
    sessionStorage.setItem("cachedUsersRank", JSON.stringify(users1));
    users.value = users1;
    //将获取到的渲染到页面
    // renderUserList(res);
  });
}

</script>
<style lang="scss" scoped>
.rightbottom-container {
  height: 82%;
  width: 100%;
  position: absolute;
  top: 50%;
  background-color: #fff;
  border-radius: 16px;
  display: flex;
  //   justify-content: center;
  //   align-items: center;
  /* 标题 */
  p {
    display: inline-block !important;
    font-size: 24px;
    font-weight: 600;
    height: 50px !important;
    padding: 0px 20px;
  }
  .rank-body {
    position: absolute;
    padding: 0 30px 20px;
    height: 85%;
    width: 83%;
    top: 40px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0px;
      line-height: 20px;
      cursor: pointer;
      .num {
        font-size: 20px;
        margin-right: 20px;
      }
      .author {
        display: flex;
        align-items: center;
        flex: 1;
        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 19px;
          margin-right: 10px;
          position: relative;
          vertical-align: middle;
          img {
            width: 30px;
            height: 30px;
            margin-top: 5px;
            border-radius: 50%;
            z-index: 2;
          }
          .img-bg {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 8px;
            top: -19px;
            z-index: 3;
          }
        }
      }
      .rank-ability {
        color: #999;
      }
    }
    li:nth-child(1) .num {
      color: #de5149;
    }

    li:nth-child(2) .num {
      color: #ef8634;
    }

    li:nth-child(3) .num {
      color: #f6cb46;
    }
  }
  //     /* 每项样式 */
  //     .item {
  //
  //
  //
  //           img {
  //             width: 40px;
  //             height: 40px;
  //             border-radius: 50%;
  //           }
  //           .img-bg {
  //             width: 46px;
  //             height: 54px;
  //             position: absolute;
  //             left: 0;
  //             bottom: 0;
  //             z-index: 1;
  //           }
  //         }
  //       }
  //
  //     }

  //   }
}
</style>
