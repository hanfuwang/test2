<template>
  <div class="form-amount">
    <!-- input -->
    <FormInput
      class="form-input"
      v-model="iptValue"
      :label="label"
      type="tel"
      :rules="rules"
      :placeholder="placeholder"
      :rightLabel="rightLabel"
      :disabled="disabled"
      :showRequire="showRequire"
      @updateVali="handlerUpdateVali"
      @iptInput="handlerIptInput"
      @iptFocus="handlerIptFocus"
      @iptBlur="handlerIptBlur"
      ref="fi"
    ></FormInput>
  </div>
</template>

<script>
import FormInput from "./FormInput";
export default {
  name: "formAmount",
  components: {
    FormInput
  },
  props: {
    // 左侧的label描述
    label: {
      type: String,
      default: undefined
    },
    // value值
    value: {
      type: Number,
      default: undefined
    },
    // amount最大值
    max: {
      type: Number,
      default: 99999999
    },
    // rules校验规则
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // placeholder
    placeholder: {
      type: String,
      default: undefined
    },
    // 右侧的label描述
    rightLabel: {
      type: String,
      default: undefined
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
      iptValue: "", // 当前输入的值
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {},
  watch: {
    // 监听value
    value: {
      handler(newVal, oldVal) {
        // 非初始为0的情况，更新iptValue
        if (!(newVal === 0 && oldVal === undefined)) {
          this.iptValue = this.transToThousands(newVal);
        }
      },
      // 立即执行
      immediate: true
    }
  },
  created() {},
  methods: {
    // 千分位转为数字
    transToNumber(thousands) {
      // 去千分位的,符号
      const regExp = /,/g;
      const number = Number(thousands.replace(regExp, ""));
      return number;
    },
    // 千分位转换：3333 => 3,333
    transToThousands(number) {
      // number转字符串
      if (typeof number === "number") {
        number += "";
      }
      const regExp = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
      const thousands = number.replace(regExp, "$1,");
      return thousands;
    },
    // 获取input框光标的位置
    getCursorPosition(target) {
      let pos = 0;
      if ("selectionStart" in target) {
        pos = target.selectionStart;
      } else if ("selection" in document) {
        target.focus();
        const Sel = document.selection.createRange();
        const SelLength = document.selection.createRange().text.length;
        Sel.moveStart("character", -target.value.length);
        pos = Sel.text.length - SelLength;
      }
      return pos;
    },
    // 设置input框光标的位置
    setCursorPosition(target, pos) {
      if (target.setSelectionRange) {
        target.focus();
        target.setSelectionRange(pos, pos);
      } else if (target.createTextRange) {
        const range = target.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    },
    // 查找某个字符在字符串中出现的次数
    charAppearCount(str, targetChar) {
      const arr = str.split("");
      return arr.reduce((acc, char) => {
        if (targetChar === char) acc++;
        return acc;
      }, 0);
    },

    // 处理ipt input
    handlerIptInput() {
      // ipt元素
      const target = this.$refs.fi.$refs.ipt;

      // 之前的value
      const beforeValue = this.iptValue;
      // 之前的光标定位
      const beforePosition = this.getCursorPosition(target);
      // 之前,出现的次数
      const beforeAppearCount = this.charAppearCount(beforeValue, ",");

      // 修改后的value
      let afterValue = target.value;
      // 修改后的光标定位
      let afterPosition;

      // 检查是否输入了非法字符
      const numberValue = this.transToNumber(afterValue);
      if (isNaN(numberValue) || numberValue > this.max) {
        // 非数字 || 数字超长
        // 重置到原值
        afterValue = beforeValue;
        // 修改position
        afterPosition = beforePosition - 1;
      } else {
        // 合法数字
        // 重新按,进行分割后进行赋值
        afterValue = afterValue
          .replace(/,/g, "")
          .replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
        // 修改后,出现的次数
        const afterAppearCount = this.charAppearCount(afterValue, ",");
        // 修改position
        afterPosition = beforePosition - (beforeAppearCount - afterAppearCount);
      }

      // 赋值
      target.value = afterValue;
      // 更新formInput组件的iptValue
      this.$refs.fi.iptValue = target.value;
      // 转数字更新value
      this.$emit("input", this.transToNumber(target.value));
      // 设置定位
      this.setCursorPosition(target, afterPosition);

      this.$emit("iptInput");
    },
    // 处理ipt focus
    handlerIptFocus() {
      this.$emit("iptFocus");
    },
    // 处理ipt blur
    handlerIptBlur() {
      this.$emit("iptBlur");
    },
    // 根组件vali更新处理：更新当前组件的vali，保持同步
    handlerUpdateVali(vali) {
      this.vali = vali;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-amount {
  position: relative;
}
</style>
