/* ------------------------------------------ production模块 ------------------------------------------ */

const production = [
  {
    name: "productHome",
    path: "/porduction/productHome",
    meta: {
      title: "产品中心",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "ProductHome" */ "@/views/production/ProductHome.vue"
      );
    }
  },
  {
    name: "porductionDetail",
    path: "/porduction/porductionDetail",
    meta: {
      title: "产品中心"
    },
    component: () => {
      return import(
        /* webpackChunkName: "porductionDetail" */ "@/views/production/PorductionDetail.vue"
      );
    }
  },
  {
    name: "clauseList",
    path: "/porduction/clauseList",
    meta: {
      title: "产品中心"
    },
    component: () => {
      return import(
        /* webpackChunkName: "clauseList" */ "@/views/production/clauseList.vue"
      );
    }
  },
  {
    name: "proIframe",
    path: "/porduction/proIframe",
    meta: {
      title: "产品中心"
    },
    component: () => {
      return import(
        /* webpackChunkName: "proIframe" */ "@/views/production/proIframe.vue"
      );
    }
  }
];

export default production;
