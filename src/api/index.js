//当前模块:API进行统一管理
//引入二次封装的axios
import requests from "../utils/request.js";
import { serverAddress } from '@/MainComponent/config.ts'

//用户登录--
export const reqUserLogin = (userEmail, userPassword) => {
  console.log("用户信息:", userEmail, userPassword);
  /* const url='https://mock.apifox.com/m2/4101048-0-default/154024440'; */
  const url=`${serverAddress}/login/user`;
  const data = { userEmail, userPassword };
  return requests({ url, method: "post", data });
};
//管理员登录
export const reqRootLogin = (rootEmail, rootPassword) => {
  console.log("管理员信息:", rootEmail, rootPassword);
  /* const url = `https://mock.apifox.com/m2/4101048-0-default/154026464`; */
  const url=`${serverAddress}/login/root`;
  const data = { rootEmail, rootPassword };
  return requests({ url, method: "post", data });
};
//注册获取验证码
export const reqGetCode = (email) => {
  console.log("获得验证码",email);
  /* const url = `http://192.168.2.109:6001/rigister/getcode`; */
  const url=`${serverAddress}/rigister/getcode/${email}`;
  return requests({ url, method: "get" });
};
//注册
export const reqUserRegister = (username, password) => {
  console.log("发送注册", username, password);
  const url = `https://mock.apifox.com/m1/4101048-0-default/rigister/userRegister`; 
  //const url = `${serverAddress}/rigister/userRegister`;
  const data = { username, password };
  return requests({ url, method: "post", data });
};


//个人中心获取井盖情况
export const reqGetWellData = () => {
  console.log("获取井盖");
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/getWellData`; */
  const url=`${serverAddress}//getWellData`;
  return requests({ url, method: "get" });
};

//用户修改头像
export const reqUpdateAvatar = (head,id) => {
  console.log("修改头像");
  let formData = new FormData();
  // append方法把文件添加到 FormData实例对象中 第一个参数：文件名 第二个参数：要上传的文件
  formData.append("newUserHead", head);
  formData.append("userId", id);
  /* const url = `https://mock.apifox.com/m2/4101048-0-default/157330723`; */
  const url=`${serverAddress}/user/changeUserHeadByUserId`;
  return requests({ url, method: "post", data: formData });
};

//修改信息
export const reqUpdateMessage = (userId,userName, userPassword, userAge, userSex) => {
  console.log("修改信息",userName, userPassword, userAge, userSex);
  const data = { userId,userName, userPassword, userAge, userSex };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/UpdateMessage`; */
  const url=`${serverAddress}/user/UpdateMessage`;
  return requests({ url, method: "post", data });
};

//获取历史数据
export const reqGetHistoryData = (userId, pagenum, option) => {
  console.log("获取历史数据sf",userId,pagenum,option);
  const params = { userId, pagenum, option };
  /* const url = `https://mock.apifox.com/m2/4101048-0-default/155886176`; */
  /* const url = `https://mock.apifox.com/m1/4101048-0-default/picture/getHistoryData`; */
  const url=`${serverAddress}/picture/getHistoryData`;
  return requests({ url, method: "get", params });
};

//查询历史数据
export const reqGetHistoricalData = (
  pagenum,
  pictureTime,
  userId,
  pictureStatus
) => {
  console.log("查询历史数据", pictureTime, pictureStatus);
  let data = {};
  // if (pictureStatus == 0) {
    // data = { pagenum, pictureTime, userId， pictureStatus };
  // } else {
    data = { pagenum, pictureTime, userId, pictureStatus };
  const url=`${serverAddress}/picture/getHistoricalData`;
  return requests({ url, method: "post", data: data });
};

//查看图片详情
export const reqGetPictureDetails = (userId, pictureId) => {
  console.log("查看详情",userId,pictureId);
  const data = { userId, pictureId };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/getPictureDetails`; */
  const url=`${serverAddress}/picture/getPictureDetails`;
  return requests({ url, method: "post", data: data });
};
//管理员获取用户列表
export const reqManageGetList = (pagesize, pagenum) => {
  console.log("获取其他用户");
  const data = { pagesize, pagenum };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/manageGetList`; */
  const url=`${serverAddress}/root/manageGetList`; 
  return requests({ url, method: "post", data });
};

//管理员搜索用户
export const reqSearchUsers = (id, name, pagesize, pagenum) => {
  console.log("搜索用户", id, name);
  let data = { id, name, pagesize, pagenum };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/root/searchUsers`; */
  const url=`${serverAddress}/root/searchUsers`; 
  return requests({ url, method: "post", data });
};

//管理员删除用户
export const reqDeleteUser = (id) => {
  console.log("删除用户1", id);
  const params = { id };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/root/deleteUser`; */
  const url=`${serverAddress}/root/deleteUser`; 
  return requests({ url, method: "get", params });
};

//个人中心查看访问用户列表
export const reqGetViewUsers = (id) => {
  console.log("获取访问列表",id);
  /* const url = `https://mock.apifox.com/m1/4101048-0-default/user/getViewUsers`; */
  const url=`${serverAddress}/user/getViewUsers/${id}`; 
  return requests({ url, method: "get" });
};

