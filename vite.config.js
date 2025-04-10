import { defineConfig, loadEnv } from 'vite'
const env = loadEnv("development", process.cwd());
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import path from "path"
console.log(env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 12000,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'X-Frame-Options': 'ALLOWALL'
    },
    proxy: {
      "/api": {
        target: env.VITE_SERVICE_URL || 'http://127.0.0.1:3000',
        protocol: "http",
        changeOrigin: true,
        ws: true,
      },
    },
    allowedHosts: [
      'work-1-bodhaymhhcyxovth.prod-runtime.all-hands.dev',
      'work-2-bodhaymhhcyxovth.prod-runtime.all-hands.dev'
    ],
  },
  optimizeDeps: {
    exclude: ['markmap-view', 'markmap-lib'],
  },
  // 添加图标库配置
})
