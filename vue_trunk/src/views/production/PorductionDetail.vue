<template>
  <page class="production_detail" :withAppBar="!globalConfig.isWx">
    <!-- 导航栏 -->
    <AppBar
      class="app-bar"
      :leftWidth="30"
      :rightWidth="30"
      v-if="!globalConfig.isWx"
    >
      <img
        slot="left"
        src="@/assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        {{ productionItem.alias }}
      </template>
    </AppBar>
    <!-- 主体 -->
    <AppContent class="app-content">
      <!--险种的图片-->
      <article class="product_img">
        <img :src="productionItem.picUrl" alt="" />
        <div class="product_brief">
          <span>{{ productionItem.name }}</span>
          <br />
          <span>{{ productionItem.productDes }}</span>
        </div>
      </article>
      <Insurant
        v-if="InsurantShow"
        @calcPremium="calcPremium"
        :mainSetting="mainSetting"
      ></Insurant>
      <!------------------------主险配置end------------------------------------------------->
      <!-- 附加险 -->
      <div class="additional-list" v-if="mainSetting.isAdditionalRisk">
        <h2>可选计划</h2>
        <AdditionalRisk
          :selectMain="selectMain"
          :mainSetting="mainSetting"
          @calcPremium="calcPremium"
        />
      </div>
      <!-- 按钮组 -->
      <!--详情的部分-->
      <section>
        <div class="details">
          <!--<div class="tt" style="color: blue;background: white;line-height: 40px;font-size: 16px;">产品介绍</div>-->
          <section class="header_tabs">
            <nav
              class="tab_item"
              v-for="(item, index) in productDetail"
              :key="index"
              :class="{ choosed: tabshow == item.code }"
              @click="newSwitch(item.code)"
            >
              {{ item.desc }}
              <span v-if="index + 1 != productDetail.length">|</span>
            </nav>
          </section>
          <!--产品详情-->
          <div v-show="tabshow == '1'" class="list">
            <div class="toDucument">
              <!--产品详情投不展示图-->
              <ProducImg
                v-if="ImgList.length"
                :productList="ImgList"
                :proInfo="productionItem"
                :productSecurityList="productSecurityList"
              ></ProducImg>
              <!--保障计划-->
            </div>
          </div>

          <!--公司简介-->
          <div v-show="tabshow == '2'" class="list">
            <BreifImg
              v-if="tabshow == '2'"
              :breifImg="ImgList"
              :type="'2'"
            ></BreifImg>
          </div>
          <!--理赔流程-->
          <div v-show="tabshow == '3'" class="list">
            <BreifImg
              v-if="tabshow == '3'"
              :breifImg="ImgList"
              :type="'3'"
            ></BreifImg>
          </div>
        </div>
      </section>
    </AppContent>
    <div class="TrialResult">
      <div :class="canjump ? 'no-padding' : 'no-padding-close'">
        <span class="fontC"> {{ totalPremium }}元 </span>
        <button
          @click="goInform()"
          :disabled="!canjump"
          style="font-size: 18px;"
        >
          制作规划书
        </button>
      </div>
    </div>
  </page>
</template>

