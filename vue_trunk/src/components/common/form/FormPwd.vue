<template>
  <FormInput
    class="form-input"
    v-model="iptValue"
    :label="label"
    :type="iptType"
    :iconSrc="iconSrc"
    :rules="rules"
    :placeholder="placeholder"
    :disabled="disabled"
    :showRequire="showRequire"
    @iconClick="handlerIconClick"
    @updateVali="handlerUpdateVali"
    ref="fi"
  ></FormInput>
</template>

<script>
import FormInput from "./FormInput";
export default {
  name: "formPwd",
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
    // 是否需要密码icon
    needPwdIcon: {
      type: Boolean,
      default: false
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
    // 是否在必填的时候显示*
    showRequire: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iptValue: "", // 当前输入的值
      iptType: "password", // 输入框类型，password，text
      // 图标列表
      iconSrcList: {
        pwdClose: require("@/assets/imgs/common/icon/icon_pwd_close.png"),
        pwdOpen: require("@/assets/imgs/common/icon/icon_pwd_open.png")
      },
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {
    // 图标src
    iconSrc() {
      if (this.needPwdIcon && this.iptType === "password") {
        return this.iconSrcList.pwdClose;
      } else if (this.needPwdIcon && this.iptType === "text") {
        return this.iconSrcList.pwdOpen;
      } else {
        return undefined;
      }
    }
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
  methods: {
    // icon被点击，切换显示模式
    handlerIconClick() {
      this.iptType === "password"
        ? (this.iptType = "text")
        : (this.iptType = "password");
    },
    // 根组件vali更新处理：更新当前组件的vali，保持同步
    handlerUpdateVali(vali) {
      this.vali = vali;
    }
  }
};
</script>

<style lang="scss" scoped></style>
