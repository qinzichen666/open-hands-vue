import { createApp } from 'vue';
import './style.scss';

import App from './App.vue';
const app = createApp(App);

import router from "./router/index.js";
app.use(router);

import store from "./store";
app.use(store);

app.mount('#app')
