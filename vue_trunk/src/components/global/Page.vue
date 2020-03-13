<template>
  <main class="page" :class="{ 'with-app-bar': withAppBar }" :style="pageStyle">
    <!-- ios app顶部安全距离预留块 -->
    <div
      class="safe-top"
      :style="{ height: globalConfig.ui.safeTop + 'px' }"
    ></div>
    <!-- 内容注入区 -->
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "page",
  props: {
    // 是否带appBar
    withAppBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    // 页面style
    pageStyle() {
      const pageStyle = {
        // page页面最小高度
        // ios为当前屏幕100vh
        // android为了防止键盘弹出导致页面高度变化，设为初始进入的高度
        minHeight:
          globalConfig.os === "ios"
            ? "100vh"
            : globalConfig.ui.initHeight + "px"
      };
      return pageStyle;
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100vw;
  background-color: $color-bg;
  // 带appbar
  &.with-app-bar {
    padding-top: $height-app-bar;
  }
}
</style>
