<template>
  <div class="container">
    <div class="my-table">
      <el-table ref="tableRef" row-class-name="用户反馈列表" class="marketing-table-style-1" :data="gridData"
        :header-cell-style="{
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
      }">
        <el-table-column align="center" property="pictureId" width="100" class-name="transparent-header">
          <template v-slot="{ row }">
            <span class="black">{{ row.pictureId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" property="pictureAddr" label="图片">
          <template v-slot="{ row }">
            <!-- preview-teleported="true"后面的表格不会显示 -->
            <el-image style="width: 50px; height: 50px; z-index: 20000" :src="row.pictureAddr"
              :preview-src-list="srcList" :initial-index="4" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" fit="over"
              preview-teleported="true" />
          </template>
        </el-table-column>
        <el-table-column align="center" property="localDateTime" label="时间">
          <template v-slot="{ row }">
            <span class="black">{{ row.localDateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" property="pictureStatus" label="状态">
          <template v-slot="{ row }">
            <span v-if="row.pictureStatus === 1" class="status">broke</span>
            <span v-else-if="row.pictureStatus === 2" class="status">circle</span>
            <span v-else-if="row.pictureStatus === 3" class="status">good</span>
            <span v-else-if="row.pictureStatus === 4" class="status">lose</span>
            <span v-else class="status">uncovered</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="{ row }">
            <el-button type="text" style="color: #337ecc; font-size: 16px" @click="handle(row)"><el-icon>
                <EditPen />
              </el-icon>处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<!-- row.pictureAdd -->
<script lang="ts" setup scoped>
import { ref, defineProps, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqexceptionPictureMQGet } from "@/api";
import { ITEM_RENDER_EVT } from "element-plus/es/components/virtual-list/src/defaults";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const gridData = ref([]);
// const url =
//   "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = ref([]);
const currentPage = ref(1);
const total = ref(100);
const small = ref(false);
const fetchData = async () => {
  let res = await reqexceptionPictureMQGet();
  if (res.code == 1) {
    gridData.value = res.data;
    store.state.reportData=res.data;
    console.log(res, "skksk");
    srcList.value = res.data.map((item) => item.pictureAddr);
  } else {
    alert("识别错误列表获取失败,请刷新重试");
  }
};

function handle(row) {
  //跳转识别错误的
  store.state.feedback = 1;
  //跳转路由
  store.state.ImageId = row.pictureId
  try {  
    // 直接设置窗口的location.href来跳转到链接  
    window.location.href = row.pictureAddr;  
  } catch (error) {  
    console.error('跳转到链接出错：', error);  
  }  
  if (router.currentRoute.value.path !== "/AppMain/Detection") {
    store.state.navigation = "井盖检测管理员 > 人工检测"
    router.replace("/AppMain/Detection");
  }

}

import axios from "axios";
import { serverAddress } from '@/MainComponent/config.ts'

// 在组件离开之前执行的操作
onBeforeUnmount(() => {
  // 在这里执行一些清理操作，比如取消订阅、清除定时器等
  for (let [key, item] of Object.entries(store.state.reportData)) {
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
});

onMounted(() => {
  fetchData();
});
</script>
<style lang="scss" scoped>
.container {
  width: 1220px;
  height: 660px;
  border-radius: 5px;
  z-index: 1;
  position: relative;
  top: 5px;
  left: 5px;
  display: flex;
  justify-content: center;
  overflow: auto;
  background-image: linear-gradient(rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)),
    /* 创建一个半透明白色层 */
    url("@/assets/111.jpg");
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  background-blend-mode: normal, overlay;

  /* 第一个背景层（半透明白层）与背景图片正常叠加，第二个背景图片使用overlay模式 */
  .my-table {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    z-index: 2;

    .el-table {
      margin-top: 15px;
      //背景变透明
      --el-table-border-color: transparent;
      --el-table-border: none;
      --el-table-text-color: #bdbdbe;
      --el-table-header-text-color: #bdbdbe;
      --el-table-row-hover-bg-color: #fff !important;
      --el-table-current-row-bg-color: #fff;
      --el-table-header-bg-color: transparent;
      --el-table-bg-color: transparent;
      --el-table-tr-bg-color: transparent;
      --el-table-expanded-cell-bg-color: transparent;
      background-color: transparent !important;

      .el-table_1_column_1 {
        background-color: transparent;
      }

      .cell {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        color: #4a765c;
        // font-size: 18px;
        font-weight: 550;
      }

      .black {
        color: black;
      }
    }

    //去除边框
    //避免单元格之间出现白色边框
    .el-table__row>td {
      border: none;
    }

    //修改表格边框颜色
    .el-table {
      --el-table-border-color: #ffffff;
    }
  }
}

.container::-webkit-scrollbar {
  width: 6px;
}

.container::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* 设置滚动条轨道背景色 */
}

.container::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  /* 设置滚动条滑块颜色 */
  border-radius: 4px;
  /* 设置滚动条滑块的圆角 */
}

.container::-webkit-scrollbar-thumb:hover {
  background-color: #989898;
  /* 设置滚动条滑块在悬停时的颜色 */
}
</style>
