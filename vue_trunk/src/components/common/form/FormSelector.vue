<template>
  <div class="form-selector">
    <!-- disabled 输入框 -->
    <FormInput
      v-model="iptDesc"
      :label="label"
      :placeholder="placeholder"
      :rules="rules"
      :iconSrc="iconSrc"
      :iconWidth="iconWidth"
      :showBottomUnlegalMsg="showBottomUnlegalMsg"
      :showRequire="showRequire"
      disabled
      @formInputClick="open"
      @iconClick="open"
      @updateVali="handlerUpdateVali"
      ref="fi"
    ></FormInput>

    <transition name="bottomToTop05">
      <Selector
        v-show="showSelector"
        :type="type"
        :typeParams="typeParams"
        @select="select"
        @close="close"
      ></Selector>
    </transition>
  </div>
</template>

<script>
import FormInput from "./FormInput";
import Selector from "./child/Selector";
export default {
  name: "formSelector",
  components: {
    FormInput,
    Selector
  },
  props: {
    // 左侧的label描述
    label: {
      type: String,
      default: undefined
    },
    // iconSrc
    iconSrc: {
      type: String,
      default: require("@/assets/imgs/common/icon/icon_arrow_right.png")
    },
    // icon宽度
    iconWidth: {
      type: Number,
      default: 7
    },
    // 当前选中的数据
    selectData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // selector类型：bank：银行，job：职业，area：地区
    type: {
      type: String,
      default: "bank"
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
      iptDesc: "", // 输入框desc
      showBottomUnlegalMsg: false, // 是否显示底部错误信息
      showSelector: false, // 是否显示选择器
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {
    // 展示的描述
    showDesc() {
      const selectData = this.selectData;
      if (this.type === "area") {
        // 地址选择器
        if (selectData.provinceCode === selectData.cityCode) {
          // 港澳台
          return selectData.provinceName;
        } else {
          // 其他地区
          return (
            selectData.provinceName + selectData.cityName + selectData.areaName
          );
        }
      } else {
        // 其他选择器
        return selectData[this.typeParams.desc];
      }
    },
    // 选择器类型对应的id与desc字段
    typeParams() {
      switch (this.type) {
        case "bank": {
          return {
            id: "agentcom",
            desc: "bankName"
          };
        }
        case "job": {
          return {
            id: "occupationCode",
            desc: "occupationName"
          };
        }
        case "area": {
          return {
            id: "areaCode",
            desc: "areaName"
          };
        }
        default: {
          return {
            id: "agentcom",
            desc: "bankName"
          };
        }
      }
    }
  },
  watch: {
    // 在选择器弹出的时候，不显示底部错误信息
    showSelector(newVal) {
      newVal
        ? (this.showBottomUnlegalMsg = false)
        : (this.showBottomUnlegalMsg = true);
    },
    // 展示的描述发生变化，更新输入框绑定的iptDesc
    showDesc: {
      handler(newVal) {
        this.iptDesc = newVal;
      },
      immediate: true
    }
  },
  created() {
    console.log(this.selectData);
  },
  methods: {
    // 打开选择器
    open() {
      if (this.disabled) return;

      this.showSelector = true;
    },
    // 关闭选择器
    close() {
      this.showSelector = false;
    },
    // 选中
    select(item) {
      // 赋值对象属性
      this.$emit("update:selectData", item);

      // 触发select事件
      this.$emit("select", item);
      // 关闭选择器
      this.close();
    },
    // 根组件vali更新处理：更新当前组件的vali，保持同步
    handlerUpdateVali(vali) {
      this.vali = vali;
    }
  }
};
</script>

<style lang="scss" scoped></style>
