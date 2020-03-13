/* ------------------------------------------ http请求工具类 ------------------------------------------ */

import axios from "axios";
import globalConfig from "@/assets/global/globalConfig";
import DES3 from "@/assets/libs/secret/DES3";
import { hex_hmac_md5 } from "@/assets/libs/secret/md5";
import { color as colorLog } from "./log";

// 请求实例
const instance = axios.create({
  timeout: globalConfig.timeout,
  headers: {
    post: {
      "Content-Type": ""
    }
  }
});

// 日志打印器
const logHandler = {
  // 请求日志打印
  request(config) {
    // 请求数+1
    globalConfig.requestCount++;

    // 打印日志
    colorLog(
      `${config.method} to ${config.requestType || config.requestPath} [${
        config.requestDesc
      }] =>`,
      "blue"
    );
    if (config.method === "post") {
      console.log(config.data);
    } else if (config.method === "get") {
      console.log(config.params);
    }

    // 开启loading
    if (config.customSet.needLoading) {
      utils.ui.openLoading({ openColor: globalConfig.ui.colorTheme });
    }
  },
  // 返回成功日志打印
  response(response) {
    // 请求数-1
    globalConfig.requestCount--;

    // 打印日志
    const config = response.config;
    colorLog(
      `${config.method} to ${config.requestType || config.requestPath} [${
        config.requestDesc
      }] √`,
      "green"
    );
    console.log(response.data);

    // 无正在进行的请求，关闭loading
    if (globalConfig.requestCount === 0) {
      utils.ui.closeLoading({ closeColor: globalConfig.ui.colorSuccess });
    }
  },
  // 错误日志打印
  error(error) {
    // 请求数-1
    globalConfig.requestCount--;

    // 打印日志
    const config = JSON.parse(JSON.stringify(error)).config;
    if (config) {
      // 非纯js报错
      colorLog(
        `${config.method} to ${config.requestType || config.requestPath} [${
          config.requestDesc
        }] X`,
        "red"
      );
    }
    // 后台返回的错误信息中带堆栈信息，无法去除，前端需过滤= =
    error.message = error.message.split("\n")[0];
    console.log(error.message);

    // 关闭loading
    utils.ui.closeLoading({ closeColor: globalConfig.ui.colorError });

    // 如果指定需要错误提示的话，则进行tips错误提示
    if (config.customSet.needErrorTips) {
      utils.ui.tips({
        msg: error.message.substr(0, 200),
        type: "error"
      });
    }
  }
};

// 获取组装的请求params
function getParams(config) {
  const requestType = config.url.requestType;
  const params = {
    packageList: {
      packages: {
        header: {
          requestType: requestType,
          comId: globalConfig.comId,
          from: globalConfig.from,
          sendTime: utils.format.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss"), //当前日期时间，格式为"yyyy-MM-dd HH:mm:ss"
          orderSerial: "orderId",
          comSerial: "comSerial",
          version: "V1.0" //当前请求数据的版本
        },
        request: ""
      }
    }
  };
  // 设置request(DES3加密)
  params.packageList.packages.request = DES3.encrypt(
    "",
    JSON.stringify(config.data).replace(/\s/g, "")
  );
  return params;
}

// 根据params编码config
function encodeConfigByParams(config, params) {
  const paramStr = JSON.stringify(params);
  const sign = hex_hmac_md5(globalConfig.transfer, paramStr);
  config.url =
    globalConfig.serverUrl +
    "interfaceChannel?sign=" +
    sign +
    "&com_id=" +
    globalConfig.comId;
  config.data = JSON.stringify(paramStr).replace(/[\\]/g, "");
  config.data = config.data.substr(1);
  config.data = config.data.substr(0, config.data.length - 1);
}

