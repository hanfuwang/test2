<template>
  <div class="form-num-vali">
    <!-- input -->
    <FormInput
      class="form-input"
      :class="{ reget: leftTime > 0 }"
      v-model="iptValue"
      type="tel"
      :label="label"
      :rightLabel="valiLabel"
      :placeholder="placeholder"
      :disabled="disabled"
      :rules="numValiRules"
      :showRequire="showRequire"
      ref="fi"
      @updateVali="handlerUpdateVali"
      @rightLabelClick="handlerRightLabelClick"
    ></FormInput>
  </div>
</template>

<script>
import FormInput from "./FormInput";
export default {
  name: "formNumVali",
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
    // 要发送验证码的手机号
    mobile: {
      type: String,
      default: undefined
    },
    // 数字验证码长度
    numLength: {
      type: Number,
      default: 6
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
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      },
      sleepTime: 60, // 重新获取延迟的秒数
      leftTime: 0 // 剩余秒数
    };
  },
  computed: {
    // 验证规则
    numValiRules() {
      return [
        {
          regExp: "require",
          msg: "验证码不能为空"
        },
        {
          regExp: eval(`/^\\d{${this.numLength}}$/`),
          msg: `验证码必须为${this.numLength}位数字`
        }
      ];
    },
    // 验证码label
    valiLabel() {
      return this.leftTime > 0 ? `重新获取(${this.leftTime}s)` : "获取验证码";
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
    // 获取验证码
    getValiCode() {
      // 还有等待时长，直接返回
      if (this.leftTime > 0) return;

      // 校验手机号码
      const mobileRegExp = utils.regExp.get("mobile");
      if (!mobileRegExp.test(this.mobile)) {
        utils.ui.confirm("请先输入正确的手机号码");
        return;
      }

      // 调用发送验证码的接口
      const params = {
        policy: {
          mobile: this.mobile, // 手机号
          functionCode: "25" // 发送类型，固定25
        }
      };
      // http：发送验证码
      utils.http.post(interfaces.global.getValiCode, params).then(() => {
        // 验证码发送成功
        utils.ui.tips("验证码发送成功");
        // 开始倒计时
        this.leftTime = this.sleepTime;
        let flag = setInterval(() => {
          this.leftTime -= 1;
          if (this.leftTime === 0) {
            // 清除定时器
            clearInterval(flag);
          }
        }, 1000);
      });
    },
    // 检查验证码
    checkValiCode() {
      // 调用发送验证码的接口
      const params = {
        policy: {
          mobile: this.mobile, // 手机号
          randomStr: this.value, // 验证码
          functionCode: "2" // 固定传2
        }
      };
      // promise
      return new Promise((resolve, reject) => {
        // 校验验证码
        utils.http
          .post(interfaces.global.valiValiCode, params)
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    // 处理rightLabel点击
    handlerRightLabelClick() {
      // 获取验证码
      this.getValiCode();
    },
    // 根组件vali更新处理：更新当前组件的vali，保持同步
    handlerUpdateVali(vali) {
      this.vali = vali;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-num-vali {
  position: relative;
  .form-input {
    &.reget {
      /deep/ .f-label-right {
        color: #999999;
      }
    }
    /deep/ .f-label-right {
      color: #fa7070;
    }
  }
}
</style>
