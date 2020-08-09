<template>
  <div>
    <Modal v-model="modal1" title="新增管理员" @on-ok="ok" @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="100">
        <FormItem label="所属角色" :rules="ruleValidate" prop="city">
          <Select v-model="formValidate.input1" placeholder="所属角色">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>

        <FormItem label="用户名">
          <Input v-model="formValidate.input2" />
        </FormItem>

        <FormItem label="所属机构">
          <Select v-model="formValidate.input3" placeholder="选择机构">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <div class="tishi">如果是指定机构管理员则必须选择机构</div>

        <FormItem label="所属冰场" prop="city">
          <Select v-model="formValidate.input4" placeholder="选择冰场">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="真实姓名">
          <Input v-model="formValidate.input5" placeholder="请输入管理员真实姓名"/>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formValidate.input6" placeholder="请输入管理员联系电话"/>
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formValidate.input7" placeholder="请输入管理员联系邮箱"/>
        </FormItem>
        <FormItem label="状态" prop="city">
          <Select v-model="formValidate.input8" placeholder="选择状态">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
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
        input4:"",
        input5: "",
         input6:"",
        input7: "",
       
        input8: "",
      },
      ruleValidate: {
                    input1: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input2: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    input3: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    
                }
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
    .tishi{
        position: relative;
        left: 99px;
        top:-22px;
    }
</style>











