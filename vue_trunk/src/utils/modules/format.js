/* ------------------------------------------ format格式化工具 ------------------------------------------ */

/**
 * 日期字符串转日期对象
 * @param {*} str 日期字符串
 */
export const strToDate = str => {
  return new Date(str.replace(/\.|-/g, "/"));
};

/**
 * 日期对象转日期字符串
 * @param {*} date 日期对象
 * @param {*} pattern 转换格式，默认yyyy-MM-dd HH:mm:ss
 */
export const dateToStr = (date, pattern) => {
  if (!pattern) {
    pattern = "yyyy-MM-dd HH:mm:ss";
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(pattern)) {
      const v = o[k];
      pattern = pattern.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length)
      );
    }
  }
  return pattern;
};
/**
 * 根据时间戳判断是否大于等于30天
 * @param {*} publishtime 接收的时间戳
 */
export const getDateTimeBefor = publishtime => {
  var currTime = Date.parse(new Date());
  var time = parseInt(currTime) - parseInt(publishtime);
  //秒转天数
  var days = time / 1000 / 3600 / 24;
  console.log(days);
  if (30 <= days) {
    return true;
  } else {
    return false;
  }
};
/**
 * 根据时间算年龄
 * @param {*} birthday 接收yyyy-mm-dd
 */
export const getAge = birthday => {
  if (birthday == "") {
    return;
  }
  var returnAge;
  var strBirthdayArr = birthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];
  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; //返回周岁年龄
};
const format = {
  strToDate,
  dateToStr,
  getDateTimeBefor,
  getAge
};
export default format;
