<template>
  <div class="container" >
    <div class="nav">
      <p>数&nbsp据&nbsp({{ total }})</p>
      <el-button style="position: relative;top:40px;left: -250px;" type="primary" @click="handleClick1">查看全部</el-button>
      <el-button style="position: relative;top:40px;left: -250px;" type="success" @click="handleClick2">查看已上报</el-button>
      <div class="search">
        <div class="searchBar">
          <input class="search-txt" type="text" placeholder="请输入搜索关键词" @keydown.enter="handleSearch"
            v-model="searchKeyword" />
          <img class="search-btn" src="../assets/搜索.svg"
            style="height: 25px; width: 25px;position: relative;top:3px;left:-1px "></img>

        </div>
      </div>
    </div>

    <div class="table" >
      <el-table :data="items" style="width: 1400px;" >
        <el-table-column fixed prop="pictureId" label="图片ID" width="120" />
        <el-table-column fixed prop="pictureTime" label="时间" width="250" />
        <el-table-column prop="pictureAddr" label="图片" width="150" >
           
          <template v-slot="scope">  
      <img :src="scope.row.pictureAddr" style="width: 35%; height: 40px;">  
    </template>
   
        </el-table-column>
        <!-- <el-table-column prop="status" label="检测状态" width="120" /> -->
        <el-table-column prop="pictureStatus" label="检测状态" width="120" 
        :filters="[
        { text: '井盖损坏', value: 1 },
        { text: '边缘损坏', value: 2 },
        { text: '正常无损', value: 3 },
        { text: '井盖丢失', value: 4 },
        { text: '井盖未盖', value: 5 },
      ]" 
      :filter-method="filterTag2" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag  disable-transitions>{{ getStatus(scope.row.pictureStatus) }}  </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pictureJudge" label="维修状态" width="120" 
        :filters="[
        { text: '未上报', value: 0 },
        { text: '维修中', value: 1 },
        { text: '已维修', value: 2 },
      ]" 
      :filter-method="filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag  disable-transitions v-if="option==1||option==3">{{ getTextByContent(scope.row.pictureJudge) }}  </el-tag>
            <el-tag  disable-transitions v-if="option==2">{{ getTextByContent1(scope.row.content) }}  </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="content" label="维修状态" width="120" /> -->
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="errorBack(scope.row)" v-if="option==1" style="outline: none;">错误反馈</el-button>
            <el-button link type="primary" size="small" @click="feedback(scope.row)" v-if="option==1" style="outline: none;">上报维修</el-button>
            <el-button link typw="primary" size="small" @click="handleButtonClick(scope.row.pictureJudge, scope.row.pictureId)" style="outline: none;">查看详情</el-button>
            
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="fenye">
      <el-pagination :current-page="currentPage" @current-change="handlePageChange" background
        layout="prev, pager, next,jumper,total" :total="total" style="display: flex; justify-content: center;" />
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({});
const store = useStore();
const router = useRouter();
const searchKeyword = ref("");
// let sliderPosition = ref(0);
const currentPage = ref(1);
let items = ref([]);
const total = ref(0);
let option = ref(1);
let status = ref(0);
let searchTime = ref("")



function handleClick2() {
  console.log('1')
 // sliderPosition.value = 50;
  option.value = 2;
  var cachedHistoryData = sessionStorage.getItem("cachedGoing");
  if (cachedHistoryData) {
    //如果存在缓存直接用
    console.log("缓存");

    const parsedCachedData = JSON.parse(cachedHistoryData);
    items.value = parsedCachedData.records;
    total.value = parsedCachedData.total;
    console.log(items, "1");
    console.log(JSON.parse(cachedHistoryData));
  } else {
    //如果不存在,就发送请求获取
    fetchData(1);
    console.log("发送");
  }
}
function handleClick1() {
  console.log("2")
  // sliderPosition.value = 0;
  option.value = 1;
  var cachedHistoryData = sessionStorage.getItem("cachedHistory");
  if (cachedHistoryData) {
    //如果存在缓存直接用
    console.log("缓存");

    const parsedCachedData = JSON.parse(cachedHistoryData);
    items.value = parsedCachedData.records;
    total.value = parsedCachedData.total;
    console.log(items, "1");
    console.log(JSON.parse(cachedHistoryData));
  } else {
    //如果不存在,就发送请求获取
    fetchData(1);
    console.log("发送");
  }
}

//跳转详情或上报
function handleButtonClick(content, id) {
  // switch (content) {
  //   case 1:
  //   case 2:
  //     console.log("跳转")
  //     store.state.navigation="井盖检测用户 > 历史数据 > 查看数据详情"
  //     // window.open(`http://localhost:5173/historydata/details/?pictureId=${id}`, '_blank'); // 在新标签页打开链接
  //     // router.replace( "/AppMain/details");
      store.state.pictureId=id;
      router.push({ name: "details", query: { pictureId: id } });
  //     break;
  //   default:
  //     console.log("点击了上报")
  //     router.push({ name: 'feedback', query: { pictureId: id } })
  // }
}

