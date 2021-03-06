/**
 * vue mixin
 */
import Vue from "vue";
import globalConfig from "@/assets/global/globalConfig";

// mixin
Vue.mixin({
  data() {
    return {
      globalConfig: globalConfig
    };
  },
  methods: {
    // 页面跳转
    go(router) {
      if (typeof router === "string") {
        // string类型直接按name跳转
        this.$router.push({
          name: router
        });
      } else {
        // 其他类型，按照指定的对象跳转
        this.$router.push(router);
      }
    },
    // 回到上一个页面
    back() {
      this.$router.back();
    },
    // 指定路由名字跳转，带query参数(在url地址栏显示)
    goWithQuery(name, dataObj) {
      this.$router.push({
        name: name,
        query: dataObj
      });
    },
    // 指定路由名字跳转，带params参数(不在url地址栏显示)
    goWithParams(name, dataObj) {
      this.$router.push({
        name: name,
        params: dataObj
      });
    },
    // 返回设计稿下px值根据当前屏幕宽度等比例放大/缩小后的px值
    getAdaptSize(px) {
      return utils.ui.getAdaptSize(px);
    }
  }
});
