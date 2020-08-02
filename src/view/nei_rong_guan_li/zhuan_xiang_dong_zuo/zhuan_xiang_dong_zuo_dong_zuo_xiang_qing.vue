<template>
  <div>
    <Modal v-model="modal12" title=" 新增动作">
      <div>
        <span>父类ID：</span>花样滑冰/滑行
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="* 动作名称" prop="name">
          <Input v-model="formValidate.name" placeholder="* 动作名称"></Input>
        </FormItem>
        <FormItem label="动作标签" prop="mail">
          <Input v-model="formValidate.mail" placeholder="动作标签"></Input>
        </FormItem>
        <FormItem label="动作描述" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="分解练习：" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="教学重点" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="易犯错误" prop="desc">
          <Input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>

        <FormItem label="* 动作配图" prop="name">
          <Input v-model="formValidate.name" placeholder="* 动作配图"></Input>
          <div>
            <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
            <Button>图库</Button>
            <div v-if="file !== null">
              图片: {{ file.name }}
              <Button
                type="text"
                @click="upload"
                :loading="loadingStatus"
              >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="* 动作视频" prop="name">
          <Input v-model="formValidate.name" placeholder="* 动作视频"></Input>
          <div>
            <Upload :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
            <div v-if="file !== null">
              图片: {{ file.name }}
              <Button
                type="text"
                @click="upload"
                :loading="loadingStatus"
              >{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="动作分类：" prop="city">
          <Select v-model="formValidate.city" placeholder="动作分类">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="练习分类" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="练习时长" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="* 状态" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal12: true,
      file: null,
      loadingStatus: false,
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
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
            required: true,
            message: "Please enter a personal introduction",
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
  },
  handleUpload(file) {
    this.file = file;
    return false;
  },
  upload() {
    this.loadingStatus = true;
    setTimeout(() => {
      this.file = null;
      this.loadingStatus = false;
      this.$Message.success("Success");
    }, 1500);
  },
};
</script>