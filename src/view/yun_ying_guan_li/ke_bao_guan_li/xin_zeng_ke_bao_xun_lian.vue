<template>
  <div>
    <Modal
      v-model="modal"
      title="新增课包"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-cancel="cancel"
      width='60%'
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="课包名称:" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入课包名陈"></Input>
        </FormItem>
        <FormItem label="封面图片" prop="imageUrl">
          <Row>
            <Col span="10">
              <Input v-model="formValidate.imageUrl" placeholder="图片地址"></Input>
            </Col>
            <Col span="6" style="text-align: center">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Col>
            <Col span="6">
              <Button icon="ios-cloud-upload-outline">图库</Button>
            </Col>
          </Row>
        </FormItem>

        <FormItem label="课包摘要:" prop="imageUrl">
          <Input
            v-model="formValidate.imageUrl"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入课程摘要"
          />
        </FormItem>
        <FormItem label=" 图文介绍:" prop="introduce">
          <!-- <Input v-model="formValidate.editText" placeholder="图片地址"></Input> -->
          <Editor />
        </FormItem>
        <FormItem label="课程安排" prop="anpai">
          <Select v-model="formValidate.anpai" placeholder="请选择课程安排">
            <Option value="0">选择安排</Option>
            <Option value="1">无安排</Option>
            <Option value="2">训练计划</Option>
            <Option value="3">自定义课节</Option>
          </Select>
        </FormItem>
        <FormItem label="训练计划:" prop="ji_hua">
          <Input
            v-model="formValidate.ji_hua"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入课程摘要"
          />
        </FormItem>
        <FormItem label="附加内容:" prop="fu_jia">
          <Button @click="handleContent">+</Button>
        </FormItem>
              <FormItem label="赠送内容:" prop="zeng_song">
          <Input
            v-model="formValidate.ji_hua"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入课程摘要"
          ></Input>
        </FormItem>
          </FormItem>
              <FormItem label="应收总价:" prop="zeng_song">
          <Input
            v-model="formValidate.ji_hua"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入课程摘要"
          ></Input>
        </FormItem>
          </FormItem>
              <FormItem label="实收总价:" prop="zeng_song">
          <Input
            v-model="formValidate.ji_hua"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入课程摘要"
          ></Input>
        </FormItem>
         <FormItem label="关联门店" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择课程安排">
            <Option value="beijing">选择门店</Option>
            <Option value="shanghai">机构-冰场</Option>
            
          </Select>
        </FormItem>
         <FormItem label="关联教练" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择课程安排">
            <Option value="beijing">选择教练</Option>
         
          </Select>
        </FormItem>
         <FormItem label="状态" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择课程安排">
            <Option value="beijing">选择状态</Option>
            <Option value="shanghai">有效</Option>
            <Option value="shenzhen">无效</Option>
              <Option value="shenzhen">暂停</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="Date">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="time">
                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>-->
        <!-- <FormItem label="Gender" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>-->

        <FormItem>
          <Button type="primary" @click="cancel">取消</Button>
          <Button @click="handleSubmit('formValidate')" style="margin-left: 8px">保存</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import Editor from "@/view/components/editor/editor.vue";
export default {
  props: {
    onCancel: Function,
  },
  data() {
    return {
      modal: true,
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
      formValidate: {},
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
  components: {
    Editor,
  },
  mounted() {},
  methods: {
    handleContent(){
      //附加内容
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["formValidate"].resetFields();
      this.onCancel();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
  },
};
</script>
