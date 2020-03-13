<template>
  <Page class="illegal-request" :withAppBar="!globalConfig.isWx">
    <!-- app-bar -->
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        哎呀，出错啦
      </template>
    </AppBar>

    <!-- app-content -->
    <AppContent
      class="app-content"
      :style="{ height: `calc(100vh - ${globalConfig.ui.topRemain}px` }"
    >
      <div class="content-wrap">
        <img
          class="img"
          src="../../assets/imgs/global/pic/pic_illegal_request.png"
        />
        <p class="msg">{{ msg }}</p>
      </div>
    </AppContent>
  </Page>
</template>

<script>
export default {
  name: "illegalRequest",
  data() {
    return {
      msg: "" // 非法信息
    };
  },
  computed: {},
  created() {
    // 初始化页面
    this.initPage();
  },
  methods: {
    // 返回
    goBack() {
      this.back();
    },
    // 初始化页面
    initPage() {
      this.msg = this.$route.query.msg || "非法请求，请检查链接";
    }
  }
};
</script>

<style lang="scss" scoped>
.illegal-request {
  .app-bar {
    .icon {
      height: auto;
      &.icon-back {
        width: 11.5px;
      }
    }
  }
  .app-content {
    @include display-flex;
    .img {
      display: block;
      width: 200px;
      height: auto;
      margin: 0 auto 30px;
    }
    .msg {
      width: 100vw;
      padding: 0 20px;
      word-wrap: break-word;
      text-align: center;
      font-size: 13px;
      color: #999999;
    }
  }
}
</style>
