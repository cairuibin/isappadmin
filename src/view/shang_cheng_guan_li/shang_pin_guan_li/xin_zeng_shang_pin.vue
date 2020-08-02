<template>
  <div>
    <Modal
      v-model="modal"
      title="新增商品"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      width="60%"
    >
      <div style="font-size:16px">基本信息:</div>

      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
        <FormItem label="商品分类" prop="city">
          <Select v-model="formValidate.city" placeholder="选择分类">
            <Option value="beijing">选择安排</Option>
            <Option value="shanghai">训练计划</Option>
            <Option value="shenzhen">自定义课节</Option>
          </Select>
        </FormItem>
        <FormItem label="商品标题" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入商品标题" />
        </FormItem>
        <FormItem label="副标题" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入商品副标题" />
        </FormItem>
        <FormItem label="所属品牌" prop="city">
          <Select v-model="formValidate.city" placeholder="选择品牌">
            <Option value="beijing">选择安排</Option>
            <Option value="shanghai">训练计划</Option>
            <Option value="shenzhen">自定义课节</Option>
          </Select>
        </FormItem>
        <FormItem label="适用人群：" prop="name">
          <Input v-model="formValidate.name" placeholder="适用人群：" />
        </FormItem>
        <FormItem label="采购地" prop="city">
          <Select v-model="formValidate.city" placeholder="选择">
            <Option value="beijing">国内</Option>
            <Option value="shanghai">海外及港澳台</Option>
          </Select>
        </FormItem>
        <div style="font-size:16px">销售信息:</div>
        <AddItem lab="颜色" />

        <AddItem lab="尺码" />

        <FormItem label="规格库存" prop="name">
          通过填写的颜色和尺码进行各规格库存录
          <!-- <Input v-model="formValidate.name" placeholder="适用人群：" /> -->
        </FormItem>

        <FormItem label="一口价" prop="name">
          <Input v-model="formValidate.name" placeholder />元
        </FormItem>
        <FormItem label="总库存" prop="name">
          <Input v-model="formValidate.name" placeholder />件
          (通过型号累加得出)
        </FormItem>

        <div style="font-size:16px">图文描述</div>
        <FormItem label="封面图片" prop="mail">
          <Row>
            <Col span="10">
              <Input v-model="formValidate.mail" placeholder="图片地址" />
            </Col>
            <Col span="6" style="text-align: center">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Col>
            <Col span="6">
              <Button icon="ios-cloud-upload-outline">图库</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="介绍图" prop="mail">
          <Row>
            <Col span="10">
              <Input v-model="formValidate.mail" placeholder="图片地址" />
            </Col>
            <Col span="6" style="text-align: center">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传图片</Button>
              </Upload>
            </Col>
            <Col span="6">
              <Button icon="ios-cloud-upload-outline">图库</Button>
            </Col>
          </Row>
        </FormItem>
        <Button>+增加介绍图</Button>

        <FormItem label="简介:" prop="editText">
          <Editor />
        </FormItem>
        <div style="font-size:16px">付款方式</div>
        <div>付款信息：一口价/买家拍下减库存</div>

        <div style="font-size:16px">物流信息</div>
        <FormItem label="提取方式：" prop="city">
          <Select v-model="formValidate.city" placeholder="选择分类">
            <Option value="beijing">免邮费</Option>
            <Option value="shanghai">物流配送</Option>
          </Select>
        </FormItem>

        <div style="font-size:16px">售后服务</div>

        <FormItem label="售后支持：" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="提供发票"></Checkbox>
            <Checkbox label="退换货承诺"></Checkbox>
          </CheckboxGroup>
        </FormItem>

        <div style="font-size:16px">分润支持</div>
        <FormItem label="是否分润：" prop="city">
          <Select v-model="formValidate.city" placeholder="选择分类">
            <Option value="beijing">有分润</Option>
            <Option value="shanghai">无分润</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">暂不上架</Button>
          <Button type="primary" @click="handleSubmit('formValidate')">直接上架</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import Editor from "@/view/components/editor/editor.vue";
import AddItem from "./add_item";
export default {
  data() {
    return {
      modal: true,
      loading: true,
      setForm: { rate: "" },
      rules: {
        rate: [
          { required: true, message: "汇率不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^[0-9]*$/,
            message: "汇率格式不正确",
            trigger: "blur",
          },
        ],
      },
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        editText: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        editText: [
          {
            required: true,
            message: "请输入图文介绍",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select gender",
            trigger: "change",
          },
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change",
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: false,
            message: "请输入课包摘要",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Editor,
    AddItem,
  },
  mounted() {},
  methods: {
    async ok() {
      this.$refs.setGold.validate(async (valid) => {
        if (valid) {
          let res = await this.$ajax.post("/xx/xx", {});
          if (res.cd === 0) {
            // doSomething..
          } else {
            this.$Message.info(res.msg);
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
      });
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["setGold"].resetFields();
    },
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
  },
};
</script>
