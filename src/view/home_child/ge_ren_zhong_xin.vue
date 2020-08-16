<template>
  <div>
    <ul>
      <li>登录账号：{{username}}</li>
      <li>联系电话：{{mobile}}</li>
      <li>所属角色：{{roleName}}</li>
      <li>
        密码：
        <Button type="primary" @click="modal1=true">修改密码</Button>
      </li>
    </ul>
    <Modal v-model="modal1" title="修改密码" @on-ok="oks" @on-cancel="cancels" :mask-closable="false">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="原密码：" prop="pwd">
          <Input type="text" placeholder="6~20位字符" v-model="formCustom.pwd" style="width: 200px" />
        </FormItem>
        <FormItem label="新密码：" prop="newpwd">
          <Input
            type="password"
            placeholder="6~20位字符"
            v-model="formCustom.newpwd"
            style="width: 200px"
          />
        </FormItem>
        <FormItem label="确认新密码：" prop="Checkpwd">
          <Input
            type="password"
            placeholder="6~20位字符"
            v-model="formCustom.Checkpwd"
            style="width: 200px"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="error" size="large" @click="cancels">取消</Button>
        <Button type="error" size="large" @click="oks">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "grzx",
  data() {
    const validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (value.length <= 6 || value.length >= 20) {
        callback(new Error("密码长度应为6-20位字符"));
      } else {
        if (this.formCustom.Checkpwd !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("Checkpwd");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else if (value !== this.formCustom.pwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      modal1: false,
      formCustom: {
        pwd: "",
        newpwd: "",
        Checkpwd: "",
      },
      ruleCustom: {
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        newpwd: [{ validator: validatePass, trigger: "blur" }],
        Checkpwd: [{ validator: validatePassCheck, trigger: "blur" }],
      },

      mobile:localStorage.mobile,
      username:localStorage.username,
      roleName:localStorage.roleName

    };
  },
  methods: {
    oks() {
      this.$Message.info("修改就差掉接口了");
      this.$refs["formCustom"].validate((valid) => {
        if (valid) {
          //  this.axios.post()
        }
      });
    },
    cancels() {
      this.$refs["formCustom"].resetFields();
      this.modal1 = false;
    },
  },
};
</script>

<style  lang="scss" scoped>
ul {
  line-height: 50px;
  padding: 10px 40px;
  font-size: 16px;
}
</style>
