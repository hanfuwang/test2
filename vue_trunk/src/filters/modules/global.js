/* ------------------------------------------ 公共filter ------------------------------------------ */

import globalCode from "@/assets/global/globalCode";

// globalCode code desc map
const codeDescMap = {};
for (const key in globalCode) {
  if (!codeDescMap[key]) codeDescMap[key] = {};
  for (const key_ in globalCode[key]) {
    codeDescMap[key][globalCode[key][key_].code] = globalCode[key][key_].desc;
  }
}

const global = {
  // globalCode：码表映射desc
  /**
   *  码表映射desc
   *  @param {string} value     码表对应的code
   *  @param {number} type      码表类型
   *  @param {boolean} defaultValue   默认值
   */
  code(value, type, defaultValue) {
    return codeDescMap[type][value] || defaultValue || value;
  },
  /**
   *  字符串过长时多余字符省略
   *  @param {string} value       传入的字符串
   *  @param {number} length    显示的字符长度
   *  @param {boolean} expand   是否展开字符串
   */
  strOmit(value, length, expand) {
    if (!value) {
      return "";
    }
    if (expand == true) {
      return value;
    } else {
      return value.slice(0, length) + "...";
    }
  },
  /**
   *  时间格式化yyyy-mm-dd
   *  @param {string} value       传入的字符串
   */
  dateFormat(value) {
    if (!value) {
      return "";
    } else {
      return value.substr(0, 10);
    }
  },
  /**
   * 返回设计稿下px值根据当前屏幕宽度等比例放大/缩小后的px值
   * @param {*} px 设计稿下的px值
   */
  adaptSize(px) {
    // 设计稿宽度
    const designWidth = globalConfig.ui.designWidth;
    // 当前屏幕宽度
    const clientWidth = utils.ui.getClientWidth();
    return px * (clientWidth / designWidth);
  },
  /**
   *  证件中间加*
   *  @param {*}      传入的字符串
   */
  bankCard(card) {
    let reg = /^(.{4})(?:\d+)(.{4})$/;
    return card.replace(reg, "$1****$2");
  },
  /**
   *  电话加*
   *  @param {*}      传入的字符串
   */
  mobile(mobile) {
    let rep = /^(.{3})(?:\d+)(.{4})$/;
    return mobile.replace(rep, "$1****$2");
  },
  /**
   *  地址加*
   *  @param {*}      传入的字符串
   */
  address(address) {
    let reg = /(.*)(.)$/;
    return address.replace(reg, "******");
  },
  /**
   *  千分位分割*
   *  @param {*}      传入的字符串
   */
  addCommas(nStr) {
    //后端科学技术法
    if (nStr.indexOf("E") != -1) {
      let str = nStr;
      str = String(str).substr(0, String(str).length - 2);
      nStr = +str * Math.pow(10, nStr.slice(String(nStr).length - 1)) + ".00";
    }
    nStr += "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }
};

export default global;
