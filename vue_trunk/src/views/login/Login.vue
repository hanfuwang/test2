<template>
  <Page class="login">
    <article class="login-wrap">
      <!-- 密码登录 -->
      <transition name="leftToRight05">
        <section v-show="loginType === 'pwd'" class="login-content login-pwd">
          <ValiForm :form="pwdForm" :vali="pwdVali">
            <!-- 手机号 -->
            <FormInput
              v-model="pwdForm.phone"
              type="tel"
              placeholder="手机号"
              :rules="rules.phone"
            ></FormInput>
            <!-- 密码 -->
            <FormPwd
              v-model="pwdForm.passWord"
              placeholder="密码"
              :rules="rules.passWord"
            ></FormPwd>
          </ValiForm>
          <!-- 修改密码，忘记密码 -->
          <div class="tool-bar">
            <!-- <button class="tool-btn" @click="goToChangePwd">修改密码</button> -->
            <button class="tool-btn" @click="goToForgetPwd">忘记密码？</button>
          </div>
          <!-- 短信验证登录 -->
          <div class="tool-bar">
            <button
              class="tool-btn vali-code"
              @click="switchLoginType('valiCode')"
            >
              短信验证登录 >
            </button>
          </div>
        </section>
      </transition>

      <!-- 短信验证码登录 -->
      <transition name="rightToLeft05">
        <section
          v-show="loginType === 'valiCode'"
          class="login-content login-valiCode"
        >
          <ValiForm :form="valiCodeForm" :vali="valiCodeVali">
            <!-- 手机号 -->
            <FormInput
              v-model="valiCodeForm.phone"
              type="tel"
              placeholder="请输入手机号"
              :rules="rules.phone"
            ></FormInput>
            <!-- 验证码 -->
            <FormNumVali
              v-model="valiCodeForm.code"
              :mobile="valiCodeForm.phone"
              placeholder="请输入验证码"
              ref="fnv"
            ></FormNumVali>
          </ValiForm>
          <!-- 密码登录 -->
          <div class="tool-bar">
            <button class="tool-btn vali-code" @click="switchLoginType('pwd')">
              密码登录 >
            </button>
          </div>
        </section>
      </transition>

      <!-- 登录按钮 -->
      <button
        class="login-btn theme-btn"
        :class="{ disabled: btnDisabled }"
        @click="login"
      >
        登录
      </button>
    </article>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import ValiForm from "@/components/common/form/ValiForm";
import FormInput from "@/components/common/form/FormInput";
import FormNumVali from "@/components/common/form/FormNumVali";
import FormPwd from "@/components/common/form/FormPwd";
export default {
  name: "login",
  components: {
    ValiForm,
    FormInput,
    FormNumVali,
    FormPwd
  },
  data() {
    return {
      loginType: "pwd", // 登陆类型，pwd：密码，valiCode：验证码
      // 密码登录form
      pwdForm: {
        phone: "", // 手机号
        passWord: "" // 密码
      },
      // 密码登录form验证对象
      pwdVali: {
        status: false,
        unlegalValiList: []
      },
      // 验证码登录form
      valiCodeForm: {
        phone: "", // 手机号
        code: "" // 验证码
      },
      // 验证码登录form验证对象
      valiCodeVali: {
        status: false,
        unlegalValiList: []
      },
      // 规则
      rules: {
        phone: [
          {
            regExp: "require",
            msg: "手机号码不能为空"
          },
          {
            regExp: "mobile",
            msg: "手机号码错误，您输入的是一个无效的手机号码"
          }
        ],
        passWord: [
          {
            regExp: "require",
            msg: "密码不能为空"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      // openId
      openId: state => state.user.openId
    }),
    // 按钮是否disabled
    btnDisabled() {
      return !(this.loginType === "pwd"
        ? this.pwdVali.status
        : this.valiCodeVali.status);
    }
  },
  watch: {},
  created() {
    // 验证页面，防止非法进入
    const vali = this.valiPage();
    if (!vali.state) {
      // 验证不通过，跳转到非法页面
      this.$router.replace({
        name: "illegalRequest",
        query: {
          msg: vali.msg
        }
      });
    } else {
      // 初始化页面
      this.initPage();
    }
  },
  methods: {
    // 验证页面，防止非法进入
    valiPage() {
      // 验证对象
      const vali = {
        state: true,
        msg: []
      };
      // 检查是否有openId
      if (!this.openId) {
        vali.state = false;
        vali.msg.push("[LOGIN]页面错误，无openId");
      }
      vali.msg = vali.msg.join("；");
      return vali;
    },
    // 初始化页面
    initPage() {},
    // 切换登录类型
    switchLoginType(loginType) {
      this.loginType = loginType;
    },
    // 跳转到修改密码页面
    // goToChangePwd() {
    //   this.go("changePwd");
    // },
    // 跳转到忘记密码页面
    goToForgetPwd() {
      this.go("forgetPwd");
    },
    // 登陆
    login() {
      if (this.btnDisabled) return;

      // 根据当前登陆类型调用对应的登陆方法
      this[`${this.loginType}Login`]();
    },
    // 密码登陆
    pwdLogin() {
      const params = {
        ...this.pwdForm, // 手机号，密码
        openId: this.openId, // openId
        type: "1" // 密码登陆
      };
      // http
      utils.http.post(interfaces.login.login, params).then(() => {
        // 登陆成功
        this.handlerLoginSuccess();
      });
    },
    // 验证码登陆
    valiCodeLogin() {
      const params = {
        ...this.valiCodeForm, // 手机号，密码
        openId: this.openId, // openId
        type: "0" // 验证码登陆
      };
      // http
      utils.http.post(interfaces.login.login, params).then(() => {
        // 登陆成功
        this.handlerLoginSuccess();
      });
    },
    // 处理登录成功
    async handlerLoginSuccess() {
      // 查询用户信息
      const userInfo = await this.$store
        .dispatch("user/getUserInfoByOpenId")
        .catch(() => {});
      if (userInfo) {
        // 登录成功

        // 重新挂载的query参数
        const query = {
          ...this.$route.query
        };
        // 删除query中无用的参数
        Reflect.deleteProperty(query, "loginToPath");
        Reflect.deleteProperty(query, globalConfig.navKeyName);

        // 重新挂载的params参数
        const params = {
          ...this.$route.params
        };

        // 页面跳转
        this.$router.replace({
          // 跳转到指定的页面，没有指定页面跳转到userInfo
          name: this.$route.query.loginToPath || "userInfo",
          // query重新挂载
          query,
          // params重新挂载
          params
        });
      } else {
        utils.ui.confirm("用户信息查询失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0);
  // 登录content
  .login-content {
    position: absolute;
    width: 100%;
    top: 30px;
    left: 0;
    // 工具栏
    .tool-bar {
      @include display-flex;
      justify-content: space-between;
      margin: 12px 20px 20px;
      .tool-btn {
        @include reset-button;
        color: #fa7070;
        font-size: 13px;
        &.vali-code {
          font-size: 14px;
          color: #6c6c6c;
        }
      }
    }
  }
  // 登录按钮
  .login-btn {
    margin-top: 260px;
  }
}
</style>
