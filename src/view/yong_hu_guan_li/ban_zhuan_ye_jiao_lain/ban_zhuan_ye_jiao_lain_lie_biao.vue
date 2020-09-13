<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
        <Input search enter-button="搜索" style="width:200px" placeholder="学员账号/手机账号/账号昵称" />
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Detail v-if="detailModal" :coachInfo="coachInfo" :onCancel="onCancel" />
    <Rzsx v-if="rzsxModal" :rzsxInfo="rzsxInfo" :onCancel="rzsxCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import Detail from './ban_zhuan_ye_jiao_lian_xiang_qing'
import Rzsx from './ban_zhuan_ye_jiao_lain_shen_he'
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables,
    Detail,
    Rzsx,
  },
  data() {
    return {
      detailModal: false,
      coachInfo: {},
      rzsxModal: false,
      rzsxInfo: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "ID", key: "name", sortable: false, width: 90 },
        { title: "真实姓名", key: "email", editable: false, width: 90 },
        { title: "教练照", key: "createTime", width: 90 },
        { title: "手机账号", key: "createTime", width: 90 },
        { title: "工作性质", key: "createTime", width: 90 },
        { title: "所在城市", key: "createTime", width: 90 },
        { title: "所属机构", key: "createTime", width: 90 },
        { title: "账户余额(i币)", key: "createTime", width: 119 },
        { title: "消费总金额(元)", key: "createTime", width: 119 },
        { title: "消费总金额(元)", key: "createTime", width: 119 },
        { title: "收益总金额(元)", key: "createTime", width: 119 },
        { title: "注册时间", key: "createTime", width: 119 },
        { title: "审核提交时间", key: "createTime", width: 119 },
        { title: "状态", key: "createTime", width: 119 },
        {
          title: "操作",
          key: "action",
          width:150,
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
                    marginBottom: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.row);
                    },
                  },
                },

                "查看"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "primary",
                    // disabled:true,
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                     click: () => {
                      this.rzsx(params.row);
                    },
                  },
                },

                "账号审核"
              ),
            ]);
          },
        },
      ],
      tableData: [],
    };
  },
  methods: {
     look(row) {
      this.coachInfo = row;
      this.detailModal = true;
    },
    onCancel() {
      this.detailModal = false;
    },
    rzsx(row){
      this.rzxsInfo = row
      this.rzsxModal=true;
    },
    rzsxCancel() {
      this.rzsxModal = false;
    },
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

<style>
</style>
