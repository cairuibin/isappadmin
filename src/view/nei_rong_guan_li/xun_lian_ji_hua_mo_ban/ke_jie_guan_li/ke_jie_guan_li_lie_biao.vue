<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button type="primary">新增</i-button>&emsp;
        <i-button type="primary">删除</i-button>
      </div>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <div style="margin-top: 20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "@/utils/md5";
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
        { title: "动作配图", key: "email", editable: false },
        { title: "标签", key: "createTime" },
        { title: "状态", key: "createTime" },
        { title: "排序", key: "createTime" },

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
         pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    editBus(item, index) {},
    look(params) {},
    handleDelete(params) {
      console.log(params);
    },

    getCoursePage(params) {
      return this.axios.post("/api/v2/data/course/getCoursePage", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getCoursePage"),
      });
    },
  },
  mounted() {
    this.getCoursePage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      // userId:JSON.parse(localStorage.getItem('user').id)
    }).then((res) => {
      console.log(res.data, "课节(分页)");
      this.tableData = res.data.data.list;
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
