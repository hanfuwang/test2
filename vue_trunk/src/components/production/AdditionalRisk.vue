<template>
  <section class="additional-risk">
    <div v-for="(item, index) in allRiskList" :key="index">
      <div @click="handleSelectRisk(index)" class="cont">
        <span>
          <img
            v-if="item.isSelect"
            src="@/assets/imgs/common/icon/icon_selected_yes.png"
            alt=""
            class="icon_risk"
          />
          <img
            v-if="!item.isSelect"
            src="@/assets/imgs/common/icon/icon_selected_no.png"
            alt=""
            class="icon_risk"
          />
        </span>
        <span class="desc">{{ item.productName }}</span>
        <span class="square">
          <img
            v-if="item.isSelect"
            src="@/assets/imgs/common/icon/icon_pull_down.png"
            alt=""
            class="icon_risk"
          />
          <img
            v-if="!item.isSelect"
            src="@/assets/imgs/common/icon/icon_pull_up.png"
            alt=""
            class="icon_risk"
          />
        </span>
      </div>

      <!--附加险按钮配置 -->
      <div v-show="item.isSelect">
        <!-- 配置选项-->
        <!--配置选项---------- 是否有社保-->
        <div v-if="item.productCode == 'ATRR03'">
          <FormRadio
            v-model="item.shebao"
            :selectList="yesNoList"
            label="是否有社保"
            @input="updateInsurantSocial(item.shebao, item.productCode)"
          ></FormRadio>
        </div>
        <!--配置选项---------- 职业-->
        <FormSelector
          v-if="item.profession"
          :selectData.sync="insurant.cdOccupation"
          type="job"
          label="职业"
          placeholder="请选择职业"
          ref="jobSelector"
          :rules="rules.job"
        ></FormSelector>
        <FormInput
          v-if="item.isHuoMian == '1'"
          label="基本保险金额"
          disabled
          rightLabel="见条款"
        />
        <!--基本保额 爱安享 B -->
        <FormAmount
          v-if="item.productCode == 'ATRR03'"
          label="基本保险金额"
          v-model="item.amount"
          :disabled="item.productCode == 'ATRR03'"
          rightLabel="元"
        />
        <content v-for="(etl, index) in item.attList" :key="index">
          <div>
            <!--基本保额 爱安康  爱倍至 -->
            <FormAmount
              v-if="
                etl.attCode == 'amount' &&
                  (item.productCode == 'ATCR03' || item.productCode == 'ATCR04')
              "
              :disabled="
                item.productCode == 'ATCR03' || item.productCode == 'ATCR04'
              "
              :label="etl.attName"
              v-model="etl.attValue"
              rightLabel="元"
            />
            <!--基本保额  -->
            <FormAmount
              v-if="
                etl.attCode == 'amount' &&
                  (item.productCode != 'ATCR03' &&
                    item.productCode != 'ATCR04' &&
                    item.productCode != 'ATCR01' &&
                    item.productCode != 'DTCR02')
              "
              :label="etl.attName"
              v-model="etl.attValue"
              rightLabel="元"
              @iptBlur="dealRisk"
            />
          </div>
          <!--附加险按钮配置 -->
          <RiskSettingSelect
            :label="etl.attName"
            :list="etl.attValueList"
            :selectCode="etl.attValue"
            :selAttCode="etl.attCode"
            :selProductCode="item.productCode"
            @handle="selectEtl"
            v-if="etl.attValueList != undefined && etl.attValueList.length > 0"
          />
        </content>
        <!--配置选项---------- 是否自动续保 -->
        <div v-if="item.qxFlag == 'duanqi'">
          <FormRadio
            v-model="item.subflag"
            :selectList="yesNoList"
            label="是否自动续保"
            @input="dealRisk"
          ></FormRadio>
        </div>
        <!--配置选项------爱安享B-->
        <div
          v-if="item.productCode == 'ATRR03' || item.productCode == 'ATRR02'"
          class="item-tips"
        >
          主险累计保额20万（含）元以上时可附加爱安享医疗保险。
          <div>
            <span>首次投保费率和续保费率请点击查看</span>
            <a
              v-if="item.productCode == 'ATRR03'"
              href="javascript:void(0);"
              @click="openOffiec365('ATRR03')"
              >《爱心人寿附加爱安享医疗保险费率表》</a
            >
            <a
              v-if="item.productCode == 'ATRR02'"
              href="javascript:void(0);"
              @click="openOffiec365('ATRR02')"
              >《爱心人寿附加爱安享医疗保险费率表》</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormInput from "@/components/common/form/FormInput";
