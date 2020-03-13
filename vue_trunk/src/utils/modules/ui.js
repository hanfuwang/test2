/* ------------------------------------------ ui相关工具类 ------------------------------------------ */

import store from "@/stores";
/**
 * 获取浏览器视口宽度
 */
export const getClientWidth = () => {
  let clientWidth = 0;
  if (document.compatMode == "CSS1Compat") {
    clientWidth = document.documentElement.clientWidth;
  } else {
    clientWidth = document.body.clientWidth;
  }
  return clientWidth;
};

/**
 * 获取浏览器视口高度
 */
export const getClientHeight = () => {
  let clientHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    clientHeight = document.documentElement.clientHeight;
  } else {
    clientHeight = document.body.clientHeight;
  }
  return clientHeight;
};

/**
 * 获取当前页面总高度
 */
export const getScrollHeight = () => {
  let scrollHeight = 0,
    bodyScrollHeight = 0,
    documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight =
    bodyScrollHeight - documentScrollHeight > 0
      ? bodyScrollHeight
      : documentScrollHeight;
  return scrollHeight;
};

/**
 * 获取当前页面滚动高度
 */
export const getScrollTop = () => {
  let scrollTop = 0,
    bodyScrollTop = 0,
    documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop =
    bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
  return scrollTop;
};

/**
 * 返回设计稿下px值根据当前屏幕宽度等比例放大/缩小后的px值
 * @param {*} px 设计稿下的px值
 */
export const getAdaptSize = px => {
  // 设计稿宽度
  const designWidth = globalConfig.ui.designWidth;
  // 当前屏幕宽度
  const clientWidth = getClientWidth();
  return px * (clientWidth / designWidth);
};

/**
 * 当前是否为iphone全面屏
 */
export const isIphoneFullScreen = () => {
  // 不是iphone机型
  if (!/iphone/gi.test(window.navigator.userAgent)) {
    return false;
  }

  const devicePixelRatio = parseInt(window.devicePixelRatio);
  const width = window.screen.width;
  const height = window.screen.height;

  if (devicePixelRatio === 3 && width === 375 && height === 812) {
    // iphone X, iphone XS, iphone 11 Pro
    return true;
  } else if (devicePixelRatio === 3 && width === 414 && height === 896) {
    // iphone XS Max, iphone 11 Pro Max
    return true;
  } else if (devicePixelRatio === 2 && width === 414 && height === 896) {
    // iphone XR iphone 11
    return true;
  }

  return false;
};

/**
 * 处理ios键盘收回导致的页面无法点击的bug
 */
export const handlerIOSKeyboardHidden = () => {
  // ios端 && (微信端 || 在app的webview中)
  if (globalConfig.os === "ios" && (globalConfig.isWx || globalConfig.isApp)) {
    // 获取当前滚动的高度
    const scrollTop = getScrollTop();
    setTimeout(() => {
      // 向上滚动1px，防止键盘顶出的高度不回弹
      window.scrollTo(0, scrollTop - 1);
    }, 100);
  }
};

/**
 * 全局confirm框
 * @param {*} CP confirm对象或msg，详见stores/modules/global.js
 */
export const confirm = (confirm = {}) => {
  const storeConfirm = store.state.ui.confirm;
  if (typeof confirm === "string") {
    storeConfirm.msg = confirm;
    storeConfirm.clickModalToClose = false;
  } else {
    storeConfirm.msg = confirm.msg;
    storeConfirm.clickModalToClose = confirm.clickModalToClose;
  }
  storeConfirm.btnList = confirm.btnList || [
    {
      msg: "确定"
    }
  ];

  storeConfirm.show = true;
};

/**
 * 显示全局loading
 * @param {*} openParams 开启loading的参数
 */
export const openLoading = (openParams = {}) => {
  const storeLoading = store.state.ui.loading;
  // 每次开启重置loading颜色
  storeLoading.color = null;

  // 带自定义颜色开启
  openParams.openColor && (storeLoading.color = openParams.openColor);

  storeLoading.show = true;
};

/**
 * 关闭全局loading
 * @param {*} closeParams 关闭loading的参数
 */
export const closeLoading = (closeParams = {}) => {
  const storeLoading = store.state.ui.loading;

  // 带自定义颜色关闭
  closeParams.closeColor && (storeLoading.color = closeParams.closeColor);

  storeLoading.show = false;
};

/**
 * 全局tips
 * @param {*} tips 提示参数
 */
export const tips = (tips = {}) => {
  const storeTips = store.state.ui.tips;
  if (typeof tips === "string") {
    // string类型走默认配置
    tips = {
      msg: tips,
      type: "success"
    };
  }
  storeTips.msg = tips.msg;
  storeTips.type = tips.type;
  storeTips.icon = tips.icon === undefined ? true : tips.icon; // 不指定icon默认显示

  storeTips.show = true;

  // 延迟during关闭tips
  setTimeout(() => {
    storeTips.show = false;
  }, tips.during || 3000);
};

const ui = {
  getClientWidth,
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getAdaptSize,
  isIphoneFullScreen,
  handlerIOSKeyboardHidden,

  confirm,
  openLoading,
  closeLoading,
  tips
};

export default ui;
