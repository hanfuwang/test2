<template>
  <Page class="change-pwd">
    <!-- vf -->
    <ValiForm class="vf" :form="form" :vali="vali">
      <!-- 原密码 -->
      <FormPwd
        v-if="type !== 'NOOLD'"
        v-model="form.oldPwd"
        placeholder="请输入该账户的原密码"
        :rules="rules.oldPwd"
        needPwdIcon
      ></FormPwd>
      <!-- 新密码 -->
      <FormPwd
        v-model="form.newPwd"
        placeholder="填写新密码"
        :rules="rules.newPwd"
        needPwdIcon
        ref="newFP"
      ></FormPwd>
      <!-- 确认新密码 -->
      <FormPwd
        v-model="form.reNewPwd"
        placeholder="再次填写确认新密码"
        :rules="rules.reNewPwd"
        needPwdIcon
        ref="reNewFP"
      ></FormPwd>
    </ValiForm>

    <!-- tips -->
    <section class="tips">
      <p class="tips-line">密码录入规则：</p>
      <p class="tips-line">
        1、密码长度为8位至20位，支持录入字母、数字特殊字符!@#$%^&；
      </p>
      <p class="tips-line">
        2、必须包含如下字符：1位大写字母、1位小写字母、1位数字；
      </p>
      <p class="tips-line">3、新密码不能与前3次密码相同；</p>
      <p class="tips-line">4、新密码有效期为90天。</p>
    </section>

    <!-- 确定按钮 -->
    <button
      class="confirm theme-btn"
      :class="{ disabled: !vali.status }"
      @click="confirm"
    >
      确定
    </button>
  </Page>
</template>

<script>
import ValiForm from "@/components/common/form/ValiForm";
import FormPwd from "@/components/common/form/FormPwd";
export default {
  name: "changePwd",
  components: {
    ValiForm,
    FormPwd
  },
  data() {
    return {
      mobile: "", // 手机号
      type: "", // 页面类型：NOOLD：无需原密码
      // form
      form: {
        oldPwd: "", // 老密码
        newPwd: "", // 新密码
        reNewPwd: "" // 重复：新密码
      },
      // form验证对象
      vali: {
        status: false,
        unlegalValiList: []
      },
      // 校验规则
      rules: {
        oldPwd: [
          {
            regExp: "require",
            msg: "原密码不能为空"
          }
        ],
        newPwd: [
          {
            regExp: "require",
            msg: "新密码不能为空"
          },
          {
            regExp: this.checkPwd,
            msg: "新密码不符合校验规则"
          }
        ],
        reNewPwd: [
          {
            regExp: "require",
            msg: "确认新密码不能为空"
          },
          {
            regExp: this.checkPwd,
            msg: "确认新密码不符合校验规则"
          },
          {
            regExp: value => value === this.form.newPwd,
            msg: "确认新密码与新密码不一致，请检查"
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    // 监听新密码
    "form.newPwd": {
      handler() {
        // 手动更新重复新密码的校验
        this.$refs.reNewFP.$refs.fi.updateVali();
      }
    },
    // 监听重复新密码
    "form.reNewPwd": {
      handler() {
        // 手动更新新密码的校验
        this.$refs.newFP.$refs.fi.updateVali();
      }
    }
  },
  created() {
    // 初始化页面
    this.initPage();
  },
  methods: {
    // 初始化页面
    initPage() {
      this.mobile = this.$route.query.mobile;
      this.type = this.$route.query.type;
      // 设置标题
      document.title = this.type === "NOOLD" ? "重置密码" : "修改密码";
    },
    // 验证密码
    checkPwd(pwd) {
      // 1、密码长度为8位至20位，支持录入字母、数字特殊字符!@#$%^&；
      // 2、必须包含如下字符：1位大写字母、1位小写字母、1位数字；
      const regExp = /^[a-zA-Z0-9!@#$%^&]{8,20}$/;
      return (
        regExp.test(pwd) &&
        /[A-Z]/.test(pwd) &&
        /[a-z]/.test(pwd) &&
        /[0-9]/.test(pwd)
      );
    },
    // 确认修改
    confirm() {
      if (!this.vali.status) return;

      // 根据type类型判断是忘记密码还是修改密码
      if (this.type === "NOOLD") {
        // 忘记密码
        this.forgetPwd();
      } else {
        // 修改密码
        this.changePwd();
      }
    },
    // 忘记密码
    forgetPwd() {
      const params = {
        phone: this.mobile, // 手机号
        passWord: this.form.newPwd // 重设的密码
      };

      // http
      utils.http.post(interfaces.user.forgetPwd, params).then(() => {
        utils.ui.tips("重置密码成功");
        // 密码修改成功，返回登陆页
        this.go("login");
      });
    },
    // 修改密码
    changePwd() {
      const params = {
        phone: this.mobile, // 手机号
        passWord: this.form.newPwd, // 重设的密码
        oldPassWord: this.form.oldPwd // 旧密码
      };

      // http
      utils.http.post(interfaces.user.changePwd, params).then(() => {
        utils.ui.tips("密码修改成功");
        // 密码修改成功，返回上一页，目前为个人信息页
        this.back();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.change-pwd {
  padding-top: 30px;
}
.vf {
  margin-bottom: 25px;
}
.tips {
  width: 283px;
  padding: 0 20px;
  margin-bottom: 80px;
  font-size: 11px;
  line-height: 18px;
  color: #fa7070;
}
</style>
