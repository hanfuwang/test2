<template>
  <Page class="plan-list" :withAppBar="!globalConfig.isWx">
    <!-- 导航栏 -->
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        规划书列表
      </template>
    </AppBar>

    <!-- 主体 -->
    <AppContent class="app-content">
      <ListArea
        :list="dataList"
        needLoadmore
        needRefresh
        @loadmore="loadmore"
        :refreshing="refreshOpt.refreshing"
        :loadmoreing="loadmoreOpt.loadmoreing"
        :loadmoreFinish="loadmoreOpt.loadmoreFinish"
        @refresh="refresh"
      >
        <!-- 规划书列表 -->
        <div class="content">
          <PlanlistItem
            v-for="(item, index) in dataList"
            :key="index"
            @delPlan="delPlan"
            @editPlan="editPlan"
            @jumpTb="jumpTb"
            @viewPlan="viewPlan"
            :itemObj="item"
            :index="index"
          />
        </div>
      </ListArea>
    </AppContent>
    <AppFloatMenu>
      <img
        class="icon_search"
        slot="top"
        src="../../assets/imgs/common/icon/icon_fix_search.png"
        @click="doSearch"
      />
      <img
        class="icon_search"
        slot="bottom"
        src="../../assets/imgs/common/icon/icon_fix_add.png"
        @click="doAdd"
      />
    </AppFloatMenu>
  </Page>
</template>

