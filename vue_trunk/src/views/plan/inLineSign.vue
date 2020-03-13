<template>
  <Page class="demo-form" :withAppBar="!globalConfig.isWx">
    <!-- 导航栏 -->
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        委托代收签约
      </template>
    </AppBar>
    <AppContent class="app-content">
      <ValiForm :form="cusMemberInfo" :vali="vali">
        <div class="content-title">
          客户信息
        </div>
        <section>
          <FormInput
            v-model="cusMemberInfo.payAccountName"
            label="客户姓名"
            placeholder="请输入姓名"
            disabled
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.payAccountNo"
            label="委托代收账号"
            placeholder="请输入委托代收账号"
            disabled
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.credentialsCode"
            label="有效证件号码"
            placeholder="请输入有效证件号码"
            disabled
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.phone"
            label="银行预留手机号"
            placeholder="请输入银行预留手机号"
            disabled
          ></FormInput>
        </section>
        <div class="content-title">
          商户信息
        </div>
        <section>
          <FormInput
            v-model="cusMemberInfo.MerchantType"
            label="商户类型"
            disabled
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.MerchantName"
            label="商户名称"
            disabled
          ></FormInput>
        </section>
        <div class="content-title">
          委托代收信息
        </div>
        <section>
          <FormDatepicker
            placeholder="请选择委托失效日期"
            label="委托失效日期"
            v-model="cusMemberInfo.ExpirationDateCommission"
            max="2099 - 05 - 09"
          ></FormDatepicker>
          <FormInput
            v-model="cusMemberInfo.PaymentlimitPerOrder"
            label="付款单笔限额"
            placeholder="请输入付款单笔限额"
            @iptBlur="iptBlur(1, cusMemberInfo.PaymentlimitPerOrder)"
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.Paymentdaylimit"
            label="付款日限额"
            placeholder="请输入付款日限额"
            @iptBlur="iptBlur(2, cusMemberInfo.Paymentdaylimit)"
          ></FormInput>
          <FormInput
            v-model="cusMemberInfo.PaymentMonthlimit"
            label="付款月限额"
            placeholder="请输入付款月限额"
            @iptBlur="iptBlur(3, cusMemberInfo.PaymentMonthlimit)"
          ></FormInput>
        </section>
        <div class="custom-text">
          <FormInput
            label="短信验证码"
            placeholder="请输入验证码"
            v-model="FormInputValue"
            style="width:60%;padding:0"
            @iptBlur="iptBlur(4, FormInputValue)"
          ></FormInput>
          <div class="textcode-right" @click="!timer ? gotosend() : ''">
            <span v-if="showTimer">{{ timerCount }}</span
            >{{ text }}
          </div>
        </div>
        <div
          style="text-align: center;margin-top: 10px;height: 40px;line-height: 40px;margin-bottom: 10px;"
        >
          <input type="checkbox" v-model="isCheck" @click="changeCheck" />
          <span
            >已阅读并同意"
            <span class="xieyi" @click="openModel"
              >中信银行个人客户委托代收业务协议</span
            >"
          </span>
        </div>
        <div
          class="signClass"
          :class="{ signClassActive: issureCheck }"
          @click="goSign"
        >
          签约
        </div>
      </ValiForm>
    </AppContent>
  </Page>
</template>

<script>
import ValiForm from "@/components/common/form/ValiForm";
import FormInput from "@/components/common/form/FormInput";
import FormDatepicker from "@/components/common/form/FormDatepicker";

