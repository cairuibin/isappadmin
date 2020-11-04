<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button type="primary" @click="handlAdd">新增</i-button>&emsp;
        <i-button type="primary" @click="hadndelete">删除</i-button>
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
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
    </Card>
    <Xzkj
      :updataTable="updataTable"
      v-if="xzkjModal"
      :rowInfo="row"
      :edit="edit"
      :onCancel="onCancel"
    />
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
import Xzkj from "./xin_zeng_ke_jie";

export default {
  name: "tables_page",
  components: {
    Tables,
    Xzkj,
  },
  data() {
    return {
      xzkjModal: false,
      row: {},
      edit: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "课程形式",
          key: "form",
          render: (_, params) => {
            switch (params.row.form) {
              case 1:
                return <span>冰上</span>;
              case 2:
                return <span>陆地</span>;
              case 3:
                return <span>冰上+陆地</span>;
            }
          },
        },
        { title: "课程名称", key: "title", sortable: false },
        { title: "教学重点", key: "tag", editable: false },
        { title: "版权", key: "copyright" },
        { title: "创建者", key: "createUser" },
        { title: "课节安排", key: "content" },
        { title: "课后训练", key: "after_class_train" },
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
      tableData: [
        {
          form: 1,
        },
      ],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
      pageNum: 1,
      pageSize: 10,
      deleteSelectIds: [],
    };
  },
  methods: {
    async handlAdd() {
      this.row = {};
      this.edit = false;
      this.xzkjModal = true;
    },
    async hadndelete() {
      if (this.deleteSelectIds.length > 0) {
        let { data } = await this.batchDeleteCourse({
          ids: this.deleteSelectIds.join(),
          updateUser: JSON.parse(localStorage.user).id,
        });
        await this.getCoursePage({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          // userId:JSON.parse(localStorage.getItem('user').id)
        });

        if (data.code === 200) {
          this.$Message.info("删除成功");
        }
      } else {
        this.$Message.info("请至少选择一项");
      }
    },
    onCancel() {
      this.xzkjModal = false;
    },
    look(params) {
      this.row = params;
      this.edit = true;
      this.xzkjModal = true;
    },
    editBus(params) {
      this.row = params;
      this.edit = false;
      this.xzkjModal = true;
    },
    handleDelete(params) {
      console.log(params);
    },
    onselect(select) {
      console.log(select);
      this.deleteSelectIds = select.map((v) => v.id);
    },
    onselectall(selects) {
      this.deleteSelectIds = selects.map((v) => v.id);
    },
    onselectcancel(select) {
      this.deleteSelectIds = select.map((v) => v.id);
      console.log(this.deleteSelectIds);
    },
    onselectallcancel(select) {
      console.log(this.deleteSelectIds);
    },
    onselectionchange(select) {
      this.deleteSelectIds = select.map((v) => v.id);
      console.log(this.deleteSelectIds);
    },

    batchDeleteCourse(params) {
      return this.axios.post("/api/v2/data/course/batchDeleteCourse", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "batchDeleteCourse"),
      });
    },
    getCoursePage(params) {
      this.axios
        .post("/api/v2/data/course/getCoursePage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getCoursePage"),
        })
        .then((res) => {
          console.log(res.data, "课节(分页)");
          this.tableData = res.data.data.list;
        });
    },
    updataTable() {
      this.getCoursePage({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
    },
  },
  mounted() {
    this.getCoursePage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
