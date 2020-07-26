<template>
  <div>
    <Modal v-model="modal2" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>审核退款</span>
      </p>
      <div>
        <div class="div_content">
          <span>付款类型：</span>
          {{'训练营'}}
        </div>
        <div class="div_content">
          <span>申请时间：</span>
          {{'yyyy-MM-dd HH:mm:ss'}}
        </div>

        <div class="div_content">
          <span>退款名称：：</span>
          {{'暑期训练营杭州站'}}
        </div>
        <div class="div_content">
          <span>用户信息：</span>
          {{'尤硕/18611587069'}}
        </div>
        <div class="div_content">
          <span>支付信息：</span>
          {{'支付宝/20000000111111112899'}}
        </div>
        <div class="div_content">
          <span>退款金额：</span>
          {{3800.00}}
        </div>
        <div class="div_content">
          <span>订单状态：</span>
          {{'退款成功'}}
        </div>
        <div class="div_content">
          <span>退款操作：</span>操作者姓名
        </div>
        <div class="div_content">
          <span>退款操作时间：</span>yyyy-MM-dd HH:mm:ss
        </div>
        <div class="div_content">
          <span>退款结果：</span>
          退款成功
        </div>
        <div class="div_content">备注：</div>
      </div>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal2: true,
      modal_loading: false,
      shen_he_tong_guo: "",
      sheng_he_bo_hui: "",
      bo_hui_yuan_yin: "",
      qi_ta: "",
    };
  },
  methods: {
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modal2 = false;
        this.$Message.success("Successfully delete");
      }, 2000);
    },
  },
};
</script>

<style scoped lang='scss'>
.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .btn {
    margin-left: 65%;
  }
}
</style>