<template>
  <transition name="topToBottom05">
    <div
      class="tips"
      v-show="show"
      :style="{
        color: tipsSet.color,
        backgroundColor: tipsSet.backgroundColor,
        top: globalConfig.ui.safeTop + 'px'
      }"
    >
      <img v-if="iconSrc" :src="iconSrc" class="icon" />
      {{ msg }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "tips",
  props: {
    // 是否显示tips
    show: {
      type: Boolean,
      default: false
    },
    // 信息
    msg: {
      type: String,
      default: undefined
    },
    // 预设：success, error, warn
    type: {
      type: String,
      default: "success"
    },
    // 图标
    icon: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      // tips设置对象
      tipsSet: {
        color: null, // tips字体颜色
        backgroundColor: null // tips背景色
      },
      // 设置预设map
      typeMap: {
        // 成功
        success: {
          color: "#ffffff",
          backgroundColor: globalConfig.ui.colorSuccess
        },
        // 出错
        error: {
          color: "#ffffff",
          backgroundColor: globalConfig.ui.colorError
        },
        // 警告
        warn: {
          color: "#ffffff",
          backgroundColor: globalConfig.ui.colorWarn
        }
      },
      // 图标src list
      iconSrcList: {
        // 成功
        success: require("@/assets/imgs/common/icon/icon_success.png"),
        // 出错
        error: require("@/assets/imgs/common/icon/icon_error.png"),
        // 警告
        warn: require("@/assets/imgs/common/icon/icon_warn.png")
      }
    };
  },
  computed: {
    // 图片src
    iconSrc() {
      return this.icon ? this.iconSrcList[this.type] : null;
    }
  },
  watch: {
    // 预设改变
    type: {
      handler(newVal = "success") {
        // 预设
        this.tipsSet = this.typeMap[newVal];
      },
      immediate: true
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.tips {
  @include display-flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  line-height: 20px;
  padding: 5px 15px;
  font-size: 13px;
  letter-spacing: 1px;
  z-index: $zIndex-tips;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  word-break: break-all;
  .icon {
    width: 18px;
    height: auto;
    margin-right: 8px;
  }
}
</style>
