<template>
  <div class="form-datepicker-group form-item">
    <div class="f-wrap">
      <!-- label -->
      <label class="f-label">
        <span class="require">
          <template v-if="isRequire && showRequire">
            *
          </template>
        </span>
        <span class="label">{{ label }}</span>
      </label>

      <!-- 时间选择组 -->
      <section class="picker-group">
        <div class="picker-item">
          <!-- 开始时间 -->
          <img
            class="front-icon"
            :src="frontIconSrc"
            :style="{ width: adaptSize.frontIconWidth + 'px' }"
          />
          <!-- picker -->
          <FormDatepicker
            class="begin"
            v-model="iptBegin"
            :max="iptEnd || max"
            :min="min"
            :default="min"
            :placeholder="placeholderBegin"
            :iconSrc="backIconSrc"
            :iconWidth="backIconWidth"
            :visibleItemCount="visibleItemCount"
            :disabled="disabled"
          ></FormDatepicker>
        </div>

        <!-- 分割线 -->
        <span class="fgx"></span>

        <!-- 结束时间 -->
        <div class="picker-item">
          <img
            class="front-icon"
            :src="frontIconSrc"
            :style="{ width: adaptSize.frontIconWidth + 'px' }"
          />
          <!-- picker -->
          <FormDatepicker
            class="end"
            v-model="iptEnd"
            :max="max"
            :min="iptBegin || min"
            :default="max"
            :placeholder="placeholderEnd"
            :iconSrc="backIconSrc"
            :iconWidth="backIconWidth"
            :visibleItemCount="visibleItemCount"
            :disabled="disabled"
          ></FormDatepicker>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FormDatepicker from "./FormDatepicker";
export default {
  name: "formDatepickerGroup",
  components: {
    FormDatepicker
  },
  props: {
    // 左侧的label描述
    label: {
      type: String,
      default: undefined
    },
    // 开始时间
    begin: {
      type: String,
      default: undefined
    },
    // 结束时间
    end: {
      type: String,
      default: undefined
    },
    // 最大日期
    max: {
      type: String,
      default: utils.format.dateToStr(new Date(), "yyyy-MM-dd")
    },
    // 最小日期
    min: {
      type: String,
      default: "1900-01-01"
    },
    // placeholderBegin
    placeholderBegin: {
      type: String,
      default: "开始时间"
    },
    // placeholderEnd
    placeholderEnd: {
      type: String,
      default: "结束时间"
    },
    // 开始时间rules校验规则
    beginRules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 结束时间rules校验规则
    endRules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 前置icon src
    frontIconSrc: {
      type: String,
      default: () => {
        return require("@/assets/imgs/common/icon/icon_datepicker.png");
      }
    },
    // 前置icon宽度
    frontIconWidth: {
      type: Number,
      default: 16
    },
    // 后置icon src
    backIconSrc: {
      type: String,
      default: undefined
    },
    // 前置icon宽度
    backIconWidth: {
      type: Number,
      default: undefined
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 当前可见的日期个数
    visibleItemCount: {
      type: Number,
      default: 5
    },
    // 是否在必填的时候显示*
    showRequire: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iptBegin: "", // 当前输入的begin
      iptEnd: "", // 当前输入的end

      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {
    // 适配尺寸
    adaptSize() {
      // 当前屏幕宽度与设计稿宽度的比例
      const pxRadio = globalConfig.ui.pxRadio;
      return {
        frontIconWidth: this.frontIconWidth * pxRadio
      };
    },
    // 开始日期是否是必填项
    beginRequire() {
      return this.beginRules.find(rule => {
        return rule.regExp === "require";
      })
        ? true
        : false;
    },
    // 结束日期是否是必填项
    endRequire() {
      return this.endRules.find(rule => {
        return rule.regExp === "require";
      })
        ? true
        : false;
    },
    // 当前是否是必填项
    isRequire() {
      // 全部require才算require
      return this.beginRequire && this.endRequire;
    }
  },
  watch: {
    // 监听begin
    begin: {
      handler(newVal) {
        // 更新vali
        this.vali = this.getValiByRules();
        // 更新iptBegin
        this.iptBegin = newVal;
      },
      // 立即执行
      immediate: true
    },
    // 监听iptBegin
    iptBegin(newVal) {
      // 更新begin
      this.$emit("update:begin", newVal);
    },
    // 监听end
    end: {
      handler(newVal) {
        // 更新vali
        this.vali = this.getValiByRules();
        // 更新iptEnd
        this.iptEnd = newVal;
      },
      // 立即执行
      immediate: true
    },
    // 监听iptEnd
    iptEnd(newVal) {
      // 更新end
      this.$emit("update:end", newVal);
    }
  },
  created() {},
  methods: {
    // 根据规则返回校验对象
    getValiByRules() {
      const vali = {
        status: true,
        msg: "校验通过"
      };
      // 目前只对必填做校验
      // 必填
      if (this.beginRequire && !this.begin) {
        // 开始日期为空
        vali.status = false;
        vali.msg = this.beginRules[0].msg;
      } else if (this.endRequire && !this.end) {
        // 结束日期为空
        vali.status = false;
        vali.msg = this.endRules[0].msg;
      }
      return vali;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.f-wrap {
  .f-label {
    margin-right: 10px;
    // 改写label的最大宽度
    .label {
      max-width: 70px;
    }
  }
}

// 选择组
.picker-group {
  @include display-flex;
  justify-content: flex-end;
  flex: 1;
  // picker-item
  .picker-item {
    @include display-flex;
    // icon
    .front-icon {
      height: auto;
    }
    // 改写单个picker
    /deep/ .form-datepicker {
      width: 95px;
      .f-wrap {
        // 去除下边框
        border-bottom: 0;
      }
      .form-item {
        // 去除padding
        padding: 0;
      }
      .f-ipt {
        // input样式修改
        text-align: center;
        margin: 0;
      }
    }
  }
  // 分割线
  .fgx {
    width: 0;
    height: 15px;
    border-right: 1px solid #cccccc;
    margin: 0 10px;
  }
}
</style>
