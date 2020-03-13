<template>
  <Modal
    class="share-wx-tips"
    :show="show"
    backgroundColor="rgba(0, 0, 0, 0.7)"
    clickModalToClose
    @close="close"
  >
    <!-- tips提示 -->
    <img
      class="tips-img"
      src="@/assets/imgs/global/pic/pic_wechat_share_tips.png"
    />
    <!-- tips提示内容 -->
    <div class="tips-wrap">
      <p class="title tips-item">心动不如行动</p>
      <p class="sub tips-item">快快点击上方分享给大家吧！</p>
    </div>
  </Modal>
</template>

<script>
import Modal from "./ui/Modal";
export default {
  name: "shareWxTips",
  components: {
    Modal
  },
  props: {
    // 是否显示tips
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    // 关闭
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.share-wx-tips {
  justify-content: flex-start;
  flex-direction: column;
  .tips-img {
    align-self: flex-end;
    width: 140px;
    margin: 8px 38px 20px;
  }
  .tips-wrap {
    color: white;
    letter-spacing: 1px;
    .tips-item {
      text-align: center;
      &.title {
        font-size: 18px;
        margin-bottom: 5px;
      }
      &.sub {
        font-size: 14px;
      }
    }
  }
}
</style>
