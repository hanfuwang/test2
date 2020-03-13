/**
 * ui框架组件，全局组件引入
 */
import Vue from "vue";

// 引入全局组件
import Page from "@/components/global/Page";
import AppBar from "@/components/global/AppBar";
import AppContent from "@/components/global/AppContent";
Vue.component("Page", Page);
Vue.component("AppBar", AppBar);
Vue.component("AppContent", AppContent);
