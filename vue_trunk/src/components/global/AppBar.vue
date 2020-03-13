<template>
  <header class="app-bar">
    <!-- ios app顶部安全距离预留块 -->
    <div
      class="safe-top"
      :style="{ height: globalConfig.ui.safeTop + 'px' }"
    ></div>
    <!-- bar主内容 -->
    <div class="bar-content">
      <div class="bar-left" :style="{ width: adaptSize.leftWidth + 'px' }">
        <slot name="left"></slot>
      </div>
      <div class="bar-center">
        <slot name="center"></slot>
      </div>
      <div class="bar-right" :style="{ width: adaptSize.rightWidth + 'px' }">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "appBar",
  props: {
    // 左侧宽度
    leftWidth: {
      type: Number,
      default: 70
    },
    // 右侧宽度
    rightWidth: {
      type: Number,
      default: 70
    }
  },
  data() {
    return {};
  },
  computed: {
    // 适配尺寸
    adaptSize() {
      // 当前屏幕宽度与设计稿宽度的比例
      const pxRadio = globalConfig.ui.pxRadio;
      return {
        leftWidth: this.leftWidth * pxRadio,
        rightWidth: this.rightWidth * pxRadio
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: $color-app-bar;
  z-index: $zIndex-app-bar;
}
.bar-content {
  @include display-flex;
  width: 100vw;
  padding: 0 20px;
  height: $height-app-bar;
  background-color: transparent;
  .bar-left {
    @include display-flex;
    justify-content: flex-start;
  }
  .bar-center {
    @include display-flex;
    flex: 1;
    font-size: 18px;
    color: #333333;
  }
  .bar-right {
    @include display-flex;
    justify-content: flex-end;
  }
}
</style>
