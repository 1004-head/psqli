import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/common.css'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl = 'http://192.168.0.102:8080'
app.use(router).mount('#app')
