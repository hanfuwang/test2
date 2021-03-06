<template>
  <Page class="user-info" v-if="userInfo">
    <!-- 用户信息 -->
    <section class="info-wrap">
      <!-- 姓名 -->
      <FormInput v-model="userInfo.name" label="姓名" disabled></FormInput>
      <!-- 性别 -->
      <FormRadio
        v-model="userInfo.sex"
        label="性别"
        :selectList="sexSelectList"
      ></FormRadio>
      <!-- 生日 -->
      <FormDatepicker label="生日" v-model="userInfo.birthday"></FormDatepicker>
      <!-- 工号 -->
      <FormInput v-model="userInfo.agentCode" label="工号" disabled></FormInput>
      <!-- 所属机构 -->
      <FormSelector
        :selectData.sync="bankWebsite"
        type="bank"
        label="所属机构"
        placeholder="请选择所属机构"
        ref="bankSelector"
      ></FormSelector>
      <!-- 手机号 -->
      <FormInput
        v-model="userInfo.phone"
        label="手机号"
        :iconSrc="arrowRightIconSrc"
        :iconWidth="7"
        @formInputClick="goToChangeMobile"
        @iconClick="goToChangeMobile"
        disabled
      ></FormInput>

      <!-- 修改密码 -->
      <div class="tool-bar">
        <button class="tool-btn" @click="goToChangePwd">修改密码 ></button>
      </div>
    </section>

    <!-- 保存按钮 -->
    <button v-show="showSaveBtn" class="save theme-btn" @click="save">
      保存
    </button>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import FormInput from "@/components/common/form/FormInput";
import FormRadio from "@/components/common/form/FormRadio";
import FormDatepicker from "@/components/common/form/FormDatepicker";
import FormSelector from "@/components/common/form/FormSelector";
export default {
  name: "userInfo",
  components: {
    FormInput,
    FormRadio,
    FormDatepicker,
    FormSelector
  },
  data() {
    return {
      // 个人信息对象
      userInfo: null,
      // 初始化的用户信息，用于做是否需要显示保存按钮
      initUserInfo: {},
      // 银行网点对象
      bankWebsite: {
        banktype: "",
        agentcom: "",
        bankName: ""
      },
      // 码表
      sexSelectList: globalCode.sex,
      arrowRightIconSrc: require("@/assets/imgs/common/icon/icon_arrow_right.png") // 右箭头图标
    };
  },
  computed: {
    ...mapState({
      // openId
      openId: state => state.user.openId
    }),
    // 是否显示保存按钮
    showSaveBtn() {
      const userInfo = JSON.parse(JSON.stringify(this.userInfo));
      const initUserInfo = JSON.parse(JSON.stringify(this.initUserInfo));
      // 排除phone，手机号码有自己的修改页，不走统一的修改方式
      Reflect.deleteProperty(userInfo, "phone");
      Reflect.deleteProperty(initUserInfo, "phone");

      // 判断个人信息是否改变，如果改变了显示保存按钮
      return JSON.stringify(userInfo) !== JSON.stringify(initUserInfo);
    }
  },
  watch: {
    // 网点选择，赋值userInfo中的网点信息
    "bankWebsite.agentcom"(newVal) {
      this.userInfo.agentcom = newVal;
    }
  },
  activated() {
    // 初始化页面
    this.initPage();
  },
  beforeRouteLeave(to, from, next) {
    if (this.$refs.bankSelector.showSelector) {
      // 有选择器为打开状态，先关闭
      this.$refs.bankSelector.close();
      next(false);
    } else {
      next();
    }
  },
  methods: {
    // 初始化页面
    async initPage() {
      // 获取用户信息
      const userInfo = await this.$store
        .dispatch("user/getUserInfoByOpenId")
        .catch(() => {});
      if (userInfo && userInfo.weChatAgenctDTO) {
        // 微信的用户信息存在weChatAgenctDTO中
        const weChatAgenctDTO = userInfo.weChatAgenctDTO;
        // 设置数据
        // 赋值userInfo，initUserInfo，深拷贝，防止影响数据
        this.userInfo = JSON.parse(JSON.stringify(weChatAgenctDTO));
        this.initUserInfo = JSON.parse(JSON.stringify(weChatAgenctDTO));
        // 赋值bankWebsite
        this.bankWebsite.agentcom = weChatAgenctDTO.agentcom;
        this.bankWebsite.bankName = weChatAgenctDTO.bankName;
      } else {
        utils.ui.confirm("用户信息查询失败");
      }
    },
    // 跳转到修改手机页面
    goToChangeMobile() {
      this.go("changeMobile");
    },
    // 跳转到修改密码页面
    goToChangePwd() {
      this.goWithQuery("changePwd", {
        mobile: this.userInfo.phone
      });
    },
    // 保存
    save() {
      const userInfo = this.userInfo;
      // params
      const params = {
        agentDto: {
          phone: userInfo.phone,
          openId: this.openId,
          infoId: userInfo.infoId,
          agentcom: userInfo.agentcom,
          birthday: userInfo.birthday,
          sex: userInfo.sex
        }
      };

      // http
      utils.http.post(interfaces.user.updateUser, params).then(() => {
        utils.ui.tips("保存成功");
        // 修改信息成功，重新初始化页面
        this.initPage();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  padding-top: 10px;
}
.info-wrap {
  margin-bottom: 30px;
  /deep/ .f-label {
    .label {
      margin-left: -10px;
    }
  }
}
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
</style>
