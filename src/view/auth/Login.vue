<template>
  <div class="auth-container">
    <div class="auth-card">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="login" tab="登录">
          <a-form
            :model="loginForm"
            name="login-form"
            @finish="handleLogin"
            autocomplete="off"
            layout="vertical"
          >
            <a-form-item
              name="username"
              label="用户名"
              :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input v-model:value="loginForm.username" placeholder="请输入用户名">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="password"
              label="密码"
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password v-model:value="loginForm.password" placeholder="请输入密码">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-row :gutter="8">
                <a-col :span="12">
                  <a-checkbox v-model:checked="loginForm.remember">记住我</a-checkbox>
                </a-col>
                <a-col :span="12" style="text-align: right">
                  <a @click="activeKey = 'forgot'">忘记密码?</a>
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" block :loading="loading">
                登录
              </a-button>
            </a-form-item>

            <a-form-item style="text-align: center">
              <span>还没有账号? </span>
              <a @click="activeKey = 'register'">立即注册</a>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="register" tab="注册">
          <a-form
            :model="registerForm"
            name="register-form"
            @finish="handleRegister"
            autocomplete="off"
            layout="vertical"
          >
            <a-form-item
              name="username"
              label="用户名"
              :rules="[{ required: true, message: '请输入用户名!' }]"
            >
              <a-input v-model:value="registerForm.username" placeholder="请输入用户名">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="email"
              label="邮箱"
              :rules="[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' }
              ]"
            >
              <a-input v-model:value="registerForm.email" placeholder="请输入邮箱">
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              name="password"
              label="密码"
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password v-model:value="registerForm.password" placeholder="请输入密码">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              name="confirmPassword"
              label="确认密码"
              :rules="[
                { required: true, message: '请确认密码!' },
                { validator: validateConfirmPassword }
              ]"
            >
              <a-input-password v-model:value="registerForm.confirmPassword" placeholder="请确认密码">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" block :loading="loading">
                注册
              </a-button>
            </a-form-item>

            <a-form-item style="text-align: center">
              <span>已有账号? </span>
              <a @click="activeKey = 'login'">立即登录</a>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="forgot" tab="忘记密码">
          <a-form
            :model="forgotForm"
            name="forgot-form"
            @finish="handleForgotPassword"
            autocomplete="off"
            layout="vertical"
          >
            <a-form-item
              name="email"
              label="邮箱"
              :rules="[
                { required: true, message: '请输入邮箱!' },
                { type: 'email', message: '请输入有效的邮箱地址!' }
              ]"
            >
              <a-input v-model:value="forgotForm.email" placeholder="请输入注册时使用的邮箱">
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" block :loading="loading">
                重置密码
              </a-button>
            </a-form-item>

            <a-form-item style="text-align: center">
              <a @click="activeKey = 'login'">返回登录</a>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import AuthService from '@/services/auth.service';

const router = useRouter();
const activeKey = ref('login');
const loading = ref(false);

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
});

// 注册表单
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 忘记密码表单
const forgotForm = reactive({
  email: ''
});

// 验证确认密码
const validateConfirmPassword = async (rule, value) => {
  if (value !== registerForm.password) {
    return Promise.reject('两次输入的密码不一致!');
  }
  return Promise.resolve();
};

// 处理登录
const handleLogin = async (values) => {
  try {
    loading.value = true;
    console.log('登录表单提交:', values);
    
    await AuthService.login(values.username, values.password);
    
    message.success('登录成功');
    router.push('/');
  } catch (error) {
    console.error('登录失败:', error);
    message.error('登录失败，请检查用户名和密码');
  } finally {
    loading.value = false;
  }
};

// 处理注册
const handleRegister = async (values) => {
  try {
    loading.value = true;
    console.log('注册表单提交:', values);
    
    await AuthService.register(values.username, values.email, values.password);
    
    message.success('注册成功，请登录');
    activeKey.value = 'login';
    
    // 预填充登录表单
    loginForm.username = values.username;
    loginForm.password = '';
  } catch (error) {
    console.error('注册失败:', error);
    message.error('注册失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};

// 处理忘记密码
const handleForgotPassword = async (values) => {
  try {
    loading.value = true;
    console.log('忘记密码表单提交:', values);
    
    await AuthService.forgotPassword(values.email);
    
    message.success('重置密码邮件已发送，请查收');
    activeKey.value = 'login';
  } catch (error) {
    console.error('发送重置密码邮件失败:', error);
    message.error('发送重置密码邮件失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  
  .auth-card {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
    }
  }
}
</style>