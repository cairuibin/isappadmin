<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
        <Input
          @on-search="search_keyfn"
          v-model="search_key"
          search
          enter-button="搜索"
          style="width:200px"
          placeholder="用户名/手机账号"
        />
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
// import { getTableData } from "@/api/data";
import untilMd5 from "../../utils/md5";
import directiveVue from "../directive/directive.vue";
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
        { title: "ID", key: "id", sortable: false },
        { title: "昵称", key: "nickname", editable: false },
        {
          title: "头像",
          key: "logoUrl",
          render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.logoUrl} />
              </div>
            );
          },
        },
        { title: "手机账号", key: "mobile" },
        { title: "账户余额(i币)", key: "score" },
        { title: "消费总金额(元)", key: "consumeAmounts" },

        { title: "状态", key: "status" },
        { title: "注册时间", key: "createTime" },
        { title: "最终登录时间", key: "last_login_time" },
      ],
      tableData: [],
      search_key: "1",
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
    gettable_c(params) {
      return this.axios.post("/api/api/v2/user/getUsersPage", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getUsersPage"),
      });
    },
    search_keyfn(e) {
      this.gettable_c({
        pageNum: 1,
        pageSize: 10,
        stauts: 1,
        isDelete: 0,
        username: e,
      }).then((res) => {
        console.log(res.data.data, "搜索用户管理列表");
        if (typeof res.data.data !== "string") {
          this.tableData = res.data.data.list;
        } else {
          this.tableData = [];
        }
      });
    },
  },
  created() {
    this.gettable_c({
      pageNum: 1,
      pageSize: 10,
      stauts: 1,
      isDelete: 0,
    }).then((res) => {
      console.log(res.data.data, "用户管理列表");
      this.tableData = res.data.data.list;
    });
  },
};
</script>

<style>
</style>
