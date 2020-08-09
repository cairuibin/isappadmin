<template>
  <div>
    <Modal v-model="modal1" title="新增菜单" @on-ok="ok" @on-cancel="cancel">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem label="模块名称：">
          <Input v-model="formValidate.input2" />
        </FormItem>

        <FormItem label="权限名称：">
          <Input v-model="formValidate.input5" placeholder="请输入管理员真实姓名" />
        </FormItem>

        <FormItem label="权限代码：" :rules="ruleValidate" prop="city">
         <Input disabled v-model="formValidate.input5" placeholder="请输入权限代码" />
        </FormItem>

      
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: true,
      formValidate: {
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",

        input8: "",
      },
      ruleValidate: {
        input1: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        input2: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        input3: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$Message.info(" ok");
    },
    cancel() {
      this.$Message.info("cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
.tishi {
  position: relative;
  left: 99px;
  top: -22px;
}
</style>