export default {
  name: "inLineSign",
  components: { FormDatepicker, FormInput, ValiForm },
  data() {
    return {
      params: {},
      cusMemberInfo: {
        payAccountName: "", //客户姓名
        payAccountNo: "", //委托代收账号
        credentialsCode: "", //有效证件号码
        phone: "", //银行预留手机号
        ExpirationDateCommission: "2099-05-09", //委托失效日期
        PaymentlimitPerOrder: 1000000, //付款单笔限额
        Paymentdaylimit: 1000000, //付款日限额
        PaymentMonthlimit: 5000000, //付款月限额
        MerchantType: "金融服务类-保险费",
        MerchantName: "爱心人寿保险股份有限公司",
        url: ""
      },
      // form验证对象
      vali: {
        status: false,
        unlegalValiList: []
      },
      FormInputValue: "",
      isCheck: false,
      issureCheck: false,
      timer: false,
      showTimer: false,
      timerCount: 180000 / 1000,
      timeout: 180000,
      text: "获取验证码",
      counter: "", //定时器
      obillCode: "", //原发起方流水号
      isClickMesg: false
    };
  },
  computed: {},
  created() {
    //页面信息赋值
    this.params = JSON.parse(JSON.stringify(this.$route.params));
    this.cusMemberInfo = Object.assign(this.cusMemberInfo, this.params);
  },
  methods: {
    // 返回
    goBack() {
      this.back();
    },
    ischeck(num, data) {
      if (num == 1) {
        if (
          !(
            data != "" &&
            this.cusMemberInfo.Paymentdaylimit != "" &&
            this.cusMemberInfo.PaymentMonthlimit != "" &&
            this.FormInputValue != ""
          )
        )
          return false;
      } else if (num == 2) {
        if (
          !(
            data != "" &&
            this.cusMemberInfo.PaymentlimitPerOrder != "" &&
            this.cusMemberInfo.PaymentMonthlimit != "" &&
            this.FormInputValue != ""
          )
        )
          return false;
      } else if (num == 3) {
        if (
          !(
            data != "" &&
            this.cusMemberInfo.Paymentdaylimit != "" &&
            this.cusMemberInfo.PaymentlimitPerOrder != "" &&
            this.FormInputValue != ""
          )
        )
          return false;
      } else if (num == 4) {
        if (
          !(
            data != "" &&
            this.cusMemberInfo.Paymentdaylimit != "" &&
            this.cusMemberInfo.PaymentMonthlimit != "" &&
            this.cusMemberInfo.PaymentlimitPerOrder != ""
          )
        )
          return false;
      }
      if (num == 5) {
        console.log(data);
        if (this.isCheck) {
          return false;
        } else {
          if (data.indexOf("") == -1) {
            return true;
          }
        }
      } else {
        if (this.isCheck) {
          return true;
        } else {
          return false;
        }
      }
    },
    iptBlur(type, num) {
      // console.log(type, num);
      //付款单笔限额 最大1000000
      let limit = 0;
      if (num != "") {
        limit = +num;
      } else {
        limit = "";
      }

      if (type == 1) {
        limit > 1000000
          ? (this.cusMemberInfo.PaymentlimitPerOrder = 1000000)
          : (this.cusMemberInfo.PaymentlimitPerOrder = limit);
      }
      //付款日限额 最大1000000
      if (type == 2) {
        limit > 1000000
          ? (this.cusMemberInfo.Paymentdaylimit = 1000000)
          : (this.cusMemberInfo.Paymentdaylimit = limit);
      }
      //付款月限额 最大5000000
      if (type == 3) {
        limit > 5000000
          ? (this.cusMemberInfo.PaymentMonthlimit = 5000000)
          : (this.cusMemberInfo.PaymentMonthlimit = limit);
      }
      this.issureCheck = this.ischeck(type, num);
    },
    changeCheck() {
      this.issureCheck = this.ischeck(5, [
        this.cusMemberInfo.PaymentlimitPerOrder,
        this.cusMemberInfo.Paymentdaylimit,
        this.cusMemberInfo.PaymentMonthlimit,
        this.FormInputValue
      ]);
    },
    checkRule() {
      if (this.cusMemberInfo.PaymentlimitPerOrder == "") {
        utils.ui.tips("请输入付款单笔限额。");
        return false;
      }
      if (this.cusMemberInfo.Paymentdaylimit == "") {
        utils.ui.tips("请输入付款日限额。");
        return false;
      }
      if (this.cusMemberInfo.PaymentMonthlimit == "") {
        utils.ui.tips("请输入付款月限额。");
        return false;
      }
      if (!this.isClickMesg) {
        utils.ui.tips("请先获取短信验证码！");
        return false;
      }
      if (this.FormInputValue == "") {
        utils.ui.tips("请输入短信验证码。");
        return false;
      }
      return true;
    },
    goSign() {
      if (!this.issureCheck) return false;
      if (this.checkRule()) {
        var para = {
          functionCode: 2, // 功能编码：1-签约申请 2-短信校验 3-解约申请 4-签约查询
          payAccountNo: this.cusMemberInfo.payAccountNo, //付款账号
          payAccountName: this.cusMemberInfo.payAccountName, //付款账号名称
          payBankCode: this.cusMemberInfo.payBankCode, //付款银行编码
          payBankName: this.cusMemberInfo.payBankName, //付款银行名称
          credentialsType: this.cusMemberInfo.credentialsType, //证件类型编码
          credentialsCode: this.cusMemberInfo.credentialsCode, //证件号
          phone: this.cusMemberInfo.phone, //手机号
          amount: "", //金额   以元为单位（暂时无用）
          payType: "YT04", // 付款用途 YT04-业务代收
          bankPayType: "2", //银行指令类型    2-对私
          transferType: "1", //业务类别   1-固定值
          currencyCode: "CNY", //结算币种  CNY-人民币
          smsFlag: "00", //短信标识
          smsCode: this.FormInputValue, //验证码
          obillCode: this.obillCode //原发起方流水号
        };
        console.log(para);
        utils.http.post(interfaces.plan.inlineSign, para).then(res => {
          console.log(res);
          this.isClickMesg = false;
          this.text = "获取验证码";
          this.timer = false;
          this.showTimer = false;
          clearInterval(this.counter);
          this.FormInputValue = "";
          utils.ui.tips(res.respInfo);
        });
      }
    },
    onClick() {
      if (this.counter) {
        this.timerCount = 180;
        clearInterval(this.counter);
      }
      this.showTimer = true;
      this.timer = true;
      this.text = "秒后重新获取";
      this.counter = setInterval(() => {
        if (this.timerCount >= 0) {
          this.timerCount = this.timerCount - 1;
        }
      }, 1000);

      setTimeout(() => {
        this.text = "获取验证码";
        this.timer = false;
        clearInterval(this.counter);
        this.showTimer = false;
        this.timerCount = this.timeout / 1000;
      }, this.timeout);
    },
    gotosend() {
      let para = {
        functionCode: 1, // 功能编码：1-签约申请 2-短信校验 3-解约申请 4-签约查询
        payAccountNo: this.cusMemberInfo.payAccountNo, //付款账号
        payAccountName: this.cusMemberInfo.payAccountName, //付款账号名称
        payBankCode: this.cusMemberInfo.payBankCode, //付款银行编码
        payBankName: this.cusMemberInfo.payBankName, //付款银行名称
        credentialsType: this.cusMemberInfo.credentialsType, //证件类型编码
        credentialsCode: this.cusMemberInfo.credentialsCode, //证件号
        phone: this.cusMemberInfo.phone, //手机号
        amount: "", //金额   以元为单位（暂时无用）
        payType: "YT04", // 付款用途 YT04-业务代收
        bankPayType: "2", //银行指令类型    2-对私
        transferType: "1", //业务类别   1-固定值
        currencyCode: "CNY", //结算币种  CNY-人民币
        siglLimtamt: this.cusMemberInfo.PaymentlimitPerOrder, //付款单笔限额
        dayLimtamt: this.cusMemberInfo.Paymentdaylimit, //付款日累计限额
        mothLimtamt: this.cusMemberInfo.PaymentMonthlimit, //付款月累计限额
        duedt: this.cusMemberInfo.ExpirationDateCommission //签约失效日期
      };
      utils.http.post(interfaces.plan.getMessage, para).then(res => {
        console.log(res);
        this.isClickMesg = true;
        this.obillCode = res.sndseqNo;
        // this.onClick();
        if (res.stat == "00") {
          this.onClick();
        } else {
          utils.ui.tips(res.respInfo);
        }
      });
    },
    openModel() {
      this.url =
        globalConfig.openOfficeUrl + "?ssl=1&furl=" + globalConfig.argeeMentUrl;
      // console.log(this.url);
      this.$store.commit("production/setState", {
        attr: "iframeContent",
        data: Object.assign({
          tittle: "客户委托代收业务协议",
          url: this.url
        })
      });
      this.go("signArgeeMent");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.app-bar {
  .icon {
    height: auto;
    &.icon-back {
      width: 11.5px;
    }
  }
}
.app-content {
  @include overflow-emphasis;
  font-size: $font-size;
  color: $font-color;

  .content-title {
    width: 90%;
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #a8a7a8;
    padding-left: 15px;
    color: #ffcc00;
    margin: 0 auto;
    font-size: 18px;
  }

  .custom-text {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 90%;
    align-items: center;
    border-bottom: 1px solid #e7e7e7;
    margin: 0 auto;
  }

  .textcode-right {
    width: 117px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ffcc00;
    text-align: center;
    line-height: 30px;
    color: #ffcc00;
  }

  .signClass {
    width: 25%;
    height: 35px;
    line-height: 35px;
    margin: 0 auto 20px;
    background: #c8cbd2;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #c8cbd2;
  }
  .signClassActive {
    background: #ffcc00;
    border: 1px solid #ffcc00;
  }

  .xieyi {
    color: #ffcc00;
  }
}
</style>
