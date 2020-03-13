<template>
  <section class="insurant-type">
    <div class="left">被保人类型</div>
    <div class="right">
      <span
        v-for="(item, index) in insurantTypeList"
        :class="{ active: item.code === selectCode }"
        :key="index"
        @click="handleInsurantType(item)"
        >{{ item.desc }}</span
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "insurantType",
  components: {},
  props: {
    insurantTypeList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selectCode: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    //选中某一个被保人类型
    handleInsurantType(item) {
      this.$emit("handleInsurantType", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.insurant-type {
  color: #333;
  margin: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e9f1;
  padding-bottom: 5px;
  font-size: 15px;
  .right {
    span {
      display: inline-block;
      padding: 3px 13px;
      font-size: 12px;
      border: 1px solid $color-theme;
      margin: 5px;
      border-radius: 4px;
    }
    span.active {
      background: $color-theme;
      border-color: $color-theme;
    }
  }
}
</style>
