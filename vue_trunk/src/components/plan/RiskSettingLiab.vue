<!-- 责任列表-->
<template>
  <section class="risk-setting-liab">
    <h2>责任列表</h2>
    <div v-for="(item, index) in liabList" :key="index" class="content">
      <div
        class="icon"
        v-if="item.required == 'false'"
        @click="handleLib(item, index)"
      >
        <img
          v-if="item.checked == 'true'"
          src="@/assets/imgs/common/icon/icon_selected_yes.png"
          alt
        />
        <img
          v-if="item.checked == 'false'"
          src="@/assets/imgs/common/icon/icon_selected_no.png"
          alt
        />
      </div>
      <!--随意保责任列表-->
      <div class="item" v-if="mainCode == 'ATIB01'">
        <h5 @click="handleLib(item, index)">{{ item.liabName }}</h5>
        <FormAmount
          label="基本保险金额"
          v-model="amountList[index]"
          rightLabel="元"
          type="number"
          @input="input(index)"
        />
      </div>
      <!--爱健康(2020版)责任列表-->
      <div class="item" v-if="mainCode == 'ATCB03'">
        <h5 @click="handleLib(item, index)">{{ item.liabName }}</h5>
        <div v-if="item.liabCode == 'ATC02'">
          <FormAmount
            label="基本保险金额"
            disabled
            rightLabel="元"
            v-model="amountList[index]"
          />
        </div>
        <div v-if="item.liabCode != 'ATC02'">
          <FormInput label="基本保险金额" disabled rightLabel="详见条款" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormAmount from "@/components/common/form/FormAmount";
import FormInput from "@/components/common/form/FormInput";
export default {
  name: "riskSettingLiab",
  components: { FormAmount, FormInput },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selectMainCode: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      liabList: [],
      amountList: [],
      mainCode: "",
      mainAmountNum: 0
    };
  },
  mounted() {
    //let liabList = [];
    console.log(this.list);
    this.list.forEach(item => {
      // if (item.checked == "true") {
      this.liabList.push(item);
      this.amountList.push(+item.amount);
      //}
    });
    // this.liabList = liabList;
  },
  computed: {},
  watch: {
    selectMainCode: {
      //监听主险变化
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.mainCode = newVal;
        console.log(this.mainAmount);
        // console.log(this.list);
        this.liabList = this.list;
        //重新处理保额
        this.updateLiabList(this.liabList);
      },
      deep: true
    }
  },
  created() {
    this.mainCode = this.selectMainCode;
  },
  methods: {
    //点击责任
    handleLib(item, index) {
      if (item.required == "true") return;
      if (this.liabList[index].checked == "true") {
        this.liabList[index].checked = "false";
      } else {
        this.liabList[index].checked = "true";
      }
      this.$store.commit("plan/setState", {
        attr: "liablist",
        data: this.liabList
      });
    },
    input(index) {
      if (index == 0) {
        this.amountList[1] = this.amountList[0];
      }
      if (index == 1) {
        this.amountList[0] = this.amountList[1];
      }
      this.liabList.forEach((item, index) => {
        this.liabList[index].amount = this.amountList[index];
        this.$store.commit("plan/setState", {
          attr: "liablist",
          data: this.liabList
        });
      });
    },
    //更新责任保额
    updateLiabList(list) {
      this.amountList = [];
      list.forEach(item => {
        this.amountList.push(+item.amount);
      });
      // console.log(this.amountList);
    },
    updateSunAmount(num) {
      //主险保额变化 同步更新第二个责任保额为主险保额的30%
      this.mainAmountNum = num * 0.3;
      console.log(this.mainAmountNum);
      this.liabList.forEach(item => {
        if (item.liabCode == "ATC02") {
          item.amount = this.mainAmountNum;
        }
      });
      this.updateLiabList(this.liabList);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common/form.scss";
.risk-setting-liab {
  @include overflow-emphasis;
  margin: 20px 10px;
  padding: 13px 20px;
  margin-bottom: 10px;
  box-shadow: 0 0 4px 1px #e5e9f1;
  border-radius: 5px;

  .content {
    position: relative;
  }
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 12px;
    }
  }
  .item {
    padding-left: 20px;
  }
  h2 {
    font-size: 15px;
    color: #333333;
    font-weight: normal;
    border-bottom: 1px solid #e5e9f1;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }
  h5 {
    font-weight: normal;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
<style>
.risk-setting-liab .form-item {
  padding: 0;
}
.risk-setting-liab .require {
  display: none;
}
.risk-setting-liab .f-wrap .f-label .label {
  font-size: 12px;
}
.risk-setting-liab .f-wrap {
  height: 30px;
}
</style>
