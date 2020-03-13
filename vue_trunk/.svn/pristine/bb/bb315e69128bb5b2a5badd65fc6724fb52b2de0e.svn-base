/* ------------------------------------------ DES3加密 ------------------------------------------ */

import CryptoJS from "crypto-js";
import js_base64 from "js-base64";
import globalConfig from "@/assets/global/globalConfig";
const Base64 = js_base64.Base64;

const DES3 = {
  keyHex: CryptoJS.enc.Utf8.parse(globalConfig.transfer),
  encrypt(A, str) {
    var encrypted = CryptoJS.TripleDES.encrypt(
      str,
      A ? CryptoJS.enc.Utf8.parse(A) : this.keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  },
  decrypt(A, str) {
    var decrypted = CryptoJS.TripleDES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(str)
      },
      A ? CryptoJS.enc.Utf8.parse(A) : this.keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  },
  base64Encode(A, str) {
    return A
      ? Base64.encode(str.replace(/\//g, "*"))
      : Base64.encode(JSON.stringify(str).replace(/\//g, "*"));
  },
  base64Decode(A, str) {
    return A
      ? Base64.decode(str).replace(/\*/g, "/")
      : Base64.decode(JSON.parse(str)).replace(/\*/g, "/");
  }
};

export default DES3;
