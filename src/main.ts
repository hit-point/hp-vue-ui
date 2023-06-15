import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'xe-utils';
import { useTable } from '../build/vite/lib/vxetable';

import './style/tailwind.css';
const app = createApp(App);

app.use(createPinia());
// VXETable按需引入
app.use(useTable);
app.use(router);

app.mount('#app');
