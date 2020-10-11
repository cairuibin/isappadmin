<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <span>订单类型</span>
        <Select
          v-model="lei_xing"
          @on-change="lei_xingchange()"
          placeholder="全部类型"
          style="width: 100px"
        >
          <!-- <Option value="quan_bu_lei_xing">全部类型</Option> -->
          <Option value="1">课包</Option>
          <Option value="2">青训营</Option>
        </Select>
        <span>订单状态</span>
        <Select
          v-model="zhuang_tai"
          placeholder="全部状态"
          style="width: 100px"
          @on-change="zhuang_tai_select()"
        >
          <!-- <Option value="quan_bu_zhuang_tai">全部状态</Option> -->
          <Option value="0">代付款</Option>
          <Option value="1">申请取消</Option>
          <Option value="2">已取消</Option>
          <Option value="3">取消驳回</Option>
          <Option value="4">已付款</Option>
          <Option value="6">申请退款</Option>
          <Option value="7">退款中</Option>
          <Option value="8">已退款</Option>
          <Option value="9">支付失败</Option>
          <Option value="13">待完结</Option>
          <Option value="14">待评价</Option>
          <Option value="15">结束订单</Option>
        </Select>
        <Input
          type="text"
          placeholder="学员姓名"
          style="width: 200px"
          @on-enter="searchenter"
        />
        <div style="margin-bottom: 10px">
          支付时间:
          <DatePicker
            type="datetime"
            placeholder="请选择开始时间"
            :confirm='false'
            style="width: 130px"
            on-change="DatePickerchange"
          ></DatePicker
          >至:
          <DatePicker
            type="datetime"
            placeholder="请选择结束时间"
            style="width: 130px"
            :confirm='false'
          ></DatePicker>
          <i-button type="primary">搜索</i-button>&emsp;
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
  </div>
</template>

<script>
import Tables from "_c/tables";
// import { getTableData } from "@/api/data";
import untilMd5 from "../../../utils/md5";
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
        { title: "支付时间", key: "createTime", sortable: false },
        { title: "订单标题", key: "trainCampName", editable: false },
        { title: "类型", key: "type" },
        { title: "支付渠道", key: "createTime" },
        { title: "实收金额(元)", key: "money" },
        { title: "用户信息", key: "createTime" },
        { title: "学员信息", key: "createUser" },
        { title: "教练信息", key: "createTime" },
        {
          title: "联系信息",
          key: "contacts",
          render: (h, params) => {
            console.log(JSON.parse(params.row.contacts).name);
            return h("div", [
              h(
                "span",
                `${JSON.parse(params.row.contacts).name || "没有数据"}`
              ),
            ]);
          },
        },
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
    getTrainCampOrdersPage(params) {
      this.axios
        .post("/api/api/v2/business/trainOrder/getTrainCampOrdersPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTrainCampOrdersPage"),
        })
        .then((res) => {
          console.log(res.data.data.list, "查询训练课包订单列表接口(分页)");
          this.tableData = res.data.data.list;
        });
    },
    lei_xingchange(e) {
      console.log(this.lei_xing, "1111");
      this.getTrainCampOrdersPage({
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
    },
    zhuang_tai_select(){
          this.getTrainCampOrdersPage({
        stauts:this.zhuang_tai,
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
    },
    searchenter(e){
 console.log(e.target.value)
 if(e.target.value){
       this.getTrainCampOrdersPage({
        studentName:e.target.value,
        stauts:this.zhuang_tai,
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
 }
    },
    DatePickerchange(e){
      console.log()
    },

  },
  mounted() {
    this.getTrainCampOrdersPage({
      pageNum: 1,
      pageSize: 10,
      orderType: 1,
      isDelete: 0,
      // userId:JSON.parse(localStorage.getItem('user').id)
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
