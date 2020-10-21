<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button @click="handlAdd" type="primary">新增</i-button>&emsp;
        <i-button type="primary" @click="handlRemove">删除</i-button>
      </div>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
        @on-select-all="onselectall"
        @on-select="onselect"
        @on-select-cancel="onselectcancel"
        @on-select-all-cancel="onselectallcancel"
        @on-selection-change="onselectionchange"
      />
      <div style="margin-top: 20px">
        <Page
          show-total
          @on-change="Pageonchange"
          @on-page-size-change="onpagesizechange"
          :total="total"
          show-elevator
        ></Page>
      </div>
    </Card>
    <Modal
      v-model="AddAndEditvisible"
      @on-ok="ok"
      @on-cancel="cancel"
      loading
      title=" 新增动作"
      :width="750"
    >
      <div><span>父类ID：</span>花样滑冰/滑行</div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label=" 动作名称" prop="name">
          <Input v-model="formValidate.name" placeholder=" 动作名称" />
        </FormItem>
        <FormItem label="动作标签" prop="tag">
          <Input v-model="formValidate.tag" placeholder="动作标签" />
        </FormItem>
        <FormItem label="动作描述" prop="description">
          <Input
            v-model="formValidate.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入动作描述"
          />
        </FormItem>
        <FormItem label="分解练习：" prop="content">
          <Input
            v-model="formValidate.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入分解练习"
          />
        </FormItem>
        <FormItem label="教学重点" prop="imports">
          <Input
            v-model="formValidate.imports"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入教学重点"
          />
        </FormItem>
        <FormItem label="易犯错误" prop="errors">
          <Input
            v-model="formValidate.errors"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入易犯错误"
          />
        </FormItem>

        <FormItem label="动作配图" prop="imageUrl">
          <Input
            type="url"
            v-model="formValidate.imageUrl"
            placeholder=" 动作配图"
          />
          <div>
            <Upload
              :before-upload="handleUpload"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
            <Button>图库</Button>
            <div v-if="file !== null">
              图片: {{ file.name }}
              <Button type="text" @click="upload" :loading="loadingStatus">{{
                loadingStatus ? "Uploading" : "Click to upload"
              }}</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label=" 动作视频" prop="videoUrl">
          <Input v-model="formValidate.videoUrl" placeholder=" 动作视频" />
          <div>
            <Upload
              :before-upload="handleUpload"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">上传视频</Button>
            </Upload>
            <div v-if="file !== null">
              图片: {{ file.name }}
              <Button type="text" @click="upload" :loading="loadingStatus">{{
                loadingStatus ? "Uploading" : "Click to upload"
              }}</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="动作分类：" prop="actionType">
          <Select v-model="formValidate.actionType" placeholder="动作分类">
            <Option :value="1">滑行</Option>
            <Option :value="2">跳跃、旋转、步法</Option>
            <Option :value="3">原地动作</Option>
            <Option :value="4">行进动作</Option>
          </Select>
        </FormItem>
        <FormItem label="练习分类" prop="trainUnit">
          <Select v-model="formValidate.trainUnit" placeholder="练习分类">
            <Option :value="1">圈</Option>
            <Option :value="2">次数(成功/失败)</Option>
            <Option :value="3">次数(是否完成)</Option>
            <Option :value="4">分钟</Option>
          </Select>
        </FormItem>
        <FormItem label="练习时长" prop="times">
          <Select v-model="formValidate.times" placeholder="练习时长">
            <Option :value="1">15</Option>
            <Option :value="2">30</Option>
            <Option :value="3">45</Option>
            <Option :value="4">60</Option>
          </Select>
        </FormItem>
        <FormItem label=" 状态" prop="status">
          <Select v-model="formValidate.status" placeholder="请选择状态">
            <Option :value="1">有效</Option>
            <Option :value="2">无效</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
