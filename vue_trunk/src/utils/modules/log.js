/* ------------------------------------------ log工具类 ------------------------------------------ */

/**
 * 彩色控制台打印
 * @param {*} msg 要打印的内容
 * @param {*} logColor 打印的颜色
 */
export const color = (msg, logColor = "black") => {
  if (typeof msg === "object") {
    msg = JSON.stringify(msg);
  }
  console.log(`%c ${msg}`, `color: ${logColor}`);
};

const log = {
  color
};

export default log;
