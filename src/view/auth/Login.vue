<template>
  <div class="auth-container">
    <div class="auth-content">
      <!-- Logo -->
      <div class="logo-container">
        <div class="logo">
          <img src="@/assets/svgs/logo.svg" alt="Logo"/>
        </div>
      </div>
      
      <!-- Title -->
      <h2 class="auth-title">{{ pageTitle }}</h2>
      
      <div v-if="activeKey === 'login'">
        <!-- Login Form -->
        <div class="social-buttons">
          <a-button class="social-button google" @click="handleGoogleLogin">
            <template #icon>
              <img src="@/assets/svgs/google.svg"/>
            </template>
            使用 Google 登录
          </a-button>
          
          <!-- Apple login button hidden as requested -->
        </div>
        
        <div class="divider">
          <span>or</span>
        </div>
        
        <a-form
          :model="loginForm"
          name="login-form"
          @finish="handleLogin"
          autocomplete="off"
          layout="vertical"
        >
          <a-form-item
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]"
          >
            <div class="form-label">邮箱<span class="required-mark">*</span></div>
            <a-input v-model:value="loginForm.email" placeholder="请输入邮箱">
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
            extra=""
          >
            <div class="password-label-container">
              <div class="form-label">密码<span class="required-mark">*</span></div>
              <a class="forgot-link" @click="activeKey = 'forgot'">忘记密码?</a>
            </div>
            <a-input-password v-model:value="loginForm.password" placeholder="请输入密码">
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button 
              type="primary" 
              html-type="submit" 
              block 
              :loading="loading"
              :disabled="!isLoginValid">
              登录
            </a-button>
          </a-form-item>

          <div class="auth-footer">
            <span>还没有账号? </span>
            <a @click="activeKey = 'register'">注册</a>
          </div>
        </a-form>
      </div>
      
      <div v-if="activeKey === 'register'">
        <!-- Register Form -->
        <div class="social-buttons">
          <a-button class="social-button google" @click="handleGoogleRegister">
            <template #icon>
              <img src="@/assets/svgs/google.svg" alt="Google Logo"/>
            </template>
            使用 Google 注册
          </a-button>
          
          <!-- Apple register button hidden as requested -->
        </div>
        
        <div class="divider">
          <span>or</span>
        </div>
        
        <a-form
          :model="registerForm"
          name="register-form"
          @finish="handleRegister"
          autocomplete="off"
          layout="vertical"
        >
          <a-form-item
            name="fullname"
            :rules="[{ required: true, message: '请输入姓名!' }]"
          >
            <div class="form-label">姓名<span class="required-mark">*</span></div>
            <a-input v-model:value="registerForm.fullname" placeholder="请输入姓名">
            </a-input>
          </a-form-item>

          <a-form-item
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]"
          >
            <div class="form-label">邮箱<span class="required-mark">*</span></div>
            <a-input v-model:value="registerForm.email" placeholder="请输入邮箱">
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <div class="form-label">密码<span class="required-mark">*</span></div>
            <a-input-password v-model:value="registerForm.password" placeholder="请输入密码">
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button 
              type="primary" 
              html-type="submit" 
              block 
              :loading="loading"
              :disabled="!isRegisterValid">
              注册
            </a-button>
          </a-form-item>

          <div class="auth-footer">
            <span>已有账号? </span>
            <a @click="activeKey = 'login'">登录</a>
          </div>
        </a-form>
      </div>
      
      <div v-if="activeKey === 'forgot'">
        <!-- Forgot Password Form -->
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
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block :loading="loading">
              重置密码
            </a-button>
          </a-form-item>

          <div class="auth-footer">
            <a @click="activeKey = 'login'">返回登录</a>
          </div>
        </a-form>
      </div>

      <div v-if="activeKey === 'verify'">
        <!-- Email Verification Form -->
        <div class="verify-container">
          <p class="verify-text">验证码已发送至 {{ verifyEmail }}</p>
          
          <a-form
            :model="verifyForm"
            name="verify-form"
            @finish="handleVerify"
            autocomplete="off"
            layout="vertical"
          >
            <a-form-item
              name="code"
              :rules="[{ required: true, message: '请输入验证码!' }]"
            >
              <a-input v-model:value="verifyForm.code" placeholder="请输入6位验证码">
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-button 
                type="primary" 
                html-type="submit" 
                block 
                :loading="loading"
                :disabled="!verifyForm.code">
                验证邮箱
              </a-button>
            </a-form-item>

            <div class="verify-footer">
              <p>没有收到验证码？ <a @click="resendCode">重新发送</a></p>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive,computed } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import auth from '@/services/auth';

