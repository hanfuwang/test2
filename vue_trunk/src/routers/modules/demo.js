/* ------------------------------------------ demo模块 ------------------------------------------ */

const demo = [
  {
    name: "demoHome",
    path: "/",
    meta: {
      title: "demo首页"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoHome" */ "@/views/demo/DemoHome.vue"
      );
    }
  },
  {
    name: "demoIframe",
    path: "/demo/demoIframe",
    meta: {
      title: "form iframe"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoIframe" */ "@/views/demo/DemoIframe.vue"
      );
    }
  },
  {
    name: "demoForm",
    path: "/demo/demoForm",
    meta: {
      title: "demo form"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoForm" */ "@/views/demo/DemoForm.vue"
      );
    }
  },
  {
    name: "demoUi",
    path: "/demo/demoUi",
    meta: {
      title: "demo ui"
    },
    component: () => {
      return import(/* webpackChunkName: "demoUi" */ "@/views/demo/DemoUi.vue");
    }
  },
  {
    name: "demoLazyload",
    path: "/demo/demoLazyload",
    meta: {
      title: "demo lazyload"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoLazyload" */ "@/views/demo/DemoLazyload.vue"
      );
    }
  },
  {
    name: "demoStore",
    path: "/demo/demoStore",
    meta: {
      title: "demo Store"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoStore" */ "@/views/demo/DemoStore.vue"
      );
    }
  },
  {
    name: "demoThrottle",
    path: "/demo/demoThrottle",
    meta: {
      title: "demo throttle"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoStore" */ "@/views/demo/DemoThrottle.vue"
      );
    }
  },
  {
    name: "demoEventBus",
    path: "/demo/demoEventBus",
    meta: {
      title: "demo eventBus"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoStore" */ "@/views/demo/DemoEventBus.vue"
      );
    }
  },
  {
    name: "demoFundebug",
    path: "/demo/demoFundebug",
    meta: {
      title: "demo fundebug"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoFundebug" */ "@/views/demo/DemoFundebug.vue"
      );
    }
  },
  {
    name: "demoHttp",
    path: "/demo/demoHttp",
    meta: {
      title: "demo http"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoHttp" */ "@/views/demo/DemoHttp.vue"
      );
    }
  },
  {
    name: "demoApp",
    path: "/demo/demoApp",
    meta: {
      title: "demo app"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoApp" */ "@/views/demo/DemoApp.vue"
      );
    }
  },
  {
    name: "demoJssdk",
    path: "/demo/demoJssdk",
    meta: {
      title: "demo jssdk",
      wxShare: true
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoJssdk" */ "@/views/demo/DemoJssdk.vue"
      );
    }
  },
  {
    name: "demoScrollTable",
    path: "/demo/demoScrollTable",
    meta: {
      title: "demo scrollTable"
    },
    component: () => {
      return import(
        /* webpackChunkName: "demoScrollTable" */ "@/views/demo/DemoScrollTable.vue"
      );
    }
  }
];

export default demo;