<template>
  <Page class="demo-app" :withAppBar="!globalConfig.isWx">
    <AppBar v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        条款
      </template>
    </AppBar>
    <AppContent class="app-content">
      <iframe
        :style="{ height: `calc(100vh - ${globalConfig.ui.topRemain}px` }"
        :src="tk"
      ></iframe>
    </AppContent>
  </Page>
</template>
<script>
export default {
  name: "Clause",
  data() {
    return {
      tx: ""
    };
  },
  created() {
    this.tk =
      "https://officeweb365.aixin-life.net/?ssl=1&furl=" +
      this.$route.params.tk;
  },
  methods: {
    goBack() {
      this.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  height: auto;
  &.icon-back {
    width: 11.5px;
  }
}
iframe {
  width: 100%;
}
</style>
