<template>
  <div class="toDucument">
    <img
      v-for="(item, index) in imgList"
      :key="index"
      v-lazy="item.fileUrl"
    /><br />
  </div>
</template>

<script>
export default {
  name: "BreifImg",
  components: {},
  props: {
    //产品的pdf,图片
    breifImg: {
      type: Array,
      default: () => {
        return [];
      }
    },
    //图片的类型
    type: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      imgList: [] //公司简介或理赔流程图片
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.type == "2") {
      //公司简介图片
      this.breifImg.filter(item => {
        if (item.docType == "PD008") {
          this.imgList.push(item);
        }
      });
    } else if (this.type == "3") {
      //理赔流程的图片
      this.breifImg.filter(item => {
        if (item.docType == "PD009") {
          this.imgList.push(item);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toDucument {
  padding-bottom: 55px;
  img {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
