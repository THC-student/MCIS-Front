<template>
  <div class="bottom-container">
    <p
      style="
        font-weight: 500;
        font-size: 20px;
        margin-top: 30px;
        margin-left: 65px;
      "
    >
      我的访问
    </p>
    <el-table-v2
      v-model:sort-state="sortState"
      :columns="columns"
      :data="data"
      :width="700"
      :height="400"
      fixed
      @column-sort="onSort"
      :row-event-handlers="{ onClick: rowClick }"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { useStore } from "vuex";
import { TableV2SortOrder } from "element-plus";
import type { SortBy, SortState } from "element-plus";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const columns = generateColumns();
const data = ref([]);
let showUser = ref(false);
onMounted(() => {
  fetchViewData();
});

//发送请求
function fetchViewData() {
  store
    .dispatch("getviews")
    .then((res) => {
      data.value = res.records;
    })
    .catch(() => {
      alert("获取列表失败");
    });
}
//表格单击事件
const rowClick = (row: RowEventHandlerParams) => {
  console.log(row.rowData.id);
  // window.open(
  //   `http://localhost:5173/persion1/viewuser/?id=${row.rowData.id}`,
  //   "_blank"
  // ); // 在新标签页打开链接
  store.state.navigation="井盖检测用户 > 个人中心 > 访问"
  router.push({ name: "viewuser", query: { id: row.rowData.id } });
};

//生成表头名
function generateColumns() {
  return [
    {
      dataKey: "id",
      width: 100,
      title: "用户ID",
    },
    {
      dataKey: "time",
      title: "访问时间", // 修改这里为新的表头名称
      width: 200,
      sortable: true,
    },
    {
      dataKey: "name",
      width: 200,
      title: "用户名",
    },
    {
      dataKey: "account",
      width: 200,
      title: "用户账号",
    },
  ];
}

columns[0].sortable = true;
columns[1].sortable = true;

const sortState = ref<SortState>({
  "column-0": TableV2SortOrder.DESC,
  "column-1": TableV2SortOrder.ASC,
});

const onSort = ({ key, order }: SortBy) => {
  sortState.value[key] = order;
  data.value = data.value.reverse();
};
</script>
<style lang="scss" scoped>
p{
  position: relative;
  top:-20px;
  left: -40px;
}
.bottom-container {
  position: absolute;
  top: 30%;
  background-color: #fff;
  width: 95%;
  height: 68%;
  border-radius: 5px;
  .el-table-v2 {
    position: relative;
    left: 50%; /* 定位父级的50% */
    top: 14%;
    transform: translate(-50%, -50%); /*自己的50% */
    height: 200px !important;
  }
}
</style>
