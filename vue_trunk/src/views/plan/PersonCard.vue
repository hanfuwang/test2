<template>
  <ListArea
    class="back"
    needRefresh
    @refresh="refresh"
    :loadmoreFinish="loadmoreOpt.loadmoreFinish"
  >
    <AppContent>
      <div class="codedetail_logo">
        <img src="../../assets/imgs/plan/icon/icon_bg2.png" />
      </div>
      <nav class="code_basic_img">
        <img
          v-if="!agent.imgUrl"
          src="../../assets/imgs/plan/icon/icon_acc.png"
        />
        <img v-if="agent.imgUrl" :src="agent.imgUrl" />
      </nav>
      <aside class="conner">
        <span>{{ agent.personName }}</span>
        <span class="te">{{ agent.gradeId }}</span>
      </aside>
      <!--工号-->
      <div class="code_infor_detail">
        <div class="code_infor_main">
          <ul>
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg3.png"/></span
              >{{ agent.mobile }}
            </li>
            <!--手机-->
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg4.png"/></span
              >{{ agent.email }}
            </li>
            <!--邮箱-->
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg5.png"/></span
              >{{ agent.ldcomName }}
            </li>
            <!--所属机构-->
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg6.png"/></span
              >{{ agent.address }}
            </li>
            <!--机构地址-->
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg7.png"/></span
              >{{ agent.phone }}
            </li>
            <!--座机-->
            <li>
              <span><img src="../../assets/imgs/plan/icon/icon_bg8.png"/></span
              >{{ agent.webaddress }}
            </li>
            <!--官网-->
          </ul>
        </div>
      </div>
      <div class="code_infor1">背景图片为特殊儿童作品 《暖》· 康睿</div>
      <p class="close">
        <img src="../../assets/imgs/plan/icon/jiantou.png" />
      </p>
    </AppContent>
  </ListArea>
</template>

<script>
import ListArea from "@/components/common/ListArea";
export default {
  name: "personCard",
  components: { ListArea },
  data() {
    return {
      agent: {},
      loadmoreOpt: {
        loadmoreFinish: false
      },
      //下拉刷新配置
      refreshOpt: {
        refreshing: false
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.agent = this.$route.params.agent;
    console.log(this.agent);
  },
  methods: {
    async refresh() {
      // 重置pageNum为1
      this.pageNum = 0;
      // 重置loadmoreFinish为false
      this.loadmoreOpt.loadmoreFinish = false;
      // 设置refreshing为true
      this.refreshOpt.refreshing = true;
      // 设置refreshing为false
      this.refreshOpt.refreshing = false;
      this.loadmoreOpt.loadmoreFinish = true;
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  background: url(../../assets/imgs/plan/pic/pic_back.jpg) no-repeat center top;
  background-size: cover;
  height: 100vh;
  border-top: 1px solid transparent;
}
.codedetail_logo {
  padding-left: 9%;
  margin-top: 5%;
}
.codedetail_logo img {
  width: 100%;
  display: block;
  max-width: 90px;
  padding-top: 5px;
}
.code_basic_img {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  margin-bottom: 5px;
  position: relative;
}
.code_basic_img img,
.basic_img_tr img {
  width: 100%;
  display: block;
}
.code_infor_detail {
  padding: 20px 0 30px;
  background: #fff;
  background: rgba(255, 255, 255, 0.59);
}
.conner {
  margin: 10px 0;
  text-align: center;
  font-size: 18px;
  color: #c9a063;
  .te {
    font-size: 15px;
    padding: 5px 0 10px 0;
    letter-spacing: 2px;
  }
}
.code_infor_main {
  padding-left: 18%;
  ul {
    list-style: none;
    li {
      margin-bottom: 7px;
      line-height: 30px;
      position: relative;
      padding-left: 35px;
      min-height: 30px;
      span {
        font-size: 14px;
        position: absolute;
        left: 0;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        width: 30px;
        height: 30px;
        display: inline-block;
        background: #c9a063;
        line-height: 25px;
        text-align: center;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
.code_infor1 {
  padding: 80px 0 25px;
  font-size: 12px;
  text-align: center;
}
.close {
  text-align: center;
  margin-top: 30px;
  img {
    width: 22%;
  }
}
</style>
