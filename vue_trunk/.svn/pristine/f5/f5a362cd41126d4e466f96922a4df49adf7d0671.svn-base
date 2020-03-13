<template>
  <Page class="selector" :withAppBar="true">
    <!-- 头部搜索bar -->
    <AppBar class="search-bar">
      <!-- 左侧返回箭头 -->
      <img
        class="icon icon-back"
        src="@/assets/imgs/common/icon/icon_back.png"
        @click="back"
        slot="left"
      />
      <!-- 搜索框-非地区出现 -->
      <input
        v-show="type !== 'area'"
        class="search-ipt"
        type="search"
        :placeholder="searchPlaceholder"
        v-model="keywords"
        @focus="handlerIptFocus"
        @blur="handlerIptBlur"
        slot="center"
      />
      <!-- 提示内容-地区出现 -->
      <div v-show="type === 'area'" class="area-tips" slot="center">
        请选择所在地区
      </div>

      <!-- 右侧搜索按钮 -->
      <img
        v-show="selectType === 'search'"
        class="icon icon-search"
        src="@/assets/imgs/common/icon/icon_search.png"
        @click="search"
        slot="right"
      />
    </AppBar>

    <AppContent>
      <!-- 点击结果--外层(展示最顶层数据) -->
      <section
        v-show="selectType === 'click' && clickStack.length === 0"
        class="click-result-outer click-result result-content"
        :style="{ height: resultContentHeight }"
      >
        <p
          class="result-line"
          v-for="item of clickResult"
          :key="item[typeParams.id]"
          @click="handlerClickItemClick(item, 'next')"
        >
          {{ item[typeParams.desc] }}
        </p>
      </section>

      <!-- 点击结果--内层(阶梯式展示数据，分为上下两部分) -->
      <section
        v-show="selectType === 'click' && clickStack.length > 0"
        class="click-result-inner click-result result-content"
        :style="{ height: resultContentHeight }"
      >
        <!-- inner-top-list -->
        <div v-show="innerTopList.length > 0" class="inner-top-list">
          <p
            class="result-line"
            v-for="(item, index) of innerTopList"
            :key="item[typeParams.id]"
            @click="handlerClickItemClick(item, index)"
          >
            {{ item[typeParams.desc] }}
          </p>
        </div>

        <!-- inner-bottom-list -->
        <div v-show="innerBottomList.length > 0" class="inner-bottom-list">
          <p
            class="result-line"
            v-for="item of innerBottomList"
            :key="item[typeParams.id]"
            @click="handlerClickItemClick(item, 'next')"
          >
            {{ item[typeParams.desc] }}
          </p>
        </div>
      </section>

      <!-- 搜索结果 -->
      <section
        class="search-result result-content"
        v-show="selectType === 'search'"
        :style="{ height: resultContentHeight }"
      >
        <!-- 有数据 -->
        <div class="have-data" v-show="searchResult && searchResult.length > 0">
          <p
            class="result-line"
            v-for="item of searchResult"
            :key="item[typeParams.id]"
            @click="select(item)"
          >
            {{ item[typeParams.desc] }}
          </p>
        </div>
        <!-- 无数据 -->
        <div class="no-data" v-show="!searchResult || searchResult.length == 0">
          {{ hadSearch ? "暂无数据" : "请输入关键字后开始搜索" }}
        </div>
      </section>
    </AppContent>
  </Page>
</template>

