/* ------------------------------------------ 规划书模块 ------------------------------------------ */

const plan = [
  {
    name: "responsibility",
    path: "/plan/responsibility",
    meta: {
      title: "责任详情"
    },
    component: () => {
      return import(
        /* webpackChunkName: "Responsibility" */ "@/views/plan/Responsibility.vue"
      );
    }
  },
  {
    name: "personCard",
    path: "/plan/personCard",
    meta: {
      title: "个人名片",
      login: false
    },
    component: () => {
      return import(
        /* webpackChunkName: "PersonCard" */ "@/views/plan/PersonCard.vue"
      );
    }
  },
  {
    name: "showTable",
    path: "/plan/showTable",
    meta: {
      title: "利益演示表",
      login: false
    },
    component: () => {
      return import(
        /* webpackChunkName: "showTable" */ "@/views/plan/ShowTable.vue"
      );
    }
  },
  {
    name: "clause",
    path: "/plan/clause",
    meta: {
      title: "条款",
      login: false
    },
    component: () => {
      return import(/* webpackChunkName: "Clause" */ "@/views/plan/Clause.vue");
    }
  },
  {
    name: "lookPlan",
    path: "/plan/lookPlan",
    meta: {
      title: "查看规划书",
      login: false,
      ignoreWxShare: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "lookPlan" */ "@/views/plan/LookPlan.vue"
      );
    }
  },
  {
    name: "queryPlan",
    path: "/plan/queryPlan",
    meta: {
      title: "查询规划书",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "QueryPlan" */ "@/views/plan/QueryPlan.vue"
      );
    }
  },
  {
    name: "queryCustomer",
    path: "/plan/queryCustomer",
    meta: {
      title: "客户查询",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "queryCustomer" */ "@/views/plan/QueryCustomer.vue"
      );
    }
  },
  {
    name: "bankMes",
    path: "/plan/bankMes",
    meta: {
      title: "客户联系方式",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "bankMes" */ "@/views/plan/BankMes.vue"
      );
    }
  },
  {
    name: "customerContact",
    path: "/plan/customerContact",
    meta: {
      title: "客户联系方式",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "customerContact" */ "@/views/plan/CustomerContact.vue"
      );
    }
  },
  {
    name: "addCustomer",
    path: "/plan/addCustomer",
    meta: {
      title: "基本信息",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "addCustomer" */ "@/views/plan/AddCustomer.vue"
      );
    }
  },
  {
    name: "chooseCustomer",
    path: "/plan/chooseCustomer",
    meta: {
      title: "客户列表",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "chooseCustomer" */ "@/views/plan/ChooseCustomer.vue"
      );
    }
  },
  {
    name: "planList",
    path: "/plan/planList",
    meta: {
      title: "规划书列表",
      login: true
    },

    component: () => {
      return import(
        /* webpackChunkName: "planList" */ "@/views/plan/PlanList.vue"
      );
    }
  },
  {
    name: "makePlan",
    path: "/plan/makePlan",
    meta: {
      title: "制作规划书",
      login: true
    },
    login: true,
    component: () => {
      return import(
        /* webpackChunkName: "makePlan" */ "@/views/plan/MakePlan.vue"
      );
    }
  },
  {
    name: "insuranceSelect",
    path: "/plan/insuranceSelect",
    meta: {
      title: "险种选择",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "insuranceSelect" */ "@/views/plan/InsuranceSelect.vue"
      );
    }
  },
  {
    name: "inLineSign",
    path: "/plan/inLineSign",
    meta: {
      title: "委托代收签约",
      login: true
    },
    component: () => {
      return import(
        /*webpackChunkName:"inLineSign"*/ "@/views/plan/inLineSign.vue"
      );
    }
  },
  {
    name: "signArgeeMent",
    path: "/plan/signArgeeMent",
    meta: {
      title: "个人客户委托代收业务协议",
      login: true
    },
    component: () => {
      return import(
        /*webpackChunkName:"signArgeeMent"*/ "@/views/plan/signArgeeMent.vue"
      );
    }
  }
];

export default plan;
