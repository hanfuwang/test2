<template>
  <div class="number-slider">
    <!-- 减按钮 -->
    <img
      v-show="showToolBar"
      class="icon delete"
      src="@/assets/imgs/common/icon/icon_number_delete.png"
      @click="changeValue('delete')"
    />

    <!-- slider -->
    <Slider
      class="slider"
      v-model="iptValue"
      :max="max"
      :min="min"
      :step="step"
      :displayValue="false"
      :color="color"
      :thumbColor="thumbColor"
      :trackColor="trackColor"
    ></Slider>

    <!-- 增按钮 -->
    <img
      v-show="showToolBar"
      class="icon add"
      src="@/assets/imgs/common/icon/icon_number_add.png"
      @click="changeValue('add')"
    />
  </div>
</template>

<script>
import Slider from "muse-ui/es5/Slider";
export default {
  name: "numberSlider",
  components: {
    Slider
  },
  props: {
    // value值
    value: {
      type: Number,
      default: undefined
    },
    // 最大值
    max: {
      type: Number,
      default: 100
    },
    // 最小值
    min: {
      type: Number,
      default: 1
    },
    // 跨数字
    step: {
      type: Number,
      default: 1
    },
    // color
    color: {
      type: String,
      default: "#eb5656"
    },
    // 填充颜色
    trackColor: {
      type: String,
      default: "#e2e2e2"
    },
    // 小圆点颜色
    thumbColor: {
      type: String,
      default: "#ffe79d"
    },
    // 是否显示工具栏(减增按钮)
    showToolBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iptValue: this.min // 当前选中的值
    };
  },
  watch: {
    // 监听value
    value: {
      handler(newVal) {
        // 更新iptValue
        this.iptValue = newVal;
      },
      // 立即执行
      immediate: true
    },
    // 监听iptValue
    iptValue(newVal) {
      // 更新value
      this.$emit("input", newVal);
    }
  },
  created() {},
  computed: {},
  methods: {
    // 修改value
    changeValue(type) {
      // 增量
      let acc = type === "add" ? this.step : -this.step;
      // 修改后的值
      let afterValue = this.value + acc;
      // 最大最小控制
      if (afterValue > this.max) {
        afterValue = this.max;
      }
      if (afterValue < this.min) {
        afterValue = this.min;
      }
      this.$emit("input", afterValue);
    }
  }
};
</script>

<style lang="scss" scoped>
// slider高度
$slider-height: 6px;
// 圆圈宽度
$circle-width: 20px;

.number-slider {
  @include display-flex;
  padding: 10px;
  // 改写slider样式
  /deep/ .mu-slider {
    margin-bottom: 3px;
    .mu-slider-track,
    .mu-slider-fill {
      height: $slider-height;
      border-radius: 10px;
    }
    .mu-slider-thumb {
      @include small-circle($circle-width);
      top: $circle-width - $slider-height;
      border: 4px solid $color-theme !important;
    }
  }
  .icon {
    width: 18px;
    height: auto;
    &.delete {
      margin-right: 12px;
    }
    &.add {
      margin-left: 12px;
    }
  }
}
</style>
