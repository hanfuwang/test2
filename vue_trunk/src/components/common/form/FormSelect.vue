<template>
  <div class="form-select">
    <!-- disabled 输入框 -->
    <FormInput
      v-model="desc"
      :label="label"
      :placeholder="placeholder"
      :rules="rules"
      :iconSrc="iconSrc"
      :iconWidth="iconWidth"
      :showBottomUnlegalMsg="showBottomUnlegalMsg"
      :showRequire="showRequire"
      disabled
      @formInputClick="handlerFormInputClick"
      @iconClick="handlerIconClick"
      @updateVali="handlerUpdateVali"
      ref="fi"
    ></FormInput>

    <!-- 选择器模态层 -->
    <Modal class="fs-model" :show="showModal" @close="closeSelect">
      <div class="fs-wrap">
        <!-- 按钮组 -->
        <div class="btn-wrap" @touchmove.prevent>
          <button class="btn" @click="handlerCancel">取消</button>
          <button class="btn" @click="handlerConfirm">确定</button>
        </div>
        <!-- slidepicker -->
        <SlidePicker
          v-if="slidePickerFlag"
          :values="nowValues"
          :visible-item-count="visibleItemCount"
          :slots="slots"
          @change="handlerChange"
        ></SlidePicker>
      </div>
    </Modal>
  </div>
</template>

<script>
import FormInput from "./FormInput";
import Modal from "../ui/Modal";
import SlidePicker from "muse-ui/es5/SlidePicker";
export default {
  name: "formSelect",
  components: {
    FormInput,
    Modal,
    SlidePicker
  },
  props: {
    // value
    value: {
      type: String,
      default: undefined
    },
    // 待选列表
    selectList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 左侧的label描述
    label: {
      type: String,
      default: undefined
    },
    // iconSrc
    iconSrc: {
      type: String,
      default: require("@/assets/imgs/common/icon/icon_arrow_bottom.png")
    },
    // icon宽度
    iconWidth: {
      type: Number,
      default: 10
    },
    // placeholder
    placeholder: {
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
    // disabled
    disabled: {
      type: Boolean,
      default: false
    },
    // 当前可见的选项个数
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
      desc: "", // 当前选中的desc
      rollDesc: "", // 当前滚动到的desc
      showModal: false, // 是否显示select模态层
      slidePickerFlag: true, // 用于重置slidePicker
      showBottomUnlegalMsg: false, // 是否显示底部错误信息
      // 当前验证状态
      vali: {
        status: false, // 校验结果，符合rules为true，不符合为false
        msg: "" // 校验信息
      }
    };
  },
  computed: {
    // 当前slidepicker中显示的数组
    nowValues() {
      return [this.rollDesc];
    },
    // 初始化picker的slots
    slots() {
      return [
        {
          width: "100%",
          textAlign: "center",
          values: this.selectList.map(item => item.desc)
        }
      ];
    }
  },
  watch: {
    // 监听value
    value: {
      handler() {
        // 通过code更新desc
        this.updateDescByCode();
      },
      // 立即执行
      immediate: true
    },
    // 监听desc
    desc() {
      // 通过desc更新code
      this.updateCodeByDesc();
    },
    // 监听selectList
    selectList() {
      // selectList码表发生改变，重新根据code更新desc
      this.updateDescByCode();
      // 重置slidePicker
      this.resetSlidePicker();
    },
    // 在日期选择框弹出的时候，不显示底部错误信息
    showModal(newVal) {
      newVal
        ? (this.showBottomUnlegalMsg = false)
        : (this.showBottomUnlegalMsg = true);
    }
  },
  created() {
    // 初始化组件
    this.initComp();
  },
  methods: {
    // 初始化组件
    initComp() {},
    // 打开select
    openSelect() {
      if (this.disabled) return;

      this.showModal = true;
    },
    // 关闭select
    closeSelect() {
      this.showModal = false;
    },
    // 通过code更新desc
    updateDescByCode() {
      const code = this.value;
      // 通过code更新desc
      const item = this.selectList.find(item => item.code === code);
      if (item) {
        // 通过code能找到desc
        this.desc = item.desc;
      } else {
        // 找不到code对应的desc，desc赋空
        this.desc = "";
      }

      // 如果rollDesc无值，则为rollDesc赋值
      if (!this.rollDesc) {
        if (this.desc) {
          // 当前desc有值，则赋值desc
          this.rollDesc = this.desc;
        } else if (this.selectList[0]) {
          // desc无值，赋值selectList[0].desc
          this.rollDesc = this.selectList[0].desc;
        }
      }
    },
    // 通过desc更新code
    updateCodeByDesc() {
      const desc = this.desc;
      // 通过desc更新value(code)
      const item = this.selectList.find(item => item.desc === desc);
      if (item) {
        this.$emit("input", item.code);
      }
    },
    // 重置slidePicker，slidePicker在待选项改变的时候有时会发生显示的bug，需手动重置
    resetSlidePicker() {
      this.slidePickerFlag = false;
      this.$nextTick(() => {
        this.slidePickerFlag = true;
      });
    },

    // 处理slide picker变化
    handlerChange(desc) {
      // 更新rollDesc
      this.rollDesc = desc;
    },

    // 处理formInput click
    handlerFormInputClick() {
      // 打开select
      this.openSelect();
    },
    // 处理icon click
    handlerIconClick() {
      // formInput中的icon默认是click.stop的，此处需要手动触发formInput中的click
      this.$refs.fi.$el.click();
      // 打开datepicker
      this.openSelect();
    },
    // 处理取消
    handlerCancel() {
      // 重置rollDesc为desc
      if (this.desc) {
        this.rollDesc = this.desc;
      }
      // 关闭弹窗
      this.closeSelect();
      // emit cancel
      this.$emit("cancel");
    },
    // 处理确定
    handlerConfirm() {
      // 选中将rollDesc赋值给desc
      this.desc = this.rollDesc;
      // 关闭弹窗
      this.closeSelect();
      // emit confirm
      this.$emit("confirm");
    },
    // 根组件vali更新处理：更新当前组件的vali，保持同步
    handlerUpdateVali(vali) {
      this.vali = vali;
    }
  }
};
</script>

<style lang="scss" scoped>
.fs-model {
  align-items: flex-end;
}
.fs-wrap {
  background-color: #ffffff;
  width: 100vw;
  .btn-wrap {
    @include display-flex;
    justify-content: space-between;
    height: 40px;
    background-color: $color-theme;
    color: #ffffff;
    font-size: 15px;
    .btn {
      @include display-flex;
      @include reset-button;
      padding: 0 30px;
      height: 40px;
    }
  }
}
</style>