import FormSelector from "@/components/common/form/FormSelector";
import RiskSettingSelect from "@/components/plan/RiskSettingSelect";
import FormAmount from "@/components/common/form/FormAmount";
import FormRadio from "@/components/common/form/FormRadio";
import { mapState } from "vuex";

export default {
  name: "additionalRisk",
  components: {
    RiskSettingSelect,
    FormRadio,
    FormAmount,
    FormSelector,
    FormInput
  },
  props: {
    //传进来的险种信息 附带附加险
    selectMain: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //传进来的主险选项
    mainSetting: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      allRiskList: [], //传递过来的附加险
      mainSettingObj: {}, //主险选项
      //附加险种配置
      selectRiskCode: "", //选中附加险code
      //是或者否码表
      yesNoList: [],
      // 职业信息
      job: {
        occupationCode: "",
        occupationLevel: "",
        occupationName: "",
        occupationRiskLevel: "",
        occupationRiskMetical: ""
      },
      validityState: "", //能否填写附件险
      //校验规则
      rules: {
        job: [
          {
            regExp: "require",
            msg: "职业不能为空"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      applicant: state => state.production.applicant, //投保人
      productionItem: state => state.production.productItem, //选中的产品内容
      mainProposalProductList: state => state.plan.mainProposalProductList, //主险列表
      riskProposalProductList: state => state.plan.riskProposalProductList, //附加险列表
      insurant: state => state.production.insurant, //被保人信息
      selectAllRisk: state => state.production.selectAllRisk, //附加险试算报文
      isShowRisk: state => state.production.isShowRisk, //是否执行附加险组件create方法
      liablist: state => state.plan.liablist //责任列表
    })
  },
  watch: {
    insurant: {
      //被保人信息
      handler(newVal, oldVal) {
        if (
          this.productionItem.productCode == "DTCB02" &&
          newVal.sex != oldVal.sex
        ) {
          console.log(newVal, oldVal);
        } else {
          //试算赋值
          this.dealRisk();
        }
      },
      deep: true
    },
    applicant: {
      //投保人
      handler() {
        //试算赋值
        this.dealRisk();
      },
      deep: true
    },
    liablist: {
      //责任列表
      handler() {
        //试算赋值
        this.dealRisk();
      },
      deep: true
    },
    mainSettingObj: {
      //监听主险按钮选项变化
      handler(newVal, oldVal) {
        let flag = false;
        console.log(newVal, JSON.stringify(oldVal));
        this.mainSettingObj = newVal;
        for (let k in this.allRiskList) {
          if (
            this.allRiskList[k].isSelect &&
            (this.allRiskList[k].productCode == "ATCR01" ||
              this.allRiskList[k].productCode == "ATCR03" ||
              this.allRiskList[k].productCode == "ATCR04" ||
              this.allRiskList[k].productCode == "DTCR02")
          ) {
            flag = true;
            this.dealHuoMian(this.allRiskList[k]);
          }
        }
        if (!flag && JSON.stringify(oldVal) != "{}") this.dealRisk();
      },
      deep: true
    }
  },
  created() {
    this.initIsSelect(); //初始化附加险选中及豁免险标识
    this.initPage(); //初始化回显数据及附加险信息
    this.initCodeList(); //初始化码表
    this.initInsurantSocial(); //初始化附加险社保字段 取被保人社保
  },
  methods: {
    clearRisk() {
      //把选中的附加险
      this.$store.commit("production/setState", {
        attr: "selectAllRisk",
        data: []
      });
    },
    //初始化附加险社保字段 取被保人社保  爱安享B
    initInsurantSocial() {
      this.allRiskList.map(item => {
        if (item.productCode == "ATRR03") {
          item.shebao =
            (this.insurant.isSocialInsurance || this.insurant.shebao) == "1"
              ? "Y"
              : "N"; //1 -- 有    2 -- 无
        } else {
          item.shebao = "N";
        }
      });
      //试算赋值
      // this.dealRisk();
    },
    //初始化码表
    async initCodeList() {
      //是或否码表
      this.yesNoList = await utils.code.getCode("sys_yes_no");
    },
    initPage() {
      //主险选项
      this.mainSettingObj = this.mainSetting;
      //附加险信息回显 取vuex数据
      if (this.riskProposalProductList.length > 0) {
        //处理一下vuex里面试算字段
        // this.initParams();
        //处理需要回显的附加险
        for (let i in this.allRiskList) {
          this.riskProposalProductList.map(key => {
            if (key.subflag == "-1" || key.subflag == "Y") {
              key.subflag = "Y";
            } else {
              key.subflag = "N";
            }
            if (key.shebao == "1" || key.shebao == "Y") {
              key.shebao = "Y";
            } else {
              key.shebao = "N";
            }
            //vuex数据替换当前对应险种信息
            if (this.allRiskList[i].productCode == key.productCode) {
              let list = this.allRiskList[i].attList;
              let a = JSON.parse(
                JSON.stringify(Object.assign(this.allRiskList[i], key))
              );
              this.allRiskList.splice(i, 1, a);
              this.allRiskList[i].attList.map(item => {
                list.map(item1 => {
                  if (item.attCode == item1.attCode) {
                    item.attValueList = item1.attValueList;
                  }
                });
              });
              this.selectRiskCode = this.allRiskList[i].productCode;
              console.log(this.allRiskList[i]);
              //豁免险及爱安享爱倍至附加险选项处理
              if (
                this.allRiskList[i].isSelect &&
                (this.allRiskList[i].productCode == "ATCR01" ||
                  this.allRiskList[i].productCode == "ATCR03" ||
                  this.allRiskList[i].productCode == "ATCR04" ||
                  this.allRiskList[i].productCode == "DTCR02")
              ) {
                this.dealHuoMian(this.allRiskList[i]);
              }
            }
          });
        }
      }
      this.dealFuzhi();
    },
    dealFuzhi() {
      this.allRiskList.map(item => {
        //清空赋值 赋默认值
        item.attList.map(data => {
          if (data.attValueList[0] != undefined) {
            if (!data.attValue) {
              data.attValue = data.attValueList[0].code;
              data.attText = data.attValueList[0].text;
            }
          } else {
            if (!data.attValue) {
              data.attValue = +item.baseAmount;
            }
          }
          //添加页面排序字段
          if (data.attCode == "payMode") {
            data.sort = "2";
          } else if (data.attCode == "payPeriod") {
            data.sort = "1";
          } else if (data.attCode == "policyPeriod") {
            data.sort = "3";
          } else if (data.attCode == "amount") {
            data.sort = "4";
          } else if (data.attCode == "rank") {
            data.sort = "1";
          } else if (data.attCode == "premium") {
            data.sort = "4";
          }
          item.attList = item.attList.sort((a, b) => {
            var value1 = a["sort"];
            var value2 = b["sort"];
            return value2 - value1;
          });
          //随意保附加险处理
          if (item.productCode == "ATMR01") {
            if (data.attCode == "policyPeriod") {
              if (data.attValueList.length > 1) {
                if (this.selectMain.productCode == "ATIB01") {
                  data.attValueList.splice(1, 1);
                  data.attValue = data.attValueList[0].code;
                } else {
                  data.attValueList.splice(0, 1);
                  data.attValue = data.attValueList[0].code;
                }
              }
            }
          }
          //社保  续保字段处理
          if (item.additional) {
            item.additional.map(element => {
              if (element.key == "QXFL") {
                item.qxFlag = element.value;
              }
              if (element.key == "profession") item.profession = element.value;
            });
          }
          if (data.attCode == "amount") {
            data.attValue = +data.attValue;
          }
          item.baseAmount = +item.baseAmount;
          item.amount = +item.amount;
          //初始页面选项名称
          if (data.attCode == "policyPeriod") {
            data.attName = "保险期间";
          } else if (data.attCode == "payPeriod") {
            data.attName = "交费期间";
          } else if (data.attCode == "payMode") {
            data.attName = "交费频次";
          } else if (data.attCode == "amount") {
            data.attName = "基本保险金额";
          } else if (data.attCode == "premium") {
            data.attName = "保险费";
          } else if (data.attCode == "rank") {
            data.attName = "保障计划";
          } else if (data.attCode == "drawMode") {
            data.attName = "领取方式";
          } else if (data.attCode == "drawStartAge") {
            data.attName = "年金开始领取年龄";
          } else if (data.attCode == "drawFreq") {
            data.attName = "年金领取频率";
          } else if (data.attCode == "exceptAmt") {
            data.attName = "次免赔额";
          } else if (data.attCode == "claimRate") {
            data.attName = "赔付比例";
          }
        });
      });
    },
    initIsSelect() {
      this.allRiskList = this.selectMain.extraList.map(item => {
        let rObj = Object.assign({}, item);
        rObj.isSelect = false;
        rObj.isHuoMian = "0";
        rObj.subflag = "Y";
        rObj.shebao = "Y";
        return rObj;
      });
      this.dealFuzhi();
    },
    handleSelectRisk(num) {
      this.allRiskList.map((item, index) => {
        if (index == num) {
          //当前选择项选中处理
          item.isSelect = !item.isSelect;
          if (item.isSelect) this.selectRiskCode = item.productCode;
          //豁免险处理及添加豁免险标识
          if (
            item.isSelect &&
            (item.productCode == "ATCR01" || item.productCode == "DTCR02")
          ) {
            item.isHuoMian = "1";
            this.dealHuoMian(item);
            return false;
          }
          //爱安享  爱倍至处理
          if (
            item.isSelect &&
            (item.productCode == "ATCR03" || item.productCode == "ATCR04")
          ) {
            this.dealHuoMian(item);
            return false;
          }
          //赋默认值
          item.attList.map(data => {
            if (data.attValueList[0] != undefined) {
              if (!data.attValue) {
                data.attValue = data.attValueList[0].code;
                data.attText = data.attValueList[0].text;
              }
            } else {
              if (!data.attValue) {
                data.attValue = +item.baseAmount;
              }
            }
            let a = [];
            a.push(data.attCode);
            if (!a.includes("amount")) {
              item.amount = +item.baseAmount;
            }
            //随意保附加险处理
            if (item.productCode == "ATMR01") {
              if (data.attCode == "policyPeriod") {
                if (data.attValueList.length > 1) {
                  if (this.selectMain.productCode == "ATIB01") {
                    data.attValueList.splice(1, 1);
                    data.attValue = data.attValueList[0].code;
                  } else {
                    data.attValueList.splice(0, 1);
                    data.attValue = data.attValueList[0].code;
                  }
                }
              }
            }
          });
          //试算赋值
          this.dealRisk();
        }
        //vuex内 不选中移除对应项
        if (!item.isSelect) {
          for (let k in this.selectAllRisk) {
            if (this.selectAllRisk[k].productCode == item.productCode) {
              this.selectAllRisk.splice(k, 1);
            }
          }
        }
      });
    },
    isContains(str, substr) {
      return new RegExp(substr).test(str);
    },
    //获得周岁年龄
    getAge(strBirthday) {
      let returnAge;
      let strBirthdayArr = strBirthday.split("-");
      let birthYear = strBirthdayArr[0];
      let birthMonth = strBirthdayArr[1];
      let birthDay = strBirthdayArr[2];

      let d = new Date();
      let nowYear = d.getFullYear();
      let nowMonth = d.getMonth() + 1;
      let nowDay = d.getDate();

      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        let ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            let dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            let monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },
    dealHuoMian(data) {
      // 处理豁免险
      //交费期间预处理
      let productTerm = [];
      productTerm.push({ code: "single", text: "一次交清" });
      for (let n = 1; n <= 110; n++) {
        if (productTerm.length <= 110) {
          productTerm.push({ code: "term_" + n, text: n + "年期" });
        }
      }
      //处理逻辑
      console.log(this.mainSettingObj, this.selectMain);
      if (data.attList == undefined) return;
      data.attList.map(val => {
        //缴费方式
        if (val.attCode == "payMode") {
          this.selectMain.attList.map(key => {
            if (key.attCode == "payMode") {
              val.attValueList =
                key.attValueList &&
                key.attValueList.filter(item => {
                  let c = [];
                  c.push(this.mainSettingObj.payMode);
                  return c.includes(item.code);
                });
              val.attValue = this.mainSettingObj.payMode;
              val.attText = val.attValueList[0].text;
            }
          });
          //交费期限
        } else if (val.attCode == "payPeriod") {
          this.selectMain.attList.map(key => {
            if (key.attCode == "payPeriod") {
              val.attValueList = [];
              //几年期
              if (this.isContains(this.mainSettingObj.payPeriod, "term_")) {
                let numl = parseInt(
                  this.mainSettingObj.payPeriod.replace("term_", "")
                );
                val.attValue = "term_" + (numl - 1);
                val.attText = numl - 1 + "年期";
              } else if (
                //至多少岁
                this.isContains(this.mainSettingObj.payPeriod, "to_") &&
                !this.isContains(this.mainSettingObj.payPeriod, "to_full")
              ) {
                let agel = parseInt(
                  this.mainSettingObj.payPeriod.replace("to_", "")
                );
                let age = this.getAge(this.insurant.birthday);
                val.attValue = "term_" + (agel - age - 1);
                val.attText = agel - age - 1 + "年期";
              } else if (
                this.isContains(this.mainSettingObj.payPeriod, "single")
              ) {
                //暂时处理一次交清
                val.attValue = "single";
                val.attText = "一次交清";
              }
              //爱安享 爱倍至 交费期间处理
              if (
                data.productCode == "ATCR03" ||
                data.productCode == "ATCR04"
              ) {
                //几年期
                if (this.isContains(this.mainSettingObj.payPeriod, "term_")) {
                  let numl = parseInt(
                    this.mainSettingObj.payPeriod.replace("term_", "")
                  );
                  val.attValue = "term_" + numl;
                  val.attText = numl + "年期";
                  let c = [];
                  if (numl == 20) {
                    val.attValue = ["term_" + numl, "term_" + (numl - 1)];
                    val.attValueList = productTerm.filter(item => {
                      return val.attValue.includes(item.code);
                    });
                    val.attValue = "term_" + numl;
                  } else {
                    val.attValueList = productTerm.filter(item => {
                      c.push(val.attValue);
                      return c.includes(item.code);
                    });
                  }
                } else if (
                  this.isContains(this.mainSettingObj.payPeriod, "single")
                ) {
                  //暂时处理一次交清
                  val.attValue = "single";
                  val.attText = "一次交清";
                  val.attValueList = productTerm.filter(item => {
                    return val.attValue.includes(item.code);
                  });
                }
              } else {
                val.attValueList = productTerm.filter(item => {
                  let c = [];
                  c.push(val.attValue);
                  return c.includes(item.code);
                });
              }
            }
          });
          //保险期间
        } else if (val.attCode == "policyPeriod") {
          this.selectMain.attList.map(key => {
            if (key.attCode == "policyPeriod") {
              val.attValueList =
                key.attValueList &&
                key.attValueList.filter(item => {
                  let c = [];
                  c.push(this.mainSettingObj.policyPeriod);
                  console.log(this.mainSettingObj);
                  return c.includes(item.code);
                });
              val.attValue = this.mainSettingObj.policyPeriod;
              val.attText = val.attValueList[0].text;
            }
          });
        } else if (val.attCode == "amount") {
          if (data.productCode == "ATCR03" || data.productCode == "ATCR04") {
            val.attValue = this.mainSettingObj.amount;
          }
        }
      });
      //试算赋值
      this.dealRisk();
    },
    selectEtl(item, selectAttCode, selProductCode) {
      console.log(selectAttCode);
      //附加险按钮点击 赋值
      let selectRisk = this.allRiskList.filter(val => {
        if (selProductCode == val.productCode) return val;
      });
      console.log(selectRisk[0]);
      selectRisk[0].attList.map(key => {
        if (key.attCode == selectAttCode) {
          console.log(item);
          key.attValue = item.code;
          key.attText = item.text;
          this.$forceUpdate();
        }
        //爱安享B款  乐享 1000000  尊享  2000000
        if (selectRisk[0].productCode == "ATRR03") {
          if (key.attCode == "rank" && key.attValue == "term_2") {
            selectRisk[0].amount = 2000000;
          } else if (key.attCode == "rank" && key.attValue == "term_1") {
            selectRisk[0].amount = 1000000;
          }
        }
      });
      //试算赋值
      this.dealRisk();
      // console.log(this.allRiskList);
    },
    //试算赋值
    dealRisk() {
      let commitList = [];
      this.allRiskList.map(item => {
        if (item.isSelect) {
          //附加险试算报文模板
          let riskProductItem = {
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
            extraList: [],
            grade: "",
            huomian: "",
            hasCoverage: "",
            hasService: "",
            main: "",
            id: "",
            isMaster: "",
            isSelect: "",
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
            profession: "",
            qxFlag: "",
            relationType: "",
            shebao: "",
            sourceId: "",
            subflag: "",
            updateTime: " ",
            userDefine1: "",
            userDefine2: ""
          };
          riskProductItem.profession = item.additional.some(val => {
            if (val.key == "profession") {
              return true;
            }
          });
          // riskProductItem.attList = [];
          item.attList.map(item1 => {
            if (item1.attCode == "payMode") {
              riskProductItem.payMode = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "payPeriod") {
              //交费期间
              riskProductItem.payPeriod = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "policyPeriod") {
              riskProductItem.policyPeriod = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "amount") {
              //保额
              riskProductItem.amount = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "premium") {
              //保费
              riskProductItem.premium = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "rank") {
              //档次
              riskProductItem.rank = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "drawStartAge") {
              riskProductItem.drawStartAge = item1.attValue.split("_")[1];
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "drawFreq") {
              riskProductItem.drawFreq = item1.attValue.split("_")[1];
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "drawMode") {
              riskProductItem.drawMode = item1.attValue;
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "drawStartAge") {
              riskProductItem.drawStartAge = item1.attValue.split("_")[1];
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "claimRate") {
              riskProductItem.claimRate = item1.attValue.split("_")[1];
              riskProductItem.attList.push(item1);
            } else if (item1.attCode == "exceptAmt") {
              riskProductItem.exceptAmt = item1.attValue.split("_")[1];
              riskProductItem.attList.push(item1);
            }
          });
          riskProductItem.premium = "";
          riskProductItem.amount =
            riskProductItem.amount == "" && item.productCode == "ATRR03"
              ? item.amount
              : riskProductItem.amount;
          riskProductItem.productCode = item.productCode;
          riskProductItem.productName = item.productName;
          riskProductItem.productShortName = item.productShortName;
          riskProductItem.isSelect = item.isSelect;
          riskProductItem.huomian =
            item.productCode == "ATCR01" || item.productCode == "DTCR02"
              ? "1"
              : "";
          // riskProductItem.grade = "";
          riskProductItem.hasCoverage = "";
          riskProductItem.hasService = "";
          riskProductItem.main = "";
          riskProductItem.productType = item.productType;
          riskProductItem.shebao = item.shebao == "Y" ? "1" : "2";
          riskProductItem.subflag = item.subflag == "Y" ? "-1" : "-2";
          riskProductItem.qxFlag = item.qxFlag;

          commitList.push(riskProductItem);
        }
      });

      //吧选中的附加险存储到VUEX  离开页面需要清空
      this.$store.commit("production/setState", {
        attr: "selectAllRisk",
        data: commitList
      });
      if (this.checkRule()) {
        this.$emit("calcPremium");
      }
    },
    //更新被保人社保信息
    updateInsurantSocial(data, code) {
      console.log(data);
      if (code == "ATRR03") {
        this.insurant.isSocialInsurance = data == "Y" ? "1" : "2";
        this.insurant.shebao = data == "Y" ? "1" : "2";
      }
      //试算处理
      this.dealRisk();
    },
    //被保人出生日期的校验
    checkRule() {
      let flag = true;
      let _this = this;
      if (
        this.insurant.birthday == "" ||
        this.insurant.birthday == " " ||
        this.insurant.birthday == "Invalid Date" ||
        this.insurant.birthday == null
      ) {
        //if(isShow)utils.JAlert.alertOnce('被保险人出生日期不能为空');
        utils.ui.confirm("被保险人出生日期不能为空");
        flag = false;
      }
      if (
        (this.mainSetting.isShowJob || this.insurant.isProfession) &&
        !this.insurant.cdOccupation.occupationCode &&
        flag
      ) {
        utils.ui.confirm("被保险人职业不能为空");
        flag = false;
      }
      if (this.selectAllRisk.length && flag) {
        this.selectAllRisk.forEach(item => {
          if (item.profession && !_this.insurant.cdOccupation.occupationCode) {
            utils.ui.confirm("被保险人职业不能为空");
            flag = false;
          }
        });
      }
      if (this.selectAllRisk.length && flag) {
        this.selectAllRisk.forEach(item => {
          if (item.productCode == "ATCR01") {
            if (!_this.applicant.birthday) {
              utils.ui.confirm("投保人生日不能为空");
              flag = false;
            } else if (!_this.applicant.cdOccupation.occupationCode) {
              utils.ui.confirm("投保人职业不能为空");
              flag = false;
            }
          }
        });
      }

      return flag;
    },
    //打开office365
    openOffiec365(code) {
      let url;
      if (code == "ATRR03") {
        url =
          "https://officeweb365.aixin-life.net/?furl=http://axbucket01-10066809.file.myqcloud.com/ax_product/ATRR03/fl/ATRR03_flb.pdf";
      } else if (code == "ATRR02") {
        url =
          "https://officeweb365.aixin-life.net/?furl=http://axbucket01-10066809.file.myqcloud.com/ax_product/ATRR02/fl/ATRR02_flb.pdf";
      }
      this.$router.push({ name: "proIframe" });
      this.$store.commit("production/setState", {
        attr: "iframeContent",
        data: Object.assign({
          tittle: "费率表",
          url: url
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.additional-risk {
  @include overflow-emphasis;
  width: 320px;
  margin: 5px 0;
  &.active {
    .circle {
      @include small-circle(12px, 4px, solid, #4ac4a3);
    }
    .desc {
      color: $font-color;
    }
  }

  .cont {
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e9f1;
  }
  // 描述
  .desc {
    @include overflow-emphasis;
    font-size: $font-size;
    color: #333;
    padding-left: 15px;
  }
  .square {
    position: absolute;
    right: 0;
  }
  .icon_risk {
    width: 12px;
  }
  .item-tips {
    font-size: 14px;
    color: #f07070;
    margin: 0 20px;
    padding: 10px 0;
    border-bottom: 1px solid $color-ds;
    white-space: normal;
  }
}
</style>
