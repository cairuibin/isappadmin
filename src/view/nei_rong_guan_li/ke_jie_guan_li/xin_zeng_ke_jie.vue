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
            :name="item.name"
            closable
            @on-close="handleClose2"
            >{{ item.name }}</Tag
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
              @click="guan_lian_dong_zuo(m.id)"
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
              v-model="m.num"
              style="width: 50px"
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
      @on-ok="xuan_ze_ok"
      @on-cancel="cancel_dong_zuo_lie_biao_module"
    >
      <Select v-model="select_dong_zuo_val">
        <Option
          :value="j.id"
          v-for="j in select_dong_zuo_lie_biao_module"
          :key="j.id"
          >{{ j.name }}</Option
        >
      </Select>
    </Modal>
    <Modal
      v-model="add_tag_module"
      title="选择动作"
      :mask-closable="false"
      :loading="loading"
      @on-ok="add_tag_ok"
      @on-cancel="add_tag_cancel"
    >
      <Select v-model="select_tag_val">
        <Option
          :value="j.id"
          v-for="j in add_tag_module_lie_biao"
          :key="j.id"
          >{{ j.name }}</Option
        >
      </Select>
    </Modal>
    <!-- //关联动作 -->
    <Modal
      v-model="guan_lian_module"
      title="选择动作"
      :mask-closable="false"
      :loading="loading"
      @on-ok="guan_lian_ok"
      @on-cancel="guan_lian_cancel"
    >
      <Select v-model="guan_lian_val">
        <Option
          :value="j.id"
          v-for="j in guan_lian_module_lie_biao"
          :key="j.id"
          >{{ j.name }}</Option
        >
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
      select_dong_zuo_lie_biao_module: [],
      //选择动作之后的valuse
      select_dong_zuo_val: "",
      // 教学重点弹框选择的值
      select_tag_val: "",
      //教学重点弹框
      add_tag_module: false,
      //教学重点下拉框列表数据
      add_tag_module_lie_biao: [],
      //关联动作
      guan_lian_module: false,
      //关联动作拉框列表数据
      guan_lian_module_lie_biao: [],
      //当前关联动作的id
      guan_lian_id: 0,
      guan_lian_val: "",
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
    add_tag_cancel() {
      this.add_tag_module = false;
    },
    add_tag_ok() {
      this.add_tag_module = false;
      let item = this.add_tag_module_lie_biao.find(
        (v) => v.id == this.select_tag_val
      );

      this.formValidate.tag.push(item);
      // this.select_tag_val=''
    },
    guan_lian_cancel() {
      this.guan_lian_module = false;
    },
    guan_lian_ok() {
      this.guan_lian_module = false;
      let item = this.guan_lian_module_lie_biao.find(
        (v) => v.id == this.guan_lian_val
      );

      let it = this.techniqueType_mimg_xi.find(
        (v) => v.id === this.guan_lian_id
      );
      let i = this.techniqueType_mimg_xi.findIndex(
        (v) => v.id === this.guan_lian_id
      );
      this.techniqueType_mimg_xi[i] = Object.assign(
        this.techniqueType_mimg_xi[i],
        item
      );
      console.log(this.techniqueType_mimg_xi);
    },
    async handleAddTag() {
      let { data } = await this.getTechniqueActionPage({
        pageSize: 100,
        pageNum: 1,
      });

      this.add_tag_module_lie_biao = data.data.list;
      this.add_tag_module = true;
    },
    async guan_lian_dong_zuo(id) {
      let { data } = await this.getTechniqueActionPage({
        pageSize: 100,
        pageNum: 1,
      });

      this.guan_lian_module_lie_biao = data.data.list;
      this.guan_lian_module = true;
      this.guan_lian_id = id;
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
        console.log(this.formValidate);
        console.log(this.techniqueType_mimg_xi);
        console.log(this.afterClassTrainType_an_pai);
        if (valid) {
          let { data } = await this.createCourse({
            title: this.formValidate.title,
            // subTitle: "String	副标题，课包摘要",
            code: "happyskate",
            form: this.formValidate.form,
            techniqueType: JSON.stringify(this.techniqueType_mimg_xi),
            afterClassTrain: JSON.stringify(this.afterClassTrainType_an_pai),
            rinkId: JSON.parse(localStorage.user).rinkId,
          });
          if (data.code === 200) {
            this.$Message.success("添加成功!");
            this.modal=false
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
      return this.axios.post("/api/v2/data/action/getTechniqueActionPage", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "getTechniqueActionPage"),
      });
    },
    //新增安排明细
    addtechniqueType() {
      this.techniqueType_mimg_xi.push({
        name: "",
        id: Date.now(),
      });
    },
    //新增课后训练的新增动作
    afterClassTrainType(val) {
      this.afterClassTrainType_an_pai.push({
        name: val.name,
        id: Date.now(),
        num: 1,
        actionType: val.actionType,
      });
    },
    async add_get_dong_zuo_lie_biao() {
      console.log(21);
      let { data } = await this.getTechniqueActionPage({
        pageSize: 100,
        pageNum: 1,
      });
      this.add_get_dong_zuo_lie_biao_module = true;
      this.select_dong_zuo_lie_biao_module = data.data.list;
    },
    // 取消选择动作
    cancel_dong_zuo_lie_biao_module() {
      this.add_get_dong_zuo_lie_biao_module = false;
    },
    xuan_ze_ok() {
      let item = this.select_dong_zuo_lie_biao_module.find(
        (v) => v.id === this.select_dong_zuo_val
      );
      console.log(item);
      this.afterClassTrainType(item);
      this.add_get_dong_zuo_lie_biao_module = false;
    },
    deletedong_zuo_item(i) {
      this.afterClassTrainType_an_pai.splice(i, 1);
    },
  },
};
</script>
