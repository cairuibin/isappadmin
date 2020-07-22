<template>
  <div>
      <ul>
          <li>登录账号：name</li>
          <li>联系电话：phone</li>
          <li>所属角色：role</li>
          <li>密码：<Button style="color:red" type="text">修改密码</Button></li>
          <li> <Button type="primary" size="large">保存</Button></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'grzx',
  data () {
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else if (value.length <= 6 || value.length >= 20) {
        callback(new Error('密码长度应为6-20位字符'))
      } else {
        if (this.formCustom.Checkpwd !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('Checkpwd')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('不能为空'))
      } else if (value !== this.formCustom.pwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }

    return {
      formCustom: {
        pwd: '',
        newpwd: '',
        Checkpwd: ''
      },
      ruleCustom: {
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        newpwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        Checkpwd: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      console.log(name)
    }
  }
}
</script>

<style  lang="scss" scoped>
    ul{
        line-height: 40px;
        padding: 10px 40px;
    }
</style>
