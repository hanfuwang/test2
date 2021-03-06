const plan = {
  getPlanList: {
    requestType: "AXPROPOSALLIST",
    requestDesc: "建议书列表查询"
  },
  delPlan: {
    requestType: "AXPROPOSALDELETE",
    requestDesc: "删除规划书"
  },
  getProductSetting: {
    requestType: "AXPROPOSEPRODUCTLIST",
    requestDesc: "获取产品配置"
  },
  premiumCalc: {
    requestType: "AXCHECKRULE",
    requestDesc: "保费试算"
  },
  saveOrUpdatePlan: {
    requestType: "AXPROPOSALVIEW",
    requestDesc: "保存/更新险种"
  },
  updateCustomer: {
    requestType: "OPERATECUSMEMBER",
    requestDesc: "更新客户"
  },
  sendEmail: {
    requestType: "AXPROPOSALCREATEPDF",
    requestDesc: "发送邮件"
  },
  sendMsg: {
    requestType: "AXMSGVERIFICAT",
    requestDesc: "发送短信"
  },
  queryCoverList: {
    requestType: "AXPROPOSALCOVER",
    requestDesc: "获取封面"
  },
  getCustomerList: {
    requestType: "CUSMEMBERLIST",
    requestDesc: "获取客户列表"
  },
  queryMember: {
    requestType: "QUERYMEMBERINFOEDIT",
    requestDesc: "查询客户"
  },
  saveMember: {
    requestType: "CUSMEMBERSAVE",
    requestDesc: "保存客户信息"
  },
  deletBank: {
    requestType: "CUSBANKDELETE",
    requestDesc: "删除银行信息"
  },
  deletCus: {
    requestType: "CUSATTRDELETE",
    requestDesc: "删除客户联系方式信息"
  },
  queryPlan: {
    requestType: "AXPROPOSALSHARE",
    requestDesc: "查看规划书"
  },
  querySign: {
    requestType: "CHECKTHEAUTHPHONE",
    requestDesc: "中信银行-查询签约"
  },
  authentication: {
    requestType: "AXCSBANKAUTH",
    requestDesc: "银行卡鉴权"
  },
  getMessage: {
    requestType: "SIGNCONTRACT",
    requestDesc: "中信银行-获取验证码"
  },
  inlineSign: {
    requestType: "VERIFYSMSCODE",
    requestDesc: "中信银行-签约"
  }
};

export default plan;
