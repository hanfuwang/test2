/* ------------------------------------------ global模块 ------------------------------------------ */

const global = [
  {
    name: "illegalRequest",
    path: "/global/illegalRequest",
    meta: {
      title: "哎呀，出错啦"
    },
    component: () => {
      return import(
        /* webpackChunkName: "illegalRequest" */ "@/views/global/IllegalRequest.vue"
      );
    }
  }
];

export default global;
