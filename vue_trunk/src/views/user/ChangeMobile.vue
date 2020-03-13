<template>
  <Page class="change-mobile">
    <!-- vf -->
    <ValiForm class="vf" :form="form" :vali="vali">
      <!-- 手机号 -->
      <FormInput
        v-model="form.mobile"
        type="tel"
        placeholder="手机号"
        :rules="rules.mobile"
      ></FormInput>
      <!-- 验证码 -->
      <FormNumVali
        v-model="form.valiCode"
        :mobile="form.mobile"
        placeholder="验证码"
        ref="fnv"
      ></FormNumVali>
    </ValiForm>

    <!-- button -->
    <button
      class="next-step theme-btn"
      :class="{ disabled: !vali.status }"
      @click="confirm"
    >
      确定
    </button>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import ValiForm from "@/components/common/form/ValiForm";
import FormInput from "@/components/common/form/FormInput";
import FormNumVali from "@/components/common/form/FormNumVali";
export default {
  name: "changeMobile",
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
  computed: {
    ...mapState({
      // userInfo
      userInfo: state => state.user.userInfo.weChatAgenctDTO
    })
  },
  watch: {},
  created() {
    // 初始化页面
    this.initPage();
  },
  methods: {
    // 初始化页面
    initPage() {
      this.form.mobile = this.userInfo.phone;
    },
    // 确认
    async confirm() {
      if (!this.vali.status) return;

      // 调用短信验证码检查函数
      const valiResult = await this.$refs.fnv.checkValiCode();
      if (!valiResult) {
        return;
      }

      // 手机号校验通过，调用修改手机接口
      const params = {
        phone: this.form.mobile, // 手机号
        infoId: this.userInfo.infoId // 用户id
      };
      // http
      utils.http.post(interfaces.user.changeUserPhone, params).then(() => {
        utils.ui.tips("修改手机号成功");
        // 返回上一页
        this.back();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.change-mobile {
  padding-top: 30px;
}
.vf {
  margin-bottom: 80px;
}
</style>
