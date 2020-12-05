<template>
  <div>
    
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <i-button @click="handlAdd" type="primary">新增</i-button>&emsp;
        <i-button type="primary" @click="handlRemove">删除</i-button>
      </div>
      <div :style="{display:'flex'}">
          <Card>
        <div :style="{minWidth:'100px',lineHeight:'27px',fontWeight:'bold',color:'#666'}" v-for="(v, i) in neirongContent" :key="i">{{ v }}</div>
       </Card >
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
      </div>
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
      :loading="isModalloading"
      title=" 新增动作"
      :width="750"
      :mask-closable="false"
    >
      <div><span>父类ID：</span>花样滑冰/滑行</div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
        :disabled="islook"
        :show-message="isshowmessage"
      >
        <FormItem label=" 动作名称" prop="name">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.name"
            placeholder=" 动作名称 String"
          />
        </FormItem>
        <FormItem label="动作标签" prop="tag">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.tag"
            placeholder="动作标签String"
          />
        </FormItem>
        <FormItem label="动作描述" prop="description">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入动作描述String"
          />
        </FormItem>
        <FormItem label="分解练习：" prop="content">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.content"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入分解练习内容json，格式[{“title”:””,”describe”:””},{“title”:””,”describe”:””}…]"
          />
        </FormItem>
        <FormItem label="教学重点" prop="imports">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.imports"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入教学重点"
          />
        </FormItem>
        <FormItem label="易犯错误" prop="errors">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.errors"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入易犯错误"
          />
        </FormItem>

        <FormItem label="动作配图" prop="imageUrl">
          <Input
            :disabled="isEdit === 3"
            type="url"
            v-model="formValidate.imageUrl"
            placeholder=" 动作配图"
          />
          <div>
            <Upload
              :before-upload="handleUpload"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button :disabled="isEdit === 3" icon="ios-cloud-upload-outline"
                >上传图片</Button
              >
            </Upload>
            <Button :disabled="isEdit === 3">图库</Button>
            <div v-if="file !== null">
              图片: {{ file.name }}
              <Button type="text" @click="upload" :loading="loadingStatus">{{
                loadingStatus ? "Uploading" : "Click to upload"
              }}</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label=" 动作视频" prop="videoUrl">
          <Input
            :disabled="isEdit === 3"
            v-model="formValidate.videoUrl"
            placeholder=" 动作视频"
          />
          <div>
            <Upload
              :before-upload="handleUpload"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button :disabled="isEdit === 3" icon="ios-cloud-upload-outline"
                >上传视频</Button
              >
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
          <Select
            :disabled="isEdit === 3"
            v-model="formValidate.actionType"
            placeholder="动作分类"
          >
            <Option value="1">滑行</Option>
            <Option value="2">跳跃、旋转、步法</Option>
            <Option value="3">原地动作</Option>
            <Option value="4">行进动作</Option>
          </Select>
        </FormItem>
        <FormItem label="练习分类" prop="trainUnit">
          <Select
            :disabled="isEdit === 3"
            v-model="formValidate.trainUnit"
            placeholder="练习分类"
          >
            <Option value="1">圈</Option>
            <Option value="2">次数(成功/失败)</Option>
            <Option value="3">次数(是否完成)</Option>
            <Option value="4">分钟</Option>
          </Select>
        </FormItem>
        <FormItem label="练习时长" prop="times">
          <Select
            :disabled="isEdit === 3"
            v-model="formValidate.times"
            placeholder="练习时长"
          >
            <Option value="1">15</Option>
            <Option value="2">30</Option>
            <Option value="3">45</Option>
            <Option value="4">60</Option>
          </Select>
        </FormItem>
        <FormItem label=" 状态" prop="status">
          <Select
            :disabled="isEdit === 3"
            v-model="formValidate.status"
            placeholder="请选择状态"
          >
            <Option value="1">有效</Option>
            <Option value="2">无效</Option>
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
          neirongContent: [
            '轮播图',
        "HappySkate",
        "大咖讲堂",
        "专家青训营",
        "线下课包",
      
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "序号", key: "name", sortable: false },
        {
          title: "标题",
          key: "imageUrl",
          render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.imageUrl} />
              </div>
            );
          },
        },
        {
          title: "副标题",
          key: "tag",
          render: (h, params) => {
            return JSON.parse(params.row.tag).map((v, i) => (
              <span>
                {v} {i !== JSON.parse(params.row.tag).length - 1 ? " | " : ""}
              </span>
            ));
          },
        },
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
                      this.edit(params.row);
                    },
                  },
                },

                "不可用"
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
            required: false,
            message: "请输入分解练习",
            trigger: "blur",
          },
        ],

        imageUrl: [
          {
            required: false,
            message: "请输入图片地址",
            trigger: "blur",
          },
        ],
        videoUrl: [
          {
            required: false,
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
            required: false,
            message: "请输入练习时长",
            trigger: "change",
          },
        ],
        status: [
          {
            required: true,
            message: "请输入状态",
            trigger: "change",
          },
        ],
        description: [
          {
            required: false,
            message: "请输入动作描述",
            trigger: "blur",
          },
        ],
      },
      islook: true,
      isEdit: 1, //1表示编辑 2表示添加 3表示查看
      isshowmessage: true,
      isModalloading: true,
    };
  },
  methods: {
    async look({ id }) {
      let { data } = await this.getTechniqueActionInfo({
        id: id,
      });
      this.isEdit = 3;
      this.isshowmessage = false;
      this.AddAndEditvisible = true;
      this.islook = true;

      data.data.actionType = data.data.actionType + "";
      data.data.trainUnit = data.data.trainUnit + "";
      data.data.status = data.data.status + "";
      data.data.tag = JSON.parse(data.data.tag).join();
      this.formValidate = JSON.parse(JSON.stringify(data.data));
      this.formValidate.content = JSON.parse(data.data.content)["分解练习"];
      this.formValidate.imports = JSON.parse(data.data.content)["教学重点"];
      this.formValidate.errors = JSON.parse(data.data.content)["易犯错误"];
    },
    async edit({ id }) {
      let { data } = await this.getTechniqueActionInfo({
        id: id,
      });
      this.isEdit = 1;
      this.AddAndEditvisible = true;
      this.islook = false;
      data.data.actionType = data.data.actionType + "";
      data.data.trainUnit = data.data.trainUnit + "";
      data.data.status = data.data.status + "";
      data.data.tag = JSON.parse(data.data.tag).join();
      this.formValidate = JSON.parse(JSON.stringify(data.data));
      this.formValidate.content = JSON.parse(data.data.content)["分解练习"];
      this.formValidate.imports = JSON.parse(data.data.content)["教学重点"];
      this.formValidate.errors = JSON.parse(data.data.content)["易犯错误"];
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
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
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
    modifyTechniqueAction(params) {
      return this.axios.post("/api/v2/data/action/modifyTechniqueAction", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "modifyTechniqueAction"),
      });
    },
    createTechniqueAction(params) {
      return this.axios.post("/api/v2/data/action/createTechniqueAction", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "createTechniqueAction"),
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
          this.AddAndEditvisible = false;
          this.$Message.info("取消删除");
        },
      });
    },
    handlAdd() {
      this.isEdit = 2;
      this.AddAndEditvisible = true;
      this.islook = false;
    },

    async ok() {
      let handleSubmitres = await this.handleSubmit("formValidate");
      this.isModalloading = false;
      if (handleSubmitres && this.isEdit !== 3) {
        if (this.isEdit === 1) {
          let obj = JSON.parse(JSON.stringify(this.formValidate));

          obj.actionType = this.formValidate.actionType * 1;
          obj.status = this.formValidate.status * 1;
          obj.trainUnit = this.formValidate.trainUnit * 1;
          obj.tag = JSON.stringify(this.formValidate.tag.split());
          let content = {
            分解练习: obj.content,
            教学重点: obj.description,
            易犯错误: obj.errors,
          };

          obj.content = JSON.stringify(content);
          this.modifyTechniqueAction(obj);
        } else if (this.isEdit === 2) {
          let obj = JSON.parse(JSON.stringify(this.formValidate));

          obj.actionType = this.formValidate.actionType * 1;
          obj.status = this.formValidate.status * 1;
          obj.trainUnit = this.formValidate.trainUnit * 1;
          obj.tag = JSON.stringify(this.formValidate.tag.split());
          let content = {
            分解练习: this.formValidate.content,
            动作描述: this.formValidate.description,
            易犯错误: this.formValidate.errors,
          };

          obj.content = JSON.stringify(content);

          this.createTechniqueAction(obj);
        }
        this.$Message.info("表单校验成功");
      } else if (this.isEdit === 3) {
        this.AddAndEditvisible = false;
        this.$Message.success("查看完毕");
      } else {
        this.$Message.info("表单校验失败");
      }
    },
    cancel() {
      this.handleReset("formValidate");
      this.$Message.info("您取消了此次操作");
    },

    handleSubmit(name) {
      if (this.isEdit === 3) {
        return false;
      }
      return this.$refs[name].validate((valid) => {
        if (valid) {
          return 1;
        } else {
          return 0;
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