function getInformation(item){//获取需要上报的信息存在vuex里面
  store.state.beforeUrl=item.pictureAddr
  store.state.afterUrl=item.originAddr
  store.state.ImageId=item.pictureId
}
//跳转错误反馈
function errorBack(item) {
  getInformation(item)
  store.state.navigation="井盖检测用户 > 反馈上报 > 检测错误上报"
  router.push({ name: 'ErrorEscalation', query: { pictureId: item.pictureId } })
}
function feedback(item){
  getInformation(item)
  if (router.currentRoute.value.path !== "/AppMain/Feedback/ProblemEscalation") {
    store.state.navigation="井盖检测用户 > 反馈上报 > 井盖维修上报"
        router.replace( "/AppMain/Feedback/ProblemEscalation");
      }
}

//搜索
function handleSearch() {
  const keywordToStatusMap = {
    '好': 3,
    '丢失': 4,
    '没盖': 5,
    '损坏': 1,
    '井圈': 2,
    'good': 3,
    'lost': 4,
    "lose": 4,
    'missing': 4,
    "uncover": 5,
    "uncovered": 5,
    'damaged': 1,
    "broke": 1,
    "broken": 1,
    'well-ring': 2,
    "circle": 2
  };
  //提取关键词
  const allKeywords = [...Object.keys(keywordToStatusMap)];
  for (const keyword of allKeywords) {
    if (searchKeyword.value.includes(keyword)) {
      // 获取对应的状态数字
      status.value = keywordToStatusMap[keyword];
    }
  }
  searchTime.value = parseDateTime(searchKeyword.value.trim());
  console.log(searchTime.value, "时间", status.value)
  store.dispatch("selecthistory", {
    pagenum: 1,
    pictureTime: searchTime.value,
    pictureStatus: status.value
  }).then((response) => {
    items.value = response.records;
    total.value = response.total;
    option.value = 3;
  })

}

// 处理时间格式
function parseDateTime(input) {
  const datePattern1 = /^(\d{4})[\s.-]?(\d{1,2})?[\s.-]?(\d{1,2})?$/;
  const datePattern2 = /^(\d{4})(\.|\/)(\d{1,2})(\.|\/)?(\d{1,2})?$/;

  let match;

  // 匹配年月日（含间隔符或无间隔符）
  if ((match = input.match(datePattern1))) {
    return input;
  }

  // 匹配年.月或年.月.日
  else if ((match = input.match(datePattern2))) {
    return input.replace(/\./g, '-').replace(/\\/g, '-');
  }

  // 只包含年份的情况
  else if (/^\d{4}$/.test(input)) {
    return `${input}-00-00`;
  }

  // 只包含年份和月份的情况
  else if (/^(\d{4})[\s.-]?(\d{1,2})$/.test(input)) {
    return `${input}-00`;
  }

  // 只包含月份的情况
  // （注：通常只输入月份没有实际意义，此处假设为了后端接口需要返回特定格式）
  else if (/^\d{1,2}$/.test(input)) {
    return `0000-${input}-00`;
  }

  // 如果没有匹配到有效日期，则返回空字符串
  return '';
}

const getClassByContent = computed(() => (content) => {
  // 根据content的值返回不同的CSS类名
  switch (content) {
    case 1:
      return 'feedback';
    case 2:
      return "going";
    default:
      return 'never';
  }
});


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

