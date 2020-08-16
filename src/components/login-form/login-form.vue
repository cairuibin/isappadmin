<template>
  <Form
    class="login-form"
    ref="formCustom"
    :model="formCustom"
    :rules="ruleCustom"
    @keydown.enter.native="handleSubmit"
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
      <img class="yanzhengma-img" :src="getPicCodepath" @click="()=>getPicCode()" alt />
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
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
        age: "jjl9",
      },
      ruleCustom: {
        userName: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }],
      },
      getPicCodepath: "",
    };
  },
  created() {
    this.getPicCode();
  },
  methods: {
    getPicCode() {
      this.axios
        .post(
          "/api/api/v2/message/sms/getPicCode",
          {
            username: this.formCustom.userName,

            sign: untilMd5.toSign(
              {
                username: this.formCustom.userName,
              },
              "getPicCode"
            ),
          },
          {
            responseType: "blob",
            "Content-Type": "image/jpeg",
          }
        )
        .then((res) => {
     
          let url = window.URL.createObjectURL(res.data);
          this.getPicCodepath=url
        });
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios
            .post("/api/api/v2/manage/system/userLogin", {
              username: this.formCustom.passwd,
              password: Md5(this.formCustom.passwdCheck),
              picCode: this.formCustom.age,
              sign: untilMd5.toSign(
                {
                  username: this.formCustom.passwd,
                  password: Md5(this.formCustom.passwdCheck),
                  picCode: this.formCustom.age,
                },
                "userLogin"
              ),
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$Message.success("登录成功");
                localStorage.token = res.data.data.token;
                this.$router.push("/home");
              } else {
                this.$Message.error("登录失败");
              }
              console.log(res.data);
            });
        } else {
          this.$Message.error("登录失败");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
<style lang="less">
// .login-wrap {
//   width: 100%;
//   height: 100%;
//   background-image: url(../../assets/images/login-bg.jpg);
//   .login-form {
//     width: 300px;
//     background: #fff;
//     padding: 40px;
//     position: fixed;
//     top: 30%;
//     right: 10%;
//     border-radius: 10px;
//   }
//   .ivu-form-item-content {
//     margin-left: 0 !important;
//     position: relative;
//   }
//   .ivu-btn-primary {
//     width: 100%;
//   }
//   .yanzhengma {
//     width: 50%;
//   }
//   .yanzhengma-img {
//     width: 45%;
//     height: 36px;

//     position: absolute;

//     right: 0;
//   }
// }
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
