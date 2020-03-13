<template>
  <div class="form-input form-item" @click="handlerFormInputClick">
    <!-- 主内容 开始 -->
    <div class="f-wrap">
      <label class="f-label">
        <span class="require">
          <template v-if="isRequire && showRequire">
            *
          </template>
        </span>
        {{ label }}
      </label>
      <div class="product_r">
        <!-- label -->
        <label class="label_button" @click="handlerLabelClick" name="payPeriod">
          <input
            class="f-ipt"
            type="radio"
            v-model.trim="iptValue"
            :placeholder="placeholder"
            @click="handlerIptClick"
            @focus="handlerIptFocus"
            @blur="handlerIptBlur"
            ref="ipt"
            name="payPeriod"
          />
          <div class="radio-content">
            <div class="item-content ">
              <span class="ng-binding">
                {{ label }}
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
    <!-- 主内容 结束 -->

    <!-- 非法提示 -->
    <div
      class="unlegal-msg"
      :class="{
        show: showUnlegal && showBottomUnlegalMsg,
        'with-label': label
      }"
    >
      {{ vali.msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "formButton",
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
    // 输入类型
    type: {
      type: String,
      default: "text"
    },
    // placeholder
    placeholder: {
      type: String,
      default: undefined
    },
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示底部错误信息
    showBottomUnlegalMsg: {
      type: Boolean,
      default: true
    },
    // 是否在必填的时候显示*
    showRequire: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iptValue: "", // 当前输入的值
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      },
      hadFormInputClick: false, // 当前formInput是否被点击过
      isIptFocus: false, // 当前ipt是否获取焦点
      designWidth: globalConfig.ui.designWidth // 设计稿宽度
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
    },
    // 当前是否显示非法
    showUnlegal() {
      return (
        // 必须条件1：没有获得焦点的情况
        !this.isIptFocus &&
        // 必须条件2：值不符合校验规则
        !this.vali.status &&
        // 可选条件：formInput被点击过 || formInput没有点击过但是有值 || disabled无法改变值
        (this.hadFormInputClick ||
          (!this.hadFormInputClick && this.value) ||
          this.disabled)
      );
    }
  },
  watch: {
    // 监听value
    value: {
      handler(newVal) {
        // 更新iptValue
        this.iptValue = newVal;
        // 更新vali
        this.updateVali();
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
  methods: {
    // 验证
    updateVali() {
      const value = this.value;
      // 根据规则返回校验对象
      this.vali = this.getValiByRules(value);
      // 给父组件返回更新的校验结果
      this.$emit("updateVali", this.vali);
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

    // 处理整个formInput click
    handlerFormInputClick() {
      // 设置formInput被点击过
      this.hadFormInputClick = true;
      this.$emit("formInputClick");
    },
    // 处理label点击
    handlerLabelClick() {
      this.$refs.ipt.focus();
      this.$emit("labelClick");
    },

    // 处理ipt click
    handlerIptClick() {
      this.$emit("iptClick");
    },
    // 处理ipt focus
    handlerIptFocus() {
      this.isIptFocus = true;
      this.$emit("iptFocus");
    },
    // 处理ipt blur
    handlerIptBlur() {
      this.isIptFocus = false;
      // ios微信键盘bug修复 开始
      if (globalConfig.isWx && globalConfig.os === "ios") {
        // 获取当前滚动的高度
        const scrollTop = utils.ui.getScrollTop();
        setTimeout(() => {
          // 向上滚动1px，防止键盘顶出的高度不回弹
          window.scrollTo(0, scrollTop - 1);
        }, 100);
      }
      // ios微信键盘bug修复 结束
      this.$emit("iptBlur");
    },

    // 处理icon点击
    handlerIconClick() {
      this.$emit("iconClick");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.f-wrap {
  font-size: $font-size;
  .f-label {
    width: 30%;
  }
  .product_r {
    width: 70%;
    .label_button {
      text-align: center;
      float: right;
      .f-ipt {
        position: absolute;
        left: -9999px;
      }
      .radio-content {
        display: inline-block;
        .item-content {
          @include lineheight-height(34px);
          width: 98px;
          margin-right: 16px;
          border: 1px solid #e5e9f1;
          border-radius: 4px;
        }
      }
      input:checked + .radio-content .item-content {
        background: #ffcc00;
      }
    }
  }
}
// 错误信息提示
.unlegal-msg {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: $font-size;
  color: $color-error;
  height: 0;
  overflow: hidden;
  transition: height 0.2s ease-out;
  &.show {
    height: 30px;
  }
  // 带label字右对齐
  &.with-label {
    justify-content: flex-end;
  }
}
</style>
