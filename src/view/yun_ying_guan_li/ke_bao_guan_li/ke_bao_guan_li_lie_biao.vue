<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px">
        <i-button type="primary" @click="handlAdd">新增</i-button>&emsp;
        <i-button type="error" @click="handlRemove">删除</i-button>
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
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
    <Xzkb v-if="xzkbModal" :rowInfo="row" :edit="edit" :onCancel="onCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
import Xzkb from "./xin_zeng_ke_bao_xun_lian";

export default {
  name: "tables_page",
  components: {
    Tables,
    Xzkb,
  },
  data() {
    return {
      xzkbModal: false,
      row: {},
      edit: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "课包名称", key: "title", sortable: false },
        // { title: "课程安排", key: "email", editable: false },
        { title: "应收(元)", key: "cost" },
        { title: "实收(元)", key: "specialPrice" },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h(
              "span",
              params.row.status === 0
                ? "无效"
                : params.row.status === 1
                ? "有效"
                : "暂停"
            );
          },
        },
        { title: "关联门店", key: "rinkName" },
        { title: "创建者", key: "createUser" },
        { title: "报名总数", key: "salesVolume" },
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
              h(
                "Button",

                {
                  props: {
                    type: "warning",

                    size: "small",
                  },

                  style: {
                    marginRight: "5px",
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row);
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
      total: 0,
      pageNum: 1,
      pageSize: 10,
      deleteSelectIds: [],
    };
  },
  methods: {
    handlAdd() {
      this.row = {};
      this.edit = false;
      this.xzkbModal = true;
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
          console.log(res.data)
          if(res.data.code===200){
           this.getList({
                  isUseTemplate: 0,
                  isMemberGoods: 0,
                  status: 1,
                  pageNum: this.pageNum,
                  pageSize: this.pageSize,
                });
          this.$Message.info("删除成功");
          }else{
             this.$Message.info("删除失败");
          }

        },
        onCancel: () => {
          this.$Message.info("取消删除");
        },
      });
    },
    onCancel() {
      this.xzkbModal = false;
    },
    editBus(params) {
      this.row = params;
      this.edit = false;
      this.xzkbModal = true;
    },
    look(params) {
      this.row = params;
      this.edit = true;
      this.xzkbModal = true;
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    deleteTableInId(params) {
      console.log(params);
      return this.axios.post("/api/v2/data/course/batchDeleteCoursePacket", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "batchDeleteCoursePacket"),
      });
    },
    getList(params) {
      this.axios
        .post("/api/v2/data/course/getCoursePacketPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getCoursePacketPage"),
        })
        .then((res) => {
          console.log(res.data.data, "课包管理");
          this.tableData = [...res.data.data.list];
          this.total = res.data.data.total;
        });
    },
    Pageonchange(pageNum) {
      this.getList({
        isUseTemplate: 0,
        isMemberGoods: 0,
        status: 1,
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
  },
  mounted() {
    this.getList({
      isUseTemplate: 0,
      isMemberGoods: 0,
      status: 1,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  },
};
</script>

<style>
</style>
