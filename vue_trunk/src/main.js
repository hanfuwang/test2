/* ------------------------------------------ main.js入口 ------------------------------------------ */

import Vue from "vue";
import App from "./views/App.vue";
import router from "./routers";
import store from "./stores";

// window全局对象挂载
import globalCode from "@/assets/global/globalCode";
import globalConfig from "@/assets/global/globalConfig";
import interfaces from "@/interfaces";
import utils from "@/utils";
window.globalCode = globalCode;
window.globalConfig = globalConfig;
window.interfaces = interfaces;
window.utils = utils;

// plugin引入
import "@/plugins";

// filter注入
import filters from "@/filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 关闭生产模式下给出的提示
Vue.config.productionTip = false;

// 实例化根vue对象
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