const router = useRouter();
const activeKey = ref('login');
const loading = ref(false);

// 登录表单
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
});

const isLoginValid = computed(() => {
  return loginForm.email && loginForm.password;
});

// 注册表单
const registerForm = reactive({
  fullname: '',
  email: '',
  password: ''
});

const isRegisterValid = computed(() => {
  return registerForm.fullname && registerForm.email && registerForm.password;
});

// 忘记密码表单
const forgotForm = reactive({
  email: ''
});

// 验证相关状态
const verifyEmail = ref('');
const verifyForm = reactive({
  code: ''
});

const pageTitle = computed(() => {
  switch (activeKey.value) {
    case 'login':
      return '登录到 OpenAgent';
    case 'register':
      return '注册 OpenAgent 账号';
    case 'verify':
      return '验证你的邮箱地址';
    default:
      return '重置密码';
  }
});

// 处理验证码提交
const handleVerify = async () => {
  try {
    loading.value = true;
    // 这里添加验证码验证逻辑
    message.success('邮箱验证成功');
    // 验证成功后跳转到应用
    router.push('/app');
  } catch (error) {
    message.error('验证码错误，请重试');
  } finally {
    loading.value = false;
  }
};

// 重新发送验证码
const resendCode = () => {
  message.info('验证码已重新发送');
};

// 处理登录
const handleLogin = async (values) => {
  try {
    loading.value = true;
    // 使用邮箱登录
    await auth.login(values.email, values.password);
    
    message.success('登录成功');
    // 跳转到首页 app
    router.push(
      {
        name: 'app'
      }
    )
  } catch (error) {
    console.error('登录失败:', error);
    message.error('登录失败，请检查邮箱和密码');
  } finally {
    loading.value = false;
  }
};

// 处理注册
const handleRegister = async (values) => {
  try {
    loading.value = true;
    
    // 基础非空校验
    if (!values.fullname || !values.email || !values.password) {
      throw new Error('请填写完整注册信息');
    }
    
    // 邮箱格式校验
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      throw new Error('请输入有效的邮箱地址');
    }
    
    // 密码长度校验
    if (values.password.length < 6) {
      throw new Error('密码长度不能少于6位');
    }
    
    console.log('注册表单提交:', values);
    // 暂时注释API调用
    await auth.register(values.email, values.password);
    

    message.success('注册成功，请登录');
    activeKey.value = 'login';
    
    // 预填充登录表单
    loginForm.email = values.email;
    loginForm.password = '';
    
    // 跳转到邮箱验证页面
    // activeKey.value = 'verify';
    // verifyEmail.value = values.email;
  } catch (error) {
    console.error('注册校验失败:', error);
    message.error(error.message || '注册失败，请检查输入');
  } finally {
    loading.value = false;
  }
};