//修改绑定邮箱
export const reqChangeEmail = (id, newEmail) => {
  console.log("修改邮箱",id,newEmail);
  const data = { id, newEmail };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/changeEmail`; */
  const url=`${serverAddress}/user/changeEmail`; 
  return requests({ url, method: "post", data });
};

//获取其他用户
export const reqGetUsersInformationI = (id, userId) => {
  console.log("获取其他用户");
  const params = { id, userId };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/user/getUsersInformationI/1/1`; */
  const url=`${serverAddress}/user/getUsersInformationI/${id}/${userId}`;
  return requests({ url, method: "get" });
};

//用户获取本月物种状态占比
export const reqGetMonthRatio = (id) => {
  console.log("左中",id);
  // const params = { id };
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/picture/GetNumberThisMonth/1`; */
  const url=`${serverAddress}/picture/GetNumberThisMonth/${id}`;
  // const url=`https://mock.apifox.com/m1/4101048-0-default/picture/GetNumberThisMonth/1`
  return requests({ url, method: "get"});
};
//首页获取总的
export const reqGetCountNumber = (userId) => {
  console.log("左上");
  // const params = { userId };
  /* const url = `http://127.0.0.1:4523/m2/4101048-0-default/158352327?apifoxApiId=158352327`; */
  const url=`${serverAddress}/picture/countNumber/${userId}`; 
  return requests({ url, method: "get" });
};
//用户首页获取折线图
export const reqGetLineChart = () => {
  // console.log("这信啊");
  /* const url = `http://127.0.0.1:4523/m1/4101048-0-default/picture/GetLineChart`; */
  const url=`${serverAddress}/picture/GetLineChart`; 
  return requests({ url, method: "get" });
};
//个人中心获取排行榜
export const reqGetChart = () => {
  console.log("获取排行榜");
  const url = `${serverAddress}/pictureUpload/rank`;
  // const url = `http://127.0.0.1:4523/m1/4101048-0-default/picture/getChart`;
  // const url=`https://mock.apifox.com/m1/4101048-0-default/picture/getChart`
  return requests({ url, method: "get" });
};


//管理员个人中心获取地区
export const reqGetAreas = () => {
  console.log("地区11");
  /* const url = `http://192.168.1.106:9001/red/getAreas`; */
  // const url = `http://127.0.0.1:4523/m1/4101048-0-default/red/getAreas`;
  const url=`${serverAddress}/red/getAreas`; 
  return requests({ url, method: "get" });
};

//管理员个人中心获取图表
export const reqGetSammary = () => {
  console.log("比例");
  /* const url = `http://mock.apifox.com/m1/4101048-0-default/getSammary`; */
 const url=`${serverAddress}/picture/getSammary`; 
  return requests({ url, method: "get" });
};

//管理员个人中心修改信息
export const reqRootUpdateMessage = (
  rootId,
  rootName,
  rootPassword,
  rootAge,
  rootSex
) => {
  console.log("修改");
  rootId = 1;
  const data = { rootId, rootName, rootPassword, rootAge, rootSex };
  const url = `${serverAddress}/root/UpdateMessage`;
  return requests({ url, method: "post", data });
};

//管理员个人中心修改邮箱
export const reqRootchangeEmail = (rootId, newEmail) => {
  console.log("邮箱");
  rootId = 1;
  const url = `${serverAddress}/root/changeEmail`;
  const data = { rootId, newEmail };
  return requests({ url, method: "post", data });
};

//管理员获取简单数据集
export const reqGetDataList = () => {
  console.log("数据集简单");
  const url = `${serverAddress}/official/simpleData`;
  return requests({ url, method: "get" });
};

//管理员获取复杂数据集
export const reqGetDataList2 = (status) => {
  console.log("数据集复杂");
  const data = { status };
  const url = `${serverAddress}/official/getOfficialByStatus`;
  return requests({ url, method: "post", data });
};
//管理员查看用户反馈的
export const reqGetFeedbackDataList = (pageNo) => {
  console.log("反馈", pageNo);
  const url = `${serverAddress}/red/getRedPageNo/${pageNo}`;
  // const url = `http://127.0.0.1:4523/m2/4101048-0-default/156876571`;
  return requests({ url, method: "get" });
};

//管理员搜索用户反馈的
export const reqGetSearchFeedbackDataList = (pagesize, startTime, endTime) => {
  console.log("搜索反馈");
  const data = { pagesize, startTime, endTime };
  const url = `${serverAddress}/root/ManageSearchFeedbackList`;
  // const url = `http://127.0.0.1:4523/m1/4101048-0-default/root/ManageSearchFeedbackList`;
  return requests({ url, method: "post", data });
};

//管理员删除用户反馈的
export const reqDeleteFeedback = (pictureId) => {
  console.log("删除反馈");
  const params = { pictureId };
  const url = `${serverAddress}/red/deleteFeedback`;
  return requests({ url, method: "post", params });
};

//管理员处理用户反馈的
export const reqHandleFeedback = (pictureId,content) => {
  console.log("恢复反馈",pictureId);
  const data = { pictureId,content };
  const url = `${serverAddress}/red/rootRepair`;
  return requests({ url, method: "post", data });
};

//识别错误获取
export const reqexceptionPictureMQGet = () => {
  console.log("识别");
  const url = `${serverAddress}/pictureUpload/exceptionPictureMQGet`;
  return requests({ url, method: "get" });
};

//数据模型获取
export const reqGetModle = () => {
  console.log("模型");
  const url = `${serverAddress}/model/getModel`;
  // const url=`https://mock.apifox.com/m2/4101048-0-default/159140088 `
  return requests({ url, method: "get" });
};


