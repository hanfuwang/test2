/* ------------------------------------------ login模块 ------------------------------------------ */

const user = [
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录"
    },
    component: () => {
      return import(/* webpackChunkName: "login" */ "@/views/login/Login.vue");
    }
  },
  {
    name: "wxAccess",
    path: "/login/wxAccess",
    meta: {
      title: "跳转中...",
      ignoreWxShare: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "wxAccess" */ "@/views/login/WxAccess.vue"
      );
    }
  },
  {
    name: "appAccess",
    path: "/login/appAccess",
    meta: {
      title: "跳转中...",
      ignoreWxShare: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "appAccess" */ "@/views/login/AppAccess.vue"
      );
    }
  }
];

export default user;
