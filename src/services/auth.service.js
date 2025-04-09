import axios from 'axios';

// 创建一个axios实例
const API_URL = '/api/auth/';

class AuthService {
  // 登录方法
  async login(username, password) {
    try {
      // 在实际应用中，这里应该调用真实的API
      // 这里我们模拟一个成功的登录响应
      // const response = await axios.post(API_URL + 'login', { username, password });
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      const response = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: username,
            email: 'user@example.com',
            roles: ['USER']
          }
        }
      };
      
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
  async register(username, email, password) {
    try {
      // 在实际应用中，这里应该调用真实的API
      // const response = await axios.post(API_URL + 'register', { username, email, password });
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功响应
      const response = {
        data: {
          message: 'User registered successfully!'
        }
      };
      
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