<template>
  <div>
    <Modal
      v-model="modal"
      title="新增课节"
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
        <FormItem label="所属模版:">花样滑冰/滑冰学校1阶模板</FormItem>
        <FormItem label="课节出处:"
          >在课节管理中新增的课节均为系统版权，出处为系统内容</FormItem
        >
        <FormItem label="课节形式:" prop="form">
          <Select :disabled="edit" v-model="formValidate.form">
            <Option :value="1">冰上</Option>
            <Option :value="2">陆地</Option>
            <Option :value="3">冰上+陆地</Option>
          </Select>
        </FormItem>
        <FormItem label="课节标题:" prop="title">
          <Input
            :disabled="edit"
            v-model="formValidate.title"
            placeholder="请输入课节标题"
          />
        </FormItem>
        <FormItem label="教学重点" prop="tag">
          <Tag
            v-for="(item, index) in formValidate.tag"
            :key="index"
            :name="item"
            closable
            @on-close="handleClose2"
            >{{ item }}</Tag
          >
          <Button
            icon="ios-add"
            type="dashed"
            size="small"
            @click="handleAddTag"
          ></Button>
        </FormItem>
        <FormItem label="课节安排" prop="techniqueType">
          <Select :disabled="edit" v-model="formValidate.techniqueType">
            <Option :value="1">无安排</Option>
            <Option :value="2">有安排</Option>
          </Select>
        </FormItem>
        <FormItem
          v-if="formValidate.techniqueType === 2"
          label="安排明细"
          prop="techniqueType"
        >
          <Button
            :disabled="edit"
            @click="addtechniqueType"
            style="margin-left: 8px"
            >新增安排</Button
          >
          <br />

          <template v-for="(m, n) in techniqueType_mimg_xi">
            <Input
              :key="n + 999"
              :disabled="edit"
              v-model="m.name"
              style="width: 300px"
              placeholder="请输入安排明细"
            />
            <Button
              :key="n + m.id"
              :disabled="edit"
              @click="111"
              style="margin-left: 8px"
              >关联动作</Button
            >
            <br :key="m.id + 444" />
          </template>
        </FormItem>

        <FormItem label="课后训练" prop="afterClassTrain">
          <Select :disabled="edit" v-model="formValidate.afterClassTrain">
            <Option :value="1">无训练</Option>
            <Option :value="2">有训练</Option>
          </Select>
        </FormItem>
        <FormItem
          v-if="formValidate.afterClassTrain === 2"
          label="训练明细"
          prop="afterClassTrain"
        >
          <!-- @click="afterClassTrainType" -->
          <Button
            :disabled="edit"
            @click="add_get_dong_zuo_lie_biao"
            style="margin-left: 8px"
            >新增动作</Button
          >
          <br />

          <template v-for="(m, n) in afterClassTrainType_an_pai">
            <Input
              :key="n + 999"
              :disabled="edit"
              v-model="m.name"
              style="width: 300px"
              placeholder="请输入训练安排"
            />
             <Input
              :key="n + 9997"
              :disabled="edit"

              style="width:50px"

            />
            次
            <Button
              :key="n + m.id"
              :disabled="edit"

              style="margin-left: 8px"
              @click="deletedong_zuo_item(n)"
              >删除</Button
            >
            <br :key="m.id + 444" />
          </template>
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
    <Modal
      v-model="add_get_dong_zuo_lie_biao_module"
      title="选择动作"
      :mask-closable="false"
      :loading="loading"
      @on-ok='xuan_ze_ok'
      @on-cancel="cancel_dong_zuo_lie_biao_module"
    >
      <Select v-model="select_dong_zuo_val">
        <Option :value="j.id" v-for="(j) in select_dong_zuo_lie_biao_module" :key="j.id">{{j.name}}</Option>

      </Select>
    </Modal>
  </div>
