<template>
  <Modal
    class="confirm"
    :show="show"
    @close="close"
    :clickModalToClose="clickModalToClose"
    :backgroundColor="backgroundColor"
  >
    <!-- 弹窗内容 -->
    <div class="confirm-content" :style="{ width: adaptSize.width + 'px' }">
      <!-- 描述 -->
      <div class="content-msg" v-html="msg"></div>
      <!-- btn组 -->
      <div class="btn-list">
        <!-- 单个按钮 -->
        <div
          class="btn"
          v-for="btn of btnList"
          :key="btn.msg"
          @click="handlerBtnClick(btn)"
        >
          {{ btn.msg }}
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "confirm",
  components: {
    Modal
  },
  props: {
    // 是否显示confirm
    show: {
      type: Boolean,
      default: false
    },
    // msg描述
    msg: {
      type: String,
      default: undefined
    },
    // btn组，包含名称与点击的回调函数
    btnList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 点击模态层关闭confirm框
    clickModalToClose: {
      type: Boolean,
      default: false
    },
    // confirm框宽度
    width: {
      type: Number,
      default: 295
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: undefined
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
        width: this.width * pxRadio
      };
    }
  },
  created() {},
  methods: {
    // 关闭
    close() {
      this.$emit("close");
    },
    // 处理btn click
    handlerBtnClick(btn) {
      btn.cb ? btn.cb() : null;
      // 关闭modal
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
$font-size: 14px;
$font-color: #333333;
.confirm {
  font-size: $font-size;
  color: $font-color;
  // 弹窗内容
  .confirm-content {
    background-color: #ffffff;
    border-radius: 5px;
    .content-msg {
      @include display-flex;
      min-height: 65px;
      line-height: 20px;
      padding: 13px 30px;
      border-bottom: 1px solid #cccccc;
    }
  }
  // btn组
  .btn-list {
    @include display-flex;
    .btn {
      @include display-flex;
      height: 45px;
      text-align: center;
      flex: 1;
      &:not(:last-of-type) {
        border-right: 1px solid #cccccc;
      }
    }
  }
}
</style>
