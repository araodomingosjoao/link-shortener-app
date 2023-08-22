// Font
import "./assets/css/font-face.css"
import "./assets/vendor/font-awesome-4.7/css/font-awesome.min.css"
import "./assets/vendor/font-awesome-5/css/fontawesome-all.min.css"
import "./assets/vendor/mdi-font/css/material-design-iconic-font.min.css"
//CSS
import "bootstrap/dist/css/bootstrap.css"
import "animsition/dist/css/animsition.css"
import "select2/dist/css/select2.css"
import './assets/css/theme.css'
//JS
import "./assets/vendor/jquery-3.2.1.min.js"
import "bootstrap"
import "select2"
import "./assets/vendor/animsition/animsition.min.js"
import "./assets/js/main.js"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(jQuery)
app.use(router)

app.mount('#app')