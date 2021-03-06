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
        我的保单列表
      </template>
    </AppBar>
    <AppContent class="app-content">
      <ListArea
        :list="list"
        needLoadmore
        needRefresh
        @loadmore="loadmore"
        :loadmoreing="loadmoreOpt.loadmoreing"
        :loadmoreFinish="loadmoreOpt.loadmoreFinish"
        :refreshing="refreshOpt.refreshing"
        @refresh="refresh"
      >
        <div class="content">
          <div class="list" v-for="(item, index) in list" :key="index">
            <p>{{ item.applyCode }}/{{ item.policyCode }}</p>
            <div class="ask">
              <div class="left">
                <img src="../../assets/imgs/policy/pic/pic_insurance.jpg" />
              </div>
              <div class="right">
                <p class="xz">投保险种:{{ item.riskName }}</p>
                <p>被保人:{{ item.holderName }}</p>
                <p>投保人:{{ item.insuredName }}</p>
              </div>
            </div>
            <div class="base">
              <span
                >生效日期:{{ " "
                }}<b v-if="item.accecpDate != ' '">{{
                  formatDate(item.accecpDate)
                }}</b></span
              >
              <span
                class="query"
                @click="query(item.applyCode, item.policyCode)"
                >查看</span
              >
            </div>
          </div>
        </div>
      </ListArea>
    </AppContent>
    <AppFloatMenu>
      <img
        slot="top"
        src="../../assets/imgs/common/icon/icon_fix_search.png"
        style="width: 48px"
        @click="$router.push('/policy/PolicyQuery')"
      />
    </AppFloatMenu>
  </page>
</template>

