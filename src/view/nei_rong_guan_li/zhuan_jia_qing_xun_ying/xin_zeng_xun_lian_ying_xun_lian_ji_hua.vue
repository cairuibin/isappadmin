<template>
  <div>
    <Modal
      v-model="modal"
      title="新增青训营"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-cancel="cancel"
      width="60%"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="类型:" prop="activityId">
          <Select :disabled="edit" v-model="formValidate.activityId">
            <Option value="1">训练营(自有教练)</Option>
            <Option value="2">青训营(专业教练)</Option>
          </Select>
        </FormItem>
        <FormItem label="训练营标题:" prop="title">
          <Input :disabled="edit" v-model="formValidate.title" placeholder="请输入训练营标题" />
        </FormItem>
        <FormItem label="副标题:" prop="subTitle">
          <Input :disabled="edit" v-model="formValidate.subTitle" placeholder="请输入副标题" />
        </FormItem>
        <!-- <FormItem label="摘要:" prop="zy">
          <Input
           :disabled="edit"
            v-model="formValidate.zy"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入摘要"
          />
        </FormItem> -->
        <FormItem label="标签:" prop="tag">
          <Input :disabled="edit" v-model="formValidate.tag" placeholder="输入青训营标签,使用英文逗号隔开" />
        </FormItem>
        <FormItem label="封面图片:" prop="imageUrl">
          <Row>
            <Col span="10">
              <Input :disabled="edit" v-model="formValidate.imageUrl" placeholder="图片地址"></Input>
            </Col>
            <Col span="6" style="text-align: center">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button :disabled="edit" icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Col>
            <Col span="6">
              <Button :disabled="edit" icon="ios-cloud-upload-outline">图库</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="所属冰场:" prop="rinkId">
          <Select :disabled="edit" v-model="formValidate.rinkId" placeholder="请选择冰场">
            <Option :value="1">昆明爱琴海店</Option>
          </Select>
        </FormItem>
        <FormItem label="课程安排:" prop="anpai">
          <Select :disabled="edit" v-model="formValidate.anpai" placeholder="请选择课程安排">
            <Option value="0">选择安排</Option>
            <Option value="1">无安排</Option>
            <Option value="2">训练计划</Option>
            <Option value="3">自定义课节</Option>
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
