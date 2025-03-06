<template>
  <div class="leftmenu-box">
    <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
      ref="treeRef"
      node-key="id"
      :default-expanded-keys="expandedKeys"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed, watch, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { expandKeys } from "element-plus/es/components/table-v2/src/common";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const id = computed(() => store.state.activeTreeNodeIndex);
const treeRef = ref(null);
const expandedKeys = ref([]);
interface Tree {
  label: string;
  children?: Tree[];
}

function expandNode(key) {
  treeRef.value.setCheckedKeys([key]);
  treeRef.value.setCurrentKey(key); // 这个方法在某些版本中用于定位到节点
  treeRef.value.updateKeyChildren(key, () => ({ expanded: true }));
}
const handleNodeClick = (data: Tree) => {
  console.log(data);
  console.log(data.id > 10);
  if (data.id > 10) {
    store.commit("GETPHOTOS", data.id);
  }
  //判断获取什么类别
  console.log(data.id);
};
// : Tree[]
const data = ref([
  {
    id: 1,
    label: "G o o d",
    children: [
      {
        id: 11, // 子节点的唯一标识符
        label: "Official",
      },
      {
        id: 12, // 子节点的唯一标识符
        label: "User",
      },
    ],
  },
  {
    id: 2,
    label: "C i r c l e",
    children: [
      {
        id: 21, // 子节点的唯一标识符
        label: "Official",
      },
      {
        id: 22, // 子节点的唯一标识符
        label: "User",
      },
    ],
  },
  {
    id: 3,
    label: "B r o k e",
    children: [
      {
        id: 31, // 子节点的唯一标识符
        label: "Official",
      },
      {
        id: 32, // 子节点的唯一标识符
        label: "User",
      },
    ],
  },
  {
    id: 4,
    label: "L o s e",
    children: [
      {
        id: 41, // 子节点的唯一标识符
        label: "Official",
      },
      {
        id: 42, // 子节点的唯一标识符
        label: "User",
      },
    ],
  },
  {
    id: 5,
    label: "U n c o v e r e d",
    children: [
      {
        id: 51, // 子节点的唯一标识符
        label: "Official",
      },
      {
        id: 52, // 子节点的唯一标识符
        label: "User",
      },
    ],
  },
]);

onMounted(() => {
  watch(id, (newValues, oldValues) => {
    console.log("变化", id.value);
    console.log(id.value.toString().startsWith("2"));
    store.commit("GETPHOTOS", id.value);
    const iddata = id.value;
    expandedKeys.value = [Math.floor(iddata / 10)];
  });
});

const defaultProps = {
  children: "children",
  label: "label",
};
</script>
<style lang="scss" scoped>
.leftmenu-box {
  position: absolute;
  //   top: 10%;
  margin-top: 30px;
  margin-left: 30px;
  height: 475px;
  width: 215px;
  position: fixed;
  z-index: 888;
  .el-tree {
    color: #5698c3;
  }
}
</style>
