import axios from "axios";

// export default function request(config) {
//   //axios实例
//   const instance = axios.create({
//     // baseURL: import.meta.env.VITE_APP_API_BAASEURL,
//     //代表请求超时的时间
//     timeout: 5000,
//   });
//   //请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在发之前做一些事情
//   instance.interceptors.request.use(
//     function (config) {
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

//   instance.interceptors.response.use(
//     (res) => {
//       //成功的回调函数:服务器相应数据回来以后,可以检测到,做一些事情
//       if (res.status === 200) {
//         return Promise.resolve(res); //进行中
//       } else {
//         return Promise.reject(res); //失败
//       }
//     },
//     (error) => {
//       //响应失败的回调函数
//       console.log("没有返回数据");
//       return Promise.reject(error.res);
//     }
//   );
//   return instance; // 返回axios实例
// }

const requests = axios.create({
  //基础路径,发送请求时,路径中会出现
  // baseURL:"/m1",
  //代表请求超时的时间
  // timeout: 1000000,
});
//请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在发之前做一些事情
requests.interceptors.request.use((config) => {
  //config:配置对象,对象有一个属性很重要,header请求
  // if (user.state.token) {
  //   config.headers["token"] = user.state.token;
  // }
  return config;
});

//相应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数:服务器相应数据回来以后,可以检测到,做一些事情
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    console.log("没有返回数据");
    return Promise.reject(new Error("faile"));
  }
);

//暴露axios
export default requests;
