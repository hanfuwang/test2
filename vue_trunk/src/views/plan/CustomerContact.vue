<template>
  <Page class="demo-form" :withAppBar="!globalConfig.isWx">
    <!-- app-bar -->
    <AppBar v-if="!globalConfig.isWx">
      <template slot="center">
        客户联系方式
      </template>
    </AppBar>
    <AppContent class="app-content">
      <ValiForm :form="form" :vali="vali">
        <div class="nav">手机号码/固定电话/邮箱</div>
        <FormInput
          type="tel"
          v-model="form.mobile"
          label="手机号码"
          placeholder="请输入您的手机号码"
          :rules="rules.mobile"
        ></FormInput>
        <FormInput
          type="text"
          v-model="form.guMobile"
          label="固定电话"
          placeholder="请输入您的固定电话"
          :rules="rules.guMobile"
        ></FormInput>
        <FormInput
          v-model="form.email"
          label="电子邮箱"
          placeholder="请输入电子邮箱"
          :rules="rules.email"
        ></FormInput>
        <div class="nav">地址/邮编</div>
        <FormSelector
          v-model="form.address"
          :selectData.sync="area"
          type="area"
          label="联系住址"
          placeholder="请选择详细地址"
          ref="areaSelector"
        ></FormSelector>
        <FormInput
          v-model="form.streetNum"
          label="街道/门牌号"
          placeholder="请输入街道/门牌号"
        ></FormInput>
        <FormInput
          type="tel"
          v-model="form.zipCode"
          label="邮政编码"
          placeholder="请输入邮政编码"
          :rules="rules.zipCode"
        ></FormInput>
      </ValiForm>
      <div class="box">
        <span
          class="right"
          :class="{ disabled: !vali.status || formEmpty }"
          @click="sure"
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
import FormSelector from "@/components/common/form/FormSelector";

export default {
  name: "customerContact",
  components: {
    ValiForm,
    FormInput,
    FormSelector
  },
  data() {
    return {
      // form表单
      form: {
        mobile: "", //手机号码
        guMobile: "", //固定电话
        email: "", //邮箱
        address: "", //地址
        streetNum: "", //门牌号
        zipCode: "", //邮政编码
        provinceCode: "", // 省code
        provinceName: "", // 省名称
        cityCode: "", // 市code
        cityName: "", // 市名称
        areaCode: "", // 区code
        areaName: "" // 区名称
      },
      // 家庭住址
      area: {
        provinceCode: "", // 省code
        provinceName: "", // 省名称
        cityCode: "", // 市code
        cityName: "", // 市名称
        areaCode: "", // 区code
        areaName: "" // 区名称
      },
      // form验证对象
      vali: {
        status: false,
        unlegalValiList: []
      },
      // 校验规则
      rules: {
        mobile: [
          {
            regExp: "mobile",
            msg: "请输入正确的手机号码"
          }
        ],
        guMobile: [
          {
            regExp: "telephone",
            msg: "请输入正确的固定电话"
          }
        ],
        email: [
          {
            regExp: "email",
            msg: "请输入正确的电子邮箱"
          }
        ],
        zipCode: [
          {
            regExp: "postCode",
            msg: "请输入正确的邮政编码"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      concList: state => state.plan.concList,
      cusIndex: state => state.plan.cusIndex
    }),
    // 当前form是否全空
    formEmpty() {
      let formEmpty = true;
      // 遍历form中的所有属性
      Object.keys(this.form).forEach(param => {
        if (this.form[param]) {
          formEmpty = false;
        }
      });
      return formEmpty;
    }
  },
  created() {
    this.initCodeList();
    if (this.cusIndex >= 0) {
      this.form = this.concList[this.cusIndex];
      this.area = {
        provinceCode: this.concList[this.cusIndex].province, // 省code
        provinceName: this.concList[this.cusIndex].provinceName, // 省名称
        cityCode: this.concList[this.cusIndex].city, // 市code
        cityName: this.concList[this.cusIndex].cityName, // 市名称
        areaCode: this.concList[this.cusIndex].county, // 区code
        areaName: this.concList[this.cusIndex].countyName // 区名称
      };
    }
  },
  methods: {
    async initCodeList() {
      //银行码表
      this.bankSelectList = await utils.code.getCode("bank_code");
    },
    sure() {
      // 根据vali对象判断当前form元素是否全部输入合法
      if (!this.vali.status || this.formEmpty) {
        return;
      } else {
        this.form.provinceCode = this.area.provinceCode;
        this.form.provinceName = this.area.provinceName;
        this.form.cityCode = this.area.cityCode;
        this.form.cityName = this.area.cityName;
        this.form.areaCode = this.area.areaCode;
        this.form.areaName = this.area.areaName;

        this.form.address =
          this.area.provinceName + this.area.cityName + this.area.areaName;
        this.form.addressCode =
          this.area.provinceCode +
          "," +
          this.area.cityCode +
          "," +
          this.area.areaCode;
        this.form.attrValue =
          this.area.provinceCode +
          "," +
          this.area.cityCode +
          "," +
          this.area.areaCode +
          "," +
          this.form.streetNum +
          "," +
          this.form.zipCode +
          "," +
          this.form.mobile +
          "," +
          this.form.email +
          "," +
          this.form.guMobile;
        if (this.cusIndex >= 0) {
          this.concList[this.cusIndex] = this.form;
        } else {
          this.concList.push(this.form);
        }
        this.$store.commit("plan/setState", {
          attr: "concList",
          data: this.concList
        });
        this.back();
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
    color: #fff;
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
}
</style>
