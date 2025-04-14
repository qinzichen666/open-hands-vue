import axios from "axios";
import { message } from 'ant-design-vue';
import { useUserStore } from "@/store/modules/user.js";

// 设置 post 请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie
axios.defaults.withCredentials = false;

console.log("环境变量", import.meta.env);
// 创建 axios 实例, 请求超时时间为 10 秒
const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 100000,
});

// 请求发起前拦截
instance.interceptors.request.use(
  (config) => {

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers = {
        ...config.headers, // 保留原有的 headers 配置
        "Authorization": `Bearer ${accessToken}`
      };
    }

    // console.log("请求拦截", config);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截（请求返回后拦截）
let isShowing401Error = false; // 标志位，用于控制 401 提示是否已显示

instance.interceptors.response.use(
  (res) => {
    if (res.data.data) {
      return res.data.data;
    }
    return res;
  },
  (error) => {
    if (error && error.status === 401) {
      if (!isShowing401Error) {
        // 只有当标志位为 false 时才显示错误提示
        isShowing401Error = true; // 设置标志位为 true
       

        // 清除 token
        localStorage.removeItem("access_token");

        // 跳转到登录页面
        window.location.href = "/auth";

        // message.error("登录过期，请重新登录",3000);
      }
      return Promise.reject(error); // 返回错误的 Promise
    }
    return Promise.reject(error);
  }
);

const http = {
  get(url, params) {
    return instance.get(url, { params: params });
  },
  post(url, params, header = {}) {
    const options = {
      url,
      method: "POST",
      data: params,
      headers: Object.assign({ 'Content-Type': 'application/json' }, header),
    }
    return instance.request(options);
  },
  put(url, params, header = {}) {
    const options = {
      url,
      method: "PUT",
      data: params,
      headers: Object.assign({ 'Content-Type': 'application/json' }, header),
    }
    return instance.request(options);
  },
  del(url, params, header = {}) {
    const options = {
      url,
      method: "DELETE",
      params: params,
      headers: Object.assign({ 'Content-Type': 'application/json' }, header),
    }
    return instance.request(options);
  },
};

export default http;
