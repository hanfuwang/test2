<template>
  <div class="share-wx" @click="shareCancel">
    <Modal class="dp-model" :show="visible">
      <div class="bottom">
        <div class="main">
          <div
            class="share friend"
            v-if="friendScene"
            @click="transferParentFunc('0')"
          >
            <div class="share-img">
              <img src="../../assets/imgs/common/icon/icon_share_friend.png" />
            </div>
            <div class="share-word">微信好友</div>
          </div>
          <div
            class="share moments"
            v-if="zoneScene"
            @click="transferParentFunc('1')"
          >
            <div class="share-img">
              <img src="../../assets/imgs/common/icon/icon_share_zone.png" />
            </div>
            <div class="share-word">朋友圈</div>
          </div>
          <div
            class="share moments"
            v-if="duanxinScene"
            @click="transferParentFunc('2')"
          >
            <div class="share-img">
              <img src="../../assets/imgs/common/icon/icon_share_duanxin.png" />
            </div>
            <div class="share-word">短信</div>
          </div>
        </div>
        <div class="cancel" @click="shareCancel">取消</div>
      </div>
    </Modal>
    <Modal class="dp-model" :show="isTel">
      <div class="confirm-content">
        <!-- 描述 -->
        <div class="content-msg">
          <FormInput
            v-model="telphone"
            placeholder="请填写手机号"
            type="tel"
          ></FormInput>
        </div>
        <!-- btn组 -->
        <div class="btn-list">
          <!-- 单个按钮 -->
          <div class="btn" @click="cancelMsg">
            取消
          </div>
          <div class="btn" @click="sendMsg">确定</div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/common/ui/Modal";
import FormInput from "@/components/common/form/FormInput";
export default {
  data() {
    return {
      telphone: "",
      isTel: false,
      visible: false, //显示隐藏弹窗
      friendScene: false, //朋友
      zoneScene: false, //朋友圈
      duanxinScene: false //短信
    };
  },
  components: {
    Modal,
    FormInput
  },
  props: {
    //显示隐藏弹窗
    isOpenWx: {
      type: Boolean,
      default: false
    },
    //分享场景
    shareScene: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //微信分享参数
    shareObj: {
      type: Object,
      default: function() {
        return {};
      }
    },
    //短信发送参数
    duanxinSendObj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    isOpenWx(val) {
      this.visible = val;
    },
    //分享场景
    shareScene: {
      handler: function(val) {
        if (val.includes("friendScene")) {
          this.friendScene = true;
        }
        if (val.includes("zoneScene")) {
          this.zoneScene = true;
        }
        if (val.includes("duanxinScene")) {
          this.duanxinScene = true;
        }
      },
      immediate: true
    }
  },
  methods: {
    shareCancel() {
      this.$emit("shareCancel", this.visible);
    },
    //分享
    transferParentFunc(shareTarget) {
      //0 好友 1朋友圈
      if (shareTarget != 2) {
        let shareObj = this.shareObj;
        shareObj.shareTarget = shareTarget;
        //console.log(shareObj);
        utils.native.shareWx(shareObj);
      } else {
        this.openMsg();
      }
    },
    //开启短信窗体
    openMsg() {
      this.isTel = true;
    },
    //发送短信
    sendMsg() {
      if (this.telphone == "") {
        utils.ui.tips({
          msg: "请填写手机号",
          type: "error"
        });
        return;
      }
      if (!utils.regExp.get("mobile").test(this.telphone)) {
        utils.ui.tips({
          msg: "请填写正确的手机号",
          type: "error"
        });
        return;
      }
      let duanxinSendObj = this.duanxinSendObj;
      duanxinSendObj.mobile = this.telphone;
      const params = {
        policy: duanxinSendObj
      };
      utils.http.post(interfaces.plan.sendMsg, params).then(() => {
        this.isTel = false;
        this.telphone = "";
        utils.ui.tips({
          msg: "短信分享成功",
          type: "success"
        });
      });
    },
    cancelMsg() {
      this.isTel = false;
      this.telphone = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.share-wx {
  .bottom {
    position: fixed;
    bottom: 15px;
    left: 15px;
    right: 15px;
    height: 152px;
    border-radius: 5px;
    background: #fff;
    .main {
      display: flex;
      width: 100%;
      background: #fff;
      height: 100px;
      border-bottom: 1px solid #ccc;
      border-radius: 5px;
      .share {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        .share-img {
          img {
            height: 50px;
            width: 50px;
          }
        }
        .share-word {
          text-align: center;
          font-size: 12px;
          font-weight: 400;
          color: #333;
          padding-left: 10px;
        }
      }
    }
    .cancel {
      height: 25px;
      background: rgba(255, 255, 255, 1);
      line-height: 48px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .confirm-content {
    background-color: #ffffff;
    border-radius: 5px;
    width: 76vw;
    .content-msg {
      @include display-flex;
      min-height: 65px;
      line-height: 20px;
      padding: 13px 10px;
      border-bottom: 1px solid #cccccc;
    }
  }
  // btn组
  .btn-list {
    @include display-flex;
    .btn {
      @include display-flex;
      height: 45px;
      text-align: center;
      flex: 1;
      &:not(:last-of-type) {
        border-right: 1px solid #cccccc;
      }
    }
  }
}
</style>
<style>
.share-wx .vali-form {
  width: 100%;
}
</style>
