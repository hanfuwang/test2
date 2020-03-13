<template>
  <div class="productImg">
    <!--产品详情投不展示图-->
    <img v-lazy="productImg01" alt="" />
    <!--保障计划-->
    <div class="bzjh">
      <div class="bzjh_header">
        保障规划
      </div>
      <div class="split_ine"><!--分割线--></div>
      <!--保障规划的额内容-->
      <div class="row" v-for="prolis in proInfoData" :key="prolis.id">
        <div
          v-if="
            prolis.indexOf('*$') != -1 &&
              (proInfo.productCode == 'RPPB01' ||
                proInfo.productCode == 'DTRB03')
          "
          class="col"
        >
          {{ prolis.replace("*$", "") }}
        </div>
        <div
          v-if="
            prolis.indexOf('*$') != -1 &&
              (proInfo.productCode != 'RPPB01' &&
                proInfo.productCode != 'DTRB03')
          "
          class="col"
        >
          {{ prolis.replace("*$", "") }}
        </div>
        <div v-if="prolis.indexOf('*$') == -1" class="col">
          {{ prolis.replace("*$", "") }}
        </div>
      </div>
      <div class="row" v-if="proInfoData.length">
        <div class="col">
          以上各项保险金为您所能获取赔付金的最高额度，仅供您参考，具体内容请以保单条款为准。
        </div>
      </div>
      <div class="split_ine"><!--分割线--></div>
      <div class="row">
        <div class="col">
          <span style="text-align: center;color: #000000;">查看</span>
          <span
            style="text-align: center;color: #c99f63;"
            @click="tiaokuanTotal()"
            >《保障条款》、</span
          >
          <span style="text-align: center;color: #c99f63;" @click="openModal()"
            >《投保须知》</span
          >
          <span
            style="text-align: center;color: #c99f63;"
            @click="explain()"
            v-if="
              proInfo.productCode == 'APWB01' || proInfo.productCode == 'RPPB01'
            "
            >、《产品说明书》</span
          >
        </div>
      </div>
    </div>
    <!--产品特色-->
    <img v-lazy="productImg02" alt="" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProductImg",
  props: {
    //产品的pdf,图片
    productList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 保障规划的内容
    productSecurityList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    //
    proInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      producPdf: "", //产品说明书
      productImg01: "", //PD007 产品介绍长图
      productImg02: "", //PD012 产品介绍小图
      proInfoData: [], //产品保障规划的数据
      //模态框
      isShow: false, //是否关闭模态框
      // 点击模态层关闭confirm框
      clickModalToClose: false,
      // 背景色
      backgroundColor: "#fff"
    };
  },
  computed: {
    ...mapState({
      selectAllRisk: state => state.production.selectAllRisk, //附加险试算报文
      productionItem: state => state.production.productItem //选中的产品内容
    })
  },
  watch: {
    //监控保障规划的内容
    productSecurityList: {
      handler(newVal) {
        this.dealProInfo(newVal);
      },
      deep: true
    }
  },
  created() {
    //条款
    this.$store.commit("production/setState", {
      attr: "clauseList",
      data: this.productList
    });
    this.productList.map(item => {
      switch (item.docType) {
        case "PD012":
          this.productImg01 = item.fileUrl;
          break;
        case "PD007":
          this.productImg02 = item.fileUrl;
          break;
      }
    });
  },
  methods: {
    tiaokuanTotal() {
      this.$router.push({ name: "clauseList" });
      //保障条款
      this.$store.commit("production/setState", {
        attr: "proIframeTittle",
        data: "PD001"
      });
    },
    explain() {
      // 产品说明书的处理方法
      let url;
      this.productList.map(item => {
        if (item.docType == "PD005") {
          if (item.fileUrl.indexOf("https://") != -1) {
            url = globalConfig.openOfficeUrl + "?ssl=1&furl=" + item.fileUrl;
          } else if (item.fileUrl.indexOf("http://") != -1) {
            url = globalConfig.openOfficeUrl + "?furl=" + item.fileUrl;
          }
        }
      });
      this.$router.push({ name: "proIframe" });
      this.$store.commit("production/setState", {
        attr: "iframeContent",
        data: Object.assign({
          tittle: "产品说明书",
          url: url
        })
      });
    },
    // 保障规划的内容的处理方法
    dealProInfo(result) {
      this.proInfoData = [];
      result.map(ele => {
        this.proInfoData.push(ele);
      });
      console.log(this.proInfoData);
    },
    //投保须知
    openModal() {
      this.$router.push({ name: "clauseList" });
      //投保须知
      this.$store.commit("production/setState", {
        attr: "proIframeTittle",
        data: "PD004"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.productImg {
  padding-bottom: 55px;
  img {
    margin-top: 10px;
    width: 100%;
  }
  .bzjh {
    .bzjh_header {
      color: #c99f63;
      margin-top: 8px;
      line-height: 30px;
      font-size: 17px;
      margin-left: 10px;
    }
    .split_ine {
      border-bottom: 1px solid rgb(201, 159, 99);
      width: 92%;
      margin-left: 10px;
    }
    .row {
      @include display-flex;
      text-align: left;
      font-size: 14px;
      padding: 5px;
      .col {
        padding: 5px;
        width: 100%;
      }
    }
  }
  /deep/ .modal {
    align-items: flex-start;
  }
  .app-bar {
    .icon {
      height: auto;
      &.icon-back {
        width: 11.5px;
      }
    }
  }
  .tiaokuanIframe {
    min-height: 100vh;
    iframe {
      min-height: 100vh;
    }
  }
  .tiaokuan_ul li {
    font-size: 14px;
    line-height: 26px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .tiaokuan_ul {
    background: #fff;
  }
}
</style>
