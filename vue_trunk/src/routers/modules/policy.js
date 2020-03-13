// 保单模块
// eslint-disable-next-line no-unused-vars
const policy = [
  {
    name: "policyList",
    path: "/policy/policyList",
    meta: {
      title: "我的保单列表",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "policyList" */ "@/views/policy/PolicyList.vue"
      );
    }
  },
  {
    name: "particulars",
    path: "/policy/Particulars",
    meta: {
      title: "保单详情"
    },
    component: () => {
      return import(
        /* webpackChunkName: "Particulars" */ "@/views/policy/Particulars.vue"
      );
    }
  },
  {
    name: "policyQuery",
    path: "/policy/PolicyQuery",
    meta: {
      title: "保单查询"
    },
    component: () => {
      return import(
        /* webpackChunkName: "PolicyQuery" */ "@/views/policy/PolicyQuery.vue"
      );
    }
  }
];
export default policy;
