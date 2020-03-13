/* ------------------------------------------ native原生交互工具类 ------------------------------------------ */

import bridge from "@/assets/libs/dsbridge";

/**
 * 在app里面关闭当前vue页面
 * @param {*} ret 传入ret则关闭并跳转到ret指定的某个页面，不传则仅关闭当前vue页面
 */
export const closePage = ret => {
  bridge.call("_dsb.closePage", ret);
};
/**
 * 调取原生微信分享
 * @param {*} shareObj 传给原生的分享对象
 */
export const shareWx = (params = {}) => {
  const shareObj = {
    shareTitle: params.shareTitle, // 分享标题
    shareDesc: params.shareDesc, //分享内容
    shareType: params.shareType, //0文本 1图片 2音乐url 3视频url 4网页
    shareTarget: params.shareTarget, //0好友 1朋友圈
    shareUrl: params.shareUrl, //分享链接
    shareThumb: params.shareThumb //缩略图url
  };
  bridge.call("_dsb.wxShare", shareObj);
};

const native = {
  closePage,
  shareWx
};

export default native;
