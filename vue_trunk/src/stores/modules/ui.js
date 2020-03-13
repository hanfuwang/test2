/* ------------------------------------------ ui模块 ------------------------------------------ */

//state：状态
const state = {
  // 提示框参数
  confirm: {
    show: false, // 是否显示
    msg: undefined, // 显示内容
    btnList: [], // 按钮组 [{cb: ()=> {}, msg: ''}]
    clickModalToClose: false // 点击模态层是否关闭
  },
  // loading
  loading: {
    show: false, // 是否显示
    color: undefined // loading颜色
  },
  // tips
  tips: {
    show: false, // 是否显示
    msg: undefined, // 显示内容
    type: undefined, // 预设：success, error, warn
    icon: undefined // 是否有图标
  }
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
const actions = {};

const ui = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default ui;
