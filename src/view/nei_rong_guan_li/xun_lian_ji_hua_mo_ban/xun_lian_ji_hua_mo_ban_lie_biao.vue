<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button type="primary" @click="add">新增</i-button>&emsp;
        <i-button type="primary" @click="delet">删除</i-button>
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
    </Card>
    <Modal
      v-model="modal"
      title="新增商品"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      width="60%"
    >
      <div style="font-size: 16px">模板类型: 系统计划模板</div>

      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="130"
      >
        <FormItem label="动作类型" prop="city">
          <Select v-model="formValidate.city" placeholder="选择分类">
            <Option value="beijing">1</Option>
            <Option value="shanghai">2</Option>
            <Option value="shanghai">3</Option>
          </Select>
        </FormItem>
        <FormItem label="商品标题" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入商品标题" />
        </FormItem>
        <FormItem label="计划描述：" prop="name">
          <Input v-model="formValidate.name" placeholder="计划描述：" />
        </FormItem>

        <FormItem label="* 计划状态" prop="city">
          <Select v-model="formValidate.city" placeholder="选择分类">
            <Option value="beijing">1</Option>
            <Option value="shanghai">2</Option>
            <Option value="shanghai">3</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >取消</Button
          >

          <Button type="primary" @click="handleSubmit('formValidate')"
            >保存</Button
          >
        </FormItem>
      </Form>
    </Modal>
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
        { title: "动作类型", key: "name", sortable: false },
        { title: "计划标题", key: "email", editable: false },
        { title: "制作人", key: "createTime" },
        { title: "创建者", key: "createTime" },
        { title: "模板级别", key: "createTime" },
  { title: "模板状态", key: "createTime" },

        {
          title: "操作",

          key: "action",

          width: 250,

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

                "课节管理"
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
      modal: false,
      loading: true,
      setForm: { rate: "" },
      rules: {
        rate: [
          { required: true, message: "汇率不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^[0-9]*$/,
            message: "汇率格式不正确",
            trigger: "blur",
          },
        ],
      },
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        editText: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        editText: [
          {
            required: true,
            message: "请输入图文介绍",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
          },
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change",
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: false,
            message: "请输入课包摘要",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    editBus(item, index) {},
    look(params) {
      this.modal = true;
    },
    add(params) {
      this.modal = true;
    },
    delet(params) {
      this.modal = true;
    },
    ok() {},
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
    addTrainPlanTemplateCourse(params) {
      this.axios
        .post("/api/v2/data/train/addTrainPlanTemplateCourse", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "addTrainPlanTemplateCourse"),
        })
        .then((res) => {
          console.log(res.data, "训练计划模板添加课程接口");
        });
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["formValidate"].resetFields();
    },
  },
  mounted() {
    this.getTechniqueActionPage({
      pageNum: 1,
      pageSize: 10,
      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
