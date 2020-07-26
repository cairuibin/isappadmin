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
        <Input type="text" placeholder="支付宝/手机账号/学员姓名" style="width:170px" />
        <div style="margin-bottom:10px;">
          支付时间
          <DatePicker type="datetime" placeholder="请选择开始时间" style="width: 130px"></DatePicker>至
          <DatePicker type="datetime" placeholder="请选择结束时间" style="width: 130px"></DatePicker>
          <i-button type="primary">搜索</i-button>&emsp;
        </div>
      </div>
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
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
        { title: "支付时间", key: "name", sortable: false },
        { title: "订单标题", key: "email", editable: false },
        { title: "类型", key: "createTime" },
        { title: "支付渠道", key: "createTime" },
        { title: "实收金额(元)", key: "createTime" },
        { title: "用户信息", key: "createTime" },
        { title: "学员信息", key: "createTime" },
        { title: "教练信息", key: "createTime" },
        { title: "联系信息", key: "createTime" },
        { title: "状态", key: "createTime" },
        {
          title: "操作",

          key: "action",

          width: 150,

          align: "center",

          render: (h, params) => {
            return h("div", [
              h(
                "Button",

                {
                  props: {
                    type: "primary",

                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.index);
                    },
                  },
                },

                "查看"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
    };
  },
  methods: {
    editBus(item, index) {},
    look(params) {},
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
  },
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
