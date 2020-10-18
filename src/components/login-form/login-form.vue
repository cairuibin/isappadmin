<template>
  <Form
    class="login-form"
    ref="formCustom"
    :model="formCustom"
    :rules="ruleCustom"
    @keydown.enter.native="handleSubmit('formCustom')"
  >
    <FormItem prop="userName">
      <Input v-model="formCustom.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formCustom.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="picCode">
      <Input placeholder="请输入验证码" class="yanzhengma" type="text" v-model="formCustom.picCode" />
      <img class="yanzhengma-img" src="https://test.iskatesports.com/api/v2/message/sms/getPicCode?username=IskateAdmin" @click="()=>updata()" alt />
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit('formCustom')" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import CryptoJS from "crypto-js/crypto-js";
import untilMd5 from "../../utils/md5";
import Md5 from "md5";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      formCustom: {
        userName: "IskateAdmin",
        password: "123456",
        picCode: "",
      },
      ruleCustom: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePassCheck, trigger: "blur" }],
        picCode: [{ validator: validateAge, trigger: "blur" }],
      },
      getPicCodepath: "",
    };
  },
  created() {
    this.getPicCode();
  },
  methods: {
    updata() {
      this.getPicCode();
    },
    getPicCode() {
      return (
        "https://test.iskatesports.com/api/v2/message/sms/getPicCode?username=" +
        this.formCustom.userName
      );
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let aa = untilMd5.toSign(
            {
              username: this.formCustom.userName,
              password: Md5(this.formCustom.password),
              picCode: this.formCustom.picCode,
            },
            "userLogin"
          );
       
          this.axios
            .post("/api/v2/manage/system/userLogin", {
               username: this.formCustom.userName,
              password: Md5(this.formCustom.password),
              picCode: this.formCustom.picCode,
              sign: aa,
            })
            .then(
              (res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$Message.success("登录成功");
                  localStorage.token = res.data.data.token;
                  localStorage.username=res.data.data.username;
                localStorage.mobile=res.data.data.mobile
               localStorage.roleName=res.data.data.roleName
                  this.$router.push("/home");
                } else {
                  this.$Message.error("登录失败");
                }
                localStorage.setItem('user',JSON.stringify(res.data.data))
                console.log(res.data);
              },
              (e) => {
                console.log(e);
              }
            );
        } else {
          this.$Message.error("登录失败");
        }
      });
    },
  },
};
</script>
<style lang="less">

.yanzhengma {
  width: 50%;
}
.yanzhengma-img {
  width: 45%;
  height: 36px;

  position: absolute;

  right: 0;
}
</style>
