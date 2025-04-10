import http from "@/utils/http.js";
import md5 from "md5";

const service = {
  async login(email, password) {
    try {
      // 对密码进行MD5加密
      const hashedPassword = md5(password);
      
      // 调用登录API
      const uri = "/api/users/login";
      const response = await http.post(uri, {
        email,
        password: hashedPassword
      });
      
      // 保存用户信息和token
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data || {};
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  async register(email, password) {
    try {
      // 对密码进行MD5加密
      const hashedPassword = md5(password);
      
      // 调用注册API
      const uri = "/api/users/register";
      const response = await http.post(uri, {
        email,
        password: hashedPassword
      });
      
      return response.data || {};
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  async forgotPassword(email) {
    try {
      // 调用忘记密码API
      const uri = "/api/users/forgot-password";
      const response = await http.post(uri, { email });
      
      return response.data || {};
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};

export default service;