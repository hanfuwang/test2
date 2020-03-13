/* ------------------------------------------ user接口 ------------------------------------------ */

const user = {
  forgetPwd: {
    requestType: "AXWECHATFORGETPWD",
    requestDesc: "忘记密码"
  },
  changePwd: {
    requestType: "AXWECHATMODIFYPASSWORD",
    requestDesc: "修改密码"
  },
  getUserInfoByOpenId: {
    requestType: "AXWECHATGETAGENTINFO",
    requestDesc: "根据openId获取用户信息"
  },
  getUserInfoByInfoId: {
    requestType: "GETCUSMEMBERINFOBYID",
    requestDesc: "根据infoId获取用户信息"
  },
  changeUserPhone: {
    requestType: "AXWECHATCHANGEPHONE",
    requestDesc: "修改用户绑定手机号"
  },
  updateUser: {
    requestType: "AXWECHATCHANGEAGENT",
    requestDesc: "修改个人信息"
  }
};

export default user;
