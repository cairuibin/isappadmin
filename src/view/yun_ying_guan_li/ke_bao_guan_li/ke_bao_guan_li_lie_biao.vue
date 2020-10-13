<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
        <i-button type="primary" @click="handlAdd">新增</i-button>&emsp;
        <i-button type="error">删除</i-button>
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
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
    Xzkb
  },
  data() {
    return {
      xzkbModal: false,
      row:{},
      edit: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        { title: "课包名称", key: "title", sortable: false },
        { title: "课程安排", key: "email", editable: false },
        { title: "应收(元)", key: "price" },
        { title: "实收(元)", key: "specialPrice" },
        { title: "状态", key: "status" },
        { title: "关联门店", key: "rinkName" },
        { title: "创建者", key: "createUser" },
        { title: "报名总数", key: "createTime" },
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

                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.look(params.row);
                    }
                  }
                },

                "查看"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "warning",

                    size: "small"
                  },

                  style: {
                    marginRight: "5px"
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row);
                    }
                  }
                },

                "编辑"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    handlAdd() {
      this.row = {};
      this.edit = false;
      this.xzkbModal = true;
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
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    getList() {
      this.axios
        .post("/api/v2/data/course/getCoursePacketPage", {
          // code: "xy-week-1",
          isUseTemplate: 0,
          isMemberGoods: 0,
          status: 1,
          pageNum: 1,
          pageSize: 10,
          sign: untilMd5.toSign(
            {
              // code: "xy-week-1",
              isUseTemplate: 0,
              isMemberGoods: 0,
              status: 1,
              pageNum: 1,
              pageSize: 10
            },
            "getCoursePacketPage"
          )
        })
        .then(res => {
          console.log(res.data.data.list, "课包管理");
          this.tableData = res.data.data.list;
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
</style>
