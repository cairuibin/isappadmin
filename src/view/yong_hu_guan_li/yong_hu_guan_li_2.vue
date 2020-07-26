<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
     <Input search enter-button="搜索" style="width:200px" placeholder="用户名/手机账号" />
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
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
        { title: "ID", key: "name", sortable: false },
        { title: "昵称", key: "email", editable: false },
        { title: "头像", key: "createTime" },
        { title: "手机账号", key: "createTime" },
        { title: "账户余额(i币)", key: "createTime" },
        { title: "消费总金额(元)", key: "createTime" },

        { title: "状态", key: "createTime" },
        { title: "注册时间", key: "createTime" },
        { title: "最终登录时间", key: "createTime" },
       
      ],
      tableData: [],
    };
  },
  methods: {
    editBus(item, index) {},
    bohui(params) {},
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

<style>
</style>
