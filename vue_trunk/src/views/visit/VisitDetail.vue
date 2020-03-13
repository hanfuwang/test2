<template>
  <page class="visit_detail" :withAppBar="!globalConfig.isWx">
    <!-- 导航栏 -->
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="@/assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        回访进度详情
      </template>
    </AppBar>
    <!-- 主体 -->
    <AppContent class="app-content">
      <!-- 保单基本信息 -->
      <section class="vd-list">
        <ul>
          <li>
            <i>保单号</i>
            <i>{{ visitItem.productNo }}</i>
          </li>
          <li>
            <i>所属网点</i>
            <i>{{ visitItem.organName }}</i>
          </li>
          <li>
            <i>任务状态</i>
            <i>{{ visitItem.dataState }}</i>
          </li>
          <li>
            <i>拨打次数</i>
            <i>{{ visitItem.handNum }}</i>
          </li>
        </ul>
      </section>
      <!-- 保单回访和工单详情 -->
      <section>
        <div
          class="list-content"
          v-for="(item, index) in visitItem.dealSwfList"
          :key="index"
        >
          <div class="title-content" @click="showDetail(index)">
            <div class="list-title">
              <img
                v-if="item['dealType']"
                class="title-icon"
                src="@/assets/imgs/visit/icon/icon_huifang.png"
                alt
              />
              <img
                v-else
                class="title-icon"
                src="@/assets/imgs/visit/icon/icon_gongdan.png"
                alt
              />
              <i :style="{ color: item['dealType'] ? '#4AC4A3' : '#71A8F9' }"
                >第{{ item.orderNum }}次{{
                  item["dealType"] ? "回访" : "工单"
                }}记录</i
              >
            </div>
            <div class="list-time">
              <i>{{
                item["dealType"]
                  ? item.dealTime.split(".")[0]
                  : item.swfCreateTime.split(".")[0]
              }}</i>
              <img
                v-if="!item.ifCheck"
                class="arrow-icon"
                src="@/assets/imgs/common/icon/icon_arrow_bottom.png"
                alt
              />
              <img
                v-if="item.ifCheck"
                class="arrow-icon"
                src="@/assets/imgs/visit/icon/icon_arrow_top.png"
                alt
              />
            </div>
          </div>
          <!-- 回访详情 -->
          <ul v-if="item['dealType'] && item.ifCheck">
            <li>
              <i>回访时间</i>
              <i>{{ item.dealTime.split(".")[0] }}</i>
            </li>
            <li>
              <i>回访方式</i>
              <i>{{ item.dealType }}</i>
            </li>
            <li>
              <i>回访结果</i>
              <i>{{ item.result }}</i>
            </li>
            <li>
              <i>回访二级结果</i>
              <i>{{ item.subResult }}</i>
            </li>
            <li>
              <i>回访三级结果</i>
              <i>{{ item.tertiusResult }}</i>
            </li>
          </ul>
          <!-- 工单详情 -->
          <ul v-if="item.ifCheck && !item['dealType']">
            <li>
              <i>工单类型</i>
              <i>{{ item.swfType }}</i>
            </li>
            <li>
              <i>工单详情</i>
              <i>{{ item.swfInfo }}</i>
            </li>
          </ul>
        </div>
      </section>
    </AppContent>
  </page>
</template>

<script>
export default {
  name: "VisitDetail",
  components: {},
  props: {},
  data() {
    return {
      visitItem: null
    };
  },
  computed: {},
  watch: {},
  created() {
    this.visitItem = this.$route.params;
    let visitItem = this.visitItem;
    console.log(visitItem);
    // 工单第一条和回访第一条默认展开
    if (visitItem.dealSwfList.length && visitItem["dealSwfList"]) {
      const first = visitItem["dealSwfList"][0];
      visitItem["dealSwfList"][0]["ifCheck"] = true;
      try {
        visitItem["dealSwfList"].forEach(item => {
          if (!!item["dealType"] != !!first["dealType"]) {
            item["ifCheck"] = true;
            throw new Error("fucker");
          }
        });
      } catch (e) {
        console.log("跳出");
      }
    }
    this.visitItem = JSON.parse(JSON.stringify(visitItem));
  },
  methods: {
    // 返回
    goBack() {
      this.back();
    },
    // 点击展开收起
    showDetail(index) {
      let tar = this.visitItem;
      tar.dealSwfList.forEach(
        (item, i) => index === i && (item.ifCheck = !item.ifCheck)
      );
      this.visitItem = JSON.parse(JSON.stringify(tar));
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
  padding: 0 20px;
  ul li {
    @include display-flex;
    border-bottom: 0.5px #e7e7e7 solid;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
    padding: 8px 0 9px 0;
    i {
      font-style: normal;
      &:nth-child(1) {
        font-size: 14px;
        color: #333333;
        padding-left: 16px;
      }
      &:nth-child(2) {
        font-size: 13px;
        color: #999999;
        padding-right: 16px;
        width: 48.5%;
        text-align: right;
      }
    }
  }
  i {
    font-style: normal;
  }
  .list-content {
    padding-top: 9px;
    .title-content {
      @include display-flex;
      align-items: center;
      height: 37px;
      background: #f3f3f3;
      justify-content: space-between;
      .list-title {
        @include display-flex;
        align-items: center;
        padding-left: 9px;
        .title-icon {
          width: 17px;
          height: 17px;
          margin-right: 5px;
        }
      }
      .list-time {
        @include display-flex;
        align-items: center;
        padding-right: 16px;
        .arrow-icon {
          width: 8px;
          height: 4px;
          margin-left: 11px;
        }
      }
    }
  }
}
</style>