<script>
import Insurant from "@/components/production/Insurant";
import BreifImg from "@/components/production/BreifImg";
import AdditionalRisk from "@/components/production/AdditionalRisk";
import ProducImg from "@/components/production/ProductImg";
import { mapState } from "vuex";
export default {
  components: {
    AdditionalRisk,
    Insurant,
    ProducImg,
    BreifImg
  },
  data() {
    return {
      //产品介绍的头部栏
      productDetail: [
        {
          desc: "产品详情",
          code: "1"
        },
        {
          desc: "公司简介",
          code: "2"
        },
        {
          desc: "理赔流程",
          code: "3"
        }
      ],
      //主险种配置
      mainSetting: {
        //领取方式
        drawMode: "",
        //领取方式列表
        drawModeList: [],
        //保费算保额需要传输
        premiumDes: "0",
        //被选择当保险期限
        policyPeriod: "",
        //保险期限列表
        policyPeriodList: [],

        //被选择的交费期间
        payPeriod: "",
        //交费期间列表
        payPeriodList: [],

        //缴费方式
        payMode: "",
        //缴费方式列表
        payModeList: [],

        //年金开始领取年龄
        drawStartAge: "",
        //年金开始领取年龄列表
        drawStartAgeList: [],

        //年金领取频率
        drawFreq: "",
        //年金领取频率列表
        drawFreqList: [],

        //保障计划/责任类型
        rank: "",
        //保障计划/责任类型列表
        rankList: [],
        isAmount: false, //是否有基本保险金额配置
        //基本保险金额
        amount: "",

        //保费
        premium: 0,
        //是否有保费配置
        isPremium: false,

        //责任列表
        liabList: [],
        //是否有续保配置
        isXubao: false,
        //续保
        xubao: "Y",
        //是否有社保配置
        isShebao: false,
        //社保
        shebao: "Y",
        //是否有被保类型配置
        isGrade: false,
        //被选择当被保人类型
        grade: "0",
        subFlag: "-2", //续保标示
        //被保人类型码表
        gradeList: [{ code: "0", text: "标准" }, { code: "1", text: "优选" }],
        calculate_type: "", //保费算保额或保额算保费的标识
        birthdayShow: "", //生日的提示语
        isShowJob: false, //职业
        isAdditionalRisk: false //是否有附件险
      },
      isShow: true, //爱健康的产品的特殊操作
      totalPremium: "0.00",
      InsurantShow: false,
      tabshow: "1", //默认选项是产品详情的code
      //主险
      selectMain: {},
      canjump: false, //能否跳转
      ImgList: [], //产品详情
      productSecurityList: [], //产品的详情
      proInfo: [], //保障规划内容
      comImgList: [], //公司简介图片
      payImg: [] //理赔流程图片
    };
  },
  computed: {
    ...mapState({
      mainProposalProductItem: state =>
        state.production.mainProposalProductItem, //主险的
      selectAllRisk: state => state.production.selectAllRisk, //附加险试算报文
      insurant: state => state.production.insurant, //被保人对象
      productionItem: state => state.production.productItem, //选中的产品内容
      applicant: state => state.production.applicant, //投保人
      userInfo: state => state.user.userInfo //用户信息
    })
  },
  watch: {},
  created() {
    this.getProductDetails();
  },
  methods: {
    // 返回
    goBack() {
      this.back();
    },
    getRisk() {
      return JSON.parse(JSON.stringify(this.selectAllRisk));
    },
    //规划书跳转
    goInform() {
      this.go("planList");
    },
    //选择主险初始化主险配置
    initMainSetting(item) {
      item.attList.forEach(element => {
        switch (element.attCode) {
          case "drawMode": //领取方式
            this.mainSetting.drawModeList = element.attValueList;
            //如果additional节点没有默认值，则设第一个
            this.mainSetting.drawMode = element.attValueList[0].code;
            break;
          case "policyPeriod": //保险期限
            this.mainSetting.policyPeriodList = element.attValueList;
            break;
          case "payPeriod": //交费期间
            this.mainSetting.payPeriodList = element.attValueList;
            break;
          case "payMode": //缴费方式
            this.mainSetting.payModeList = element.attValueList;
            break;
          case "drawStartAge": //年金开始领取年龄
            this.mainSetting.drawStartAgeList = element.attValueList;
            break;
          case "drawFreq": //年金领取频率
            this.mainSetting.drawFreqList = element.attValueList;
            break;
          case "rank": //责任类型
            this.mainSetting.rankList = element.attValueList;
            break;
          case "amount": //基本保险金额
            if (
              item.liabList.length == 0 ||
              this.productionItem.productCode == "ATCB03"
            ) {
              //无保险责任列表才会有基本保险额
              this.mainSetting.isAmount = true;
              this.mainSetting.amount = Number(item.baseAmount);
            }
            break;
          case "premium": //保费
            this.mainSetting.isPremium = true;
            this.mainSetting.premium = Number(item.baseAmount);
            break;
        }
      });
      //获取责任配置list
      //alert("66");
      this.mainSetting.liabList = item.liabList;

      //是否有社保配置
      this.mainSetting.isShebao =
        this.productionItem.productCode == "ATRB01" ? true : false;
      //设置社保默认值
      this.mainSetting.shebao = this.insurant.shebao == "1" ? "Y" : "N";

      //是否有被保人类型配置
      this.mainSetting.isGrade =
        this.productionItem.productCode == "APWB01" ? true : false;
      //是否有附件险
      this.mainSetting.isAdditionalRisk = item.extraList.length ? true : false;
      //设置默认值
      item.additional.forEach(element => {
        switch (element.key) {
          case "drawMode": //领取方式
            this.mainSetting.drawMode = element.value.split(",")[0];
            break;
          case "policyPeriod": //保险期限
            this.mainSetting.policyPeriod = element.value.split(",")[0];
            break;
          case "payPeriod": //交费期间
            this.mainSetting.payPeriod = element.value.split(",")[0];
            break;
          case "payMode": //缴费方式
            this.mainSetting.payMode = element.value.split(",")[0];
            break;
          case "drawStartAge": //年金开始领取年龄
            this.mainSetting.drawStartAge = element.value.split(",")[0];
            break;
          case "drawFreq": //年金领取频率
            this.mainSetting.drawFreq = element.value.split(",")[0];
            break;
          case "rank_extra": //保障计划
            this.mainSetting.rank = element.value.split(",")[0];
            break;
          case "protectionPlan": //责任类型
            this.mainSetting.rank = "duty_" + element.value.split(",")[0];
            break;
          case "QXFL": //自动续保
            this.mainSetting.isXubao =
              element.value === "duanqi" ? true : false;
            this.mainSetting.xubao = "Y";
            break;
          case "birthdayShow": //出生日期
            this.mainSetting.birthdayShow = element.value;
            break;
          case "profession": //职业
            this.mainSetting.isShowJob = true;
            break;
          case "calculate_type": //保费算保额或保额算保费的标识
            this.mainSetting.calculate_type = element.value;
            break;
        }
      });
      this.InsurantShow = true;
    },
    //获取产品的详情
    getProductDetails() {
      const params = {
        productCode: this.productionItem.productCode,
        infoId: this.userInfo.weChatAgenctDTO.infoId, //规划师工号(Y)
        channelId: this.userInfo.weChatAgenctDTO.channelId, //渠道(Y)
        orgCode: this.userInfo.orgLdcom.comcode //管理机构(Y)
      };
      // http
      utils.http
        .post(interfaces.production.productDetail, params)
        .then(data => {
          //成功获取数据
          console.dir(data);
          this.selectMain = data.productDefList[0];
          this.initMainSetting(this.selectMain);
          //产品详情
          this.ImgList = this.selectMain.documentFileList;
        });
    },
    //保费试算
    calcPremium() {
      let params = this.initCalcParams();
      //保费试算接口
      utils.http.post(interfaces.plan.premiumCalc, params).then(res => {
        const data = res.trialPremiumMobile.insurantProductList[0];
        const plan = data.plan;
        if (data.checkResult.isPass == "true") {
          //通过
          console.info(plan);
          this.canjump = true;
          this.premiumGetFun(res.trialPremiumMobile.insurantProductList);
        } else {
          this.premiumGetFun(res.trialPremiumMobile.insurantProductList);
          //规则错误
          var errorMsg = "";
          this.canjump = false;
          data.checkResult.reasonList.forEach((item, index) => {
            errorMsg += ++index + ". " + item.info + "<br/>";
          });
          if (errorMsg.length >= 460) {
            errorMsg = errorMsg.substr(0, 460) + "...";
          }
          utils.ui.confirm(errorMsg);
        }
      });
    },
    //保费试算的结果处理
    premiumGetFun(result) {
      console.log(result);
      this.productSecurityList = [];
      result.map(ele => {
        if (ele.plan != undefined) {
          ele.plan.productList.map(dataT => {
            this.mainSetting.amount = Number(dataT.amount);
            if (this.mainSetting.amount) {
              this.mainSetting.isAmount = true;
            }
            //获取保障规划
            if (dataT.map != undefined) {
              if (dataT.map.value != undefined) {
                if (dataT.map.value.length > 0) {
                  dataT.map.value.map(val => {
                    this.productSecurityList.push(val);
                  });
                }
              }
            }
            if (dataT.extraList.length) {
              dataT.extraList.map(ele => {
                if (ele.map != undefined) {
                  if (ele.map.value != undefined) {
                    if (ele.map.value.length > 0) {
                      ele.map.value.map(val => {
                        this.productSecurityList.push(val);
                      });
                    }
                  }
                }
              });
            }
          });
          this.totalPremium = this.transToThousands(
            parseFloat(ele.plan.totalPremium).toFixed(2)
          );
        }
      });
    },
    //详情的部分的切换
    newSwitch(code) {
      this.tabshow = code;
    },
    // 千分位转换：3333 => 3,333
    transToThousands(number) {
      // number转字符串
      if (typeof number === "number") {
        number += "";
      }
      const regExp = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
      const thousands = number.replace(regExp, "$1,");
      return thousands;
    },
    //保费试算参数拼接
    initCalcParams() {
      let mainProposalProductItem = this.mainProposalProductItem;
      //let attList = mainProposalProductItem.attList; //主险的配置项
      mainProposalProductItem.premiumDes = mainProposalProductItem.premium;
      //处理投保人
      let applicant = JSON.parse(JSON.stringify(this.applicant));
      applicant.birthday = utils.format.strToDate(applicant.birthday);
      applicant.birthdate = applicant.birthday;
      //处理被保人
      let insurant = JSON.parse(JSON.stringify(this.insurant));
      insurant.birthday = utils.format.strToDate(insurant.birthday);
      insurant.birthdate = insurant.birthday;
      insurant.jobLevel = insurant.cdOccupation.occupationRiskLevel;
      insurant.job = insurant.cdOccupation.occupationCode;
      //处理附加险种
      mainProposalProductItem.extraList =
        this.productionItem.productCode == "ATCB03" && !this.isShow
          ? []
          : this.getRisk();
      let params = {
        proposalPlan: {
          bookId: "",
          holder: applicant, //投保人
          insurantProductList: [
            {
              insurant: insurant, //被保人
              insuredId: "",
              planId: "",
              planInsureDate: "",
              productList: [mainProposalProductItem], //主险种
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
            channel: "",
            deviceNo: "",
            loginCode: "",
            openId: "",
            token: ""
          },
          totalAmount: 0,
          totalPremium: 0
        }
      };
      return params;
    }
  },
  destroyed() {
    //清空mainProposalProductItem的缓存
    //被保人
    this.$store.commit("production/setState", {
      attr: "insurant",
      data: Object.assign({
        sex: "0",
        birthday: "",
        birthdate: "",
        //职业信息
        cdOccupation: {
          occupationCode: "",
          occupationLevel: "",
          occupationName: "",
          occupationRiskLevel: "",
          occupationRiskMetical: ""
        }
      })
    });
    this.$store.commit("production/setState", {
      attr: "mainProposalProductItem",
      data: {
        amount: "",
        attList: [],
        bookId: "",
        chargeType: "",
        chargeWay: "",
        coverageType: "",
        createTime: "",
        createdBy: "",
        description: "",
        drawFreq: "",
        drawStartAge: "",
        extraList: [], //附加险种
        grade: "",
        id: "",
        isMaster: "",
        lastUpdatedBy: "",
        liabList: [],
        payMode: "",
        payPeriod: "",
        payintv: "",
        policyPeriod: "",
        premium: "",
        productCode: "",
        productId: "",
        productName: "",
        productShortName: "",
        productType: "",
        qxFlag: "",
        relationType: "",
        shebao: "",
        sourceId: "",
        subflag: "",
        updateTime: " ",
        userDefine1: "",
        userDefine2: ""
      }
    });
    this.$store.commit("production/setState", {
      attr: "applicant",
      data: {
        sex: "0",
        birthday: "",
        birthdate: "",
        //职业信息
        cdOccupation: {
          occupationCode: "",
          occupationLevel: "",
          occupationName: "",
          occupationRiskLevel: "",
          occupationRiskMetical: ""
        }
      }
    });
    this.$store.commit("production/setState", {
      attr: "selectAllRisk",
      data: []
    });
    this.$store.commit("production/setState", {
      attr: "proIframeTittle",
      data: ""
    });
    this.$store.commit("production/setState", {
      attr: "iframeContent",
      data: {
        tittle: "",
        url: ""
      }
    });
    this.$store.commit("production/setState", {
      attr: "selectAllRisk",
      data: []
    });
    this.$store.commit("plan/setState", {
      attr: "liablist",
      data: []
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.$refs.jobSelector && this.$refs.jobSelector.showSelector) {
      // 有选择器为打开状态，先关闭
      this.$refs.jobSelector.close();
      next(false);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" scoped>
.app-bar {
  .icon {
    height: auto;
    &.icon-back {
      width: 11.5px;
    }
  }
}
.app-content {
  .product_img {
    box-shadow: 0 0 4px 1px #e5e9f1;
    border-radius: 0 0 5px 5px;
    position: relative;
    img {
      width: 100%;
      height: 210px;
    }
    .product_brief {
      color: white;
      position: absolute;
      background: #000;
      opacity: 0.5;
      bottom: 0px;
      width: 100%;
      padding: 10px;
      text-align: center;
      span {
        font-size: 16px;
      }
      span:nth-child(3n) {
        font-size: 13px;
      }
    }
  }
  .details {
    margin-top: 10px;
    background: white;
    .header_tabs {
      height: 35px;
      margin-top: 15px;
      .tab_item {
        @include lineheight-height(37px);
        border-bottom: 3px solid gainsboro;
        display: inline-block;
        text-align: center;
        background-color: white;
        width: 33.33%;
        margin-top: 8px;
        span {
          color: #cccccc;
          float: right;
        }
      }
      .choosed {
        border-bottom: 3px solid #ffcc00;
      }
    }
  }
  /deep/ .risk-setting-radio .top {
    h2 {
      max-width: 102px;
      font-size: 14px;
      padding-left: 12px;
    }
  }
  /deep/.risk-setting-select {
    padding: 0px;
    min-height: 43px;
    line-height: 43px;
    h2 {
      max-width: 102px;
      font-size: 14px;
      padding-left: 12px;
    }
    .item {
      span {
        margin-top: 10px;
      }
    }
  }
}
.tt {
  margin-left: 3%;
  color: #c99f63;
  margin-top: 8px;
  line-height: 30px;
  font-size: 16px;
  font-weight: normal;
}
.additional-list {
  background: $color-bg;
  margin: 0 10px;
  padding: 14px 20px;
  box-shadow: 0 0 4px 1px #e5e9f1;
  border-radius: 0 0 5px 5px;
  h2 {
    font-size: 15px;
    color: #333333;
    font-weight: normal;
    border-bottom: 1px solid #e5e9f1;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
}
.TrialResult {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 54px;
  background: #fff;
  width: 100%;
  z-index: 2;
  .no-padding {
    text-align: center;
    span {
      font-size: 16px;
      line-height: 54px;
    }
    button {
      float: right;
      height: 50px;
      width: 40%;
      color: white;
      padding: 0px 10px;
      outline: none;
      border: none;
      background: #d24a32;
    }
  }
  .no-padding-close {
    width: 100%;
    padding: 0;
    padding-left: 15px;
    height: 54px;
    text-align: center;
    span {
      font-size: 16px;
      line-height: 54px;
    }
    button {
      float: right;
      height: 50px;
      width: 40%;
      color: white;
      background: #dadada;
      padding: 0px 10px;
      outline: none;
      border: none;
    }
  }
}
</style>