//根据内容不同展示不同文本
const getTextByContent1 = computed(() => (content) => {
    if(content==null){
      return '维修中';
    }else{
      return '已维修';
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
//根据不同展示按钮不同选项
const getBtnText = computed(() => (content) => {
  switch (content) {
    case 1:
    case 2:
      return '查看详情';
    default:
      return '上报';
  }
});

// 页面加载完成时发送请求
onMounted(async () => {
  await fetchData(currentPage.value);
});

// 分页器页码改变时发送请求
function handlePageChange(newPage) {
  currentPage.value = newPage;
  console.log("当前页", currentPage.value)
  fetchData(newPage);
}

async function fetchData(page) {
  // 这里是你的API请求逻辑，根据页码获取对应的数据
  // 假设getData是一个返回Promise的函数，用于从后端获取数据
  if (option.value != 3) {
    store.dispatch("gethistory", { pagenum: currentPage.value, option: option.value }).then((response) => {
      items.value = response.records;
      /* items.value = response */
      total.value = response.total;
      console.log("数据",items.value , "总数",)
      if (option.value == 1) {
        sessionStorage.setItem("cachedHostory", JSON.stringify(response));
      } else if(option.value == 2){
        sessionStorage.setItem("cachedGoing", JSON.stringify(response));
      }
    })
  } else {
    store.dispatch("selecthistory", {
      pagenum: currentPage.value,
      pictureTime: searchTime.value,
      pictureStatue: status.value
    }).then((response) => {
      items.value = response.records;
      total.value = response.total;
      option.value = 3;
    })
  }


}


</script>
<style lang="scss" scoped>

el-button {
  outline: none;
}

.container {
  font-family: "Inter", sans-serif;
  width: 1230px;
  height: 670px;
  background-color: #fff;
  position: relative;
  top: 10px;
  left: 9px;
  display: flex;
  justify-content: center;
  overflow: visible;
  border: 1.5px solid rgb(148, 191, 239);
  border-radius: 0.4rem;
  height: 650px;
  width: 1210px;

  .nav {
    position: relative;
    height: 7%;
    width: 95%;
    top:-15px;

    p {
      float: left;
      width: 150px;
      line-height: 66px;
      margin-left: 0;
      font-weight: 600;
      font-size: 20px;
    }

    .box {
      position: absolute;
      top: 15px;
      left: 40%;
      height: 60%;
      width: 20%;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
      border-radius: 50px;

    }

    .search {
      position: relative;
      width: 300px;
      float: right;
      height: 70%;
      margin-top: 10px;
      display: flex;
      /*  justify-content: center; */
      align-items: center;

      .searchBar {
        height: 28px;
        /*   padding: 5px; */
        border-radius: 40px;
        background-color: #edf6fe;
        position: relative;
        top: 25px;

        .search-txt {
          border: none;
          background: none;
          outline: none;
          float: left;
          color: black;
          font-size: 16px;
          line-height: 30px;
          width: 0;
          transition: 0.4s;
        }

        .search-btn {
          float: right;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.4s;
        }
      }

      .searchBar:hover {
        padding: 5px;
      }

      .searchBar:hover .search-txt {
        width: 200px;
        padding-left: 5px;
      }

      .searchBar:hover .search-btn {
        background-color: #c4e2e8;
        margin-top: 2px;
      }
    }
  }

  .table {
    position: absolute;
    top:90px;
    height: 80%;
    width: 85%;

    ul {
      position: relative;
      height: 88%;
      width: 100%;

      li {
        position: relative;
        width: 100%;
        height: 50px;
        margin-bottom: 5px;
        padding-left: 15px;
        /* background-color: #fff;
        border-radius: 15px; */
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d6e8f6;

        img {
          width: 60px;
          height: 60px;
        }

        img:nth-child(2) {
          position: absolute;
          left: 10%;
        }

        span {
          position: absolute;
          left: 30%;

          /*  p:nth-child(1){
            color: #b4b6b5;
            font-size: 13px;
          } */
          p {
            color: black;
            /* font-weight: 600; */
          }
        }

        div {
          position: absolute;
          left: 80%;
          display: inline-block;
          width: 70px;
          height: 30px;
          line-height: 30px;
          font-weight: 600;
          border-radius: 6px;
          text-align: center;
          cursor: pointer;
          color: white;
        }

        /* 已反馈样式 */
        .feedback {
          /*     color: #9eedd0;
          background: radial-gradient(circle at center, #cdfbec 0%, #f7faf9 40%, #e1faf1 80%, #e7f5f1 100%); */
          background-color: #d1edc4;

        }

        /*  上报中样式 */
        .going {
          /* color: #8cb3d4;
          background: radial-gradient(circle at center, #deedfa 0%, #f7faf9 40%, #e6f1fd 80%, #eceef9 100%); */
          background-color: #c6e2ff;
        }

        /* 未上报样式 */
        .never {
          /* color: #aeb4b2;
          background: radial-gradient(circle at center, #ebf0ef 0%, #f7faf9 40%, #ebf1ef 80%, #e9efed 100%); */
          background-color: #dedfe0;
        }

        button {
          position: absolute;
          width: 80px;
          height: 40px;
          background: transparent;
          /*  background-color: #ea5445; */
          border: none;
          left: 90%;
          color: #F56C6C;
          font-weight: 700;
          cursor: pointer;
          border-radius: 8px;
        }
      }

      li:hover {
        background-color: #f8f8f8;
      }
    }
  }

  .fenye {
    position: absolute;
    left: 0;
    top: 90%;
    height: 10%;
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-pagination {
      vertical-align: middle;

      button {
        height: 30px;
        width: 30px;
        background: transparent;
        border: 1px solid #eceff7;
        outline: none;
        margin-left: 10px;
        cursor: pointer;
      }

      ul {
        display: flex;

        li {
          flex: 1;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #eceff7;
          text-align: center;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }

        /* 对于 li 元素 */
        .is-active {
          background-color: #307eeb;
          color: white;
        }
      }

      .el-pagination__jump {
        display: flex;
        margin-left: 10px;
        margin-top: 4px;

        .el-input {
          flex: 1;
          margin-left: 20px;
          outline: none;
          margin-right: 20px;

          .el-input__wrapper {
            .el-input__inner {
              outline: none;
            }
          }

          /*  display: inline-block; */
        }
      }

      .el-pagination__total {
        margin-top: 4px;
      }

    }
  }

}
</style>