import axios from 'axios';
import md5 from 'md5';

// 创建一个axios实例
const API_URL = '/api/users/';

class AuthService {
  // 登录方法
  async login(email, password) {
    try {
      // 对密码进行MD5加密
      const hashedPassword = md5(password);
      
      // 调用真实的登录API
      const response = await axios.post(API_URL + 'login', { 
        email, 
        password: hashedPassword 
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // 注册方法
  async register(email, password) {
    try {
      // 对密码进行MD5加密
      const hashedPassword = md5(password);
      
      // 调用真实的注册API
      const response = await axios.post(API_URL + 'register', { 
        email, 
        password: hashedPassword 
      });
      
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // 忘记密码方法
  async forgotPassword(email) {
    try {
      // 在实际应用中，这里应该调用真实的API
      // const response = await axios.post(API_URL + 'forgot-password', { email });
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      const response = {
        data: {
          message: 'Password reset email sent successfully!'
        }
      };
      
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  // 登出方法
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 获取当前用户
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  // 检查是否已登录
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
