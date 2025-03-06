<template>
  <div class="showfeedback-container">
    <div class="my-table">
      <div class="top">
        <p style="color: #fff; font-weight: 20px; font-weight: 550">
          用 户 反 馈 列 表
        </p>
      </div>
      <el-table
        ref="tableRef"
        row-class-name="用户反馈列表"
        class="marketing-table-style-1"
        :data="gridData"
        :header-cell-style="{
          color: 'black',
          fontWeight: 'bold',
          fontSize: '16px',
        }"
        :cell-style="cellStyle"
        @row-click="handleTableRowClick"
      >
        <el-table-column
          align="center"
          property="userId"
          width="100"
          class-name="transparent-header"
        >
        </el-table-column>
        <el-table-column align="center" property="pictureAddr" label="图片">
          <template v-slot="{ row }">
            <el-image
              style="width: 50px; height: 50px"
              :src="row.pictureAddr"
              :preview-src-list="srcList"
              :initial-index="4"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" property="time" label="时间">
        </el-table-column>
        <el-table-column align="center" property="pictureStatus" label="状态">
          <template v-slot="{ row }">
            <span v-if="row.pictureStatus === 1" class="status">broke</span>
            <span v-else-if="row.pictureStatus === 2" class="status"
              >circle</span
            >
            <span v-else-if="row.pictureStatus === 3" class="status">good</span>
            <span v-else-if="row.pictureStatus === 4" class="status">lose</span>
            <span v-else class="status">uncovered</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="processed"
          label="已处理"
          :filters="[
            { text: 'Y', value: true },
            { text: 'N', value: false },
          ]"
          :filter-method="filterContent"
        >
          <template v-slot="{ row }">
            <el-switch
              inline-prompt
              v-model="row.processed"
              active-text="Y"
              inactive-text="N"
              :disabled="true"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="{ row }">
            <el-button
              type="text"
              style="color: #337ecc; font-size: 16px"
              @click="handle(row)"
              ><el-icon><EditPen /></el-icon>处理</el-button
            >
            <el-button
              type="text"
              style="color: red; font-size: 16px"
              @click="handleDelete(row)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="6"
          :small="small"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="mask" v-if="canvas"></div>
    <ShowDetails
      v-if="canvas"
      @closeDetail="handle1"
      :item="data"
    ></ShowDetails>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reqGetFeedbackDataList,reqHandleFeedback } from "../../api/index";
import { ElMessageBox, ElMessage, autoResizerProps } from "element-plus";
import { ElIconCircleCheck, ElIconLoading } from "element-plus/icons";
import ShowDetails from "./ShowDetails.vue";

const store = useStore();
const router = useRouter();
const gridData = computed(() => store.state.gridData);
const srcList = ref([]);
const currentPage = ref(1);
const total = computed(() => store.state.totalFeedback);
const small = ref(false);
const canvas = ref(false); //是否显示遮盖
const data = ref([]); //传递的数据
const option = ref(0); //时间搜索还是普通
const feedback = computed(() => store.state.feedback);

function filterContent(value, row) {
  return row.processed === value;
}
function handleTableRowClick(row) {
  console.log(row);
  canvas.value = !canvas.value;
  data.value = row;
}

function handle1() {
  console.log("接受自定义");
  canvas.value = false;
}

const boldFirstColumn = ({ row }: { row: TableRowData }) => {
  // Vue3的setup中可以直接使用props
  if (row.hasOwnProperty("id")) {
    return { fontWeight: "bold" };
  }
  return {};
};

const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  // 状态列字体颜色
  // columnIndex 列下标
  // rowIndex 行下标
  // row 行
  // column 列
  return { color: "black" };
};
//删除
const handleDelete = async (row) => {
  console.log(row.pictureId);
  ElMessageBox.confirm("你确认删除该用户?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      const index = gridData.value.findIndex(
        (item) => item.pictureId === row.pictureId
      );
      console.log(index,"js");
      console.log(row.userId, row.pictureId);
      if (index !== -1) {
        store
          .dispatch("deletefeedback", { id: row.pictureId })
          .then(() => {
            ElMessage({
              type: "success",
              message: "Delete completed",
            });
            gridData.value.splice(index, 1); // 从数据源中移除被确认删除的行
            // console.log("还是", store.state.tableData);
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Delete errored",
            });
          });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const handle=async(row)=> {
  console.log("aaa",row.pictureId)
  let res=await reqHandleFeedback(row.pictureId,"已处理");
  row.processed=true;
}
// const handle1=async(id)=> {
//   let res=await reqHandleFeedback(id,"已处理");
//   row.processed=true;
// }
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  store.state.optionpage = val;
  fetchData();
};

const fetchData = async () => {
  let res = await reqGetFeedbackDataList(currentPage.value);
  console.log(res.data.records, "djvg");
  if (res.code == 1) {
    // 增加一个processed属性,用于判定开关
    store.state.gridData = res.data.records.map((record) => {
      if (record.content === "已处理") {
        return { ...record, processed: true };
      } else {
        return { ...record, processed: false };
      }
    });
    console.log("xs", gridData.value);
    store.state.totalFeedback = res.data.total;
  }
};
onMounted(() => {
  store.state.option = 0;
  fetchData();
});

// 现在可以监听这两个计算属性的变化
watch([gridData, total,feedback], (newValues, oldValues) => {
  console.log("userData changed:", newValues, oldValues);
  console.log("feed改变",feedback.value)
  if(feedback.value===1){
    console.log("进来")
    handle(data.value);
  }

});
</script>
<style lang="scss" scoped>
.showfeedback-container {
  height: 88%;
  width: 93%;
  position: absolute;
  top: 10%;
  display: flex;

  .color1 {
    color: #5fb878;
    font-size: 17px;
  }
  .color2 {
    color: #ffb800;
    font-size: 17px;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* 这里的 0.5 表示半透明，您可以根据需求调整这个值 */
    z-index: 999;
  }

  .my-table {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    .top {
      height: 8%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(
        to right,
        #2380bd,
        #218ccb 50%,
        #348bc1 50%,
        #217cd7
      );
      border-top-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }

    .el-table {
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
        color: #51936d;
        // font-size: 18px;
        font-weight: 550;
      }
    }

    //去除边框
    //避免单元格之间出现白色边框
    .el-table__row > td {
      border: none;
    }

    //修改表格边框颜色
    .el-table {
      --el-table-border-color: #ffffff;
    }
    .fenye {
      height: 100px;
      width: 100%;
      position: absolute;
      top: 85%;
      display: flex;
      justify-content: center;
      align-items: center;

      ::v-deep .el-pagination .btn-next,
      ::v-deep .el-pagination .btn-prev {
        background: transparent !important;
        background-color: transparent !important;
      }
      ::v-deep .el-select-dropdown__item li {
        background-color: transparent !important;
      }
      // prev和next箭头的样式

      // prev和next箭头disabled的样式
      ::v-deep .el-pagination button:disabled {
        background-color: transparent !important;
      }
      // 页码样式
      ::v-deep .el-pager li {
        background-color: transparent !important;
      }
      // active的页码样式
      ::v-deep .el-pager li.active {
        color: #267aff !important;
      }
      /* 去掉el-pagination中jumper的背景颜色 */
      ::v-deep .el-pagination__jump .el-input {
        background-color: transparent !important;
      }

      /* 如果需要去掉hover状态下的背景色，也可以加上以下样式 */
      ::v-deep .el-pagination__jump:hover {
        background-color: transparent;
      }
    }

    // page-sizes选择器
  }
}
</style>
