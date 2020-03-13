/* ------------------------------------------ code字典码表工具 ------------------------------------------ */

/**
 * 检查码表的版本
 */
export const checkCodeVersion = () => {
  return new Promise(async resolve => {
    // check结果对象
    const checkResult = {
      errMsg: "", // 检查码表版本过程中的错误信息
      needUpdate: false, // 是否需要更新
      latestCodeVersion: null, // 最新的版本号
      cacheCodeVersion: utils.local.get("codeVersion") // 缓存中的版本号
    };
    // 请求最新的版本号
    const cvRes = await utils.http
      .get(interfaces.global.codeVersion)
      .catch(() => {});
    if (cvRes) {
      const cvItem = cvRes.find(item => item.tableName === "t_sys_dict_type");
      if (cvItem) {
        // 塞入服务器最新的码表版本号
        checkResult.latestCodeVersion = cvItem.version;
        // 塞入是否需要更新的标志
        checkResult.needUpdate =
          checkResult.latestCodeVersion !== checkResult.cacheCodeVersion;
      } else {
        checkResult.errMsg = "不存在tableName为t_sys_dict_type的数据";
      }
    } else {
      checkResult.errMsg = "检查码表版本时出错";
    }

    // resolve
    resolve(checkResult);
  });
};

/**
 * 从后台获取码表
 */
export const fetchCode = () => {
  return new Promise(async resolve => {
    // params
    const params = {
      sysDictDataDto: {
        className: ""
      }
    };
    // http
    const res = await utils.http
      .post(interfaces.global.code, params)
      .catch(() => {});

    // resolve
    resolve(res);
  });
};

/**
 * 将后台返回的数组格式的codeList转换为对象形式的codeMap
 * @param {*} codeList 后台返回的codeList
 */
function transCodeListToMap(codeList) {
  const codeMap = {};
  codeList.forEach(code => {
    codeMap[code.type] = code.sysDicDataList;
  });
  return codeMap;
}
/**
 * 更新码表
 */
export const updateCode = () => {
  return new Promise(async resolve => {
    // update结果对象
    const updateResult = {
      errMsg: ""
    };

    // 检查当前的码表版本
    const checkResult = await checkCodeVersion();
    if (checkResult.errMsg) {
      // 检查版本时发生错误
      updateResult.errMsg = checkResult.errMsg;
    } else if (checkResult.needUpdate) {
      // 需要更新的情况
      const res = await fetchCode();
      try {
        // 后台返回的codeList
        const codeList = res.sysDictDataDto.sysDictTypeDTOList;
        // 更新缓存中的码表版本号
        utils.local.set("codeVersion", checkResult.latestCodeVersion);
        // 更新缓存中的codeMap
        utils.local.set("codeMap", transCodeListToMap(codeList));
      } catch (error) {
        updateResult.errMsg = "查询码表失败";
      }
    }

    // resolve
    resolve(updateResult);
  });
};

/**
 * 指定code类型获取code码表
 * @param {*} codeType code类型
 */
export const getCode = codeType => {
  return new Promise(async resolve => {
    let codeMap = utils.local.get("codeMap");
    if (codeMap) {
      // 当前有缓存的码表
      resolve(codeMap[codeType]);
    } else {
      // 当前没有缓存的码表
      const updateResult = await updateCode();
      if (updateResult.errMsg) {
        utils.ui.tips({
          msg: updateResult.errMsg,
          type: "error"
        });
        // 更新码表失败，resolve一个空数组
        resolve([]);
        return;
      }
      // 更新成功后重新获取码表
      codeMap = utils.local.get("codeMap");
      resolve(codeMap[codeType]);
    }
  });
};

const code = {
  checkCodeVersion,
  fetchCode,
  updateCode,
  getCode
};

export default code;
