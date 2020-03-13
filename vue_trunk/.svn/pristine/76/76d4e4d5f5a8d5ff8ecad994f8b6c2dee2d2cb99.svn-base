<template>
  <div class="wrap">
    <p class="box"></p>
    <h3 class="title">投保险种</h3>
    <ul class="content" v-for="item in productList" :key="item.id">
      <li class="son1">
        <span>首期总保费({{ getpayMode(item.payMode) }})</span>
        <span>
          <span> {{ totalPremium | global_addCommas }} </span>元
        </span>
      </li>
      <li>
        <p @click="isShow = !isShow" class="bar">
          <span class="bar_span">{{ item.productName }}</span>
          <span>
            <span>{{ item.premiumDes | global_addCommas }} </span>元
            <img
              v-if="isShow == false"
              src="../../assets/imgs/common/icon/icon_pull_down.png"
              class="down"
            />
            <img
              v-if="isShow == true"
              src="../../assets/imgs/common/icon/icon_pull_up.png"
              class="down"
            />
          </span>
        </p>
        <div v-show="isShow">
          <p>
            <span v-if="item.policyPeriod">
              <b>保险期: </b>
              <span>{{ getpolicyPeriod(item.policyPeriod) }}</span>
            </span>
            <span v-if="item.amount">
              <b>险种保额:</b>
              <span>{{ item.amount | global_addCommas }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.payPeriod">
              <b>缴费期:</b>
              <span>{{ getpayPeriod(item.payPeriod) }}</span>
            </span>
            <span v-if="item.payMode">
              <b> 交费频率:</b>
              <span>{{ getpayMode(item.payMode) }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.rank">
              <b>保险计划:</b>
              <span> {{ getrank(item.rank) }}</span>
            </span>
            <span v-if="item.grade">
              <b>被保险人类型:</b>
              <span>{{ item.grade == 0 ? "标准" : "优选" }}</span></span
            >
          </p>
          <p>
            <span v-if="item.drawMode">
              <b>领取方式:</b>
              <span>
                {{ getdrawMode(item.drawMode) }}
              </span>
            </span>
            <span v-if="item.drawStartAge">
              <b>年金开始领取频率年龄:</b>
              <span>{{ getdrawStartAge(item.drawStartAge) }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.drawFreq">
              <b>年金开始领取频率:</b>
              <span>
                {{ getdrawFreq(item.drawFreq) }}
              </span>
            </span>
          </p>
        </div>
      </li>
      <li v-for="(item, index) in extraList" :key="item.id">
        <p @click="isShowfja(index)" class="bar">
          <span class="bar_one">{{ item.productName }}</span>
          <span>
            <span>{{ item.premiumDes | global_addCommas }} </span>元
            <img
              v-if="!isShowfj.includes(index)"
              src="../../assets/imgs/common/icon/icon_pull_down.png"
              class="down"
            />
            <img
              v-if="isShowfj.includes(index)"
              src="../../assets/imgs/common/icon/icon_pull_up.png"
              class="down"
            />
          </span>
        </p>
        <div v-if="isShowfj.includes(index)">
          <p>
            <span v-if="item.policyPeriod">
              <b>保险期: </b>
              <span>{{ getpolicyPeriodfj(index, item.policyPeriod) }}</span>
            </span>
            <span v-if="item.amount">
              <b>险种保额:</b>
              <span>{{ item.amount | global_addCommas }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.payPeriod">
              <b>缴费期:</b>
              <span>{{ getpayPeriodfj(index, item.payPeriod) }}</span>
            </span>
            <span v-if="item.payMode">
              <b> 交费频率:</b>
              <span>{{ getpayModefj(index, item.payMode) }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.rank">
              <b>保险计划:</b>
              <span> {{ getrankfj(index, item.rank) }}</span>
            </span>
            <span v-if="item.grade">
              <b>被保险人类型:</b>
              <span>{{ item.grade == 0 ? "标准" : "优享" }}</span></span
            >
          </p>
          <p>
            <span v-if="item.drawMode">
              <b>领取方式:</b>
              <span>
                {{ getdrawModefj(index, item.drawMode) }}
              </span>
            </span>
            <span v-if="item.drawStartAge">
              <b>年金开始领取频率年龄:</b>
              <span>{{ getdrawStartAgefj(index, item.drawStartAge) }}</span>
            </span>
          </p>
          <p>
            <span v-if="item.drawFreq">
              <b>年金开始领取频率:</b>
              <span>
                {{ getdrawFreqfj(index, item.drawFreq) }}
              </span>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isfj: false,
      isShowfj: [],
      premiumList: [], //交费频率
      pickupmethodList: [] //红利领取方式
    };
  },
  props: ["productList", "extraList", "totalPremium"],
  methods: {
    isShowfja(index) {
      if (this.isShowfj.includes(index)) {
        this.isShowfj = this.isShowfj.filter((item, index) => index != index);
      } else {
        this.isShowfj.push(index);
      }
    },
    //过滤码表字段
    //得到被保险人类型
    getpolicyPeriod(policyPeriod) {
      if (policyPeriod == "" || policyPeriod == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "policyPeriod") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getpolicyPeriodfj(index, policyPeriod) {
      if (policyPeriod == "" || policyPeriod == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "policyPeriod") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getpayPeriod(payPeriod) {
      if (payPeriod == "" || payPeriod == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "payPeriod") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getpayPeriodfj(index, payPeriod) {
      if (payPeriod == "" || payPeriod == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "payPeriod") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getpayMode(payMode) {
      if (payMode == "" || payMode == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "payMode") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getpayModefj(index, payMode) {
      if (payMode == "" || payMode == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "payMode") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawMode(drawMode) {
      if (drawMode == "" || drawMode == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "drawMode") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawModefj(index, drawMode) {
      if (drawMode == "" || drawMode == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "drawMode") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },

    getrank(rank) {
      if (rank == "" || rank == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "rank") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getrankfj(index, rank) {
      if (rank == "" || rank == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "rank") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawStartAge(drawStartAge) {
      if (drawStartAge == "" || drawStartAge == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "drawStartAge") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawStartAgefj(index, drawStartAge) {
      if (drawStartAge == "" || drawStartAge == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "drawStartAge") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawFreq(drawFreq) {
      if (drawFreq == "" || drawFreq == undefined) {
        return "";
      } else {
        let arr = this.productList[0].attList.filter(item => {
          if (item.attCode == "drawFreq") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    },
    getdrawFreqfj(index, drawFreq) {
      if (drawFreq == "" || drawFreq == undefined) {
        return "";
      } else {
        let arr = this.extraList[index].attList.filter(item => {
          if (item.attCode == "drawFreq") {
            return item.attValue;
          }
        });
        return arr[0] && arr[0].attText;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content li {
  list-style: none;
  line-height: 30px;
  color: #333333;
  padding: 3px 0px;
  div {
    padding-left: 8px;
    font-size: 13px;
    letter-spacing: 0;
    p {
      width: 100%;
      height: 100%;
      display: flex;
      padding-left: 8px;
      span {
        flex: 1;
        i {
          font-family: HYQiHei-DES;
          font-size: 13px;
          color: #666666;
          letter-spacing: 0;
          line-height: 25px;
        }
      }
    }
  }
  .bar {
    background: #f3f3f3;
    border-radius: 5px;
    font-size: 13px;
    padding: 0px 15px;
    letter-spacing: 0;
    display: flex;
    .down {
      padding-left: 10px;
    }
    :first-child {
      flex: 8;
    }
    :last-child {
      span {
        font-size: 15px;
        color: #eb5656;
      }
    }
  }
}
.wrap {
  margin: 0 auto;
  margin-bottom: 12.5px;
  width: 345px;
  background: #ffffff;
  border-radius: 3px;
  font-family: HYQiHei-DES;
  position: relative;
  .box {
    width: 3px;
    height: 15px;
    background: #eb5656;
    border-radius: 8px;
    position: absolute;
    top: 16px;
    left: 20px;
  }
  .title {
    height: 47.5px;
    width: 100%;
    line-height: 47.5px;
    border-bottom: 1px solid #cccccc;
    font-size: 16px;
    letter-spacing: 0;
    padding: 0px 35px;
  }
  .content {
    text-align: left;
    .son1 {
      font-size: 15px;
      letter-spacing: 0;
      display: flex;
      padding: 0px 15px;
      font-weight: 550;
      :first-child {
        flex: 8;
      }
      :last-child {
        span {
          font-size: 15px;
          color: #eb5656;
          text-align: right;
        }
      }
    }
  }
}
</style>
