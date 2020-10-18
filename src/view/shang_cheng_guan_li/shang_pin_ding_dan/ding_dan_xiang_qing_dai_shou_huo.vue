<template>
  <div>
    <Modal v-model="modal12" draggable scrollable footer-hide title="订单详情" @on-cancel="cancel">
      <div class="content_item">
        <span>平台订单ID：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>商品名称：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>创建时间</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>商品封面图：</span>
        <img src alt />
      </div>
      <div class="content_item">
        <span>商品参数：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>商品数量：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>应付金额：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>快递费：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>分润金额：</span>
        {{101021987}}
      </div>
      <h2>支付信息</h2>
      <div class="content_item">
        <span>支付时间：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>付款方式：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>渠道订单号：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>支付金额：</span>
        {{101021987}}
      </div>

      <div class="content_item">
        <span>支付结果：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>账号信息：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>邮寄信息：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>邮寄省市：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>详细地址：</span>
        {{101021987}}
      </div>
      <!-- 0、待付款； -->
      <!-- 5、已付款，待发货； -->
      <!-- 10、待收货； -->
      <!-- 6、申请退款； -->
      <div class="content_item">
        <span>订单状态：</span>
        {{101021987}}
      </div>
      <!-- <div class="content_item">
        <span>快递信息：</span>
        {{101021987}}
      </div> -->
      <!-- <div class="content_item">
        <label>快递机构：</label>
        <Select v-model="s" placeholder="">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
      </div>
      <div class="content_item">
        <span>订单号：</span>
        <Input v-model="s" />
      </div> -->
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    onCancel: Function,
  },
  data() {
    return {
      modal12: true,
    };
  },
  methods:{
    cancel() {
      this.onCancel();
    },
  }
};
</script>
<style lang="scss">
.content_item {
  font-size: 16px;
  line-height: 24px;
}
.content_item > span {
  font-size: 14px;
}
</style>