<script>
export default {
  name: "selector",
  props: {
    // selector类型：bank：银行，job：职业，area：地区
    type: {
      type: String,
      default: "bank"
    },
    // 选择器类型对应的id与desc字段
    typeParams: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      isIptFocus: false, // 输入框是否获取焦点
      selectType: "click", // 选择类型，click直接选择，search查找后选择
      keywords: "", // 搜索关键字
      hadSearch: false, // 是否已经搜索过
      // click栈
      clickStack: [],
      // 点击结果
      clickResult: [],
      // 搜索结果
      searchResult: []
    };
  },
  computed: {
    // inner上部内容
    innerTopList() {
      return this.clickStack;
    },
    // inner下部内容
    innerBottomList() {
      if (this.clickStack.length > 0) {
        // 有clickStack，显示堆栈最后一个元素的sonList
        return this.clickStack[this.clickStack.length - 1].sonList;
      } else {
        // 没有clickStack，返回空数组
        return [];
      }
    },
    // search的placeholder
    searchPlaceholder() {
      switch (this.type) {
        case "bank": {
          return "请输入网点名称";
        }
        case "job": {
          return "请输入职业名称";
        }
        case "area": {
          return "请输入所在地区";
        }
        default: {
          return "请输入网点名称";
        }
      }
    },
    // resultContent高度
    resultContentHeight() {
      // 真实的searchBar高度
      const searchBarHeight = 60 * globalConfig.ui.pxRadio;
      // 顶部安全距离
      const safeTop = globalConfig.ui.safeTop;
      // resultContent高度
      return `calc(100vh - ${searchBarHeight}px - ${safeTop}px)`;
    }
  },
  created() {
    // 初始化组件
    this.initComp();
  },
  methods: {
    // 初始化组件
    async initComp() {
      // 初始化第一级clickResult
      this.clickResult = await this.GetNextLevel("");
    },

    // 根据id查询下一级的list
    GetNextLevel(id) {
      // 分type查询
      return this[`${this.type}GetNextLevel`](id);
    },
    // 根据id查询下一级的list：银行
    bankGetNextLevel(agentcom) {
      return new Promise(resovle => {
        // params
        const params = {
          agentcom: agentcom
        };

        // http
        utils.http
          .post(interfaces.global.queryBankNextLevel, params)
          .then(res => {
            if (Array.isArray(res.orgAgencyList)) {
              resovle(res.orgAgencyList);
            } else {
              resovle([]);
            }
          });
      });
    },
    // 根据id查询下一级的list：地区
    areaGetNextLevel(areaCode) {
      return new Promise(resovle => {
        // params
        const params = {
          cdAreaCodeDTO: {
            className: "",
            parentCode: areaCode
          }
        };

        // http
        utils.http
          .post(interfaces.global.queryAreaNextLevel, params)
          .then(res => {
            if (
              res.cdAreaCodeDTO &&
              Array.isArray(res.cdAreaCodeDTO.cdAreaCodeList)
            ) {
              resovle(res.cdAreaCodeDTO.cdAreaCodeList);
            } else {
              resovle([]);
            }
          });
      });
    },
    // 根据id查询下一级的list：职业
    jobGetNextLevel(jobCode) {
      return new Promise(resovle => {
        // params
        const params = {
          cdOccupationDTO: {
            className: "",
            parentOccupationCode: jobCode
          }
        };

        // http
        utils.http
          .post(interfaces.global.queryJobNextLevel, params)
          .then(res => {
            if (
              res.cdOccupationDTO &&
              Array.isArray(res.cdOccupationDTO.cdOccuptionList)
            ) {
              resovle(res.cdOccupationDTO.cdOccuptionList);
            } else {
              resovle([]);
            }
          });
      });
    },

    // 查询
    search() {
      if (!this.keywords) {
        utils.ui.tips({
          msg: "请先输入关键字后再进行搜索",
          type: "warn"
        });
        return;
      }
      // 调用对应的search方法
      this[`${this.type}Search`]();
    },
    // 查询：银行
    bankSearch() {
      // 请求参数
      const params = {
        bankName: this.keywords
      };
      // http：模糊查询网点列表
      utils.http.post(interfaces.global.queryBankByName, params).then(res => {
        // 设置当前已经搜索过
        this.hadSearch = true;
        // 赋值列表
        if (Array.isArray(res.orgAgencyList)) {
          this.searchResult = res.orgAgencyList;
        } else {
          this.searchResult = [];
        }
      });
    },
    // 查询：地区
    areaSearch() {
      // params
      const params = {
        cdAreaCodeDTO: {
          className: "",
          parentCode: "",
          searchName: this.keywords
        }
      };

      // http
      utils.http.post(interfaces.global.queryAreaByName, params).then(res => {
        // 设置当前已经搜索过
        this.hadSearch = true;
        // 赋值列表
        if (
          res.cdAreaCodeDTO &&
          Array.isArray(res.cdAreaCodeDTO.cdAreaCodeList)
        ) {
          this.searchResult = res.cdAreaCodeDTO.cdAreaCodeList;
        } else {
          this.searchResult = [];
        }
      });
    },
    // 查询：职业
    jobSearch() {
      // params
      const params = {
        cdOccupationDTO: {
          className: "",
          parentOccupationCode: "",
          searchName: this.keywords
        }
      };

      // http
      utils.http.post(interfaces.global.queryJobByName, params).then(res => {
        // 设置当前已经搜索过
        this.hadSearch = true;
        // 赋值列表
        if (
          res.cdOccupationDTO &&
          Array.isArray(res.cdOccupationDTO.cdOccuptionList)
        ) {
          this.searchResult = res.cdOccupationDTO.cdOccuptionList;
        } else {
          this.searchResult = [];
        }
      });
    },

    // 返回
    back() {
      if (this.selectType === "search") {
        // search状态：返回到click
        this.selectType = "click";
      } else if (this.selectType === "click") {
        // 关闭页面
        this.$emit("close");
      }
    },

    // 选中
    select(item) {
      // 调用对应的select方法
      this[`${this.type}Select`](item);
    },
    // 选中：bank
    bankSelect(item) {
      this.$emit("select", item);
    },
    // 选中：area
    areaSelect(item) {
      // 地区选中需要遍历clickStack拿到省市区三个字段
      const clickStack = this.clickStack;
      let provinceCode, provinceName, cityCode, cityName, areaCode, areaName;
      if (clickStack.length === 0) {
        // 港澳台，只有一级
        provinceCode = item.areaCode;
        cityCode = item.areaCode;
        areaCode = item.areaCode;

        provinceName = item.areaName;
        cityName = item.areaName;
        areaName = item.areaName;
      } else {
        // 其他普通地区，有三级
        provinceCode = clickStack[0].areaCode;
        cityCode = clickStack[1].areaCode;
        areaCode = item.areaCode;

        provinceName = clickStack[0].areaName;
        cityName = clickStack[1].areaName;
        areaName = item.areaName;
      }
      // emitItem
      const emitItem = {
        provinceCode, // 省code
        provinceName, // 省名称
        cityCode, // 市code
        cityName, // 市名称
        areaCode, // 区code
        areaName // 区名称
      };
      this.$emit("select", emitItem);
    },
    // 选中：job
    jobSelect(item) {
      this.$emit("select", item);
    },

    // clickitem click处理
    async handlerClickItemClick(item, deep) {
      // 获取子数据
      if (!item.sonList) {
        item.sonList = await this.GetNextLevel(item[this.typeParams.id]);
      }

      if (item.sonList.length === 0) {
        // 查不到子元素了，证明是根节点了，直接调用select方法
        this.select(item);
        return;
      }

      // 不是根节点
      if (deep > this.clickStack.length || deep === "next") {
        // 向下点
        // 添加当前点
        this.clickStack.push(item);
      } else if (deep === this.clickStack.length) {
        // 同级点--暂时不存在这种情况
        // 删除原有点
        this.clickStack.pop();
        // 添加当前点
        this.clickStack.push(item);
      } else if (deep < this.clickStack.length) {
        // 回点
        // 删除下级数据
        this.clickStack.splice(deep);
      }
    },
    // ipt得到焦点
    handlerIptFocus() {
      this.isIptFocus = true;
      this.selectType = "search";
    },
    // ipt失去焦点
    handlerIptBlur() {
      this.isIptFocus = false;
      // ios键盘bug修复
      utils.ui.handlerIOSKeyboardHidden();
    }
  }
};
</script>

