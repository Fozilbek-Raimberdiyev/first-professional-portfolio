import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


 import  {resInterceptor, reqinterceptor} from "./services/api.service"

import "boxicons"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { ability, abilityPlugin } from './services/ability'
import { abilitiesPlugin } from '@casl/vue'
const pinia = createPinia()
// pinia.use(abilityPlugin)



export const app = createApp(App)

// The usual app stuff goes here.

//using plugins
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Toast)
app.use(resInterceptor)
app.use(reqinterceptor)
app.use(LoadingPlugin)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })

  app.use(Antd)
  // app.use(abilitiesPlugin,ability)

app.use(VueSidebarMenu)
app.mount('#app')
