<template>
  <div>
    <Modal v-model="modal12" scrollable footer-hide title="订单详情" @on-cancel="cancel">
      <div class="content_item">
        <span>平台订单ID：</span>
        {{rowInfo.id}}
      </div>
      <div class="content_item">
        <span>商品名称：</span>
        {{rowInfo.goodsName}}
      </div>
      <div class="content_item">
        <span>创建时间</span>
        {{rowInfo.createTime}}
      </div>
      <div class="content_item">
        <span>商品封面图：</span>
        <img src alt />
      </div>
      <div class="content_item">
        <span>商品参数：</span>
        <!-- {{rowInfo}} -->
      </div>
      <div class="content_item">
        <span>商品数量：</span>
        {{rowInfo.goodsNumber}}
      </div>
      <div class="content_item">
        <span>应付金额：</span>
        {{rowInfo.totalPrice}}
      </div>
      <div class="content_item">
        <span>快递费：</span>
        {{rowInfo.shippingMoney}}
      </div>
      <div class="content_item">
        <span>分润金额：</span>
      </div>
      <h2>支付信息</h2>
      <div class="content_item">
        <span>支付时间：</span>
        {{rowInfo.payTime}}
      </div>
      <div class="content_item">
        <span>付款方式：</span>
      </div>
      <div class="content_item">
        <span>渠道订单号：</span>
        {{rowInfo.id}}
      </div>
      <div class="content_item">
        <span>支付金额：</span>
        {{rowInfo.totalMoney}}
      </div>
      <div class="content_item">
        <span>支付结果：</span>
        {{rowInfo.stauts}}
      </div>
      <div class="content_item">
        <span>账号信息：</span>
      </div>
      <div class="content_item">
        <span>邮寄信息：</span>
      </div>
      <div class="content_item">
        <span>邮寄省市：</span>
      </div>
      <div class="content_item">
        <span>详细地址：</span>
      </div>
      <!-- 0、待付款； -->
      <!-- 5、已付款，待发货； -->
      <!-- 10、待收货； -->
      <!-- 6、申请退款； -->
      <div class="content_item">
        <span>订单状态：</span>
        <span v-if="rowInfo.stauts===0">待支付</span>
        <span v-else-if="rowInfo.stauts==5">待发货</span>
        <span v-else-if="rowInfo.stauts==6">
          申请退款(代发货)
          <Button style="marginLeft:10px;" type="primary" @click="tuikuan">退款</Button>
        </span>
        <span v-else-if="rowInfo.stauts===10">待收货</span>
      </div>
      <div v-if="rowInfo.stauts===10" class="content_item">
        <span>快递信息：</span>
      </div>
      <div v-if="rowInfo.stauts===5" class="content_item">
        <label>快递机构：</label>
        <Select v-model="s" placeholder>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
        </Select>
      </div>
      <div v-if="rowInfo.stauts===5" class="content_item">
        <span>订单号：</span>
        <Input v-model="dingdanhao" />
      </div>
      <div v-if="rowInfo.stauts===5">
        <Button type="primary" @click="fahuo">发货</Button>
        <Button type="primary" @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    onCancel: Function,
    rowInfo: Object
  },
  data() {
    return {
      modal12: true,
      s: "",
      dingdanhao: ""
    };
  },
  methods: {
    cancel() {
      this.onCancel();
    },
    tuikuan() {
      this.$Modal.confirm({
        title: "退款",
        content: "<h3>未发货前直接退款</h3>"
        // onOk: async () => {
        //   this.$Message.info("退款");
        //   this.onCancel();
        // },
        // onCancel: () => {
        //   this.$Message.info("取消");
        // },
      });
    },
    fahuo() {
      this.$Modal.confirm({
        title: "发货",
        content: "<h3>当前版本，已发货的商品不支持退款</h3>"
        // onOk: async () => {
        //   this.$Message.info("发货");
        //   this.onCancel();
        // },
        // onCancel: () => {
        //   this.$Message.info("取消");
        // },
      });
    }
  }
};
</script>
<style scoped lang="scss">
.content_item {
  font-size: 16px;
  line-height: 24px;
}
.content_item > span {
  font-size: 14px;
}
</style>