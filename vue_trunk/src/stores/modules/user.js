/* ------------------------------------------ user模块 ------------------------------------------ */

//state：状态
const state = {
  openId: "", // openId，wxAccess进入，会存入openId
  infoId: "", // app端，appAccess进入，会存入infoId
  userInfo: {} // 当前登录用户信息对象
};

//getters：类似于state的计算属性
//接收参数：state
const getters = {};

//mutations：改变state的唯一途径，里面的操作必须是同步的，否则会导致变化无法追踪
//接收参数，state，载荷payload对象
const mutations = {
  setState(state, payload) {
    state[payload.attr] = payload.data;
  }
};

//actions：用于异步地提交一个或多个mutations，常与Promise联合使用
//接收参数：context对象(一个与 当前模块store 实例具有相同方法和属性的 context 对象)，载荷payload对象
const actions = {
  // 通过openId查询用户信息
  getUserInfoByOpenId(context) {
    return new Promise((resolve, reject) => {
      // 请求参数
      const params = {
        agentDto: {
          openId: context.state.openId // openId
        }
      };
      // http
      utils.http
        .post(interfaces.user.getUserInfoByOpenId, params, {
          needErrorTips: false
        })
        .then(res => {
          // store中塞入userInfo
          context.commit("setState", {
            attr: "userInfo",
            data: res
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 通过infoId查询用户信息
  getUserInfoByInfoId(context) {
    return new Promise((resolve, reject) => {
      // 请求参数
      const params = {
        cusMemberInfo: {
          infoId: context.state.infoId // openId
        }
      };
      // http
      utils.http
        .post(interfaces.user.getUserInfoByInfoId, params, {
          needErrorTips: false
        })
        .then(res => {
          // store中塞入userInfo
          context.commit("setState", {
            attr: "userInfo",
            data: res
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default user;