<style lang="scss" scoped>
.selector {
  border-top: 1px solid rgba(255, 255, 255, 0);
  position: fixed;
  left: 0;
  top: 0;
  background: #ffffff;
  z-index: $zIndex-popup;
}

// search-bar
.search-bar {
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.1);
  background: #ffffff;
  .search-ipt {
    @include reset-input;
    @include display-flex;
    height: 34px;
    line-height: 20px;
    justify-content: flex-start;
    flex: 1;
    background: #f3f3f3;
    border-radius: 17px;
    font-size: 14px;
    color: #000000;
    padding: 0 20px;
    letter-spacing: 1px;
    // x去除
    &::-webkit-search-cancel-button {
      display: none;
    }
    // placeholder样式重写
    &::placeholder {
      font-size: 15px;
      color: #c0c0c0;
      text-align: center;
    }
  }
  .area-tips {
    @include display-flex;
    height: 34px;
    font-size: 15px;
    flex: 1;
    letter-spacing: 1px;
    color: #000000;
  }
  .icon {
    height: auto;
    &.icon-back {
      width: 12px;
      margin-right: 10px;
    }
    &.icon-search {
      width: 20px;
      margin-left: 10px;
    }
  }
}

// 结果
.result-content {
  position: relative;
  padding: 0 20px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .result-line {
    @include overflow-emphasis;
    @include lineheight-height(42px);
    font-size: 15px;
    padding: 0 10px;
    border-bottom: 1px solid #f3f3f3;
  }
}

// click-result
.click-result {
  .result-line {
    color: #7e7e7e;
  }
  .inner-top-list {
    margin: 0 -20px;
    padding: 0 20px;
    border-bottom: 4px solid #f3f3f3;
    .result-line {
      font-size: 17px;
      color: #000000;
    }
  }
}

// search-result
.search-result {
  .result-line {
    color: #333333;
  }
  // no-data
  .no-data {
    @include display-flex;
    font-size: 15px;
    height: 100px;
    color: #999999;
  }
}
</style>
