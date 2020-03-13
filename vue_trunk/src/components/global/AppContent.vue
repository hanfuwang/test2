<template>
  <article class="app-content">
    <!-- 内容插槽 -->
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "appContent",
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-content {
  position: relative;
}
</style>
