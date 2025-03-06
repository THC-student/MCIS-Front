<template>
    <div class="userDetectionData">
        <div class="table">
            <el-table :data="tableData" style="width: 100%;height:108%">
                <el-table-column fixed prop="pictureId" label="图片ID" width="100" />
                <el-table-column prop="userId" label="上传用户ID" width="150" />
                <el-table-column prop="originAddr" label="原始图片" width="150">
                    <template v-slot="scope">
                        <img :src="scope.row.originAddr" style="width: 35%; height: auto;">
                    </template>
                </el-table-column>
                <el-table-column prop="pictureAddr" label="检测后图片" width="150">
                    <template v-slot="scope">
                        <img :src="scope.row.pictureAddr" style="width: 35%; height: auto;">
                    </template>
                </el-table-column>
                <el-table-column prop="pictureStatus" label="检测状态" width="120" :filters="[
                { text: '井盖损坏', value: 1 },
                { text: '边缘损坏', value: 2 },
                { text: '正常无损', value: 3 },
                { text: '井盖丢失', value: 4 },
                { text: '井盖未盖', value: 5 },
            ]" :filter-method="filterTag2" filter-placement="bottom-end">
                    <template #default="scope">
                        <el-tag disable-transitions>{{ getStatus(scope.row.pictureStatus) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pictureJudge" label="维修状态" width="120" :filters="[
                { text: '未上报', value: 0 },
                { text: '维修中', value: 1 },
                { text: '已维修', value: 2 },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                    <template #default="scope">
                        <el-tag disable-transitions>{{
                getTextByContent(scope.row.pictureJudge) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pictureTime" label="检测时间" width="220" />
                <el-table-column prop="count" label="井盖数量" width="120" />
                <el-table-column fixed="right" label="加入数据集" width="120">
                    <template #default="scoped">
                        <el-button link type="primary" size="small" @click="AddData(scoped.row)">加入数据集</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="fenye">
                <el-pagination :current-page="currentPage" @current-change="handlePageChange" background
                    layout="prev, pager, next,jumper,total" :total="total"
                    style="display: flex; justify-content: center;" />
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const currentPage = ref(1);
const total = ref(0);

function filterTag(value, row) {
    return row.pictureJudge === parseInt(value, 10);
}
//根据内容不同展示不同文本
const getTextByContent = computed(() => (content) => {
    switch (content) {
        case 2:
            return '已维修';
        case 1:
            return '维修中';
        default:
            return '未上报';
    }
});

function filterTag2(value, row) {
    return row.pictureStatus === parseInt(value, 10);
}
//根据不同展示不同状态
const getStatus = computed(() => (status) => {
    switch (status) {
        case 1:
            return '井盖损坏';
        case 2:
            return '边缘损坏';
        case 3:
            return '井盖完好';
        case 4:
            return '井盖丢失';
        default:
            return '井盖未盖';
    }
})


const tableData = ref(null)
import axios from "axios";
import { serverAddress } from '@/MainComponent/config.ts'
function AddData(item: any) {
    axios({
        url: `${serverAddress}/official/addToOfficial`,
        /* url: "https://mock.apifox.com/m2/4101048-0-default/155886176", */
        method: "POST",
        data: {
            pictureAddr: item.pictureAddr,
            pictureStatus: item.pictureStatus,
        },
    }).then((response) => {
        alert(response.data.data)
    })

}


onMounted(async () => {
    fetchData(currentPage.value)
});

// 分页器页码改变时发送请求
function handlePageChange(newPage) {
    currentPage.value = newPage;
    console.log("当前页", currentPage.value)
    fetchData(newPage);
}

async function fetchData(page) {
    axios({
        url: `${serverAddress}/root/GetAllUserData/${currentPage.value}`,
        /* url: "https://mock.apifox.com/m1/4101048-0-default/root/GetAllUserData/${currentPage.value}", */
    }).then((response) => {
        if (response.data.code == 1) {
            console.log('分页显示',response.data)
            tableData.value=response.data.data.records;
            total.value=response.data.data.total;
            console.log(total.value,"sf",response.data.data.total)
        } else {
            console.log('分页失败')
        }
    }).catch(error => {
        alert("出现" + error + "错误，请重新操作")
    })
}

</script>
<style scoped>
.userDetectionData {
    border: 1.5px solid rgb(148, 191, 239);
    border-radius: 0.4rem;
    height: 660px;
    width: 1220px;
    background-color: #ffffff;
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 5px;
    display: flex;
    justify-content: center;
}

.table {
    width: 90%;
    height: 500px;
    position: relative;
    top: 50px;
}

.fenye {
    position: relative;
    top: 15px;
}
</style>