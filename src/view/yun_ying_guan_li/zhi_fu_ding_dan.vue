<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;" class="header_wrap">
        <span>支付终端</span>
        <Select v-model="zhuang_tai" placeholder="全部终端" style="width:100px">
          <Option value="quan_bu_zhong_duan">全部终端</Option>
          <Option value="ping_guo">苹果</Option>
          <Option value="an_zhuo">安卓</Option>
          <Option value="h5">h5</Option>
        </Select>
        <span>业务类型</span>
        <Select v-model="lei_xing" placeholder="全部类型" style="width:100px">
          <Option value="quan_bu_lei_xing">全部类型</Option>
          <Option value="xun_lian_ke_bao">训练课包</Option>
          <Option value="xun_lian_ying">训练营</Option>
            <Option value="shang_pin">商品</Option>
          <Option value="chong_zhi">充值</Option>
        </Select>
         <span>支付结果</span>
        <Select v-model="lei_xing" placeholder="全部类型" style="width:100px">
          <Option value="quan_bu_jie_guo">全部结果</Option>
          <Option value="zhi_fu_cheng_gong">支付成功</Option>
          <Option value="zhi_fu_shi_bai">支付失败</Option>
          
        </Select>
        <Input type="text" placeholder="手机账号" style="width:170px" />
        <div style="margin-bottom:10px;">
          支付时间
          <DatePicker type="datetime" placeholder="请选择开始时间" style="width: 130px"></DatePicker>至
          <DatePicker type="datetime" placeholder="请选择结束时间" style="width: 130px"></DatePicker>
          <i-button type="primary">搜索</i-button>&emsp;
        </div>
      </div>
      <tables ref="tables" v-model="tableData" :columns="columns" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables,
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "创建时间", key: "name", sortable: false },
        { title: "业务类型", key: "email", editable: false },
        { title: "支付金额(元)", key: "createTime" },
        { title: "支付终端", key: "createTime" },
        { title: "支付渠道", key: "createTime" },
        { title: "渠道订单号", key: "createTime" },
        { title: "用户信息", key: "createTime" },
        { title: "支付结果", key: "createTime" },
      ],
      tableData: [],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
    };
  },
  methods: {},
  mounted() {
    getTableData().then((res) => {
      this.tableData = res.data;
    });
  },
};
</script>

<style scoped lang='scss'>
.header_wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
