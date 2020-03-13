<template>
  <Page class="demo-http demo-page">
    <div class="btn-wrap">
      <button class="btn" @click="httpTest">
        请求统计功能使用率接口
      </button>
      <button class="btn" @click="httpGetIp">
        请求第三方获取用户IP接口
      </button>
      {{ ip }}
      <button class="btn" @click="httpArea">
        地区码表查询
      </button>
      <button class="btn" @click="httpJob">
        职业码表查询
      </button>
    </div>
  </Page>
</template>

<script>
export default {
  name: "demoHttp",
  data() {
    return {
      ip: ""
    };
  },
  computed: {},
  created() {},
  methods: {
    httpTest() {
      utils.http
        .post(interfaces.global.test, {
          reviewid: "",
          functioncode: "all"
        })
        .then(() => {});
    },
    httpGetIp() {
      utils.http.get(interfaces.global.getIp).then(res => {
        this.ip = res.data;
      });
    },
    httpArea() {
      const params = {
        cdAreaCodeDTO: {
          className: "",
          parentCode: ""
        }
      };
      utils.http
        .post(interfaces.global.queryAreaNextLevel, params)
        .then(() => {});
    },
    httpJob() {
      const params = {
        cdOccupationDTO: {
          className: "",
          parentOccupationCode: ""
        }
      };
      utils.http
        .post(interfaces.global.queryJobNextLevel, params)
        .then(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/demo/index.scss";
</style>
