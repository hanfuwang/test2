/**
 * 随机32位随机数
 */
export const getUuid = () => {
  var withLine = true; //带不带横线
  var len = 32; //长度为32
  var radix = 16; //16进制
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  var uuid = [],
    i;
  radix = radix || chars.length;
  if (withLine) {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23];
    uuid[14] = "4";
    for (i = 0; i < len; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  } else {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  }
  return uuid.join("");
};
const creator = {
  getUuid
};

export default creator;
