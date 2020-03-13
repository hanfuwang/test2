/**
 * scrollBehavior是history模式下的一个方法，用于处理切换页面时的滚动高度
 * vue-scroll-behavior插件：提供hash模式下的scrollBehavior
 *
 * 本项目运用此插件解决的问题：
 * 1：从一个超出一屏的页面切换到另一个超出一屏的页面时，新页面滚动未置顶
 * 2：页面返回时，返回页面的滚动高度错误
 */
import Vue from "vue";
import router from "@/routers";
import vueScrollBehavior from "vue-scroll-behavior";

Vue.use(vueScrollBehavior, { router: router });
