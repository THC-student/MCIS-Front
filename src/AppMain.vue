<template>
    <div
      class="layout"
      style="
        width: 100vw;
        height: 100vh;
        background-color:  #c6e2ff;
        overflow-y: auto;
        overflow-x: auto;
      "
    >
      <div class="side">
        <left-side />
      </div>
      <div class="header">
        <top-head />
      </div>
      <div class="main">
        <Main></Main>
      </div>
    </div>
  </template>
  
  <script setup>
  import LeftSide from "./components/LeftSide.vue";
  import TopHead from "./components/TopHead.vue";
  import Main from "./components/Main.vue";
  </script>
  
  <style scoped>
  .side {
    position: fixed;
    top: 0;
    left: 0;
    height: 45.625rem;
    width: 200px;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px #337dcc60;
    z-index: 3;
  }
  .header {
    position: fixed;
    width: 100vw;
    height: 50px;
    background-color: #ffffff;
    left: 0;
    top: 0;
    box-shadow: 0px 0px 5px #337dcc60;
    z-index: 2;
  }
  .main {
    position: relative;
    left: 205px;
    top: 54.5px;
    width: 76.875rem;
    height: 41.875rem;
  }
  .layout::-webkit-scrollbar {  
    width: 6px; /* 垂直滚动条的宽度 */  
    height: 6px; /* 水平滚动条的高度 */  
}  
  
.layout::-webkit-scrollbar-track {  
    background-color: #f1f1f1; /* 滚动条轨道背景色 */  
}  
  
.layout::-webkit-scrollbar-thumb {  
    background-color: #cccccc; /* 垂直滚动条滑块颜色 */  
    border-radius: 4px; /* 滚动条滑块的圆角 */  
}  
  
.layout::-webkit-scrollbar-thumb:hover {  
    background-color: #989898; /* 滚动条滑块在悬停时的颜色 */  
}  
  
/* 水平滚动条样式 */  
.layout::-webkit-scrollbar-horizontal {  
    height: 6px; /* 与垂直滚动条宽度一致 */  
}  
  
.layout::-webkit-scrollbar-track-horizontal {  
    background-color: #f1f1f1; /* 与垂直滚动条轨道背景色一致 */  
}  
  
.layout::-webkit-scrollbar-thumb-horizontal {  
    background-color: #cccccc; /* 与垂直滚动条滑块颜色一致 */  
    border-radius: 4px; /* 与垂直滚动条滑块圆角一致 */  
}  
  
.layout::-webkit-scrollbar-thumb-horizontal:hover {  
    background-color: #989898; /* 与垂直滚动条滑块悬停颜色一致 */  
}
  
  </style>