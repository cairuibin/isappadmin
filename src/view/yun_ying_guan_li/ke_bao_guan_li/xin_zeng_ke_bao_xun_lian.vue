<template>
  <div>
    
    <Modal
      v-model="modal"
      title="新增课包"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading"
      @on-cancel="cancel"
      width="60%"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="课包名称:" prop="title">
          <Input
            :disabled="edit"
            v-model="formValidate.title"
            placeholder="请输入课包名称"
          ></Input>
        </FormItem>
        <FormItem label="封面图片" prop="imageUrl">
          <Row>
            <Col span="10">
              <Input
                :disabled="edit"
                v-model="formValidate.imageUrl"
                placeholder="图片地址"
              ></Input>
            </Col>
            <Col span="6" style="text-align: center">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button :disabled="edit" icon="ios-cloud-upload-outline"
                  >上传图片</Button
                >
              </Upload>
            </Col>
            <Col span="6">
              <Button :disabled="edit" icon="ios-cloud-upload-outline"
                >图库</Button
              >
            </Col>
          </Row>
        </FormItem>

        <FormItem label="课包摘要:" prop="subTitle">
          <Input
            :disabled="edit"
            v-model="formValidate.subTitle"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入课包摘要"
          />
        </FormItem>
        <FormItem label=" 图文介绍:" prop="introduce">
            <div id="kebaoEditor"></div>
        </FormItem>
        <FormItem label="课程安排" prop="anpai">
          <Select
            :disabled="edit"
            v-model="formValidate.anpai"
            placeholder="请选择课程安排"
          >
            <Option value="0">选择安排</Option>
            <Option value="1">无安排</Option>
            <Option value="2">训练计划</Option>
            <Option value="3">自定义课节</Option>
          </Select>
        </FormItem>
        <FormItem label="训练计划:" prop="ji_hua">
          <Input
            :disabled="edit"
            v-model="formValidate.ji_hua"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="请输入课程摘要"
          />
        </FormItem>
        <FormItem label="附加内容:" prop="fu_jia">
          <Button :disabled="edit" v-if="isFujiaAdd" @click="handleFujiaAdd"
            >+</Button
          >
          <Table
            v-if="!isFujiaAdd"
            border
            :columns="columns12"
            :data="formValidate.fu_jia"
          >
            <template slot-scope="{ row, index }" slot="xuhao">
              <span>{{ index + 1 }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button @click="handleFujiaRemove(row, index)">
                <Icon type="ios-trash" />
              </Button>
            </template>
          </Table>
        </FormItem>
        <FormItem label="赠送内容:" prop="zeng_song">
          <Button :disabled="edit" v-if="isZsAdd" @click="handleZsAdd"
            >+</Button
          >
          <Table
            v-if="!isZsAdd"
            border
            :columns="columns13"
            :data="formValidate.zeng_song"
          >
            <template slot-scope="{ row, index }" slot="xuhao">
              <span>{{ index + 1 }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button @click="handleZsRemove(row, index)">
                <Icon type="ios-trash" />
              </Button>
            </template>
          </Table>
        </FormItem>
        <FormItem label="应收总价:" prop="cost">
          <Input
            :disabled="edit"
            v-model="formValidate.cost"
            style="width: 80px"
          />元
        </FormItem>
        <FormItem label="实收总价:" prop="specialPrice">
          <Input
            :disabled="edit"
            v-model="formValidate.specialPrice"
            style="width: 80px"
          />元
        </FormItem>
        <FormItem label="关联门店" prop="departmentId">
          <Select
            :disabled="edit"
            v-model="formValidate.departmentId"
            placeholder="选择门店"
          >
            <Option :value="1">机构-冰场</Option>
          </Select>
        </FormItem>
        <FormItem label="关联教练" prop="teachingCoach">
          <Select
            :disabled="edit"
            multiple
            v-model="formValidate.teachingCoach"
            placeholder="选择教练"
          >
            <Option value="1">尤硕</Option>
            <Option value="2">春熙</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="status">
          <Select
            :disabled="edit"
            v-model="formValidate.status"
            placeholder="选择状态"
          >
            <Option :value="0">无效</Option>
            <Option :value="1">有效</Option>
            <Option :value="2">暂停</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="cancel">取消</Button>
          <Button
            :disabled="edit"
            @click="handleSubmit('formValidate')"
            style="margin-left: 8px"
            >保存</Button
          >
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import E from 'wangeditor';
import untilMd5 from "../../../utils/md5";
import { isEmpty } from "lodash";
export default {
  props: {
    onCancel: Function,
    rowInfo: Object,
    edit: Boolean,
  },
  data() {
    return {
      columns12: [
        {
          title: "序号",
          slot: "xuhao",
        },
        {
          title: "内容名称",
          key: "name",
        },
        {
          title: "金额(元)",
          key: "price",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      columns13: [
        {
          title: "序号",
          slot: "xuhao",
        },
        {
          title: "内容名称",
          key: "name",
        },
        {
          title: "金额(元)",
          key: "price",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      modal: true,
      loading: true,
      formValidate: this.rowInfo,
      ruleValidate: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        imageUrl: [
          {
            required: true,
            message: "请输入图片的地址",
            trigger: "blur",
          },
        ],
        // introduce: [
        //   {
        //     required: true,
        //     message: "请输入图文介绍",
        //   },
        // ],
        departmentId: [
          {
            required: true,
            message: "请输入关联门店",
          },
        ],
        teachingCoach: [
          {
            required: true,
            message: "请输入关联教练 ",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
          },
        ],
      },
      editorA:null,
    };
  },
  watch: {
    rowInfo: function (val) {
      this.formValidate = val;
    },
  },
  mounted() {
    this.editorA = new E('#kebaoEditor');
    this.editorA.config.uploadImgShowBase64 = true;
    this.editorA.config.onchange = (newHtml) => {
       this.formValidate.introduce = newHtml
    }
    this.editorA.create();
  },
   beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editorA.destroy()
    this.editorA = null
  },
  computed: {
    isFujiaAdd() {
      return isEmpty(this.formValidate.fu_jia);
    },
    isZsAdd() {
      return isEmpty(this.formValidate.zeng_song);
    },
  },
  methods: {
    handleFujiaAdd() {
      //附加内容
      this.formValidate = {
        ...this.formValidate,
        fu_jia: [
          {
            name: "训练服",
            price: "200",
          },
          {
            name: "护具",
            price: "200",
          },
        ],
      };
    },
    handleFujiaRemove(row, index) {
      //删除附加内容
      this.formValidate = {
        ...this.formValidate,
        fu_jia: this.formValidate.fu_jia.filter((v, i) => i !== index),
      };
    },
    handleZsAdd() {
      //附加内容
      this.formValidate = {
        ...this.formValidate,
        zeng_song: [
          {
            name: "线上会员",
            price: "500",
          },
          {
            name: "5次门票",
            price: "200",
          },
        ],
      };
    },
    handleZsRemove(row, index) {
      //删除附加内容
      this.formValidate = {
        ...this.formValidate,
        zeng_song: this.formValidate.zeng_song.filter((v, i) => i !== index),
      };
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["formValidate"].resetFields();
      this.onCancel();
    },
    createCoursePacket(params) {
      this.axios
        .post("/api/v2/data/course/createCoursePacket", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "createCoursePacket"),
        })
        .then((res) => {
          console.log(res.data.data, "新增课包");
        });
    },
    handleSubmit(name) {
      this.createCoursePacket({
        title: "",
        code: "",
        courseIds: "",
        content: "",
        techniqueType: "",
        introduce: "",
        isMemberGoods: "",
        status: "",
        teachingCoach: "",
        cost: "",
        createUser: "",
        coursePacketRelations: "",
      });
      this.$refs[name].validate((valid) => {
        console.log(this.formValidate,'formValidate')
        if (valid) {
          //判断图文介绍是否为空
          // console.log(valid,this.formValidate,'vlaue')
          // this.createCoursePacket({

          // })
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
  },
};
</script>