export default {
  name: "tables_page",
  components: {
    Tables,
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "动作名称", key: "name", sortable: false },
        {
          title: "动作配图",
          key: "imageUrl",
          render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.imageUrl} />
              </div>
            );
          },
        },
        { title: "标签", key: "tag" },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return (
              <span>
                {params.row.status === 0
                  ? "无效"
                  : params.row.status === 1
                  ? "有效"
                  : ""}
              </span>
            );
          },
        },
        { title: "排序", key: "sortIndex" },

        {
          title: "操作",

          key: "action",

          width: 150,

          align: "center",

          render: (h, params) => {
            return h("div", [
              h(
                "Button",

                {
                  props: {
                    type: "primary",

                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.row);
                    },
                  },
                },

                "查看"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "primary",

                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.edit(params.index);
                    },
                  },
                },

                "编辑"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
      total: 0,
      pageNum: 1,
      pageSize: 10,
      deleteSelectIds: [],
      AddAndEditvisible: false,

      file: null,
      loadingStatus: false,
      formValidate: {
        name: "",
        tag: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        description: "",
        content: "",
        imports: "",
        errors: "",
        imageUrl: "",
        videoUrl: "",
        actionType: "",
        trainUnit: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入动作名陈",
            trigger: "blur",
          },
        ],
        tag: [
          {
            required: true,
            message: "请输入动作标签",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入分解练习",
            trigger: "blur",
          },
        ],
        imports: [
          {
            required: true,
            message: "请输入教学重点",
            trigger: "blur",
          },
        ],
        errors: [
          {
            required: true,
            message: "请输入易犯错误",
            trigger: "blur",
          },
        ],
        errors: [
          {
            required: true,
            message: "请输入图片地址",
            trigger: "blur",
          },
        ],
        videoUrl: [
          {
            required: true,
            message: "请输入视频地址",
            trigger: "blur",
          },
        ],
        actionType: [
          {
            required: true,
            message: "请输入动作分类",
            trigger: "change",
          },
        ],
        trainUnit: [
          {
            required: true,
            message: "请输入练习分类",
            trigger: "change",
          },
        ],
        times: [
          {
            required: true,
            message: "请输入练习分类",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请输入练习分类",
            trigger: "change",
          },
        ],
        description: [
          {
            required: true,
            message: "请输入动作描述",
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
    async look({ id }) {
      let{ data} = await this.getTechniqueActionInfo({
        id: id,
      });
      this.AddAndEditvisible = true;
    
      this.formValidate = data.data;
    },
    edit(params) {
      console.log(params);
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    getTechniqueActionPage(params) {
      this.axios
        .post("/api/v2/data/action/getTechniqueActionPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTechniqueActionPage"),
        })
        .then((res) => {
          console.log(res.data, "查询退款申请列表接口(分页)");
          this.tableData = res.data.data.list;
        });
    },
    deleteTableInId(params) {
      return this.axios.post("/api/v2/data/action/deleteTechniqueAction", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "deleteTechniqueAction"),
      });
    },
    getTechniqueActionInfo(params) {
      return this.axios.post("/api/v2/data/action/getTechniqueActionInfo", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getTechniqueActionInfo"),
      });
    },
    Pageonchange(pageNum) {
      this.getTechniqueActionPage({
        pageNum: pageNum,
        pageSize: this.pageSize,
      });
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
    onselect(select) {
      console.log(select);
      this.deleteSelectIds = select.map((v) => v.id);
    },
    onselectall(selects) {},
    onselectcancel(select) {
      this.deleteSelectIds = select.map((v) => v.id);
    },
    onselectallcancel(select) {},
    onselectionchange(select) {
      this.deleteSelectIds = select.map((v) => v.id);
    },
    handlRemove() {
      this.$Modal.confirm({
        title: "提示",
        content: "<h3>确定删除该课包吗？</h3>",
        onOk: async () => {
          let res = await this.deleteTableInId({
            ids: this.deleteSelectIds.join(),
            updateUser: JSON.parse(localStorage.user).id,
          });
          console.log(res.data);
          if (res.data.code === 200) {
            this.getTechniqueActionPage({
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            });
            this.$Message.info("删除成功");
          } else {
            this.$Message.info("删除失败");
          }
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        },
      });
    },
    handlAdd() {
      this.AddAndEditvisible = true;
    },

    ok() {
      let handleSubmitres = this.handleSubmit("formValidate");
      if (handleSubmitres === 1) {
        this.$Message.info("表单校验成功");
      } else {
      }
    },
    cancel() {
      this.handleReset("formValidate");
      this.$Message.info("您取消了此次操作");
    },

    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success("表单校验成功!");
          return 0;
        } else {
          // this.$Message.error("表单校验失败!");
          return 1;
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
  },
  mounted() {
    this.getTechniqueActionPage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  },
};
</script>

<style scoped lang='scss'>
</style>
