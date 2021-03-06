<template>
  <div class="form-radio form-item">
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

      <!-- radio -->
      <div class="f-radio">
        <div
          class="radio-item"
          :class="{ active: item.code === value }"
          v-for="item of selectList"
          :key="item.code"
          @click="handlerRadioClick(item)"
        >
          <div class="circle"></div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "formRadio",
  props: {
    // 左侧的label描述
    label: {
      type: String,
      default: undefined
    },
    // value值
    value: {
      type: String,
      default: undefined
    },
    // rules校验规则
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 待选列表
    selectList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否在必填的时候显示*
    showRequire: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {
    // 当前是否是必填项
    isRequire() {
      // 从rules中找是否包含require项
      return this.rules.find(rule => {
        return rule.regExp === "require";
      })
        ? true
        : false;
    }
  },
  watch: {
    // 监听value
    value: {
      handler() {
        // 更新vali
        this.updateVali();
      },
      // 立即执行
      immediate: true
    }
  },
  created() {},
  methods: {
    // 验证
    updateVali() {
      const value = this.value;
      // 根据规则返回校验对象
      this.vali = this.getValiByRules(value);
    },
    // 根据规则返回校验对象
    getValiByRules(val) {
      const vali = {
        status: true,
        msg: "校验通过"
      };
      // 找到输入项不符合的第一个校验规则
      const firstUnlegalRule = this.rules.find(rule => {
        // 取得regExp验证规则
        let regExp = rule.regExp;
        if (typeof regExp === "function") {
          // 方法校验
          return !regExp(val);
        } else if (typeof regExp === "string") {
          // string类型：为regExp.js中约定的验证规则，则去取对应的正则表达式
          return !utils.regExp.get(regExp).test(val);
        } else {
          // 普通正则表达式
          return !regExp.test(val);
        }
      });

      if (
        // 找到输入项不符合的第一个校验规则
        firstUnlegalRule &&
        // 排除不必须并且没有值的情况
        !(!this.isRequire && !val)
      ) {
        vali.status = false;
        vali.msg = firstUnlegalRule.msg;
      }

      return vali;
    },
    // 处理radio被点击
    handlerRadioClick(item) {
      if (this.disabled) return;
      this.$emit("input", item.code);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.f-wrap {
  height: auto;
  min-height: 45px;
  // radio
  .f-radio {
    @include display-flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    flex: 1;
  }
  .radio-item {
    @include display-flex;
    &:not(:first-of-type) {
      margin-left: 20px;
    }
    // 选中状态下的radio
    &.active {
      .circle {
        @include small-circle(12px, 4px, solid, $color-theme);
      }
      .desc {
        color: $font-color;
      }
    }
    // 圆圈
    .circle {
      @include small-circle(12px, 1px, solid, $color-theme);
      border-radius: 50%;
      margin-right: 10px;
      transition: border-width 0.2s ease-out;
    }
    // 描述
    .desc {
      font-size: $font-size;
      color: $font-color-dark;
    }
  }
}
</style>
