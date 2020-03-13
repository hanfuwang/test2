<template>
  <section>
    <div class="risk-save-button">
      <button class="view" @click="handleViewPlan">查看规划书</button>
      <button class="send" @click="handleSendPlan">生成规划书并发送</button>
      <!-- 发送计划书的弹窗 -->
      <RiskSendModal
        :showModal="showModal"
        @sure="sendSure"
        @cancel="sendCancel"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import RiskSendModal from "./RiskSendModal";

export default {
  name: "riskSaveButton",
  components: {
    RiskSendModal
  },
  props: {
    mainRiskList: {
      //主险列表
      type: Array
    },
    mainSetting: {
      //主险配置
      type: Object
    },
    selectMainCode: {
      //当前主险code
      type: String
    },
    selectMain: {
      //被选的主险项
      type: Object
    }
  },
  data() {
    return {
      showModal: false,
      isPass: false, //保费试算是否通过
      sendParmas: {} //发送计划书所需要的参数
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      riskProposalProductList: state => state.plan.riskProposalProductList, //附加险列表
      mainProposalProductList: state => state.plan.mainProposalProductList, //主险列表
      insurant: state => state.plan.insurant, //被保人对象
      applicant: state => state.plan.applicant, //投保人
      totalPremium: state => state.plan.totalPremium, //总保费
      totalAmount: state => state.plan.totalAmount, //总保额
      userInfo: state => state.user.userInfo
    })
  },
  watch: {},
  created() {},
  methods: {
    //校验投、被保人信息
    isMsgEmpty() {
      let applicantBirthday = utils.format.getAge(this.applicant.birthdate);
      if (this.insurant.name == "") {
        utils.ui.confirm("请先选择被保人");
        return false;
      }
      if (this.insurant.birthdate == "") {
        utils.ui.confirm("请选择被保人出生日期");
        return false;
      }

      if (this.insurant.cdOccupation.occupationCode == "") {
        utils.ui.confirm("请选择被保人职业");
        return false;
      }
      if (this.insurant.holderRelation == "") {
        utils.ui.confirm("请选择关系");
        return false;
      }
      if (this.applicant.name == "") {
        utils.ui.confirm("请选择投保人");
        return false;
      }
      if (this.applicant.birthdate == "") {
        utils.ui.confirm("请选择投保人出生日期");
        return false;
      }
      if (applicantBirthday < 16) {
        utils.ui.confirm("投保人年龄不能小于16岁");
        return false;
      }
      if (this.insurant.cdOccupation.occupationCode == "") {
        utils.ui.confirm("请选择投保人职业");
        return false;
      }
      return true;
    },
    //保存/更新险种接口
    saveOrUpdatePlan() {
      const params = this.initSaveRisk();
      //保存/更新险种接口
      utils.http.post(interfaces.plan.saveOrUpdatePlan, params).then(res => {
        //跳转查看规划书
        console.log(this.insurant);
        this.insurant["bookId"] = res.proposalViewDto.bookId;
        console.log(this.insurant);
        this.$store.commit("plan/setState", {
          attr: "insurant",
          data: this.insurant
        });
        this.goWithQuery("lookPlan", {
          bookId: res.proposalViewDto.bookId
        });
      });
    },
    //点击发送规划书
    async handleSendPlan() {
      if (!this.isMsgEmpty()) return;
      let additionalCode = "";
      this.riskProposalProductList.forEach(item => {
        if (item.productCode === "ATCR01") {
          additionalCode = "ATCR01";
        }
      });
      if (this.insurant.holderRelation == "00" && additionalCode == "ATCR01") {
        utils.ui.confirm("选择豁免险种投被保人不能是同一人");
        return;
      }
      //保费试算不通过
      let isPass = await this.calcPremium();
      if (!isPass) return;
      this.showModal = true;
    },
    //确定发送
    sendSure(data) {
      if (!this.isMsgEmpty()) return;
      this.showModal = false;
      this.sendParmas = data; //发送计划书所使用的参数
      let mainProposalProductItem = this.mainProposalProductList[0]; //主险项
      let insurantShebao =
        mainProposalProductItem.shebao != "" &&
        mainProposalProductItem.productCode == "ATRB01"
          ? mainProposalProductItem.shebao
          : this.insurant.shebao
          ? this.insurant.shebao
          : this.insurant.isSocialInsurance; //被保人社保
      let applicantShebao =
        this.insurant.holderRelation == "00"
          ? insurantShebao
          : this.applicant.shebao || this.applicant.isSocialInsurance; //投保人社保
      const params = {
        agentCode: "",
        cusRelationList: [
          {
            infoId: this.insurant.customerId || this.insurant.infoId, //被保险人客户id
            relationPersonId:
              this.applicant.customerId || this.applicant.infoId, //--------------投保人客户id
            relationType: this.insurant.holderRelation, //关系
            sourceId: this.applicant.customerId || this.applicant.infoId //---投保人客户id
          }
        ],
        cusmemberInfoList: [
          {
            //被保人(如果社保在选产品时候变了，以产品里面为准)
            birthday: new Date(this.insurant.birthdate),
            category: this.insurant.isoldCustomer, //新客户老客户标志
            infoId: this.insurant.customerId || this.insurant.infoId,
            name: this.insurant.name,
            profession: this.insurant.cdOccupation.occupationCode,
            sex: this.insurant.sex,
            socialMedicalInsurance: insurantShebao
          },
          {
            //投保人
            birthday: new Date(this.applicant.birthdate),
            category: this.applicant.isoldCustomer, //新客户老客户标志
            infoId: this.applicant.customerId || this.applicant.infoId,
            name: this.applicant.name,
            profession: this.applicant.cdOccupation.occupationCode,
            sex: this.applicant.sex,
            socialMedicalInsurance: applicantShebao
          }
        ],
        personId: globalConfig.isWx
          ? this.userInfo && this.userInfo.weChatAgenctDTO.infoId
          : this.userInfo && this.userInfo.user && this.userInfo.user.personId, //代理人ID
        // personId: "e1909a91046d4506a58113ab54f70bb4",
        stepFlag: "2"
      };
      //更新客户
      utils.http.post(interfaces.plan.updateCustomer, params).then(() => {
        this.requestSendEmail();
      });
    },
    //请求发送邮件
    requestSendEmail() {
      let sendParmas = this.sendParmas;
      let params1 = this.initSaveRisk();
      let params2 = {
        coverUrl: sendParmas.selectedCover.filepath, //封面url
        cusId: "",
        cusType: "self",
        email: sendParmas.email,
        familyId: "",
        filePath: "",
        shareUrlInvalId: "2",
        sourceType: "1"
      };
      let params3 = {
        proposalPrintItem: {
          corver: sendParmas.setting1[0].checked ? "1" : "0", //封面
          companyInfo: sendParmas.setting1[1].checked ? "1" : "0", //公司介绍
          ensureDes: sendParmas.setting2[0].checked ? "1" : "0", //保障说明
          ensureDetail: sendParmas.setting2[1].checked ? "1" : "0", //保费明细
          benefitAnalysis: sendParmas.setting3[0].checked ? "1" : "0", //综合利益分析
          riskDesc: sendParmas.setting3[1].checked ? "1" : "0", //险种利益说明
          benefitTable: sendParmas.setting4[0].checked ? "1" : "0", //保险利益演示表
          importantContent: sendParmas.setting4[1].checked ? "1" : "0", //重点内容说明
          printYears: parseInt(sendParmas.incomeDuring) //收益间隔
        }
      };

      const params = {
        proposalPlan: {
          ...params1.proposalPlan,
          ...params2,
          ...params3
        }
      };
      utils.http.post(interfaces.plan.sendEmail, params).then(() => {
        utils.ui.confirm({
          msg: "邮件发送成功！",
          btnList: [
            {
              msg: "确定",
              cb: () => {
                this.back();
              }
            }
          ]
        });
      });
    },
    //取消发送
    sendCancel() {
      this.showModal = false;
    },
    //查看计划书
    async handleViewPlan() {
      if (!this.isMsgEmpty()) return;
      let additionalCode = "";
      this.riskProposalProductList.forEach(item => {
        if (item.productCode === "ATCR01") {
          additionalCode = "ATCR01";
        }
      });
      if (this.insurant.holderRelation == "00" && additionalCode == "ATCR01") {
        utils.ui.confirm("选择豁免险种投被保人不能是同一人");
        return;
      }
      let isPass = await this.calcPremium();
      if (!isPass) return;
      let mainProposalProductItem = this.mainProposalProductList[0]; //主险项
      let insurantShebao =
        mainProposalProductItem.shebao != "" &&
        mainProposalProductItem.productCode == "ATRB01"
          ? mainProposalProductItem.shebao
          : this.insurant.shebao
          ? this.insurant.shebao
          : this.insurant.isSocialInsurance; //被保人社保
      let applicantShebao =
        this.insurant.holderRelation == "00"
          ? insurantShebao
          : this.applicant.shebao || this.applicant.isSocialInsurance; //投保人社保
      const params = {
        agentCode: "",
        cusRelationList: [
          {
            infoId: this.insurant.customerId || this.insurant.infoId, //被保险人客户id
            relationPersonId:
              this.applicant.customerId || this.applicant.infoId, //--------------投保人客户id
            relationType: this.insurant.holderRelation, //关系
            sourceId: this.applicant.customerId || this.applicant.infoId //---投保人客户id
          }
        ],
        cusmemberInfoList: [
          {
            //被保人(如果社保在选产品时候变了，以产品里面为准)
            birthday: new Date(this.insurant.birthdate),
            category: this.insurant.isoldCustomer, //新客户老客户标志
            infoId: this.insurant.customerId || this.insurant.infoId,
            name: this.insurant.name,
            profession: this.insurant.cdOccupation.occupationCode,
            sex: this.insurant.sex,
            socialMedicalInsurance: insurantShebao
          },
          {
            //投保人
            birthday: new Date(this.applicant.birthdate),
            category: this.applicant.isoldCustomer, //新客户老客户标志
            infoId: this.applicant.customerId || this.applicant.infoId,
            name: this.applicant.name,
            profession: this.applicant.cdOccupation.occupationCode,
            sex: this.applicant.sex,
            socialMedicalInsurance: applicantShebao
          }
        ],
        personId: globalConfig.isWx
          ? this.userInfo && this.userInfo.weChatAgenctDTO.infoId
          : this.userInfo && this.userInfo.user && this.userInfo.user.personId, //代理人ID
        // personId: "e1909a91046d4506a58113ab54f70bb4",
        stepFlag: "2"
      };
      //更新客户
      utils.http.post(interfaces.plan.updateCustomer, params).then(() => {
        //  console.log(res);
        this.saveOrUpdatePlan();
      });
    },
    //保存/更新计划书字段拼接
    initSaveRisk() {
      //处理主险配置
      let mainProposalProductItem = this.mainProposalProductList[0]; //主险项
      let attList = mainProposalProductItem.attList; //主险的配置项
      let mainSetting = {
        shebao: mainProposalProductItem.shebao,
        premiumDes: mainProposalProductItem.premium
      };

      attList.forEach(element => {
        switch (element.attCode) {
          case "drawMode": //领取方式
            mainSetting.drawMode = element.attValue;
            break;
          case "policyPeriod": //保险期限
            mainSetting.policyPeriod = element.attValue;
            break;
          case "payPeriod": //交费期间
            mainSetting.payPeriod = element.attValue;
            break;
          case "payMode": //缴费方式
            mainSetting.payMode = element.attValue;
            break;
        }
      });
      //处理投保人
      let applicant = JSON.parse(JSON.stringify(this.applicant));
      applicant.birthday = new Date(applicant.birthdate);
      applicant.birthdate = new Date(applicant.birthdate);
      applicant.jobLevel = applicant.cdOccupation.occupationRiskLevel;
      applicant.job = applicant.cdOccupation.occupationCode;
      applicant.customerId = applicant.infoId || applicant.customerId;

      //处理被保人
      let insurant = JSON.parse(JSON.stringify(this.insurant));
      insurant.birthday = new Date(insurant.birthdate);
      insurant.birthdate = new Date(insurant.birthdate);
      insurant.jobLevel = insurant.cdOccupation.occupationRiskLevel;
      insurant.job = insurant.cdOccupation.occupationCode;
      insurant.relationNew = insurant.holderRelation;
      insurant.customerId = insurant.infoId || insurant.customerId;
      //处理附加险种
      mainProposalProductItem.extraList = this.riskProposalProductList;
      mainProposalProductItem.extraList.forEach(item => {
        item.premiumDes = item.premium;
        item.isSelect = true;
        item.attList.forEach(el => {
          switch (el.attCode) {
            case "exceptAmt": //次免赔额
              item.exceptAmt = el.attValue;
              break;
            case "claimRate": //次免赔额
              item.claimRate = el.attValue;
              break;
            case "policyPeriod": //保险期限
              item.policyPeriod = el.attValue;
              break;
            case "payPeriod": //交费期间
              item.payPeriod = el.attValue;
              break;
            case "payMode": //缴费方式
              item.payMode = el.attValue;
              break;
          }
        });
      });
      let params = {
        proposalPlan: {
          bookId: insurant.bookId,
          holder: applicant, //投保人
          insurantProductList: [
            {
              insurant: insurant, //被保人
              insuredId: "",
              planId: "",
              planInsureDate: new Date(), //失算日期
              productList: [
                Object.assign(mainProposalProductItem, mainSetting)
              ], //主险种
              // proposalId: "e1909a91046d4506a58113ab54f70bb4",
              proposalId: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.infoId
                : this.userInfo.user.personId, //查询持有人ID
              totalPremium: "0"
            }
          ], //主险
          orgAgent: {
            agent: {
              email: "yanyi6532@qq.com",
              mobile: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.phone
                : this.userInfo.user.mobile, //代理人手机号,
              personCode: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.agentCode
                : this.userInfo.user.agentCode, //代理人工号,,
              organName: globalConfig.isWx
                ? this.userInfo.orgLdcom.name
                : this.userInfo.ldcom.name, //机构code,
              organAddress: globalConfig.isWx
                ? this.userInfo.orgLdcom.address
                : this.userInfo.ldcom.address, //机构地址
              personId: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.infoId
                : this.userInfo.user.personId, //查询持有人ID
              personName: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.name
                : this.userInfo.user.personName, //代理人姓名,
              sex: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.sex
                : this.userInfo.user.sex, //代理人性别
              telephone: globalConfig.isWx
                ? this.userInfo.weChatAgenctDTO.phone
                : this.userInfo.user.mobile //代理人手机号
            },
            channel: "iwechat1",
            deviceNo: "572032449254344960",
            loginCode: "",
            openId: "oT-9Av8nXoxn3qnlDjopfnu8VHyI",
            token: ""
          },
          planInsureDate: new Date(), //失算日期
          totalAmount: this.totalAmount,
          totalPremium: this.totalPremium
        }
      };
      return params;
    },
    //保费试算
    async calcPremium() {
      const params = this.initCalcParams();
      return new Promise(resolve => {
        utils.http.post(interfaces.plan.premiumCalc, params).then(res => {
          const data = res.trialPremiumMobile.insurantProductList[0];
          if (data.checkResult.isPass == "true") {
            //总保费
            this.$store.commit("plan/setState", {
              attr: "totalPremium",
              data: data.plan.totalPremium
            });
            //总保额
            this.$store.commit("plan/setState", {
              attr: "totalAmount",
              data: data.plan.totalAmount
            });
            resolve(true);
          } else {
            //规则错误
            var errorMsg = "";
            data.checkResult.reasonList.forEach(item => {
              errorMsg += item.info + "<br/>";
            });
            utils.ui.confirm(errorMsg);
            resolve(false);
          }
        });
      });
    },
    //保费试算参数拼接
    initCalcParams() {
      //处理主险配置
      let mainProposalProductItem = JSON.parse(
        JSON.stringify(this.mainProposalProductList[0])
      ); //主险项
      let attList = mainProposalProductItem.attList; //主险的配置项
      let mainSetting = {
        shebao: mainProposalProductItem.shebao || this.insurant.shebao,
        premiumDes: mainProposalProductItem.premium
      };
      attList.forEach(element => {
        switch (element.attCode) {
          case "drawMode": //领取方式
            mainSetting.drawMode = element.attValue;
            break;
          case "policyPeriod": //保险期限
            mainSetting.policyPeriod = element.attValue;
            break;
          case "payPeriod": //交费期间
            mainSetting.payPeriod = element.attValue;
            break;
          case "payMode": //缴费方式
            mainSetting.payMode = element.attValue;
            break;
        }
      });
      //处理投保人
      let applicant = JSON.parse(JSON.stringify(this.applicant));
      applicant.birthdate = new Date(applicant.birthdate);
      applicant.birthday = new Date(applicant.birthdate);
      applicant.jobLevel = applicant.cdOccupation.occupationRiskLevel;
      applicant.job = applicant.cdOccupation.occupationCode;

      //处理被保人
      let insurant = JSON.parse(JSON.stringify(this.insurant));
      insurant.birthdate = new Date(insurant.birthdate);
      insurant.birthday = new Date(insurant.birthdate);
      insurant.jobLevel = insurant.cdOccupation.occupationRiskLevel;
      insurant.job = insurant.cdOccupation.occupationCode;
      //处理附加险种
      mainProposalProductItem.extraList = this.riskProposalProductList;
      mainProposalProductItem.extraList.forEach(item => {
        item.premiumDes = item.premium;
        item.isSelect = true;
        item.attList.forEach(el => {
          switch (el.attCode) {
            case "exceptAmt": //次免赔额
              item.exceptAmt = el.attValue;
              break;
            case "claimRate": //次免赔额
              item.claimRate = el.attValue;
              break;
            case "policyPeriod": //保险期限
              item.policyPeriod = el.attValue;
              break;
            case "payPeriod": //交费期间
              item.payPeriod = el.attValue;
              break;
            case "payMode": //缴费方式
              item.payMode = el.attValue;
              break;
          }
        });
      });
      let params = {
        proposalPlan: {
          bookId: this.mainProposalProductList[0].bookId,
          holder: applicant, //投保人
          insurantProductList: [
            {
              insurant: insurant, //被保人
              insuredId: "",
              planId: "",
              planInsureDate: "",
              productList: [
                Object.assign(mainProposalProductItem, mainSetting)
              ], //主险种
              proposalId: "",
              totalPremium: "0"
            }
          ], //主险
          orgAgent: {
            agent: {
              email: "",
              mobile: "",
              personCode: "",
              personId: "",
              personName: "",
              sex: "",
              telephone: ""
            },
            fpInfoId: globalConfig.isWx
              ? this.userInfo.weChatAgenctDTO.infoId
              : this.userInfo.cusMember.infoId,
            channel: "iwechat1",
            deviceNo: "572032449254344960",
            loginCode: "",
            openId: "oT-9Av8nXoxn3qnlDjopfnu8VHyI",
            token: ""
          },
          totalAmount: this.totalAmount,
          totalPremium: this.totalPremium
        }
      };
      return params;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.risk-save-button {
  padding: 0 40px 20px 40px;
  .view {
    margin-right: 30px;
  }
  button {
    width: 130px;
    height: 33px;
    display: inline-block;
    border: 1px solid $color-theme;
    border-radius: 16.5px;
    background: $color-bg;
    font-size: 13px;
  }
}
</style>
