<template>
  <div>
      <div class="kucun_table_item">
                <div>颜色</div>
                <div>尺码</div>
                <div>库存(件)</div>
              </div>
    <Form ref="formDynamic" :model="formDynamic" :label-width="130" >
      <!-- :label="lab+ item.index" -->
      <FormItem
        v-for="(item, index) in formDynamic.items"
        v-if="item.status"
        :key="index"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.index +'不能为空', trigger: 'blur'}"
      >
        <Row>
          <Col span="16">
            <input class="inp" type="text" v-model="item.value1" placeholder="请输入颜色"></input>
            <input class="inp" type="text" v-model="item.value2" placeholder="请输入尺码"></input>
            <input class="inp" type="text" v-model="item.value3" placeholder="请输入库存"></input>
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
      <!-- <FormItem>
        <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
        <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
      </FormItem> -->
    </Form>
  </div>
</template>
<script>
export default {
  name: "AddItem",
  data() {
    return {
      index: 1,
      formDynamic: {
        items: [
          {
             value1: "",
            value2: "",
            value3: "",
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
         value1: "",
            value2: "",
            value3: "",
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

<style lang="scss" scoped>
.kucun_table_item{
      display: flex;
      text-align: center;
       >div{
          width: 100px;
          border: 1px solid #ccc;
        }
       
}
 .ivu-col-span-16{
          width: 36%;
        }
        .ivu-col-offset-1{
          margin-left:0;
        }
.inp{
  width: 100px;
  padding-left: 5px;
}
</style>
