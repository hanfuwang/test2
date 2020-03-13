/* ------------------------------------------ 正则表达式类 ------------------------------------------ */

const regExpMap = {
  require: /^[\s\S]+$/, //非空
  Positive: /^([1-9]\d*|[0]{1,1})$/, //匹配非负整数（正整数 + 0）
  positive: /^[0-9]*[1-9][0-9]*$/, //匹配正整数
  Negative: /^((-d+)|(0+))$/, //匹配非正整数（负整数 + 0）
  negative: /^-[0-9]*[1-9][0-9]*$/, //匹配负整数
  integer: /^-?d+$/, //匹配整数
  //PositiveFloat: /^d+(.d+)?$/, //匹配非负浮点数（正浮点数 + 0）
  PositiveFloat: /^\d+(\.\d+)?$/, //匹配非负浮点数（正浮点数 + 0）
  positiveFloat: /^(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$/, //匹配正浮点数
  NegativeFloat: /^((-d+(.d+)?)|(0+(.0+)?))$/, //匹配非正浮点数（负浮点数 + 0）
  negativeFloat: /^(-(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*)))$/, //匹配负浮点数
  letter: /^[A-Za-z]+$/, //匹配由26个英文字母组成的字符串
  numberLetter: /^[A-Za-z0-9]+$/, //字母加数字
  mobile: /^(13|14|15|16|17|18|19)\d{9}$/, //手机号
  mobileOrEmpty: /^\s*$|^(13|14|15|16|17|18|19)\d{9}$/, //手机号(或为空)
  telephone: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, //电话
  chineseLetter: /^[a-z A-Z\u4E00-\u9FA5]+$/, //汉字+字母
  chinese: /^[\u4E00-\u9FA5]+$/, //汉字
  name: /^([\u4E00-\u9FA5]|\u00B7|\u2022)+$/, //名字，汉字|中间点|加重号
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/, //email
  postCode: /^[0-9]{6}$/, //邮编
  carNO: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/, //车牌号
  pwd: /^[^\u4e00-\u9fa5\s]{6,20}$/, //密码验证
  passport: /^[G|E][0-9]{8}$|^[S|P|D][0-9]{7}$/, //护照
  bankCode: /^[0-9]+$/, //银行卡号
  money2decimals: /^(\d+(\.\d{1,2})?)?$/, //金额，最多两位小数
  number1decimal: /^(\d+(\.\d?)?)?$/, //数字，最多一位位小数
  number2decimal: /^(\d+(\.\d{1,2})?)?$/ //数字，最多一位小数
};

/**
 * 获取正则表达式
 * @param {*} key 键
 */
export const get = key => {
  return regExpMap[key];
};

const regExp = {
  get
};

export default regExp;