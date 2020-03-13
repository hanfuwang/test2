/* ------------------------------------------ visit模块 ------------------------------------------ */

const visit = [
  {
    name: "visitList",
    path: "/visit/visitList",
    meta: {
      title: "回访进度查询",
      login: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "visitList" */ "@/views/visit/VisitList.vue"
      );
    }
  },
  {
    name: "visitDetail",
    path: "/visit/visitDetail",
    meta: {
      title: "回访进度详情"
    },
    component: () => {
      return import(
        /* webpackChunkName: "visitDetail" */ "@/views/visit/VisitDetail.vue"
      );
    }
  }
];

export default visit;
