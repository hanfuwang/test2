<template>
  <transition :name="transitionName">
    <div
      class="modal"
      :style="{
        backgroundColor: backgroundColor
      }"
      v-show="show"
      @click.self="handlerModalClick"
      @touchmove.prevent
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 是否显示modal
    show: {
      type: Boolean,
      default: false
    },
    // 点击模态层关闭confirm框
    clickModalToClose: {
      type: Boolean,
      default: false
    },
    // 下滑关闭confirm框
    slideToClose: {
      type: Boolean,
      default: false
    },
    // 下拉关闭confirm框触发的下拉高度
    slideCloseDistance: {
      type: Number,
      default: 60
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.4)"
    }
  },
  data() {
    return {
      beginY: 0, // touchstart初始的Y坐标值
      moveY: 0 // touchmove时的Y坐标值
    };
  },
  computed: {
    // 动画名称
    transitionName() {
      return this.slideToClose ? "bottomToTop05" : "fadeIn05";
    }
  },
  created() {},
  // 组件活动状态
  activated() {
    // 添加事件
    this.addEvent();
  },
  // 组件非活动状态
  deactivated() {
    // 移除事件
    this.removeEvent();
  },
  // 组件销毁
  beforeDestroy() {
    // 移除事件
    this.removeEvent();
  },
  methods: {
    // 添加事件
    addEvent() {
      // 需要下滑关闭confirm框
      if (this.slideToClose) {
        this.$el.addEventListener("touchstart", this.handlerTouchStart);
        this.$el.addEventListener("touchmove", this.handlerTouchMove);
        this.$el.addEventListener("touchend", this.handlerTouchEnd);
      }
    },
    // 删除事件
    removeEvent() {
      // 需要下滑关闭confirm框
      if (this.slideToClose) {
        this.$el.removeEventListener("touchstart", this.handlerTouchStart);
        this.$el.removeEventListener("touchmove", this.handlerTouchMove);
        this.$el.removeEventListener("touchend", this.handlerTouchEnd);
      }
    },
    // 处理触屏开始
    handlerTouchStart(e) {
      const targetTouche = e.targetTouches[0];
      // 记住touch一开始的Y坐标
      this.beginY = targetTouche.clientY;
    },
    // 处理触屏事件
    handlerTouchMove(e) {
      const targetTouche = e.targetTouches[0];
      // 记住现在move的Y坐标
      this.moveY = targetTouche.clientY;
    },
    // 处理touchend
    handlerTouchEnd() {
      // 达到了触发下拉关闭的距离
      if (this.moveY - this.beginY > this.slideCloseDistance) {
        this.$emit("close");
      }
      // 清空beginY与moveY
      this.beginY = 0;
      this.moveY = 0;
    },
    // 处理模态层点击
    handlerModalClick() {
      if (this.clickModalToClose) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  @include display-flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: $zIndex-modal;
}
</style>