// 处理忘记密码
const handleForgotPassword = async (values) => {
  try {
    loading.value = true;
    console.log('忘记密码表单提交:', values);
    
    await auth.forgotPassword(values.email);
    
    message.success('重置密码邮件已发送，请查收');
    activeKey.value = 'login';
  } catch (error) {
    console.error('发送重置密码邮件失败:', error);
    message.error('发送重置密码邮件失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};

// 社交登录方法
const handleGoogleLogin = async () => {
  try {
    loading.value = true;
    console.log('Google 登录');
    message.info('Google 登录功能正在开发中');
    // 实际实现可能需要调用 OAuth 服务
    // await AuthService.googleLogin();
  } catch (error) {
    console.error('Google 登录失败:', error);
    message.error('Google 登录失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};

const handleAppleLogin = async () => {
  try {
    loading.value = true;
    console.log('Apple 登录');
    message.info('Apple 登录功能正在开发中');
    // 实际实现可能需要调用 OAuth 服务
    // await AuthService.appleLogin();
  } finally {
    loading.value = false;
  }
};

const handleGoogleRegister = async () => {
  try {
    loading.value = true;
    console.log('Google 注册');
    message.info('Google 注册功能正在开发中');
    // 实际实现可能需要调用 OAuth 服务
    // await AuthService.googleRegister();
  } finally {
    loading.value = false;
  }
};

const handleAppleRegister = async () => {
  try {
    loading.value = true;
    console.log('Apple 注册');
    message.info('Apple 注册功能正在开发中');
    // 实际实现可能需要调用 OAuth 服务
    // await AuthService.appleRegister();
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
  background-color: #f8f8f7;
  
  .auth-content {
    width: 100%;
    max-width: 420px;
    padding: 32px;
    
    .logo-container {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      
      .logo {
        width: 64px;
        height: 64px;
        color: #333;
      }
    }
    
    .auth-title {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 32px;
      color: #111827;
    }
    
    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
      align-items: center;
      
      .social-button {
        width: 360px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        img{
          margin-right: 6px;
        }
        
        &.google {
          border: none;
          background-color: white;
          color: #333;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      }
    }
    
    .divider {
      position: relative;
      text-align: center;
      margin: 24px 0;
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #e5e7eb;
        z-index: 0;
      }
      
      span {
        position: relative;
        background-color: transparent;
        padding: 0 12px;
        color: #6b7280;
        font-size: 14px;
        z-index: 1;
      }
    }
    
    .password-label-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      
      .form-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
      }
      
      .forgot-link {
        font-size: 14px;
        color: #4f46e5;
        cursor: pointer;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
    
    :deep(.ant-form-item) {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      
      .ant-form-item-control {
        width: 360px;
      }
      
      .ant-form-item-label > label {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
      }
      
      .form-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        margin-bottom: 4px;
        
        .required-mark {
          color: #ff4d4f;
          margin-left: 2px;
        }
      }
      
      .ant-input {
        width: 360px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        background-color: #ffffff;
        
        &:hover, &:focus {
          border-color: #4f46e5;
        }
      }
      
      .ant-input-affix-wrapper {
        width: 360px !important;
        height: 40px !important;
        border-radius: 8px !important;
        border: 1px solid #d1d5db !important;
        background-color: #ffffff !important;
        box-shadow: none !important;
        padding: 0 11px !important;
        
        &:hover, &:focus, &-focused {
          border-color: #4f46e5 !important;
        }
        
        .ant-input {
          width: 100% !important;
          height: 38px !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          background-color: #ffffff !important;
          
          &:focus {
            box-shadow: none !important;
          }
        }
        
        .ant-input-suffix {
          margin-left: 0 !important;
        }
      }
      
      .ant-btn {
        width: 360px;
        height: 40px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        background-color: #4f46e5;
        border-color: #4f46e5;
        
        &:hover {
          background-color: #4338ca;
          border-color: #4338ca;
        }

        &[disabled] {
          background-color: #d1d5db;
          border-color: #d1d5db;
          color: white;
          cursor: not-allowed;
          
          &:hover {
            background-color: #d1d5db;
            border-color: #d1d5db;
          }
        }
      }
    }
    
    .auth-footer {
      text-align: center;
      margin-top: 16px;
      font-size: 14px;
      color: #6b7280;
      
      a {
        color: #4f46e5;
        font-weight: 500;
        cursor: pointer;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.verify-container {
  text-align: center;
  padding: 24px;
  
  .verify-icon {
    margin-bottom: 24px;
    
    svg {
      color: #4f46e5;
    }
  }
  
  .verify-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #111827;
  }
  
  .verify-text {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 32px;
  }
  
  .verify-footer {
    margin-top: 24px;
    font-size: 14px;
    color: #6b7280;
    
    p {
      margin-bottom: 12px;
    }
    
    a {
      color: #4f46e5;
      font-weight: 500;
      cursor: pointer;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  :deep(.ant-form-item) {
    max-width: 360px;
    margin: 0 auto;
    
    .ant-input {
      text-align: center;
      letter-spacing: 8px;
      font-size: 18px;
    }
  }
}
</style>