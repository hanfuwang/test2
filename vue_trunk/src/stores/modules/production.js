/* ------------------------------------------ 产品中心模块 ------------------------------------------ */

//state：状态
const state = {
  //被保人
  insurant: {
    sex: "1",
    birthday: "",
    birthdate: "",
    isProfession: false, //是否显示职业
    //职业信息
    cdOccupation: {
      occupationCode: "",
      occupationLevel: "",
      occupationName: "",
      occupationRiskLevel: "",
      occupationRiskMetical: ""
    },
    shebao: "1" //是否社保 1为是,2为否
  },
  //投保人信息
  applicant: {
    sex: "0", //性别
    birthday: "",
    birthdate: "",
    //职业信息
    cdOccupation: {
      occupationCode: "",
      occupationLevel: "",
      occupationName: "",
      occupationRiskLevel: "",
      occupationRiskMetical: ""
    }
  },
  mainProposalProductItem: {
    amount: "",
    attList: [],
    bookId: "",
    chargeType: "",
    chargeWay: "",
    coverageType: "",
    createTime: "",
    createdBy: "",
    description: "",
    drawFreq: "",
    drawStartAge: "",
    extraList: [], //附加险种
    grade: "",
    id: "",
    isMaster: "",
    lastUpdatedBy: "",
    liabList: [],
    payMode: "",
    payPeriod: "",
    payintv: "",
    policyPeriod: "",
    premium: "",
    productCode: "",
    productId: "",
    productName: "",
    productShortName: "",
    productType: "",
    qxFlag: "",
    relationType: "",
    shebao: "",
    sourceId: "",
    subflag: "",
    updateTime: " ",
    userDefine1: "",
    userDefine2: ""
  }, //主险模板
  riskProposalProductList: [], //附加险种列表
  selectAllRisk: [], //附加险编辑后重新存储的数据
  totalPremium: "", //总保费
  liablist: [], //责任列表
  clauseList: [], //条款的内容
  proIframeTittle: "", //保障条款与投保须知
  //iframe的内容
  iframeContent: {
    tittle: "",
    url: ""
  },
  proIframeCode: "", //使用iframe打开的产品
  isShowRisk: true, //是否执行附加险组件create方法
  productItem: {} //产品的内容
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

const production = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default production;
