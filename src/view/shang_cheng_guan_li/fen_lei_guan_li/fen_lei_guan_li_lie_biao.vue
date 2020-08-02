<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
        <i-button type="primary">新增</i-button>&emsp;
        <!-- <i-button type="error">删除</i-button> -->
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <!-- <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div> -->
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
        { title: "分类名称", key: "name", sortable: false },
        { title: "状态", key: "email", editable: false },

        {
          title: "操作",

          key: "action",

          width: 350,

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
                    type: "warning",

                    size: "small",
                  },

                  style: {
                    marginRight: "5px",
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    },
                  },
                },

                "编辑"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "error",

                    size: "small",
                  },

                  style: {
                    marginRight: "5px",
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    },
                  },
                },

                "删除"
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
                      this.editBus(params.row, params.index);
                    },
                  },
                },

                "添加下级分类"
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
