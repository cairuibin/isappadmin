<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button @click="handlAdd" type="primary">新增</i-button>&emsp;
        <i-button type="primary" @click="handlRemove">删除</i-button>
      </div>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
        @on-select-all="onselectall"
        @on-select="onselect"
        @on-select-cancel="onselectcancel"
        @on-select-all-cancel="onselectallcancel"
        @on-selection-change="onselectionchange"
      />
      <div style="margin-top: 20px">
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
        { title: "动作名称", key: "name", sortable: false },
        {
          title: "动作配图",
          key: "imageUrl",
          render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.imageUrl} />
              </div>
            );
          },
        },
        { title: "标签", key: "tag" },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return (
              <span>
                {params.row.status === 0
                  ? "无效"
                  : params.row.status === 1
                  ? "有效"
                  : ""}
              </span>
            );
          },
        },
        { title: "排序", key: "sortIndex" },

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

                "编辑"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      deleteSelectIds: [],
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
    getTechniqueActionPage(params) {
      this.axios
        .post("/api/v2/data/action/getTechniqueActionPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTechniqueActionPage"),
        })
        .then((res) => {
          console.log(res.data, "查询退款申请列表接口(分页)");
          this.tableData = res.data.data.list;
        });
    },
     deleteTableInId(params) {
      console.log(params);
      return this.axios.post("/api/v2/data/action/deleteTechniqueAction", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "deleteTechniqueAction"),
      });
    },
    Pageonchange(pageNum) {
      this.getTechniqueActionPage({
        pageNum: pageNum,
        pageSize: this.pageSize,
      });
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
    onselect(select) {
      console.log(select);
      this.deleteSelectIds = select.map((v) => v.id);
    },
    onselectall(selects) {},
    onselectcancel(select) {
      this.deleteSelectIds = select.map((v) => v.id);
    },
    onselectallcancel(select) {},
    onselectionchange(select) {
      this.deleteSelectIds = select.map((v) => v.id);
    },
    handlRemove() {
      this.$Modal.confirm({
        title: "提示",
        content: "<h3>确定删除该课包吗？</h3>",
        onOk: async () => {
          let res = await this.deleteTableInId({
            ids: this.deleteSelectIds.join(),
            updateUser: JSON.parse(localStorage.user).id,
          });
          console.log(res.data);
          if (res.data.code === 200) {
            this.getTechniqueActionPage({
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            });
            this.$Message.info("删除成功");
          } else {
            this.$Message.info("删除失败");
          }
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        },
      });
    },
    handlAdd() {},
  },
  mounted() {
    this.getTechniqueActionPage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
