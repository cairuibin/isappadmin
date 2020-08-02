<template>
  <div>
    <Modal v-model="modal12" draggable scrollable title="Modal 1">
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
      <div class="content_item">
        <span>订单状态：</span>
        {{101021987}}
      </div>
      <div class="content_item">
        <span>快递信息：</span>
        {{101021987}}
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal12: true,
    };
  },
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