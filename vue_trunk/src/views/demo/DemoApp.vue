<template>
  <Page class="demo-app" :withAppBar="!globalConfig.isWx">
    <!-- app-bar -->
    <AppBar class="app-bar" v-if="!globalConfig.isWx">
      <img
        slot="left"
        src="../../assets/imgs/common/icon/icon_back.png"
        class="icon icon-back"
        @click="goBack"
      />
      <template slot="center">
        我是一个标题
      </template>
      <img
        slot="right"
        src="../../assets/imgs/common/icon/icon_search.png"
        class="icon icon-search"
        @click="search"
      />
    </AppBar>

    <!-- app-content -->
    <AppContent class="app-content">
      <ListArea
        :list="list"
        needRefresh
        needLoadmore
        :refreshing="refreshOpt.refreshing"
        :loadmoreing="loadmoreOpt.loadmoreing"
        :loadmoreFinish="loadmoreOpt.loadmoreFinish"
        @refresh="refresh"
        @loadmore="loadmore"
      >
        <section class="list">
          <p class="item" v-for="item of list" :key="item">
            <span>我是内容{{ item }}</span>
            <button class="del-btn" @click="del(item)">删除</button>
          </p>
        </section>
      </ListArea>
    </AppContent>
  </Page>
</template>

<script>
import ListArea from "@/components/common/ListArea";
export default {
  name: "demoApp",
  components: {
    ListArea
  },
  data() {
    return {
      list: [], // list
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20
      },
      // 下拉刷新配置项
      refreshOpt: {
        refreshing: false
      },
      // 加载更多配置项
      loadmoreOpt: {
        loadmoreing: false,
        loadmoreFinish: false
      }
    };
  },
  computed: {},
  created() {
    // 初始化页面
    this.initPage();
  },
  methods: {
    // 初始化页面
    initPage() {
      // 加载更多
      this.loadmore();
    },
    // 返回
    goBack() {
      this.back();
    },
    // 搜索
    search() {
      utils.ui.tips("点击了搜索按钮");
    },
    // 下拉刷新
    async refresh() {
      console.log("refresh");

      // 重置pageNum为1
      this.queryParams.pageNum = 1;
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
        this.queryParams.pageNum += 1;
        // 赋值list
        this.list = data;
        // 处理加载完毕的情况
        if (data.length < this.queryParams.pageSize) {
          this.loadmoreOpt.loadmoreFinish = true;
        }
      }
    },
    // 加载更多
    async loadmore() {
      console.log("loadmore");

      // 设置loadmoreing为true
      this.loadmoreOpt.loadmoreing = true;
      // 获取数据
      const data = await this.fetchData().catch(() => {});
      // 设置loadmoreing为false
      this.loadmoreOpt.loadmoreing = false;

      if (data) {
        // 查询成功的情况
        // pageNum + 1
        this.queryParams.pageNum += 1;
        // 叠加list
        this.list = this.list.concat(data);
        // 处理加载完毕的情况
        if (data.length < this.queryParams.pageSize) {
          this.loadmoreOpt.loadmoreFinish = true;
        }
      }
    },
    // 删除元素
    del(item) {
      // 这里后台返回删除成功了...
      utils.ui.tips(`${item}项被删除成功`);

      // 清空原list
      this.list = [];
      // refresh重新刷新页面
      this.refresh();
    },
    // 获取数据
    fetchData() {
      return new Promise(resolve => {
        // 模拟http操作返回数据
        setTimeout(() => {
          if (this.queryParams.pageNum >= 3) {
            // 模拟没有更多数据
            resolve(this.makeArray(3));
          } else {
            // 模拟还有数据
            resolve(this.makeArray(20));
          }
        }, 3000);
      });
    },
    // 创建指定长度的数组
    makeArray(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(Math.random());
      }
      return arr;
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
    &.icon-search {
      width: 20px;
    }
  }
}
.list {
  .item {
    @include display-flex;
    @include lineheight-height(40px);
    justify-content: space-between;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid #cccccc;
    .del-btn {
      @include reset-button;
      color: $color-error;
    }
  }
}
</style>