// response解码
function decodeResponse(res) {
  // 后台错误情况处理
  const header = res.data.packageList.packages.header;
  if (header.responseCode !== "0") {
    // 后台responseCode返回0代表请求合法，其他为不合法的情况
    const error = new Error("[responseCode!==0]" + header.errorMessage);
    error.config = res.config;
    throw error;
  }
  // 主res DES3解码
  const mainRes = JSON.parse(
    DES3.decrypt("", res.data.packageList.packages.response)
  );
  // 赋值解密的data
  res.data = mainRes;
}

// 请求拦截器
instance.interceptors.request.use(
  config => {
    try {
      // interfaceObj暂存在url字段中
      const interfaceObj = config.url;
      // 塞入interfaceObj字段，以便后续取到
      config.requestType = interfaceObj.requestType;
      config.requestPath = interfaceObj.requestPath;
      config.requestDesc = interfaceObj.requestDesc;

      // customSet处理
      // customSet暂存在data请求参数中(post)，或params请求参数中(get)
      if (config.method === "post") {
        // post请求
        // config塞入customSet，以便后续取到
        config.customSet = config.data.customSet;
        // data中删除暂存的customSet属性
        Reflect.deleteProperty(config.data, "customSet");
      } else if (config.method === "get") {
        // get请求
        // config塞入customSet，以便后续取到
        config.customSet = config.params.customSet;
        // params中删除暂存的customSet属性
        Reflect.deleteProperty(config.params, "customSet");
      }

      // 打印日志
      logHandler.request(config);

      // 处理不同的请求
      if (config.requestType) {
        // 为与serverUrl约定的请求，带requestType
        // 根据params编码config
        encodeConfigByParams(config, getParams(config));
      } else if (config.requestPath) {
        // 其他请求，带requestPath
        // 拼接真正的请求路径--不指定请求前缀默认serverUrl
        config.url = config.requestPath.startsWith("http")
          ? config.requestPath
          : globalConfig.serverUrl + config.requestPath;
      }
    } catch (error) {
      // 发生错误，关闭请求：会进返回拦截器的error分支
      const source = axios.CancelToken.source();
      source.cancel(`请求被取消，原因：${error.message}`);
      config.cancelToken = source.token;
    }

    // 返回处理过后的config
    return config;
  },
  error => {
    // 打印日志
    logHandler.error(error);
    // 返回promise
    return Promise.reject(error.message);
  }
);

// 返回拦截器
instance.interceptors.response.use(
  response => {
    // console.log(JSON.stringify(response));
    try {
      if (response.config.requestType) {
        // 与serverUrl约定的请求需解码
        decodeResponse(response);
      }
      // 打印日志
      logHandler.response(response);
      // 返回数据
      return response.data;
    } catch (error) {
      error.config = response.config;
      // 打印日志
      logHandler.error(error);
      // 返回reject
      return Promise.reject(error.message);
    }
  },
  error => {
    // 打印日志
    logHandler.error(error);
    // 返回reject
    return Promise.reject(error.message);
  }
);

// 初始化的客制化set
const initCustomSet = {
  needErrorTips: true, // 在发生错误时显示tips
  needLoading: true // 请求时是否显示loading
};

/**
 * get请求
 * @param {*} interfaceObj 接口对象，interfaces文件夹中定义
 * @param {*} params 请求参数
 * @param {*} customSet 客制化set
 */
export const get = (interfaceObj, params = {}, customSet) => {
  customSet = {
    ...initCustomSet,
    ...customSet
  };
  params.customSet = customSet;
  return instance.get(interfaceObj, { params: params });
};

/**
 * post请求
 * @param {*} interfaceObj 接口对象，interfaces文件夹中定义
 * @param {*} params 请求参数
 * @param {*} customSet 客制化set
 */
export const post = (interfaceObj, params = {}, customSet) => {
  customSet = {
    ...initCustomSet,
    ...customSet
  };
  params.customSet = customSet;
  return instance.post(interfaceObj, params);
};

const http = {
  get,
  post
};

export default http;
