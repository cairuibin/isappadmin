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
  <!-- 表格 -->
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <!-- 分页器 -->
        <Page
          show-total
          @on-change="Pageonchange"
          @on-page-size-change="onpagesizechange"
          :total="total"
          show-elevator
        ></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
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

        { title: "状态", key: "status" ,  render: (h, params) => {
            return (
             <span>{params.row.stauts==='1'?"正常":"冻结中"}</span>
            );
          },},
        { title: "注册时间", key: "createTime" },
        { title: "最终登录时间", key: "lastLoginTime" },
      ],
      tableData: [],
      search_key: "",
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    editBus(item, index) {},
    bohui(params) {},
    look(params) {},
    handleDelete(params) {
      console.log(params);
    },
    gettable_c(params) {
      this.axios.post("/api/v2/user/getUsersPage", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getUsersPage"),
      }).then((res) => {
        if (typeof res.data.data !== "string") {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    search_keyfn(e) {
      this.gettable_c({
        pageNum: 1,
        pageSize: this.pageSize,
        stauts: 1,
        isDelete: 0,
        username: e,
      })
    },
    Pageonchange(pageNum) {
      this.gettable_c({
        pageNum: pageNum,
        pageSize: this.pageSize,
        stauts: 1,
        isDelete: 0,
      })
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
  },
  created() {
    this.gettable_c({
      pageNum: 1,
      pageSize: this.pageSize,
      stauts: 1,
      isDelete: 0,
    })
  },
};
</script>

<style>
</style>
