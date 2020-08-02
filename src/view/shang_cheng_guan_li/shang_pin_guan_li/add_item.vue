<template>
  <div>
    <div style="font-size:16px">{{lab}}</div>

    <Form ref="formDynamic" :model="formDynamic" :label-width="130" style="width: 300px">
      <!-- :label="lab+ item.index" -->
      <FormItem
        v-for="(item, index) in formDynamic.items"
        v-if="item.status"
        :key="index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +'不能为空', trigger: 'blur'}"
      >
        <Row>
          <Col span="18">
            <Input type="text" v-model="item.value" placeholder="请输入"></Input>
          </Col>
          <Col span="4" offset="1">
            <Button @click="handleRemove(index)">删除</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="md-add"></Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
        <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "AddItem",
  props: ["lab"],
  data() {
    return {
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1,
          },
        ],
      },
    };
  },
  methods: {
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
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1,
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    },
  },
};
</script>
