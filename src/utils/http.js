import axios from "axios";
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
      config.headers["access-token"] = accessToken;
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
instance.interceptors.response.use(
  (res) => {
    // console.log('res', res);
    if (res.data.data) {
      return res.data.data;
    }
    return res;
  },
  (error) => {
    console.log("catch", error);
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
