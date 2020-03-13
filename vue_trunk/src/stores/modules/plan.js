/* ------------------------------------------ 规划书模块 ------------------------------------------ */
//state：状态

const state = {
  //被保人
  insurant: {
    name: "",
    sex: "0",
    birthdate: "",
    //职业信息
    cdOccupation: {
      occupationCode: "",
      occupationLevel: "",
      occupationName: "",
      occupationRiskLevel: "",
      occupationRiskMetical: ""
    },
    isoldCustomer: "0", //默认是新客户
    holderRelation: "" //关系
  },
  //投保人信息
  applicant: {
    name: "",
    sex: "0", //性别
    birthdate: "",
    //职业信息
    cdOccupation: {
      occupationCode: "",
      occupationLevel: "",
      occupationName: "",
      occupationRiskLevel: "",
      occupationRiskMetical: ""
    },

    isoldCustomer: "0" //默认是新客户
  },
  mainProposalProductList: [], //主险种列表
  riskProposalProductList: [], //附加险种列表
  selectAllRisk: [], //附加险编辑后重新存储的数据
  totalPremium: "", //总保费
  totalAmount: "", //总保额
  liablist: [], //责任列表
  searchParams: {
    //搜索计划书请求参数
    policyHolderName: "", //投保人姓名
    insuranceType: "", //险种code
    quertStartTime: "", //制作日期（开始）
    queryEndTime: "" //制作日期(结束)
  },
  showTable: {
    //利益演示表
    low: [],
    middle: [],
    high: [],
    productCode: "" //产品编码
  },
  isShowRisk: true, //是否执行附加险组件create方法
  isShowLiablist: true, //是否执行责任列表组件create方法
  bankInfoList: [], //银行账户信息
  concList: [], //客户联系方式
  cusQueryForm: { customerName: "" }, //客户姓名（搜索框）
  cusIndex: -1, // 客户信息索引
  bankIndex: -1, //银行信息索引
  introduce: {}
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

const plan = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default plan;
