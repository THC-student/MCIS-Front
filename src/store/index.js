import { createStore } from 'vuex'
import {
  reqUserLogin,
  reqGetCode,
  reqUserRegister,
  reqGetChart,
  reqGetWellData,
  reqRootLogin,
  reqUpdateMessage,
  reqGetHistoricalData,
  reqGetHistoryData,
  reqGetPictureDetails,
  reqSearchUsers,
  reqDeleteUser,
  reqGetViewUsers,
  reqChangeEmail,
  reqDeleteFeedback,
  reqGetSearchFeedbackDataList
} from "../api/index";

export default createStore({
  state: {

    identity: '',
    //用户信息
    token: "rgd", //身份码
    userName: "", //用户名
    userAge: "", //年龄
    userSex: "", //性别
    userId: "", //编号
    userAccount: "", //账号
    userHead: "", //头像
    well: [
      { Good: "" },
      { Broke: "" },
      { Lose: "" },
      { Uncovered: "" },
      { Circle: "" },
      { Feedback: "" },
    ],

    reportData:[],


    //上传图片列表
    UploadImageFileList: [
    ],
    //接收图片列表
    AcceptImageFileList: [
    ],
    chartData: [0, 0, 0, 0, 0, 0],

    pictureId:0,   //查看详情
    //错误上报信息
    ImageId: null,//这个是传回图片的id
    beforeUrl: 'https://qhglhh.oss-cn-beijing.aliyuncs.com/a3099489-e80a-4192-9c45-6b983989c6cd.jpg',
    afterUrl: '',
    file:null,

    //画框上传图片Url
    KuangUrl:null,

    //步骤
    step: 0,
    navigation: '',
    change:true,

    selectedIds: [],
    deleteBatch: false, //是否批量删除
    userlist: {
      //管理员用户列表
      pagesize: 10,
      pagenum: 1,
      total: 0,
    },
    tableData: [], //管理员用户列表
    menuId: 0, //判断是否获取图片
    activeTreeNodeIndex: null, //点开相应树节点

    selectedIds: [],
    deleteBatch: false, //是否批量删除
    userlist: {
      //管理员用户列表
      pagesize: 10,
      pagenum: 1,
      total: 0,
    },
    tableData: [], //管理员用户列表


    feedback: 0, //1为处理
    gridData: [], //反馈列表
    totalFeedback: 0, //反馈列表总数
    optionpage: 1, //时间搜索还是普通
    chartData: [], //模型更新图表
    chartSize: 0, //模型个数


  },
  mutations: {
    updateKuangUrl(state, newUrl) {  
      state.KuangUrl = newUrl;  
    },
    CHANGEEMAIL(state, email) {
      state.userAccount = email;
    },

    LOGIN(state, { data, option }) {
      if (option == 2) {
        state.token = data.userJWT;
        state.userName = data.userName;
        state.userAccount = data.userEmail;
        state.userAge = data.userAge;
        state.userId = data.userId;
        state.userSex = data.userSex;
        console.log("赋值给头像", data.userHead)
        state.userHead = data.userHead
      } else {
        state.token = data.rootJWT;
        state.userName = data.rootName;
        state.userAccount = data.rootEmail;
        state.userAge = data.rootAge;
        state.userId = data.rootId;
        state.userSex = data.rootSex;
        state.userHead = data.rootHead
      }
      console.log("token", state.token, "name", state.userName);
    },
    GETUSER(state, data) {
      console.log("获取", data);
      state.userAge = data.age;
      state.userId = data.id;
      state.userSex = data.sex;
      state.userAccount = data.account;
      console.log(state.userAge);
    },
    UPDATE(state, { username, sex, age }) {
      console.log("tyry")
      state.userName = username;
      if (sex != "") state.userAge = age;
      if (age != "") state.userSex = sex;
    },
    GETWELL(state, data) {
      state.well.Good = data.good;
      state.well.Broke = data.broke;
      state.well.Circle = data.circle;
      state.well.Lose = data.lose;
      state.well.Feedback = data.feedback;
      state.well.Uncovered = data.uncovered;
    },
    DELETE(state) {
      state.deleteBatch = !state.deleteBatch;
      console.log("12", state.deleteBatch);
    },
    REMOVEUSER(state, index) {
      state.tableData.splice(index, 1);
    },
    //存储树节点
    setActiveTreeNode(state, index) {
      state.activeTreeNodeIndex = index;
    },
    GETPHOTOS(state, id) {
      state.menuId = id;
    },
    setGridData(state, { data }) {
      console.log("s", data);
      state.totalFeedback = data.total;
      state.option = 1;
      console.log("进来了", state.totalFeedback);
      state.gridData = data.records.map((record) => {
        if (record.content === "已处理") {
          return { ...record, processed: true };
        } else {
          return { ...record, processed: false };
        }
      });
    },

  },
  actions: {
    //个人中心访问列表
    async getviews(state) {
      let result = await reqGetViewUsers(state.userId);
      console.log("访问", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },

    //  //修改邮箱
    //  async UpdateEmail({ state, commit }, { newEmail }) {
    //   console.log("新邮箱", newEmail);
    //   let result = null;
    //   if (state.identity == "用户")
    //     result = await reqChangeEmail(state.userId, newEmail);
    //   else if (state.identity == "管理员")
    //     result = await reqRootchangeEmail(state.userId, newEmail);
    //   console.log("修改邮箱", result.data);
    //   if (result.code == 1) {
    //     commit("CHANGEEMAIL", newEmail);
    //     return "ok";
    //   } else {
    //     console.log("错误");
    //     return Promise.reject(new Error("faile"));
    //   }
    // },
    //管理员搜索反馈数据
    async searchfeedback({ commit }, { pagesize, startTime, endTime }) {
      console.log("搜索1", pagesize, startTime, endTime);
      let result = await reqGetSearchFeedbackDataList(
        pagesize,
        startTime,
        endTime
      );
      console.log(result.data, "lalalaaa", result.code);
      if (result.code == 1) {
        commit("setGridData", { data: result.data });
        // return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },

    //登陆业务
    async userLogin({ commit }, { username, password, option }) {
      console.log("duiskj");
      try {
        console.log("信息", username, password, option);
        let result = null;
        if (option == 2) {
          result = await reqUserLogin(username, password);
        } else if (option == 1) {
          result = await reqRootLogin(username, password);
        }
        console.log("32");
        console.log(result, "jwek");
        if (result.code == 1) {
          console.log("state登录成")
          //登录成功且获取到token和昵称
          commit("LOGIN", { data: result.data, option: option });
          console.log("sd")
        } else {
          console.log("登陆失败");
          return Promise.reject(new Error("fail"));
        }
      } catch (error) {
        console.error("Error in userLogin action:", error);
        return Promise.reject(error);
      }
    },
     //获取验证码
     async getCode({ state }, { email }) {
      let result = await reqGetCode(email);
      if (result.code == 1) {
        console.log(result.data);
        return result.data;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },

    //注册
    async userRegister(email, password) {
      let result = await reqUserRegister(email, password);
      console.log(result);
      if (result.code == 1) {
        console.log("正确");
        return "ok";
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //获取图标
    async getChart({ commit }) {
      let result = await reqGetChart();
      console.log("排汗杠", result);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },

    //获取井盖
    async getWell({ commit }) {
      let result = await reqGetWellData();
      console.log("井盖", result.data);
      if (result.code == 1) {
        commit("GETWELL", result.data);
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
     //修改信息
     async UpdateMessage(
      { commit, state },
      { username, password1, password2, age, sex }
    ) {
      const letterRegex = /[a-zA-Z]/;
      const numberRegex = /[0-9]/;
      console.log( username);
      if (
        password1.length < 8 ||
        !letterRegex.test(password1) ||
        !numberRegex.test(password1)
      ) {
        return 1;
      } else {
        if (password1 == password2) {
          commit("UPDATE", {
            username: username,
            sex: sex,
            age: age,
          });
          console.log("ajja", age == "");
          console.log("年龄", age, sex);
          const age2 = age == "" ? 0 : parseInt(age);
          console.log(age2, "sd");
          let result = null;
          if (localStorage.getItem('identity') === "用户") {
            console.log("寄过来了")
            result = await reqUpdateMessage(
              state.userId,
              username,
              password1,
              age2,
              sex
            );
          } else if (localStorage.getItem('identity') === "管理员")
            result = await reqRootUpdateMessage(
              state.userId,
              username,
              password1,
              age2,
              sex
            );
          return 2;
        } else {
          return 3;
        }
      }
    },

    //获取历史数据
    async gethistory({ state }, { pagenum, option }) {
      let result = await reqGetHistoryData(state.userId, pagenum, option);
      console.log("历史", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //查询历史数据
    async selecthistory({ state }, { pagenum, pictureTime, pictureStatus }) {
      console.log("ajj",pagenum,"a", pictureTime,"a", pictureStatus)
      let result = await reqGetHistoricalData(
        pagenum,
        pictureTime,
        state.userId,
        pictureStatus
      );
      console.log("查询", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //获取图片详情
    async getDetails({ state }, pictureId) {
      console.log("jjj",pictureId)
      let result = await reqGetPictureDetails(state.userId, pictureId);
      console.log("详情", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //个人中心访问列表
    async getviews({state}) {
      console.log("访问进去",state.userId)
      let result = await reqGetViewUsers(state.userId);
      console.log("访问", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },

    //获取用户列表
    async getusers(pagenum) {
      let result = await reqGetUserList(pagenum);
      console.log("列表", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //搜索用户
    async searchuser({ state }, { id, name }) {
      console.log(id === "");
      let result = await reqSearchUsers(
        id,
        name,
        state.userlist.pagesize,
        state.userlist.pagenum
      );
      console.log("搜索用户", result.data);
      if (result.code == 1) {
        return result.data;
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //删除用户
    async deleteuser({state},{id}) {
      console.log("sdv", id);
      let result = await reqDeleteUser(id);
      console.log("删除用户",  result.code);
      if (result.code == 1) {
        return "ok";
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
    //修改邮箱
    async UpdateEmail({ state, commit }, { newEmail }) {
      console.log("新邮箱", newEmail);
      let result = null;
      if (localStorage.getItem('identity') === "用户"){
        console.log("ujdaga",state.userId)
        result = await reqChangeEmail(state.userId, newEmail);
      }
       
      else if (localStorage.getItem('identity') === "管理员")
        result = await reqRootchangeEmail(state.userId, newEmail);
      console.log("修改邮箱", result.data);
      if (result.code == 1) {
        commit("CHANGEEMAIL", newEmail);
        return "ok";
      } else {
        console.log("错误");
        return Promise.reject(new Error("faile"));
      }
    },
      //管理员搜索反馈数据
      async searchfeedback({ commit }, { pagesize, startTime, endTime }) {
        console.log("搜索1", pagesize, startTime, endTime);
        let result = await reqGetSearchFeedbackDataList(
          pagesize,
          startTime,
          endTime
        );
        console.log(result.data, "lalalaaa", result.code);
        if (result.code == 1) {
          commit("setGridData", { data: result.data });
          // return result.data;
        } else {
          console.log("错误");
          return Promise.reject(new Error("faile"));
        }
      },
      //删除反馈
      async deletefeedback({ state }, { id }) {
        console.log("sdv", id);
        let result = await reqDeleteFeedback(id);
        console.log("删除反馈", result.data, result.code);
        if (result.code == 1) {
          return "ok";
        } else {
          console.log("错误");
          return Promise.reject(new Error("faile"));
        }
      },
  
  },
  modules: {
  },
  getters:{
    getImageUrl: state => state.beforeUrl,
  }
})

