<template>
    <div class="table-container">
      <el-table
        :data="tableData"
        :border="true"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        max-height="600px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          
        ></el-table-column>
  
        <el-table-column prop="id" label="ID" width="120" >
        </el-table-column>
  
        <el-table-column prop="account" label="账号"> </el-table-column>
  
        <el-table-column prop="username" width="140" label="用户名">
        </el-table-column>
  
        <el-table-column prop="sex" width="60" label="性别"> </el-table-column>
  
        <el-table-column prop="age" width="80" label="年龄"> </el-table-column>
  
        <el-table-column label="检测量" prop="total" >
        </el-table-column>
  
        <el-table-column label="上报量"  prop="feedback">
        </el-table-column>
  
        <el-table-column label="操作" width="180" >
          <template v-slot="{ row }">
            <!-- <el-button type="text" style="color: #409eff; font-weight: bold"
              ><el-icon><EditPen /></el-icon>编辑</el-button
            > -->
            <el-button
              type="text"
              style="color: red; font-weight: bold"
              @click="handleDelete(row)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[6, 8, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import {
    ref,
    defineProps,
    onMounted,
    computed,
    watch,
    getCurrentInstance,
  } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { reqManageGetList } from "../../api";
  // 导入ElMessageBox
  import { ElMessageBox, ElMessage } from "element-plus";
  const currentPage = ref(1);
  const props = defineProps({});
  const store = useStore();
  const router = useRouter();
  const tableData = computed(() => store.state.tableData);
  const total = computed(() => store.state.userlist.total);
  const deleteflag = computed(() => store.state.deleteBatch);
  const pageSize = ref(10);
  const allUsers = ref([]);
  const selectedIds = ref([]);
  const getUserList = async () => {
  let result = await reqManageGetList(pageSize.value, currentPage.value);
  console.log("管理员", result.data);
  if (result.code == 1) {
    store.state.tableData = result.data.records;
    tableData.value = result.data.records;
    store.state.userlist.total = result.data.total;
    total.value = result.data.total;
    console.log(tableData.value, "和", store.state.userlist.total);
  } else {
    alert("获取用户列表失败,请刷新重试");
  }
};

const handleDelete = async (row) => {
  console.log(row.id);
  ElMessageBox.confirm("你确认删除该用户?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      const index = tableData.value.findIndex((item) => item.id === row.id);
      if (index !== -1) {
        store
          .dispatch("deleteuser", { id: row.id })
          .then(() => {
            ElMessage({
              type: "success",
              message: "Delete completed",
            });
            tableData.value.splice(index, 1); // 从数据源中移除被确认删除的行
            console.log("还是", store.state.tableData);
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Delete canceled",
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

const handleSelectionChange = (selection) => {
  selectedIds.value = selection;
  //   const selectedIds = selection.map((item) => item.id);
  //   console.log("Selected row IDs:", selectedIds);
  //   store.state.selectedIds = selectedIds;
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  console.log(`${val} 每页`);
  store.state.pagesize = val;
  getUserList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  console.log(`当前页: ${currentPage.value}`);
  store.state.pagenum = val;
  getUserList();
};

function deleteBatch() {
  console.log(selectedIds.value);
  let length = selectedIds.value.length;
  let i = 0;
  console.log(length);
  ElMessageBox.confirm("你确认删除这些用户?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      selectedIds.value.forEach((row) => {
        const index = tableData.value.findIndex((item) => item.id === row.id);
        console.log(index);
        if (index !== -1) {
          store
            .dispatch("deleteuser", { id: row.id })
            .then(() => {
              i++;
              tableData.value.splice(index, 1); // 从数据源中移除被确认删除的行
              console.log("还是", store.state.tableData);
              console.log(i, "循环");
              if (i === length) {
                ElMessage({
                  type: "success",
                  message: "Delete completed",
                });
              }
            })
            .catch(() => {});
        } else {
          ElMessage({
            type: "info",
            message: "Delete errored",
          });
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
}

// 现在可以监听这两个计算属性的变化
watch([tableData, total, deleteflag], (newValues, oldValues) => {
  const [newtableData, newTotal, newDeleteflag] = newValues;
  const [oldtableData, oldTotal, oldDeleteflag] = oldValues;

  console.log("userData changed:", newtableData, oldtableData);
  // console.log("total changed:", newTotal, oldTotal, newDeleteflag);
  // console.log("变化", tableData.value, total.value);
  if (oldDeleteflag != newDeleteflag) {
    deleteBatch();
  }
  // 在这里执行你的逻辑
});

onMounted(() => {
  //拉取用户
  getUserList();
});

  </script>
  <style lang="scss" scoped>
  .table-container {
    height: 87%;
    width: 95%;
    position: absolute;
    top: 11%;
    display: flex;
    justify-content: center;
    .cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .el-table--fit {
      width: 100% !important;
      height: 90% !important;
      max-height: 700px !important;
      .el-table__inner-wrapper {
        max-height: 700px !important;
        .el-scrollbar__wrap {
          max-height: 700px !important;
        }
      }
    }
    .fenye {
      height: 10%;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
    }
  }
  </style>
  