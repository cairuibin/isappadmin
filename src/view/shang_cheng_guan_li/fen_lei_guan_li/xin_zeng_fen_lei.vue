<template>
  <div>
    <Modal
      v-model="modal"
      title="新增商品分类"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      width='30%'
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="父类:" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入父类名称，无父类则代表一级类目" />
        </FormItem>
        <FormItem label="分类名称:" prop="desc">
          <Input
            v-model="formValidate.desc"
            placeholder="请输入分类名称"
          />
        </FormItem>
     <FormItem label="分类code：" prop="desc">
          <Input
            v-model="formValidate.desc"
            placeholder="请输入分类code"
          />
        </FormItem>
        <FormItem label="状态" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择课程安排">
                 <Option value="shanghai">启用</Option>
            <Option value="beijing">禁止</Option>
         
       
          </Select>
        </FormItem>
             <FormItem label="备注" prop="desc">
          <Input
            v-model="formValidate.desc"
            placeholder="请输入"
          />
        </FormItem>
      
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
      <div slot="footer">
         </div>
    </Modal>
  </div>
</template>
<script>
import Editor from "@/view/components/editor/editor.vue";
export default {
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
  components: {
    Editor,
  },
  mounted() {},
  methods: {
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
      this.$refs["setGold"].resetFields();
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
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
