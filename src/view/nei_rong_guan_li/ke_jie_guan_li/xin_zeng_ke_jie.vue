<template>
  <div>
    <Modal
      v-model="modal"
      title="新增课节"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-cancel="cancel"
      width="60%"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="所属模版:">花样滑冰/滑冰学校1阶模板</FormItem>
        <FormItem label="课节出处:"
          >在课节管理中新增的课节均为系统版权，出处为系统内容</FormItem
        >
        <FormItem label="课节形式:" prop="form">
          <Select :disabled="edit" v-model="formValidate.form">
            <Option :value="1">冰上</Option>
            <Option :value="2">陆地</Option>
            <Option :value="3">冰上+陆地</Option>
          </Select>
        </FormItem>
        <FormItem label="课节标题:" prop="title">
          <Input
            :disabled="edit"
            v-model="formValidate.title"
            placeholder="请输入课节标题"
          />
        </FormItem>
        <FormItem label="教学重点" prop="tag">
          <Tag
            v-for="(item, index) in formValidate.tag"
            :key="index"
            :name="item"
            closable
            @on-close="handleClose2"
            >{{ item }}</Tag
          >
          <Button
            icon="ios-add"
            type="dashed"
            size="small"
            @click="handleAddTag"
          ></Button>
        </FormItem>
        <FormItem label="课节安排" prop="techniqueType">
          <Select :disabled="edit" v-model="formValidate.techniqueType">
            <Option :value="1">无安排</Option>
            <Option :value="2">有安排</Option>
          </Select>
        </FormItem>
        <FormItem label="课后训练" prop="afterClassTrain">
          <Select :disabled="edit" v-model="formValidate.afterClassTrain">
            <Option :value="1">无训练</Option>
            <Option :value="2">有训练</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="cancel">取消</Button>
          <Button
            :disabled="edit"
            @click="handleSubmit('formValidate')"
            style="margin-left: 8px"
            >保存</Button
          >
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import untilMd5 from "../../../utils/md5";
import { isEmpty } from "lodash";
export default {
  props: {
    onCancel: Function,
    rowInfo: Object,
    edit: Boolean,
    updataTable:Function
  },
  data() {
    return {
      tagValue: "",
      modal: true,
      loading: true,
      formValidate: {
        form: 1,
        tag: [],
        techniqueType: 1,
        afterClassTrain: 1,
      },
      ruleValidate: {
        form: [
          {
            required: true,
            message: "T请输入课节形式",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入客节标题",
            trigger: "blur",
          },
        ],
        tag: [
          {
            required: true,
            message: "情输入教学重点",
          },
        ],
      },
    };
  },
  watch: {
    rowInfo: function (val) {
      this.formValidate = row;
    },
  },
  methods: {
    handleAddTag() {
      this.tagValue = "";
      this.$Modal.confirm({
        title: "教学重点",
        render: (h) => {
          return h("Input", {
            props: {
              value: this.tagValue,
              autofocus: true,
              placeholder: "请输入.",
            },
            on: {
              input: (val) => {
                this.tagValue = val;
              },
            },
          });
        },
        onOk: () => {
          if (this.tagValue.trim() !== "") {
            this.formValidate.tag.push(this.tagValue);
          }
        },
      });
    },
    handleClose2(event, name) {
      const index = this.formValidate.tag.indexOf(name);
      this.formValidate.tag.splice(index, 1);
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["formValidate"].resetFields();
      this.onCancel();
    },
    createCourse(params) {
      return this.axios.post("/api/v2/data/course/createCourse", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "createCourse"),
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let { data } = await this.createCourse({
            itle: "",
            subTitle: "String	副标题，课包摘要",
            code: "String	课包编码：例如happyskate、xy-week-1",
            trainPlanTemplate_id: "否	String	训练计划模板ID",
            templateTitle: "否	String	模板标题",
            imageUrl: "否	String	配图地址",
            form: "是	int	课程形式：1、冰上；2、陆地；3、冰上+陆地",
            content: "",
            departmentId: "",
            rinkId: "",
          });
          if (data.code === 200) {
            this.$Message.success("添加成功!");
            this.updataTable()
          } else {
            this.$Message.success("添加失败!");
          }
        } else {
          this.$Message.error("校验失败!");
        }
      });
    },
  },
};
</script>
