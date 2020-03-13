<template>
  <Page class="demo-ui demo-page">
    <div class="btn-wrap">
      <button class="btn" @click="confirm">
        confirm框
      </button>
      <button class="btn" @click="confirm('btn')">
        定制按钮的confirm框
      </button>
      <div class="fgx"></div>

      <button class="btn" @click="loading">
        loading
      </button>
      <button class="btn" @click="loading('colorful')">
        变色loading
      </button>
      <div class="fgx"></div>

      <button class="btn" @click="tips('success')">
        成功提示
      </button>
      <button class="btn" @click="tips('error')">
        错误提示
      </button>
      <button class="btn" @click="tips('warn')">
        警告提示
      </button>
      <button class="btn" @click="tips('long')">
        长提示
      </button>
      <div class="fgx"></div>

      <button class="btn" @click="showSlideToCloseModal = true">
        可下滑关闭的模态层
      </button>
      <div class="fgx"></div>

      <NumberSlider v-model="number" :max="77" :min="11"></NumberSlider>
      当前拖动的值为：{{ number }}
      <div class="fgx"></div>
    </div>

    <Modal
      class="slide-to-close-modal"
      :show="showSlideToCloseModal"
      @close="showSlideToCloseModal = false"
      slideToClose
      backgroundColor="white"
    >
      <p>我可以下滑关闭哦~</p>
    </Modal>
  </Page>
</template>

<script>
import NumberSlider from "@/components/common/ui/NumberSlider";
import Modal from "@/components/common/ui/Modal";

export default {
  name: "demoUi",
  components: {
    NumberSlider,
    Modal
  },
  data() {
    return {
      number: 21,
      showSlideToCloseModal: false
    };
  },
  beforeRouteLeave(to, from, next) {
    // 如果modal层为打开状态，先关闭modal
    if (this.showSlideToCloseModal) {
      this.showSlideToCloseModal = false;
      next(false);
      return;
    }

    // 放行
    next();
  },
  methods: {
    // confirm
    confirm(type) {
      if (type === "btn") {
        utils.ui.confirm({
          msg: "你好啊",
          btnList: [
            {
              msg: "不好",
              cb: () => {
                utils.ui.tips("那就好起来");
              }
            },
            {
              msg: "好",
              cb: () => {
                utils.ui.tips("继续保持");
              }
            }
          ]
        });
      } else {
        utils.ui.confirm("你好啊");
      }
    },

    // loading
    loading(type) {
      if (type === "colorful") {
        utils.ui.openLoading({
          openColor: "#ffcc00"
        });
        setTimeout(() => {
          utils.ui.openLoading({
            openColor: "red"
          });
        }, 2000);
        setTimeout(() => {
          utils.ui.closeLoading({
            closeColor: "green"
          });
        }, 4000);
      } else {
        utils.ui.openLoading();
        setTimeout(() => {
          utils.ui.closeLoading();
        }, 2000);
      }
    },

    // tips
    tips(type) {
      if (type === "long") {
        const msg =
          "icon是一种图标格式，用于系统图标、软件图标等，这种图标扩展名为*.icon、*.ico。常见的软件或windows桌面上的那些图标一般都是ICON格式的。";
        utils.ui.tips(msg);
      } else {
        const msg = `我是一段${type}类型的提示`;
        utils.ui.tips({
          msg: msg,
          type: type,
          icon: true
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/demo/index.scss";
.fgx {
  margin: 10px auto;
  width: 90vw;
  border-top: 1px solid $color-theme;
}
.slide-to-close-modal {
  p {
    font-size: 15px;
    color: #4b4b4b;
    letter-spacing: 2px;
  }
}
</style>
