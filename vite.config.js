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
    port: 5000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: env.VITE_SERVICE_URL || 'http://127.0.0.1:3000',
        protocol: "http",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['markmap-view', 'markmap-lib'],
  },
  // 添加图标库配置
})
