/**
 * navigation：对keep-alive进行封装，能记住之前页面的状态，在返回时做到组件数据不丢失
 */
import Vue from "vue";
import router from "../../routers";
import Navigation from "vue-navigation";
import globalConfig from "@/assets/global/globalConfig";

Vue.use(Navigation, {
  router,
  keyName: globalConfig.navKeyName // navigation在url中挂载参数的名字
});
