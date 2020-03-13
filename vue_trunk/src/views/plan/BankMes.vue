<template>
  <Page class="demo-form" :withAppBar="!globalConfig.isWx">
    <!-- app-bar -->
    <AppBar v-if="!globalConfig.isWx">
      <template slot="center">
        银行账户信息
      </template>
    </AppBar>
    <AppContent class="app-content">
      <ValiForm :form="form" :vali="vali">
        <FormInput
          type="tel"
          v-model="form.accountCode"
          label="银行账号"
          placeholder="请输入银行账号"
          :rules="rules.accountCode"
        ></FormInput>
        <FormSelect
          v-model="form.bankCode"
          :selectList="bankSelectList"
          label="银行"
          placeholder="请选择银行"
          :rules="rules.bankCode"
        ></FormSelect>
        <FormInput
          type="tel"
          v-model="form.mobile"
          label="银行预留手机号"
          placeholder="请输入银行预留手机号"
          :rules="rules.mobile"
        ></FormInput>
      </ValiForm>
      <div class="box">
        <span @click="sure" class="disabled" :class="{ right: vali.status }"
          >确定</span
        >
        <span class="left" @click="$router.go(-1)">取消</span>
      </div>
    </AppContent>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import ValiForm from "@/components/common/form/ValiForm";
import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default {
  name: "bankMes",
  components: {
    ValiForm,
    FormInput,
    FormSelect
  },
  data() {
    return {
      // form表单
      form: {
        accountCode: "", //银行账号
        accountName: "", //客户姓名
        bankCode: "", //银行code
        bankName: "",
        mobile: "" //预留手机号
      },
      bankSelectList: [],
      bankList: [],
      params: {}, //跳转接收到的参数
      rules: {
        mobile: [
          {
            regExp: "require",
            msg: "银行预留手机号不能为空"
          },
          {
            regExp: "mobile",
            msg: "请输入正确的银行预留手机号"
          }
        ],
        accountCode: [
          {
            regExp: "require",
            msg: "银行账号不能为空"
          },
          {
            regExp: "bankCode",
            msg: "请输入正确的银行账号"
          }
        ],
        bankCode: [
          {
            regExp: "require",
            msg: "银行不能为空"
          }
        ]
      },
      // form验证对象
      vali: {
        status: false,
        unlegalValiList: []
      }
    };
  },
  computed: {
    ...mapState({
      bankInfoList: state => state.plan.bankInfoList,
      bankIndex: state => state.plan.bankIndex
    })
  },
  created() {
    //接手参数
    this.params = JSON.parse(JSON.stringify(this.$route.params));
    this.form.mobile = this.params.mobile; //银行预留手机号默认带出
    this.initCodeList();
    if (this.bankIndex >= 0) {
      this.form = this.bankInfoList[this.bankIndex];
    }
  },
  methods: {
    async initCodeList() {
      //银行码表
      this.bankSelectList = await utils.code.getCode("bank_code");
    },
    getbankChi(code) {
      return this.bankSelectList.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    //查询签约
    querySign() {
      let req = {
        functionCode: 4, // 功能编码：1-签约申请 2-短信校验 3-解约申请 4-签约查询
        payAccountNo: this.form.accountCode, //付款账号
        payAccountName: this.params.name, //付款账号名称
        payBankCode: this.form.bankCode, //付款银行编码
        payBankName: this.form.bankName, //付款银行名称
        credentialsType: this.params.certificateType, //证件类型编码
        credentialsCode: this.params.certificateNo, //证件号
        phone: this.form.mobile, //手机号
        amount: "", //金额   以元为单位（暂时无用）
        payType: "YT04", // 付款用途 YT04-业务代收
        bankPayType: "2", //银行指令类型    2-对私
        transferType: "1", //业务类别   1-固定值
        currencyCode: "CNY" //结算币种  CNY-人民币
      };
      utils.http.post(interfaces.plan.querySign, req).then(res => {
        console.log(res);
        //已签约的鉴权
        if (res.stat == "00") {
          this.authentication(); //鉴权
        } else if (res.stat == "02") {
          //未签约  签约接口
          utils.ui.confirm({
            msg: "账号未签约，是否签约？",
            btnList: [
              {
                msg: "否",
                cb: () => {}
              },
              {
                msg: "是",
                cb: () => {
                  //签约接口
                  let params = {
                    payAccountNo: this.form.accountCode, //付款账号
                    payAccountName: this.params.name, //付款账号名称
                    payBankCode: this.form.bankCode, //付款银行编码
                    payBankName: this.form.bankName, //付款银行名称
                    credentialsType: this.params.certificateType, //证件类型编码
                    credentialsCode: this.params.certificateNo, //证件号
                    phone: this.form.mobile //手机号
                  };
                  this.goWithParams("inLineSign", params);
                }
              }
            ]
          });
        } else {
          utils.ui.tips(res.respInfo);
        }
      });
    },
    //鉴权
    authentication() {
      let req = {
        infoId: "", //客户主键
        name: this.params.name, //姓名
        certificateNo: this.params.certificateNo, //证件号码
        accountcode: this.form.accountCode //银行卡号
      };
      utils.http.post(interfaces.plan.authentication, req).then(res => {
        console.log(res);
        if (res.code == "0000") {
          //鉴权成功 保存
          this.saveBankNo();
        } else {
          utils.ui.tips(res.msg);
        }
      });
    },
    //保存
    saveBankNo() {
      this.form.bankName = this.getbankChi(this.form.bankCode);
      if (this.bankIndex >= 0) {
        this.bankInfoList[this.bankIndex] = this.form;
      } else {
        this.bankInfoList.push(this.form);
      }
      this.$store.commit("plan/setState", {
        attr: "bankInfoList",
        data: this.bankInfoList
      });
      this.back();
    },
    sure() {
      // 根据vali对象判断当前form元素是否全部输入合法
      if (!this.vali.status) {
        return;
      } else {
        //新增银行卡 中信银行先查询是否签约 其余先鉴权
        if (this.form.bankCode == "302") {
          this.querySign(); //签约
        } else {
          this.authentication(); //鉴权
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  @include lineheight-height(37px);
  padding: 0 30px;
  background: $color-ds;
  font-size: 14px;
  color: #333333;
  display: flex;
  justify-content: space-between;
}
.box {
  text-align: center;
  font-family: HYQiHei-DES;
  font-size: 18px;
  .left {
    width: 102px;
    border: 1px solid #ffcc00;
    border-radius: 19px;
    height: 38px;
    display: inline-block;
    margin-top: 73px;
    margin-left: 37px;
    color: #ffcc00;
    line-height: 38px;
    color: #ffcc00;
  }
  .right {
    width: 102px;
    background: #ffcc00;
    border-radius: 19px;
    height: 38px;
    display: inline-block;
    line-height: 38px;
  }
}
.disabled {
  width: 102px;
  border-radius: 19px;
  height: 38px;
  display: inline-block;
  line-height: 38px;
  background-color: #c8cbd2;
  color: #ffffff;
}
</style>
