<template>

<div>

	<Modal
		v-model="modal"
		title="新增课包"
    :scrollable='true'
    :mask-closable="false"
		:loading="loading"
		@on-ok="ok"
		@on-cancel="cancel">
		<Form ref="setGold" :model="setForm" :rules="rules">
			<FormItem prop="rate">
				<Row>
					<Col span="6">
						<div style="margin-top:2px">请输入设置的汇率:</div>
					</Col>
					<Col span="8">
						<Input v-model="setForm.rate" placeholder="请输入设置的汇率"></Input>
					</Col>
				</Row>
			</formItem>
		</Form>
	</Modal>
</div>

</template>
<script>
export default{
  data () {
    return {
      modal: true,
      loading: true,
      setForm: { rate: '' },
      rules: {
        rate: [
          { required: true, message: '汇率不能为空', trigger: 'blur' },
		    { type: 'string', pattern: /^[0-9]*$/, message: '汇率格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {

    async ok () {
      this.$refs.setGold.validate(async (valid) => {
        if (valid) {
          let res = await this.$ajax.post('/xx/xx', {})
          if (res.cd === 0) {
            // doSomething..
          } else {
            this.$Message.info(res.msg)
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
      })
    },
    cancel () {
    // 取消后，重置表单
      this.$refs['setGold'].resetFields()
    }

  }

}
</script>
