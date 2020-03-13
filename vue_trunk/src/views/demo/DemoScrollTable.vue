<template>
  <Page class="demo-scroll-table">
    <ScrollTable
      :leftHeader="leftHeader"
      :leftList="leftList"
      :rightHeader="rightHeader"
      :rightList="rightList"
      :tableHeight="tableHeight"
    ></ScrollTable>
  </Page>
</template>

<script>
import ScrollTable from "../../components/common/ScrollTable";
export default {
  name: "demoScrollTable",
  components: {
    ScrollTable
  },
  data() {
    return {
      // 左侧头
      leftHeader: [
        {
          param: "age",
          desc: "年龄"
        },
        {
          param: "insureYear",
          desc: "保险年份",
          width: 120
        }
      ],
      // 左侧list
      leftList: [
        {
          age: 1,
          insureYear: 0
        },
        {
          age: 2,
          insureYear: 1
        },
        {
          age: 3,
          insureYear: 2
        },
        {
          age: 4,
          insureYear: 3
        },
        {
          age: 5,
          insureYear: 4
        },
        {
          age: 1,
          insureYear: 1
        },
        {
          age: 1,
          insureYear: 0
        },
        {
          age: 2,
          insureYear: 1
        },
        {
          age: 3,
          insureYear: 2
        },
        {
          age: 4,
          insureYear: 3
        },
        {
          age: 5,
          insureYear: 4
        },
        {
          age: 1,
          insureYear: 1
        },
        {
          age: 1,
          insureYear: 0
        },
        {
          age: 2,
          insureYear: 1
        },
        {
          age: 3,
          insureYear: 2
        },
        {
          age: 4,
          insureYear: 3
        },
        {
          age: 5,
          insureYear: 4
        },
        {
          age: 1,
          insureYear: 1
        },
        {
          age: 1,
          insureYear: 0
        },
        {
          age: 2,
          insureYear: 1
        },
        {
          age: 3,
          insureYear: 2
        },
        {
          age: 4,
          insureYear: 3
        },
        {
          age: 5,
          insureYear: 4
        },
        {
          age: 1,
          insureYear: 1
        }
      ],
      // 右侧头
      rightHeader: [
        {
          param: "die",
          desc: "身故保障金",
          width: 120
        },
        {
          param: "coverage",
          desc: "保额"
        },
        {
          param: "premium",
          desc: "保费"
        },
        {
          param: "cash",
          desc: "现金价值表",
          width: 120
        }
      ],
      // 右侧list
      rightList: [
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        },
        {
          die: 999,
          coverage: 999,
          premium: 999,
          cash: 999
        }
      ],
      tableHeight: utils.ui.getClientHeight() // table高度
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
