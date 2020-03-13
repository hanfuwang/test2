<template>
  <Page class="forget-pwd">
    <!-- tips -->
    <div class="tips">* 请输入您要找回登录密码的账户</div>

    <!-- vf -->
    <ValiForm class="vf" :form="form" :vali="vali">
      <!-- 手机号 -->
      <FormInput
        v-model="form.mobile"
        type="tel"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      ></FormInput>
      <!-- 验证码 -->
      <FormNumVali
        v-model="form.valiCode"
        :mobile="form.mobile"
        placeholder="请输入验证码"
        ref="fnv"
      ></FormNumVali>
    </ValiForm>

    <!-- button -->
    <button
      class="next-step theme-btn"
      :class="{ disabled: !vali.status }"
      @click="nextStep"
    >
      下一步
    </button>
  </Page>
</template>

<script>
import ValiForm from "@/components/common/form/ValiForm";
import FormInput from "@/components/common/form/FormInput";
import FormNumVali from "@/components/common/form/FormNumVali";

export default {
  name: "forgetPwd",
  components: {
    ValiForm,
    FormInput,
    FormNumVali
  },
  data() {
    return {
      // form
      form: {
        mobile: "", // 手机号
        valiCode: "" // 验证码
      },
      // form验证对象
      vali: {
        status: false,
        unlegalValiList: []
      },
      // 规则
      rules: {
        mobile: [
          {
            regExp: "require",
            msg: "手机号码不能为空"
          },
          {
            regExp: "mobile",
            msg: "您输入的是一个无效的手机号码"
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    // 初始化页面
    this.initPage();
  },
  methods: {
    // 初始化页面
    initPage() {},
    // 下一步
    async nextStep() {
      if (!this.vali.status) return;

      // 调用短信验证码检查函数
      const valiResult = await this.$refs.fnv.checkValiCode();
      if (!valiResult) {
        return;
      }

      // 验证成功
      // 无需原密码跳转到修改密码页面
      this.goWithQuery("changePwd", {
        type: "NOOLD", // 无需原密码标志
        mobile: this.form.mobile
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tips {
  @include display-flex;
  justify-content: flex-start;
  height: 30px;
  padding: 0 20px;
  box-shadow: 0 1px 0 0 #f3f3f3;
  background: #fafafa;
  font-size: 12px;
  color: #fa7070;
  margin-bottom: 15px;
}
.vf {
  margin-bottom: 90px;
}
</style>
