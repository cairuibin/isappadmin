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
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Detail v-if="detailModal" :coachInfo="coachInfo" :onCancel="onCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import Detail from "./zhuan_ye_jiao_lain_xiang_qing";
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables,
    Detail,
  },
  data() {
    return {
      detailModal: false,
      coachInfo: {},
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
        { title: "专项", key: "createTime", width: 90 },
        { title: "专项运动开始时间", key: "createTime", width: 90 },
        { title: "专项教学开始时间", key: "createTime", width: 90 },
        { title: "认证提交时间", key: "createTime", width: 119 },
        { title: "账户余额(i币)", key: "createTime", width: 119 },
        { title: "消费总金额(元)", key: "createTime", width: 119 },
        { title: "收益总金额(元)", key: "createTime", width: 119 },
        { title: "状态", key: "createTime", width: 119 },

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

                "认证审核"
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
