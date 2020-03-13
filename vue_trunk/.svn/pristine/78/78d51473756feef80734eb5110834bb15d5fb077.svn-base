<template>
  <div class="fix-menu">
    <slot name="top"></slot>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: "appFloatMenu",
  props: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.fix-menu {
  position: fixed;
  overflow: hidden;
  width: 46px;
  height: 102px;
  bottom: 60px;
  right: 20px;
  @include display-flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: $zIndex-bottom-menu;
}
</style>
