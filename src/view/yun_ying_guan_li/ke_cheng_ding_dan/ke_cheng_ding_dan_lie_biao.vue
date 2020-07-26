<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;" class="header_wrap">
        <span>订单类型</span>
        <Select v-model="lei_xing" placeholder="全部类型" style="width:100px">
          <Option value="quan_bu_lei_xing">全部类型</Option>
          <Option value="ke_bao">课包</Option>
          <Option value="qing_xun_ying">青训营</Option>
        </Select>
        <span>订单状态</span>
        <Select v-model="zhuang_tai" placeholder="全部状态" style="width:100px">
          <Option value="quan_bu_zhuang_tai">全部状态</Option>
          <Option value="dai_fu_kuan">代付款</Option>
          <Option value="dai_qu_xiao">待取消</Option>
          <Option value="yi_qu_xiao">已取消</Option>
          <Option value="qu_xiao_b0_hui">取消驳回</Option>
          <Option value="dai_pai_ke">代排课</Option>
          <Option value="dai_que_ren">待确认</Option>
          <Option value="dai_wan_jie">待完结</Option>
          <Option value="tui_kuan_zhong">退款中</Option>
          <Option value="yi_tui_kuan">已退款</Option>
          <Option value="dai_ping_jia">待评价</Option>
          <Option value="yi_wan_cheng">已完成</Option>
        </Select>
        <Input type="text" placeholder="支付宝/手机账号/学员姓名" style="width:200px"/>
        <div style="margin-bottom:10px;">
          支付时间:
          <DatePicker type="datetime" placeholder="请选择开始时间" style="width: 130px"></DatePicker> 至:
          <DatePicker type="datetime" placeholder="请选择结束时间" style="width: 130px"></DatePicker>
          <i-button type="primary">搜索</i-button>
&emsp;
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
      Tables
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
              )
            ]);
          },
        },
      ],
      tableData: [],
      lei_xing:"全部类型",
      zhuang_tai:"全部状态"
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
.header_wrap{
display: flex;justify-content: space-around;align-items: center;
}
</style>
