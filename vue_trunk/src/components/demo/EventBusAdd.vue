<template>
  <div class="event-bus-add">
    <button class="btn" @click="add(1)">
      + 1
    </button>
    <button class="btn" @click="add(10)">
      + 10
    </button>
  </div>
</template>

<script>
export default {
  name: "eventBusAdd",
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    add(addNumber) {
      this.$eventBus.$emit("demoAdd", addNumber);
    }
  }
};
</script>

<style lang="scss" scoped>
.event-bus-add {
  .btn {
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 5px 10px;
    line-height: 20px;
    font-size: 12px;
    color: white;
    background: $color-theme;
    box-shadow: 0 0 3px 0.5px #f96;
  }
}
</style>
