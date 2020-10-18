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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="所属模版:">花样滑冰/滑冰学校1阶模板</FormItem>
        <FormItem label="课节出处:">在课节管理中新增的课节均为系统版权，出处为系统内容</FormItem>
        <FormItem label="课节形式:" prop="form">
          <Select :disabled="edit" v-model="formValidate.form">
            <Option :value="1">冰上</Option>
            <Option :value="2">陆地</Option>
            <Option :value="3">冰上+陆地</Option>
          </Select>
        </FormItem>
        <FormItem label="课节标题:" prop="title">
          <Input :disabled="edit" v-model="formValidate.title" placeholder="请输入课节标题" />
        </FormItem>
        <FormItem label="教学重点" prop="tag">
          <Tag
            v-for="(item,index) in formValidate.tag"
            :key="index"
            :name="item"
            closable
            @on-close="handleClose2"
          >{{item}}</Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="handleAddTag"></Button>
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
          <Button :disabled="edit" @click="handleSubmit('formValidate')" style="margin-left: 8px">保存</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import { isEmpty } from "lodash";
export default {
  props: {
    onCancel: Function,
    rowInfo: Object,
    edit: Boolean
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
        afterClassTrain: 1
      },
      ruleValidate: {
        form: [
            {
            required: true,
            message: "The form cannot be empty",
          }
        ],
        title: [
          {
            required: true,
            message: "The title cannot be empty",
            trigger: "blur"
          }
        ],
        tag: [
          {
            required: true,
            message: "The tag cannot be empty",
          }
        ]
      }
    };
  },
  watch: {
    rowInfo: function(val) {
      this.formValidate = row;
    }
  },
  methods: {
    handleAddTag() {
      this.tagValue = "";
      this.$Modal.confirm({
        title: "教学重点",
        render: h => {
          return h("Input", {
            props: {
              value: this.tagValue,
              autofocus: true
              // placeholder: 'Please enter your name...'
            },
            on: {
              input: val => {
                this.tagValue = val;
              }
            }
          });
        },
        onOk: () => {
          if (this.tagValue.trim() !== "") {
            this.formValidate.tag.push(this.tagValue);
          }
        }
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
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
