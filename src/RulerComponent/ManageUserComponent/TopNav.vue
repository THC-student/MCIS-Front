<template>
  <div class="top-container">
    <div class="btn-box">
      <el-button type="primary" @click="batchdel"
        ><Delete
          style="width: 1em; height: 1em; margin-right: 8px"
        />批量删除</el-button
      >
      <el-input
        v-model.number="input.id"
        type="number"
        style="width: 80px; margin-left: 15px"
        placeholder="ID"
      />
      <el-input
        v-model="input.username"
        style="width: 240px; margin-left: 15px"
        placeholder="用户名"
      />
      <el-button type="primary" style="margin-left: 15px" @click="handleSearch"
        ><el-icon style="margin-right: 5px"><Search /></el-icon>搜索</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
const props = defineProps({});
const store = useStore();
const router = useRouter();

const input = ref({
  id: "",
  username: "",
});
function batchdel() {
  store.commit("DELETE");
}

function handleSearch() {
  console.log(input.value.id, "dcs", input.value.username);
  if (input.value.id || input.value.username) {
    store
      .dispatch("searchuser", {
        id: input.value.id,
        name: input.value.username,
      })
      .then((res) => {
        console.log("你好", res.records, res.total);
        store.state.userlist.total = res.total;
        store.state.tableData = res.records;
      });
  } else {
    alert("请输入要搜索的ID或用户名");
  }
}

</script>
<style lang="scss" scoped>
.top-container {
  height: 10%;
  width: 95%;
  position: absolute;
  top: 0px;
  display: flex;
  background-color: #fff;
  align-items: center;
  .btn-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .el-botton {
      .el-icon {
        height: 14px !important;
        width: 14px !important;
      }
    }
  }
}
</style>
