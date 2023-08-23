// Font
import "./assets/css/font-face.css"
import "./assets/vendor/font-awesome-4.7/css/font-awesome.min.css"
import "./assets/vendor/font-awesome-5/css/fontawesome-all.min.css"
import "./assets/vendor/mdi-font/css/material-design-iconic-font.min.css"
// CSS
import "bootstrap/dist/css/bootstrap.css"
import "animsition/dist/css/animsition.css"
import './assets/css/theme.css'
// JS
import "./assets/vendor/jquery-3.2.1.min.js"
import "bootstrap"
import "./assets/vendor/animsition/animsition.min.js"
import "./assets/js/main.js"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
const app = createApp(App)

app.use(createPinia())
app.use(VueAwesomePaginate)
app.use(jQuery)
app.use(router)

app.mount('#app')