<script>
import { mapState } from "vuex";
import ListArea from "@/components/common/ListArea";
import AppFloatMenu from "@/components/global/AppFloatMenu";
export default {
  name: "policyList",
  components: {
    ListArea,
    AppFloatMenu
  },
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      payList: [], //支付信息
      riskDtoList: [], //险种信息
      policyDTO: [], //保单信息
      policyHolder: [], //投保人信息
      policyInsureds: [], //被保人信息
      policyBenficiaryDtoList: [], //身故受益人
      req: {},
      policyCode: "",
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
      userInfo: state => state.user.userInfo //用户信息
    })
  },
  created() {
    this.req = this.$route.params.req;
  },
  activated() {
    // 解决ios清空list顶部fixed定位失效，延时清空list
    setTimeout(() => {
      this.reset();
      this.initPage();
    }, 10);
  },
  methods: {
    reset() {
      this.pageNum = 1;
      this.list = [];
    },
    // 初始化页面
    initPage() {
      // 加载更多
      this.loadmore();
    },
    query(a, b) {
      this.DetailsQuery(a, b);
    },
    // 下拉刷新
    async refresh() {
      // 重置pageNum为1
      this.pageNum = 1;
      // 重置loadmoreFinish为false
      this.loadmoreOpt.loadmoreFinish = false;
      // 设置refreshing为true
      this.refreshOpt.refreshing = true;
      // 获取数据
      const data = await this.loadate().catch(() => {});
      // 设置refreshing为false
      this.refreshOpt.refreshing = false;

      if (data) {
        // 查询成功的情况
        // pageNum + 1
        this.pageNum += 10;
        // 赋值list
        this.list = data;
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
      const data = await this.loadate().catch(() => {});
      // 设置loadmoreing为false
      this.loadmoreOpt.loadmoreing = false;

      if (data) {
        // 查询成功的情况
        // pageNum + 10
        this.pageNum += 10;
        // 叠加list
        this.list = this.list.concat(data);
        // 处理加载完毕的情况
        if (data.length < 10) {
          this.loadmoreOpt.loadmoreFinish = true;
        }
      }
    },
    //保单详情请求
    DetailsQuery(a, b) {
      const params = {
        policyQueryRequestDto: {
          applyCode: a,
          policyCode: b,
          agentCode: this.userInfo.weChatAgenctDTO.agentCode || "",
          fpInfoId: this.userInfo.weChatAgenctDTO.infoId || ""
        }
      };
      this.policyCode = params.policyQueryRequestDto.policyCode;
      utils.http.post(interfaces.policy.roductlist, params).then(res => {
        //支付信息
        this.payList = res.policyDetailResponseDto.payList;
        //险种信息
        this.riskDtoList = res.policyDetailResponseDto.riskDtoList;
        //保单信息
        this.policyDTO = res.policyDetailResponseDto.policyDTO;
        console.log(this.policyDTO);
        //投保人信息
        this.policyHolder = res.policyDetailResponseDto.policyHolder;
        this.policyInsureds = res.policyDetailResponseDto.policyInsureds;
        this.policyBenficiaryDtoList =
          res.policyDetailResponseDto.policyBenficiaryDtoList;
        this.$router.push({
          name: "particulars",
          params: {
            payList: this.payList,
            riskDtoList: this.riskDtoList,
            policyDTO: this.policyDTO,
            policyHolder: this.policyHolder,
            policyInsureds: this.policyInsureds,
            policyBenficiaryDtoList: this.policyBenficiaryDtoList,
            policyCode: this.policyCode
          }
        });
      });
    },
    //已完成保单列表
    loadate() {
      let params = {
        policyQuery: {
          fpInfoId: this.userInfo.weChatAgenctDTO.infoId || "",
          agentCode: this.userInfo.weChatAgenctDTO.agentCode || "",
          memberInfoId: undefined,
          applyCode: "", //投保单号
          policyCode: "", //投保单号
          holderName: "", //投保人姓名
          insuredName: "", //被保人姓名
          pageNum: this.pageNum, //查询第几页
          pageSize: 10, //每页显示多少条
          riskName: "", //第一主险名称
          status: 1, //状态：0查询未完成，1查询已完成
          familyNum: "" //家庭单号
        }
      };
      //console.log(this.req);
      //查询参数赋值
      if (this.req != undefined) {
        params = this.req;
      }
      return new Promise(resolve => {
        utils.http
          .post(interfaces.policy.queryPolicyList, params, this.isLoading)
          .then(res => {
            resolve(res.policyQueryResponseDto.policyDTOs);
            this.isLoading.needLoading = false;
          });
      });
    },

    //转换时间格式
    formatDate(secs) {
      let t = new Date(secs);
      let year = t.getFullYear();
      let month = t.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let date = t.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      let hour = t.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      let minute = t.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      let second = t.getSeconds();
      if (second < 10) {
        second = "0" + second;
      }
      return year + "-" + month + "-" + date;
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
.content {
  background: #f3f3f3;
  .list {
    padding: 0 10px;
    margin: 10px 0px;
    width: 100%;
    height: 177px;
    background-color: #fff;
    background: #ffffff;
    border: 1px solid #ffffff;
    font-family: "微软雅黑";
    .base {
      width: 100%;
      line-height: 47px;
      span {
        width: auto;
        float: left;
        background-size: cover;
        padding-left: 6px;
        float: left;
        display: block;
        height: 100%;
        font-family: HYQiHei-DES;
        font-size: 13px;
        color: #999999;
        b {
          font-family: HYQiHei-DES;
          font-size: 13px;
          color: #999999;
          font-weight: 500;
        }
      }
      .query {
        min-width: 67px;
        height: 30px;
        border-radius: 4px;
        background-color: #ffffff;
        border: 1px solid #ffcc00;
        margin-top: 6px;
        text-align: center;
        line-height: 25px;
        padding: 2px 5px;
        margin-left: 10px;
        color: white;
        font-family: HYQiHei-DES;
        font-size: 13px;
        color: #ffcc00;
        letter-spacing: 0;
        float: right;
      }
    }
    p {
      float: left;
      font-size: 12px;
      color: #000000;
      font-weight: normal;
      padding-left: 10px;
      height: 33px;
      width: 100%;
      line-height: 33px;
    }
    .ask {
      width: 100%;
      height: 95px;
      line-height: 95px;
      overflow: hidden;
      padding-right: 5px;
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      .left {
        float: left;
        width: 100px;
        height: 75px;
        padding-top: 8px;
        padding-left: 7px;
        img {
          width: 100px;
          height: 75px;
        }
      }
      .right {
        min-width: 100px;
        height: 100%;
        margin-left: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 10px;
        .xz {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p {
          font-family: HYQiHei-DES;
          font-size: 15px;
          color: #333333;
          width: 100%;
          height: 20px;
          margin-bottom: 4px;
          line-height: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
.null {
  width: 100%;
  height: 50px;
  text-align: center;
  font-family: HYQiHei-DES;
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
  padding-top: 20px;
  background-color: white;
  p {
    text-align: center;
  }
}
</style>
