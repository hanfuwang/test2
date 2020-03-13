<template>
  <div class="vali-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "valiForm",
  props: {
    // form表单
    form: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // vali对象
    vali: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    // form中绑定的属性发生变化，更新vali验证对象
    form: {
      handler() {
        this.$nextTick(() => {
          const vali = this.getVali();
          this.vali.status = vali.status;
          this.vali.unlegalValiList = vali.unlegalValiList;
        });
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  methods: {
    // 获取form的校验对象
    getVali() {
      // 取得所有的formItem
      const formItemList = this.$children;
      // 取得所有不符合校验规则的验证对象
      const unlegalValiList = formItemList
        .map(formItem => formItem.vali)
        // 过滤掉没有验证对象的数据
        .filter(item => item)
        // 筛选出不符合校验规则的数据
        .filter(item => (item.status === false ? true : false));

      if (unlegalValiList && unlegalValiList.length > 0) {
        // 有不符合校验规则的数据
        return {
          status: false,
          unlegalValiList: unlegalValiList
        };
      } else {
        // 全部符合
        return {
          status: true
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
