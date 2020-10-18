<template>
  <div>
    <Card>
      <div class="header_wrap">
        <span style="margin-right: 5px;">订单状态</span>
        <Select
          v-model="zhuang_tai"
          placeholder="全部状态"
          style="margin-right: 5px;width: 100px"
        >
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
        <Input
          type="text"
          placeholder="手机账号/平台订单号"
          style="margin-right: 5px;width: 200px"
        />
        <div style="margin-right: 5px;">
          支付时间:
          <DatePicker
            type="datetime"
            placeholder="请选择开始时间"
            style="margin-right: 5px;width: 130px"
          ></DatePicker>
          至
          <DatePicker
            type="datetime"
            placeholder="请选择结束时间"
            style="margin-right: 5px;margin-left: 5px;width: 130px"
          ></DatePicker>
          <i-button type="primary">搜索</i-button>
          &emsp;
        </div>
      </div>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <div style="margin-top: 20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <LookModal v-if="lookVisible" :onCancel="onCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
import LookModal from './ding_dan_xiang_qing_dai_shou_huo';

export default {
  name: "tables_page",
  components: {
    Tables,
    LookModal,
  },
  data() {
    return {
      lookVisible:false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "ID", key: "name", sortable: false },
        { title: "商品名", key: "email", editable: false },
        { title: "用户信息", key: "createTime" },
        { title: "实付金额(元)", key: "createTime" },
        { title: "快递费(元)", key: "createTime" },
        { title: "分润(元)", key: "createTime" },
        { title: "付款方式", key: "createTime" },
        { title: "收件人信息", key: "createTime" },
        { title: "收件人位置", key: "createTime" },
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
                      this.look(params.row);
                    },
                  },
                },

                "查看"
              ),
            ]);
          },
        },
      ],
      tableData: [{name:'as'}],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
    };
  },
  methods: {
    editBus(item, index) {},
    look(params) {
      this.lookVisible=true;
    },
    onCancel() {
      this.lookVisible = false;
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    getGoodsOrdersPage(params) {
      this.axios
        .post("/api/v2/business/order/getGoodsOrdersPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getGoodsOrdersPage"),
        })
        .then((res) => {
          console.log(res.data, "查询商品订单列表接口");
          this.tableData = res.data.data.list;
        });
    },
  },
  mounted() {
    // this.getGoodsOrdersPage({
    //   isDelete: 0,
    //   pageNum: 1,
    //   pageSize: 10,
    // });
  },
};
</script>

<style scoped lang='scss'>
.header_wrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
