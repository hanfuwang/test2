<template>
  <Page class="demo-fundebug demo-page">
    <h4 class="tips">
      测试fundebug功能，生产环境触发错误后能在fundebug控制台看到错误日志<br />
      (月统计量有限，请勿反复测试)
    </h4>
    <div class="btn-wrap">
      <button class="btn" @click="throwError">
        触发错误
      </button>
    </div>
  </Page>
</template>

<script>
export default {
  name: "demoFundebug",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    throwError() {
      throw new Error("我报错了");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/demo/index.scss";
</style>
