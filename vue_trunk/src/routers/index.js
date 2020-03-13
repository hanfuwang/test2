/* ------------------------------------------ routers入口 ------------------------------------------ */

import Vue from "vue";
import Router from "vue-router";
import store from "@/stores";

Vue.use(Router);

// 自动引入所有的模块
const modules = require.context("./modules", false, /.js$/);
console.log(modules);
const routes = modules.keys().reduce((result, fileName) => {
  result = [...result, ...modules(fileName).default];
  return result;
}, []);
console.info(routes);

// 创建router对象
const router = new Router({
  routes: routes
});

// 路由切换处理函数
router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = to.meta.title;

  // 判断图片预览层是否关闭，如果未关闭，先关闭
  // if (!closePhotoPreview()) {
  //   next(false);
  //   return;
  // }

  // 登陆校验
  if (!checkLogin(to)) {
    // 处理未登录
    handlerUnLogin(to, next);
    return;
  }

  // 微信端 && 有navigation在url中挂载的参数
  // navigation插件在页面跳转时会走两次beforeEach，第一次不带参数，第二次带参数，这里为了防止重复注册
  if (globalConfig.isWx && to.query[globalConfig.navKeyName]) {
    // 初始化当前页面的微信分享
    initPageWxShare(to);
  }

  // 放行
  next();
});

// 登陆校验
function checkLogin(to) {
  if (!to.meta.login) return true;

  // 从store中读取是否有userInfo
  const userInfo = store.state.user.userInfo;
  if (userInfo && JSON.stringify(userInfo) !== "{}") {
    // 登陆了
    return true;
  } else {
    // 没登陆
    return false;
  }
}

// 处理未登录
function handlerUnLogin(to, next) {
  utils.ui.tips({
    msg: "请先登陆",
    type: "warn"
  });
  // 重新挂载的query参数
  const query = {
    ...to.query,
    // 塞入登录成功后跳转的path参数
    loginToPath: to.name
  };
  // 删除query中无用的参数
  Reflect.deleteProperty(query, globalConfig.navKeyName);

  // 重新挂载的params参数
  const params = {
    ...to.params
  };

  // 跳转到登录页
  next({
    name: "login",
    // query挂载，便于登录完后重新挂载回页面
    query,
    // params挂载，便于登录完后重新挂载回页面
    params
  });
}

// 初始化当前页面的微信分享
function initPageWxShare(to) {
  // jssdk config注入
  utils.wechat
    .config()
    .then(() => {
      if (to.meta.ignoreWxShare) {
        // 路由配置了需要忽略微信分享配置，不进行处理
      } else if (to.meta.wxShare) {
        // 需要微信分享，显示按钮组
        utils.wechat.showMenuItems();
      } else {
        // 不需要微信分享，隐藏按钮组
        utils.wechat.hideMenuItems();
      }
    })
    .catch(error => {
      utils.ui.tips({
        msg: error,
        type: "error"
      });
    });
}

// 判断图片预览层是否关闭，如果未关闭，先关闭
// function closePhotoPreview() {
//   // 当前图片预览层为打开
//   if (document.querySelector(".pswp--open")) {
//     // 手动触发关闭按钮click
//     document.querySelector(".pswp__button--close").click();
//     // 获取当前页面滚动高度--vue-navigation在next(false)时会失去页面高度
//     const scrollTop = utils.ui.getBodyScrollTop();
//     // 重新滚动到之前记录的高度
//     setTimeout(() => {
//       window.scrollTo(0, scrollTop);
//     });
//     return false;
//   }
//   return true;
// }
export default router;