<script>
import { mapState } from "vuex";
import ListArea from "@/components/common/ListArea";
import PlanlistItem from "@/components/plan/PlanListItem";
import AppFloatMenu from "@/components/global/AppFloatMenu";
export default {
  name: "planList",
  components: {
    PlanlistItem,
    AppFloatMenu,
    ListArea
  },
  data() {
    return {
      dataList: [], //规划书列表
      pageNum: 0, //第一页
      // 加载更多配置项
      loadmoreOpt: {
        loadmoreing: false,
        loadmoreFinish: false
      },
      //下拉刷新配置
      refreshOpt: {
        refreshing: false
      },
      //loading配置
      isLoading: {
        needLoading: true
      }
    };
  },
  computed: {
    ...mapState({
      insurant: state => state.plan.insurant, //被保人
      applicant: state => state.plan.applicant, //投保人
      userInfo: state => state.user.userInfo, //用户信息
      searchParams: state => state.plan.searchParams //查询参数
    })
  },
  methods: {
    // 返回
    goBack() {
      utils.native.closePage();
    },
    //转投保
    jumpTb(item) {
      utils.native.closePage({ bookId: item.bookId });
    },
    //删除计划书
    delPlan(item) {
      const params = {
        proposalPlan: {
          bookId: item.bookId //建议书id
        }
      };
      utils.ui.confirm({
        msg: "确定删除吗？",
        btnList: [
          {
            msg: "取消",
            cb: () => {}
          },
          {
            msg: "确定",
            cb: () => {
              //删除规划书
              utils.http.post(interfaces.plan.delPlan, params).then(() => {
                this.dataList = [];
                this.refresh();
                utils.ui.tips("删除成功！");
              });
            }
          }
        ]
      });
    },
    //编辑计划书
    editPlan(item) {
      //console.log(item);
      let insurant = item.proposalCustomerList[0]; //被保人
      let applicant = item.holder[0]; //投保人
      insurant.birthdate = String(insurant.birthdate).substr(0, 10);
      applicant.birthdate = String(applicant.birthdate).substr(0, 10);
      applicant.cdOccupation = applicant.cdOccupation[0];
      insurant.cdOccupation = insurant.cdOccupation[0];
      //投保人
      this.$store.commit("plan/setState", {
        attr: "applicant",
        data: Object.assign(this.applicant, applicant)
      });
      //被保人
      this.$store.commit("plan/setState", {
        attr: "insurant",
        data: Object.assign(this.insurant, insurant)
      });
      //主险列表
      this.$store.commit("plan/setState", {
        attr: "mainProposalProductList",
        data: item.mainProposalProductList
      });
      //附加险列表
      this.$store.commit("plan/setState", {
        attr: "riskProposalProductList",
        data: item.riskProposalProductList
      });
      //总保费
      this.$store.commit("plan/setState", {
        attr: "totalPremium",
        data: item.totalPremium
      });
      //总保额
      this.$store.commit("plan/setState", {
        attr: "totalAmount",
        data: item.totalAmount
      });
      this.go("makePlan");
    },
    //查看规划书
    viewPlan(item) {
      //console.log(item);
      this.goWithQuery("lookPlan", {
        bookId: item.bookId
      });
    },
    //初始化页面
    initPage() {
      this.loadmore();
    },
    // 获取数据
    fetchData() {
      const params = {
        proposalPlan: {
          searchProductName: this.searchParams.insuranceType, //产品名称
          searchHolderName: this.searchParams.policyHolderName, //投保人姓名
          searchBeginDate: this.searchParams.quertStartTime, //开始时间
          searchEndDate: this.searchParams.queryEndTime, //结束时间
          searchPersonId: globalConfig.isWx
            ? this.userInfo && this.userInfo.weChatAgenctDTO.infoId
            : this.userInfo &&
              this.userInfo.user &&
              this.userInfo.user.personId, //查询持有人ID
          searchMemberInfoId: this.$route.query.seachCusInfoId, // 查询员工信息ID
          begin: this.pageNum,
          pageSize: 10
        }
      };
      return new Promise(resolve => {
        utils.http
          .post(interfaces.plan.getPlanList, params, this.isLoading)
          .then(res => {
            resolve(res.proposalViewDto.proposalBookListDTO);
            this.isLoading.needLoading = false;
          });
      });
    },
    // 下拉刷新
    async refresh() {
      // 重置pageNum为1
      this.pageNum = 0;
      // 重置loadmoreFinish为false
      this.loadmoreOpt.loadmoreFinish = false;
      // 设置refreshing为true
      this.refreshOpt.refreshing = true;
      // 获取数据
      const data = await this.fetchData().catch(() => {});
      // 设置refreshing为false
      this.refreshOpt.refreshing = false;

      if (data) {
        // 查询成功的情况
        // pageNum + 1
        this.pageNum += 10;
        // 赋值list
        this.dataList = data;
        // 处理加载完毕的情况
        if (data.length < 10) {
          this.loadmoreOpt.loadmoreFinish = true;
        }
      }
    },
    // 加载更多
    async loadmore() {
      // console.log("loadmore");
      // 设置loadmoreing为true
      this.loadmoreOpt.loadmoreing = true;
      // 获取数据
      const data = await this.fetchData().catch(() => {});
      // 设置loadmoreing为false
      this.loadmoreOpt.loadmoreing = false;

      if (data) {
        // 查询成功的情况
        // pageNum + 10
        this.pageNum += 10;
        // 叠加list
        this.dataList = this.dataList.concat(data);
        // 处理加载完毕的情况
        if (data.length < 10) {
          this.loadmoreOpt.loadmoreFinish = true;
        }
      }
    },
    //搜索
    doSearch() {
      this.$store.commit("plan/setState", {
        attr: "searchParams",
        data: {
          policyHolderName: "", //投保人姓名
          insuranceType: "", //险种code
          quertStartTime: "", //制作日期（开始）
          queryEndTime: "" //制作日期(结束)
        }
      });
      this.go("queryPlan");
    },
    //添加
    doAdd() {
      this.go("makePlan");
    },
    //重置
    reset() {
      this.isLoading.needLoading = true;
      this.loadmoreOpt.loadmoreFinish = false;
      this.pageNum = 0;
      this.dataList = [];
    },
    //重置vuex
    initVuex() {
      //主险清空
      this.$store.commit("plan/setState", {
        attr: "mainProposalProductList",
        data: []
      });
      //附加清空
      this.$store.commit("plan/setState", {
        attr: "riskProposalProductList",
        data: []
      });
      //附加清空
      this.$store.commit("plan/setState", {
        attr: "selectAllRisk",
        data: []
      });
      //总保费清空
      this.$store.commit("plan/setState", {
        attr: "totalPremium",
        data: ""
      });
      //总保额清空
      this.$store.commit("plan/setState", {
        attr: "totalAmount",
        data: ""
      });
      //投保人清空
      this.$store.commit("plan/setState", {
        attr: "applicant",
        data: {
          name: "",
          sex: "0", //性别
          birthdate: "",
          //职业信息
          cdOccupation: {
            occupationCode: "",
            occupationLevel: "",
            occupationName: "",
            occupationRiskLevel: "",
            occupationRiskMetical: ""
          },

          isoldCustomer: "0" //默认是新客户
        }
      });
      //被保人清空
      this.$store.commit("plan/setState", {
        attr: "insurant",
        data: {
          name: "",
          sex: "0",
          birthdate: "",
          //职业信息
          cdOccupation: {
            occupationCode: "",
            occupationLevel: "",
            occupationName: "",
            occupationRiskLevel: "",
            occupationRiskMetical: ""
          },
          isoldCustomer: "0", //默认是新客户
          holderRelation: "" //关系
        }
      });
    }
  },
  activated() {
    // 解决ios清空list顶部fixed定位失效，延时清空list
    setTimeout(() => {
      this.initVuex();
      this.reset();
      this.initPage();
    }, 10);
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

.plan-list {
  background: $color-ds;
  .icon_search {
    width: 46px;
  }
}
</style>
<style>
.plan-list-item:last-child {
  margin-bottom: 0;
}
</style>
