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
        {{ iframeContent.tittle }}
      </template>
    </AppBar>
    <AppContent class="app-content">
      <iframe
        :style="{ height: `calc(100vh - ${globalConfig.ui.topRemain}px` }"
        :src="iframeContent.url"
      ></iframe>
    </AppContent>
  </Page>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "signArgeeMent",
  data() {
    return {
      url: ""
    };
  },
  computed: {
    ...mapState({
      iframeContent: state => state.production.iframeContent //iframe的内容
    })
  },
  created() {},
  methods: {
    goBack() {
      this.back();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.iframeContent) {
      this.$store.commit("production/setState", {
        attr: "iframeContent",
        data: Object.assign({
          tittle: "",
          url: ""
        })
      });
    }
    next();
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
