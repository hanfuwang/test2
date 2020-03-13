<template>
  <page class="demo-app" :withAppBar="!globalConfig.isWx">
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="$router.go(-1)"
      />
      <template slot="center">
        保单详情
      </template>
    </AppBar>
    <AppContent class="app-content details">
      <!-- 保单信息 -->
      <div>
        <p @click="information = !information" class="bdinformation">
          保单信息
          <img
            v-if="information == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="information == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="information">
          <div class="isShow">
            <div>
              <span>保单号</span><span class="right">{{ policyCode }}</span>
            </div>
            <div>
              <span>保单状态</span>
              <span class="right">{{ policyDTO.status }}</span>
            </div>
            <div v-if="policyDTO.status == '失效'">
              <span>保单失效原因</span>
              <span class="right">{{ policyDTO.statusReson }}</span>
            </div>
            <div>
              <span>回执签收日期</span>
              <span class="right">{{ policyDTO.customgetpoldate }}</span>
            </div>
            <div>
              <span>保费</span>
              <span class="right" v-if="policyDTO.totalPremium != ''">
                {{ policyDTO.totalPremium | global_addCommas }}元
              </span>
            </div>
            <div v-if="policyDTO.receivedMethod">
              <span>保单接收方式</span>
              <span class="right">{{
                policyDTO.receivedMethod == "N"
                  ? "电子+纸质"
                  : policyCode.receivedMethod == "Y"
                  ? "电子"
                  : ""
              }}</span>
            </div>
            <div v-for="item in riskDtoList" :key="item.chargeType">
              <span>保险期间</span>
              <span class="right">{{
                getRiskSelecbycode(item.chargeType)
              }}</span>
            </div>
            <div>
              <span>寿险规划师</span>
              <span class="right">
                {{ policyDTO.salesCode }}/{{ policyDTO.salesName }}
              </span>
            </div>
            <div>
              <span>第二寿险规划师</span
              ><span class="right">{{ policyDTO.twoSalesName }}</span>
            </div>
            <div>
              <span>是否孤儿单</span>
              <span class="right">
                {{ policyDTO.guErOrderFlag == "0" ? "否" : "是" }}
              </span>
            </div>
            <div>
              <span>签属日期</span>
              <span class="right">{{ policyDTO.effectDate }}</span>
            </div>
            <div>
              <span>原规划师</span>
              <span class="right">{{ policyDTO.prevSalesName }}</span>
            </div>
            <div>
              <span>已接收天数</span>
              <span class="right" v-if="policyDTO.guErOrderFlag == 1">{{
                policyDTO.guErOrderFlag
              }}</span>
            </div>
            <div v-if="policyDTO.anencyName != ''">
              <span>中介人员姓名</span>
              <span class="right">{{ policyDTO.anencyName }}</span>
            </div>
            <div v-if="policyDTO.agencyComCodeName != ''">
              <span>所属中介机构名称</span>
              <span class="right">{{ policyDTO.agencyComCodeName }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 投保人信息 -->
      <div>
        <p @click="insure = !insure" class="bdinformation">
          投保人信息
          <img
            v-if="insure == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="insure == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="insure" class="isShow">
          <div>
            <span>姓名</span><span class="right">{{ policyHolder.name }}</span>
          </div>
          <div>
            <span>性别</span
            ><span class="right">{{
              sexSelectList[policyHolder.sex].desc
            }}</span>
          </div>
          <div>
            <span>生日</span
            ><span class="right">{{ policyHolder.birthday }}</span>
          </div>
          <div>
            <span>证件类型</span>
            <span class="right">
              {{ getcardTypebycode(policyHolder.certificateType) }}
            </span>
          </div>
          <div>
            <span>证件号码</span
            ><span class="right">{{
              policyHolder.certificateNo | global_bankCard
            }}</span>
          </div>
          <div>
            <span>证件有效期</span
            ><span class="right">{{
              policyHolder.validEndDate | global_dateFormat
            }}</span>
          </div>
          <div>
            <span>国籍</span>
            <span class="right">
              {{ getnationality(policyHolder.nationality) }}
              <!-- {{ policyHolder.nationality }} -->
            </span>
          </div>
          <div>
            <span>手机号码</span
            ><span class="right">{{
              policyHolder.moblie | global_mobile
            }}</span>
          </div>
          <div>
            <span>职业</span
            ><span class="right">{{ policyHolder.profession }}</span>
          </div>
          <div>
            <span>联系地址</span
            ><span class="right"
              >{{ policyHolder.province }}&nbsp;{{ policyHolder.city }}&nbsp;{{
                policyHolder.county
              }}&nbsp;{{ policyHolder.detailAddress | global_address }}</span
            >
          </div>
          <div>
            <span>电子邮箱</span
            ><span class="right">{{ policyHolder.email }}</span>
          </div>
          <div v-for="item in policyInsureds" :key="item.holderRelation">
            <span>与被保险人关系</span>
            <span class="right">{{
              getrelationship(item.holderRelation)
            }}</span>
          </div>
        </div>
      </div>
      <!-- 被保人信息 -->
      <div v-for="item in policyInsureds" :key="item.name">
        <p @click="isrecognizee = !isrecognizee" class="bdinformation">
          被保人信息
          <img
            v-if="isrecognizee == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="isrecognizee == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="item.holderRelation != ''">
          <p v-if="isrecognizee" class="rgz">
            被保人信息&nbsp;:&nbsp;<span>{{
              getrelationship(item.holderRelation)
            }}</span>
          </p>
        </div>
        <div v-if="item.holderRelation != '00'">
          <div v-if="isrecognizee" class="isShow">
            <div>
              <span>姓名</span><span class="right">{{ item.name }}</span>
            </div>
            <div>
              <span>性别</span
              ><span class="right">{{ sexSelectList[item.sex].desc }}</span>
            </div>
            <div>
              <span>生日</span><span class="right">{{ item.birthday }}</span>
            </div>
            <div>
              <span>证件类型</span>
              <span class="right">
                {{ getcardTypebycode(item.certificateType) }}
              </span>
            </div>
            <div>
              <span>证件号码</span
              ><span class="right">{{
                item.certificateNo | global_bankCard
              }}</span>
            </div>
            <div>
              <span>证件有效期</span
              ><span class="right">{{
                item.validEndDate | global_dateFormat
              }}</span>
            </div>
            <div>
              <span>国籍</span
              ><span class="right">{{ getnationality(item.nationality) }}</span>
            </div>
            <div>
              <span>手机号码</span
              ><span class="right">{{ item.moblie | global_mobile }}</span>
            </div>
            <div>
              <span>职业</span><span class="right">{{ item.profession }}</span>
            </div>
            <div>
              <span>联系地址</span
              ><span class="right"
                >{{ item.province }}&nbsp;{{ item.city }}&nbsp;{{
                  item.county
                }}&nbsp;{{ item.detailAddress | global_address }}</span
              >
            </div>
            <div>
              <span>电子邮箱</span><span class="right">{{ item.email }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--身故受益人信息 -->
      <div v-for="item in policyBenficiaryDtoList" :key="item.certificateNo">
        <p @click="isfavoree = !isfavoree" class="bdinformation">
          身故受益人信息
          <img
            v-if="isfavoree == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="isfavoree == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="item.isLegal == 1">
          <p v-if="isfavoree" class="rgz">
            身故受益人&nbsp;:&nbsp;法定
          </p>
        </div>
        <div v-if="item.isLegal != 1">
          <div v-if="isfavoree" class="isShow">
            <div>
              <span>与被保险人关系</span
              ><span class="right">{{ item.insuredRelation }}</span>
            </div>
            <div>
              <span>姓名</span><span class="right">{{ item.name }}</span>
            </div>
            <div>
              <span>性别</span
              ><span class="right">{{ sexSelectList[item.sex].desc }}</span>
            </div>
            <div>
              <span>出身日期</span
              ><span class="right">{{ item.birthday }}</span>
            </div>
            <div>
              <span>证件类型</span>
              <span class="right">
                {{ getcardTypebycode(item.certificateType) }}
              </span>
            </div>
            <div>
              <span>证件号码</span
              ><span class="right">{{
                item.certificateNo | global_bankCard
              }}</span>
            </div>
            <div>
              <span>证件有效期</span
              ><span class="right">{{
                item.validEndDate | global_dateFormat
              }}</span>
            </div>
            <div>
              <span>国籍</span
              ><span class="right">{{ getnationality(item.nationality) }}</span>
            </div>
            <div>
              <span>手机号码</span><span class="right">{{ item.moblie }}</span>
            </div>
            <div>
              <span>职业</span><span class="right">{{ item.profession }}</span>
            </div>
            <div>
              <span>收益顺序</span
              ><span class="right">{{ item.benefitOrder }}</span>
            </div>
            <div>
              <span>收益比例</span
              ><span class="right">{{ item.benefitRatio }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 险种信息 -->
      <div v-for="(item, index) in riskDtoList" :key="index">
        <p @click="ismessage = !ismessage" class="bdinformation">
          险种信息
          <img
            v-if="ismessage == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="ismessage == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="ismessage" class="isShow">
          <div>
            <span>{{ item.riskName }}</span
            ><span class="right"></span>
          </div>
          <div>
            <span>生效日期</span><span class="right">{{ item.cvalidate }}</span>
          </div>
          <div>
            <span>保险期间</span
            ><span class="right">
              {{ getRiskSelecbycode(item.chargeType) }}</span
            >
          </div>
          <div>
            <span>交费方式</span
            ><span class="right">{{ getpaybycode(item.chargeWay) }}</span>
          </div>
          <div>
            <span>
              交费期间
            </span>
            <span class="right" v-if="item.chargePeriod != ''"
              >{{ item.chargePeriod }}年期
            </span>
          </div>
          <div>
            <span>基本保险金额/份</span
            ><span class="right" v-if="item.amount != ''"
              >{{ item.amount | global_addCommas }}元</span
            >
          </div>
          <div>
            <span>保费</span>
            <span class="right">{{ item.premium | global_addCommas }}元</span>
          </div>
          <div v-if="item.drawStartAge != ''">
            <span>年金开始领取年龄</span>
            <span class="right">{{ item.drawStartAge }}岁</span>
          </div>
          <div v-if="item.drawFreq != ''">
            <span>年金领取频率</span>
            <span class="right">
              {{
                item.drawFreq == "12"
                  ? "按年领"
                  : item.drawFreq == "1"
                  ? "按月领"
                  : ""
              }}
            </span>
          </div>
          <div v-if="item.exceptAmt != ''">
            <span>次免赔额</span>
            <span class="right">{{ item.exceptAmt }}元</span>
          </div>
          <div v-if="item.claimRate != ''">
            <span>赔付比例</span>
            <span class="right">{{ item.claimRate }}%</span>
          </div>
          <div>
            <span>险种状态</span><span class="right">{{ item.subflag }}</span>
          </div>
          <div v-if="item.subflag == '终止'">
            <span>险种终止原因</span>
            <span class="right"> {{ item.autoChk }}} </span>
          </div>
          <div v-if="item.subflag == '失效'">
            <span>险种终止原因</span>
            <span class="right"> {{ item.autoChk }}</span>
          </div>
          <section
            @click="duty = !duty"
            v-for="liab in item.liabList"
            :key="liab"
          >
            <p class="duty">
              <span>责任信息</span>
              <span>
                <img
                  v-if="duty == false"
                  src="../../assets/imgs/policy/icon/icon_up.png"
                />
                <img
                  v-if="duty == true"
                  src="../../assets/imgs/policy/icon/icon_down.png"
                />
              </span>
            </p>
            <div v-if="duty == true" class="pay">
              <span>{{ liab.liabName }}</span>
              <span>{{ liab.amount }}元</span>
            </div>
          </section>
        </div>
      </div>
      <!-- 支付信息 -->
      <div v-for="play in payList" :key="play.ip">
        <p @click="ispay = !ispay" class="bdinformation">
          支付信息
          <img
            v-if="ispay == false"
            src="../../assets/imgs/policy/icon/icon_up.png"
          />
          <img
            v-if="ispay == true"
            src="../../assets/imgs/policy/icon/icon_down.png"
          />
        </p>
        <div v-if="ispay" class="isShow item">
          <div @click="isShowModal">
            <span>{{ play.ip }}</span>
            <span>{{ play.chargeType }}</span>
            <span v-if="play.addCommas != ''">
              {{ play.amount | global_addCommas }}元
            </span>
          </div>
        </div>

        <!-- 模态框 -->
        <Modal
          :show="isShow"
          :clickModalToClose="clickModalToClose"
          :backgroundColor="backgroundColor"
        >
          <div class="modal" @click="closeModal">
            <div class="inner" @click.stop="">
              <div class="close">
                <p class="right" @click="closeModal">×</p>
              </div>
              <p>
                <span>时间&nbsp;:</span><span>{{ play.ip }}</span>
              </p>
              <p>
                <span>项目&nbsp;:</span><span>{{ play.chargeType }}</span>
              </p>
              <p>
                <span>金额&nbsp;:</span>
                <span v-if="play.addCommas != ''">
                  {{ play.amount | global_addCommas }}元
                </span>
              </p>
              <p>
                <span>银行&nbsp;:</span><span>{{ play.accountName }}</span>
              </p>
              <p>
                <span>卡号&nbsp;:</span><span>{{ play.accountCode }}</span>
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </AppContent>
  </page>
</template>

<script>
import Modal from "@/components/common/ui/Modal";
export default {
  name: "particulars",
  components: { Modal },
  data() {
    return {
      information: false, //保单详情
      insure: false, //投保人详情
      isrecognizee: false, //被保人信息
      isfavoree: false, //身故受益人
      ismessage: false, //险种信息
      ispay: false, //支付信息
      duty: false,
      payList: {}, //支付信息
      riskDtoList: [], //险种信息
      policyDTO: [], //保单信息
      policyHolder: [], //投保人信息
      policyInsureds: {}, //被保人信息
      policyBenficiaryDtoList: [], //身故受益人
      policyCode: "",
      sexSelectList: [], //性别码表
      payTypeList: [], //交费方式码表
      certificateTypeList: [], //证件类型码表
      nationalityList: [], //国籍码表
      RiskSelectList: [], //保险期间码表
      relationship: [], //与被保险人的关系码表
      //模态框
      isShow: false, //是否关闭模态框
      // 点击模态层关闭confirm框
      clickModalToClose: false,
      // 背景色
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    };
  },
  created() {
    this.payList = this.$route.params.payList;
    this.riskDtoList = this.$route.params.riskDtoList;
    this.policyDTO = this.$route.params.policyDTO;
    this.policyHolder = this.$route.params.policyHolder;
    this.policyInsureds = this.$route.params.policyInsureds;
    this.policyBenficiaryDtoList = this.$route.params.policyBenficiaryDtoList;
    this.policyCode = this.$route.params.policyCode;
    this.initCodeList(); //初始化码表
  },
  methods: {
    //初始化码表
    async initCodeList() {
      //交费方式
      this.payTypeList = await utils.code.getCode("premium_frequency");
      //国籍
      this.nationalityList = await utils.code.getCode("nationality");
      // 证件类型
      this.certificateTypeList = await utils.code.getCode(
        "app-member-certificatetype"
      );
      //性别码表
      let sexSelectList = await utils.code.getCode("sys_user_sex");
      this.sexSelectList = sexSelectList.filter(item => {
        return item.code != "2";
      });
      //保险期间
      this.RiskSelectList = await utils.code.getCode("Risk_Duration");

      //与被保险人关系
      this.relationship = await utils.code.getCode("app-member-relationship");
    },
    getrelationship(code) {
      return this.relationship.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    getnationality(code) {
      return this.nationalityList.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    getRiskSelecbycode(code) {
      return this.RiskSelectList.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    getpaybycode(code) {
      return this.payTypeList.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    getcardTypebycode(code) {
      return this.certificateTypeList.filter(item => {
        return item.code == code;
      })[0].desc;
    },
    //模态框
    isShowModal() {
      this.isShow = true;
      this.clickModalToClose = true;
    },
    closeModal() {
      this.isShow = false;
      this.clickModalToClose = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-bar {
  border-bottom: 1px solid #cccccc;
  .icon {
    height: auto;
    &.icon-back {
      width: 11.5px;
    }
    &.icon-search {
      width: 20px;
    }
  }
}
.details {
  padding: 0 20px;
  font-family: HYQiHei-DES;
  color: #333333;
  letter-spacing: 0;
  .bdinformation {
    width: 100%;
    height: 37px;
    margin-top: 10px;
    line-height: 37px;
    padding-left: 16px;
    background: #f3f3f3;
    font-size: 15px;
    position: relative;
    img {
      width: 10px;
      height: 4px;
      position: absolute;
      top: 15px;
      right: 10px;
    }
  }
  .pay {
    width: 100%;
    height: 50px;
    display: flex;
    span {
      flex: 1;
    }
  }
  .duty {
    padding-left: 16px;
    height: 40px;
    width: 100%;
    line-height: 40px;
    img {
      width: 10px;
      height: 4px;
    }
    :last-child {
      float: right;
    }
    :first-child {
      float: left;
    }
  }
  .rgz {
    font-size: 14px;
    letter-spacing: -0.26px;
    padding-left: 16px;
    height: 30px;
    line-height: 35px;
  }
  .isShow {
    font-size: 14px;
    div {
      padding-left: 16px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      border-bottom: 1px solid #e7e7e7;
      .right {
        font-size: 13px;
        color: #999999;
        letter-spacing: 0;
        text-align: right;
        float: right;
      }
    }
  }
  .item {
    div {
      display: flex;
      span {
        flex: 1;
      }
    }
  }
}
.modal {
  width: 100%;
  height: 100%;
  .inner {
    width: 300px;
    height: 150px;
    border-radius: 10px;
    background: white;
    position: absolute;
    top: 200px;
    left: 40px;
    p {
      font-size: 14px;
      line-height: 20px;
      span {
        padding-left: 10px;
      }
    }
    .close {
      width: 100%;
      height: 30px;
      .right {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 1px solid #333333;
        font-size: 25px;
        color: #645757;
        font-weight: 100;
        text-align: center;
      }
    }
  }
}
</style>
