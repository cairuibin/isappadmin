<template>
  <div>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
          <FormItem label="原密码：" prop="pwd">
            <Input type="text" placeholder="6~20位字符" v-model="formCustom.pwd" style="width: 200px" />
        </FormItem>
        <FormItem label="新密码：" prop="newpwd">
            <Input type="password" placeholder="6~20位字符" v-model="formCustom.newpwd" style="width: 200px" />
        </FormItem>
        <FormItem label="确认新密码：" prop="Checkpwd">
            <Input type="password" placeholder="6~20位字符" v-model="formCustom.Checkpwd" style="width: 200px" />
        </FormItem>
    </Form>
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
