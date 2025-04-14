<template>
  <div class="callback-container">
    <div class="animation-wrapper">
      <a-spin 
        size="large" 
        :indicator="indicator"
        class="spin-animation"
      />
      <a-progress
        :percent="percent"
        :show-info="false"
        stroke-color="#4f46e5"
        class="progress-bar"
      />
    </div>
    <transition name="fade">
      <p class="loading-text" v-if="showText">正在验证谷歌登录...</p>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import auth from '@/api/auth';

const router = useRouter();
const percent = ref(0);
const showText = ref(false);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '48px',
    color: '#4f46e5'
  },
  spin: true
});

onMounted(async () => {
  // 初始动画
  setTimeout(() => showText.value = true, 300);
  
  const animateProgress = () => {
    if (percent.value < 80) {
      percent.value += 10;
      setTimeout(animateProgress, 300);
    }
  };
  animateProgress();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    try {
      await auth.googleAuth(urlParams.get('code'));
      percent.value = 100;
      message.success('登录成功');
      setTimeout(() => router.push({ name: 'app' }), 500);
    } catch (error) {
      message.error('登录失败: ' + error.message);
      setTimeout(() => router.push({ name: 'login' }), 1000);
    }
  } else {
    setTimeout(() => router.push({ name: 'login' }), 1000);
  }
});
</script>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 32px;
  background: rgba(255, 255, 255, 0.9);
}

.animation-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  gap: 24px;
}

.spin-animation {
  animation: spin 1.5s linear infinite;
}

.progress-bar {
  width: 100%;
  transition: all 0.3s ease;
}

.loading-text {
  font-size: 18px;
  color: #4f46e5;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>