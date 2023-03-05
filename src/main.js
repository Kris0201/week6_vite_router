import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 匯入自訂義 all.scss 檔
import './assets/all.scss'

// 載入 vue-loading (插件)
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// 載入 vue-axios (插件)，可在元件中直接使用 this.$http 來使用
import axios from 'axios'
import VueAxios from 'vue-axios'

// 引入 VeeValidate 元件跟功能
import {
    Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import AllRules from '@vee-validate/rules';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

// 將當前 VeeValidate 的語系設定為繁體中文
configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale('zh_TW');
  

import App from './App.vue'
import router from './router'


const app = createApp(App)

// 掛載 Global 的 VeeValidate 元件
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)




// 使用全域註冊方式註冊 vue-loading 元件
app.component('VueLoading', Loading)

app.mount('#app')
