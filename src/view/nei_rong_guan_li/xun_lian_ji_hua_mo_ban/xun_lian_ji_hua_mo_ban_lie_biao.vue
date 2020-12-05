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
      width="60%"
    >
      <div style="font-size: 16px">模板类型: 系统计划模板</div>

      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="130"
      >
        <FormItem label="动作类型" prop="techniqueType">
          <!-- {{formValidate.techniqueType}} -->
          <!-- 数据问题导致的bug  id对不上 无法回填数据 -->
          <Select
            :disabled="isLook === 'look'"
            v-model="formValidate.techniqueType"
            placeholder="选择分类"
          >
            <Option
              :value="item.id + ''"
              v-for="(item, index) in lei_xing"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="商品标题" prop="title">
          <Input
            :disabled="isLook === 'look'"
            v-model="formValidate.title"
            placeholder="请输入商品标题"
          />
        </FormItem>
        <FormItem label="计划描述：" prop="description">
          <Input
            :disabled="isLook === 'look'"
            v-model="formValidate.description"
            placeholder="计划描述："
          />
        </FormItem>

        <FormItem label="* 计划状态" prop="status">
          <Select
            :disabled="isLook === 'look'"
            v-model="formValidate.status"
            placeholder="选择分类"
          >
            <!-- 状态：0、无效；1、有效；2、暂停； -->
            <Option value="0">无效</Option>
            <Option value="1">有效</Option>
            <Option value="2">暂停</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >取消</Button
          >

          <Button
            v-if="isLook !== 'look'"
            type="primary"
            @click="handleSubmit('formValidate')"
            >保存</Button
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
        {
          title: "动作类型",
          key: "techniqueType",
          sortable: false,
          render: (h, p) => {
            let arr = JSON.parse(p.row.techniqueType) || [];
            return arr.map((v) => <div>{v.name}</div>);
          },
        },
        { title: "计划标题", key: "title", editable: false },
        // { title: "制作人", key: "createTime" },
        { title: "创建者", key: "createUser" },
        { title: "模板级别", key: "isSystem" },
        { title: "模板状态", key: "isPrivate" },

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
                      this.$router.push(
                        "/nei_rong_guan_li/ji_hua_mo_ban/ke_jie_guan_li"
                      );
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
                      this.edit(params.row);
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
      // 是否是查看状态
      isLook: "look",
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
        techniqueType: "",
        title: "",
        description: "",
        status: 0,
      },
      ruleValidate: {
        techniqueType: [
          {
            required: true,
            message: "请输入动作类型",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        description: [
          {
            // required: true,
            // message: "请输入描述",
            // trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择计划状态",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    editBus(item, index) {},
    look(params) {
      this.isLook = "look";
      this.formValidate.techniqueType = params.id;
      this.lei_xing = JSON.parse(params.techniqueType);
      this.formValidate.title = params.title;
      this.formValidate.description = params.description;
      this.formValidate.status = params.status + "";
      this.modal = true;
    },
    edit(params) {
      this.isLook = "edit";
      this.formValidate.techniqueType = params.id;
      this.lei_xing = JSON.parse(params.techniqueType);
      this.formValidate.title = params.title;
      this.formValidate.description = params.description;
      this.formValidate.status = params.status + "";
      this.modal = true;
    },
    add(params) {
      this.modal = true;
      this.isLook='add'
      this.createTrainPlanTemplate({});
    },
    delet(params) {
      this.modal = true;
    },

    handleDelete(params) {
      console.log(params);
    },

    getTrainPlanTemplatePage(params) {
      this.axios
        .post("/api/v2/data/train/getTrainPlanTemplatePage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTrainPlanTemplatePage"),
        })
        .then((res) => {
          this.tableData = res.data.data.list;
        });
    },
    createTrainPlanTemplate(params) {
      this.axios
        .post("/api/v2/data/train/createTrainPlanTemplate", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "createTrainPlanTemplate"),
        })
        .then((res) => {
          this.getTrainPlanTemplatePage({
            pageNum: 1,
            pageSize: 10,
          });
        });
    },
    handleReset(name) {
      // 取消后，重置表单
      this.$refs[name].resetFields();
      this.modal = false;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
          this.modal = false;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
  },
  mounted() {
    this.getTrainPlanTemplatePage({
      pageNum: 1,
      pageSize: 10,

      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
