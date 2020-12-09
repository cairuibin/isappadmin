<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px">
        <i-button type="primary" @click="modal = true">新增</i-button>&emsp;
      </div>

      <tables
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
    </Card>
    <Modal
      v-model="modal"
      title="新增商品分类"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      width="30%"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="父类:" prop="parentId">
          <Input
            v-model="formValidate.parentId"
            placeholder="请输入父类名称，无父类则代表一级类目"
          />
        </FormItem>
        <FormItem label="分类名称:" prop="categoryName">
          <Input
            v-model="formValidate.categoryName"
            placeholder="请输入分类名称"
          />
        </FormItem>
        <FormItem label="分类code：" prop="categoryCode">
          <Input
            v-model="formValidate.categoryCode"
            placeholder="请输入分类code"
          />
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select v-model="formValidate.status" placeholder="请选择状态">
            <Option value="1">启用</Option>
            <Option value="2">禁止</Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="remarks">
          <Input v-model="formValidate.remarks" placeholder="请输入备注" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >保存</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >取消</Button
          >
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
// import Newdetail from "./xin_zeng_fen_lei";
export default {
  name: "tables_page",
  components: {
    Tables,
  },
  components: {
    // Newdetail,
    Tables,
  },
  data() {
    return {
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
        parentId: "",
        remarks: "",
        status: "",
        date: "",
        categoryCode: "",
        categoryName: "",
      },
      ruleValidate: {
        parentId: [
          {
            required: true,
            message: "请输入父类id",
            trigger: "blur",
          },
        ],

        remarks: [
          {
            required: true,
            message: "备注不能为空",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],

        categoryCode: [
          {
            required: true,
            
            message: "清除输入分类code",
            trigger: "change",
          },
        ],
        categoryName: [
          {
            required: false,
            message: "请输入分类名称",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "请输入分类名称20",
            trigger: "blur",
          },
        ],
      },

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "分类名称", key: "categoryName", sortable: false },
        {
          title: "状态",
          key: "status",
          render: (h, params) =>
            h("span", {}, params.row.status === 0 ? "禁止" : "启用"),
        },
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
      modal: false,
    };
  },
  methods: {
    editBus(item, index) {},
    async look(params) {
      this.modal = true;
      let { data } = await this.getGoodsCategoryInfo({
        id: params.id * 1,
      });
      data.data.status = data.data.status + "";
      this.formValidate = JSON.parse(JSON.stringify(data.data));
    },
    handleDelete(params) {
      console.log(params);
    },
    setmodal() {
      this.modal = false;
    },
    getGoodsCategoryPage(params) {
      this.axios
        .post("/api/v2/data/goods/getGoodsCategoryPage", {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "getGoodsCategoryPage"
          ),
        })
        .then((res) => {
          this.tableData_all = res.data;
          this.tableData = res.data.data.list;
        });
    },
    getGoodsCategoryInfo(params) {
      return this.axios.post("/api/v2/data/goods/getGoodsCategoryInfo", {
        ...params,
        sign: untilMd5.toSign(
          {
            ...params,
          },
          "getGoodsCategoryInfo"
        ),
      });
    },

    async ok() {
      this.$refs.setGold.validate(async (valid) => {
        if (valid) {
          let res = await this.$ajax.post("/xx/xx", {});
          if (res.cd === 0) {
            // doSomething..
          } else {
            this.$Message.info(res.msg);
          }
        } else {
          // 对话框校验失败，取消loading状态
          // this.loading = false
          // setTimeout(() => {
          //  this.$nextTick(() => {
          //     this.loading = true
          //   })
          // }, 100)
        }
      });
    },
    cancel() {
      // 取消后，重置表单

      this.$refs["formValidate"].resetFields();
      this.$emit("setmodal", false);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
      this.$emit("setmodal", false);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.modal = false;
    },
  },
  mounted() {
    this.getGoodsCategoryPage({
      pageNum: 1,
      pageSize: 10,
    });
  },
};
</script>

<style>
</style>
