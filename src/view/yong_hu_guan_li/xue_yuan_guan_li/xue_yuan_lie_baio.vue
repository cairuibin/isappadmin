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
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
// import { getTableData } from "@/api/data";
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
        { title: "学员姓名", key: "email", editable: false  },
        { title: "头像", key: "createTime"  },
        { title: "生日", key: "createTime"  },
        { title: "性别", key: "createTime"  },
        { title: "所属专项", key: "createTime"  },
        { title: "所属教练", key: "createTime"  },
        { title: "账号信息", key: "createTime"  },
        { title: "状态", key: "createTime"  },
        {
          title: "操作",

          key: "action",

     

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
     this.axios
      .post("/api/api/v2/user/student/getStudentPage", {
        userId: '1',
        pageNum: 1,
        pageSize: 10,
        sign: untilMd5.toSign(
          {
            userId: '1',
            pageNum: 1,
            pageSize: 10,
          },
          "getStudentPage"
        ),
      })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data.list;
      });
  },
};
</script>

<style>
</style>