</template>
<script>
import untilMd5 from "../../../utils/md5";
import { isEmpty } from "lodash";
export default {
  props: {
    onCancel: Function,
    rowInfo: Object,
    edit: Boolean,
    updataTable: Function,
  },
  data() {
    return {
      //明细
      techniqueType_mimg_xi: [],
      // 安排
      afterClassTrainType_an_pai: [],
      // 新增动作的弹框
      add_get_dong_zuo_lie_biao_module: false,
      //动作列表的数据
      select_dong_zuo_lie_biao_module:[],
      //选择动作之后的valuse
select_dong_zuo_val:'',
      tagValue: "",
      modal: true,
      loading: true,
      formValidate: {
        form: 1,
        tag: [],
        techniqueType: 1,
        afterClassTrain: 1,
      },
      ruleValidate: {
        form: [
          {
            required: true,
            message: "T请输入课节形式",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入客节标题",
            trigger: "blur",
          },
        ],
        tag: [
          {
            required: true,
            message: "情输入教学重点",
          },
        ],
      },
    };
  },
  watch: {
    rowInfo: function (val) {
      this.formValidate = row;
    },
  },
  methods: {
    handleAddTag() {
      this.tagValue = "";
      this.$Modal.confirm({
        title: "教学重点",
        render: (h) => {
          return h("Input", {
            props: {
              value: this.tagValue,
              autofocus: true,
              placeholder: "请输入.",
            },
            on: {
              input: (val) => {
                this.tagValue = val;
              },
            },
          });
        },
        onOk: () => {
          if (this.tagValue.trim() !== "") {
            this.formValidate.tag.push(this.tagValue);
          }
        },
      });
    },
    handleClose2(event, name) {
      const index = this.formValidate.tag.indexOf(name);
      this.formValidate.tag.splice(index, 1);
    },
    cancel() {
      // 取消后，重置表单
      this.$refs["formValidate"].resetFields();
      this.onCancel();
    },
    createCourse(params) {
      return this.axios.post("/api/v2/data/course/createCourse", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "createCourse"),
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let { data } = await this.createCourse({
            title: "",
            // subTitle: "String	副标题，课包摘要",
            code: "String	课包编码：例如happyskate、xy-week-1",
            trainPlanTemplate_id: "否	String	训练计划模板ID",
            templateTitle: "否	String	模板标题",
            imageUrl: "否	String	配图地址",
            form: "是	int	课程形式：1、冰上；2、陆地；3、冰上+陆地",
            content: "",
            departmentId: "",
            rinkId: "",
          });
          if (data.code === 200) {
            this.$Message.success("添加成功!");
            this.updataTable();
          } else {
            this.$Message.success("添加失败!");
          }
        } else {
          this.$Message.error("校验失败!");
        }
      });
    },
    //获取动作列表
    getTechniqueActionPage(params) {
    return  this.axios
        .post("/api/v2/data/action/getTechniqueActionPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTechniqueActionPage"),
        })

    },
    //新增安排明细
    addtechniqueType() {
      this.techniqueType_mimg_xi.push({
        name: "",
        id: Date.now(),
      });
    },
    afterClassTrainType(val) {
      this.afterClassTrainType_an_pai.push({
        name: val,
        id: Date.now(),
      });
    },
    async add_get_dong_zuo_lie_biao() {
      console.log(21)
      let {data}  = await this.getTechniqueActionPage({
        pageSize: 100,
        pageNum: 1,
      })
         this.add_get_dong_zuo_lie_biao_module = true;
         this.select_dong_zuo_lie_biao_module=data.data.list


    },
    // 取消选择动作
    cancel_dong_zuo_lie_biao_module(){
          this.add_get_dong_zuo_lie_biao_module = false;

    },
    xuan_ze_ok(){

         let item=this.select_dong_zuo_lie_biao_module.find(v=>v.id===this.select_dong_zuo_val)
               console.log(item)
      this.afterClassTrainType(item.name)
      this.add_get_dong_zuo_lie_biao_module=false
    },
    deletedong_zuo_item(i){
        this.afterClassTrainType_an_pai.splice(i,1)
    }
  },
};
</script>
