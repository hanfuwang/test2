<template>
  <section
    class="lib-item"
    @click="handleSelect"
    :class="{ active: itemObj.code === selectCode }"
  >
    <span class="circle" v-if="itemObj.text != ''"></span>
    <span class="desc">{{ itemObj.text }}</span>
  </section>
</template>

<script>
export default {
  name: "libitem",
  components: {},
  props: {
    itemObj: {
      //某一个对象
      type: Object,
      default: function() {
        return {};
      }
    },
    //传进来的code值
    selectCode: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {};
  },
  mounted() {
    //console.log(this.itemObj);
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    //点击
    handleSelect() {
      this.$emit("handleSelect", this.itemObj);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.lib-item {
  // @include overflow-emphasis;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:first-child {
    padding: 10px 20px;
    padding-top: 20px;
    border-bottom: 1px solid #f3f3f3;
  }
  &:last-child {
    padding: 10px 20px;
    padding-bottom: 20px;
  }
  &.active {
    .circle {
      @include small-circle(12px, 4px, solid, #4ac4a3);
    }
    .desc {
      color: $font-color;
    }
  }
  // 圆圈
  .circle {
    @include small-circle(12px, 1px, solid, #4ac4a3);
    border-radius: 50%;
    margin-left: 20px;
    transition: border-width 0.2s ease-out;
    display: inline-block;
  }
  // 描述
  .desc {
    // @include overflow-emphasis;
    font-size: $font-size;
    color: #333;
    width: 210px;
    display: inline-block;
  }
}
</style>
