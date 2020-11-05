<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px" class="header_wrap">
        <div style="margin-bottom: 10px">
          支付时间:
          <DatePicker
            type="datetime"
            placeholder="请选择开始时间"
            style="width: 130px"
            v-model="DatePickerStart"
            on-change="DatePickerchangeStart"
          ></DatePicker
          >至:
          <DatePicker
            type="datetime"
            placeholder="请选择结束时间"
            style="width: 130px"
            v-model="DatePickerEnd"
            on-change="DatePickerchangeEnd"
          ></DatePicker>
          <i-button type="primary" @click="timeSearch">搜索</i-button>&emsp;
          <i-button type="primary" @click="add_order">新增订单</i-button>&emsp;
        </div>
      </div>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <div style="margin-top: 20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
    </Card>
    <Modal
      v-model="modal2"
      title="新增订单"
      :scrollable="true"
      :mask-closable="false"
      :loading="loading2"
      @on-ok="ok2"
      @on-cancel="cancel2"
      width="40%"
    >
      <div :style="{ fontSize: '16px', color: '#888', marginBottom: '10px' }">
        所在冰场: 喜悦北京
      </div>

      <Form
        ref="setGold"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="130"
      >
        <FormItem label="选择课包" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择课包">
            <Option value="v" v-for="(v, i) in kebao" :key="i">{{ v }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选择学员" prop="name">
          <Select v-model="formValidate.city" placeholder="请选择课包">
            <Option value="v" v-for="(v, i) in xueyaun" :key="i">{{
              v
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="选择教练" prop="name">
          <Select v-model="formValidate.city" placeholder="请选择课包">
            <Option value="v" v-for="(v, i) in jiaolian" :key="i">{{
              v
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="实付金额" prop="city">
          <Input value="0.00" disabled placeholder="请输入实付金额" />
        </FormItem>
        <FormItem label="实付金额" prop="city">
          <Input v-model="formValidate.name" placeholder="请输入实付金额" />
        </FormItem>
        <FormItem label="选择状态" prop="city">
          <Select v-model="formValidate.city" placeholder="请选择状态">
            <Option value="beijing">1</Option>
            <Option value="shanghai">2</Option>
            <Option value="shanghai">3</Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="city">
          <Input v-model="formValidate.name" placeholder="请输入备注" />
        </FormItem>
        <FormItem>
          <Button @click="handleReset2('formValidate')" style="margin-left: 8px"
            >取消</Button
          >
          &emsp;
          <Button type="primary" @click="handleSubmit2('formValidate')"
            >保存</Button
          >
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
const statusobj = {
  0: "待付款",
  1: "申请取消",
  2: "、已取消",
  3: "取消驳回",
  4: "已付款",
  6: "申请退款",
  7: "退款中",
  8: "已退款",
  9: "支付失败",
  11: "待排课",
  12: "待确认",
  13: "待完结",
  14: "待评价",
  15: "结束订单",
};
import Tables from "_c/tables";
// import { getTableData } from "@/api/data";
import untilMd5 from "../../../utils/md5";
import Kcddxq from "./ke_bao_ding_dan_ye_mian_xiang_qing";
export default {
  name: "tables_page",
  components: {
    Tables,
    Kcddxq,
  },
  computed: {
    kebao() {
      return this.ke_bao_data.map((v) => {
        return v.rinkName;
      });
    },
    xueyaun() {
      return this.ke_bao_data.map((v) => {
        return v.studentName;
      });
    },
    jiaolian() {
      return this.ke_bao_data.map((v) => {
        return v.coachName;
      });
    },
  },
  data() {
    return {
      kcddxqModal: false,
      row: {},
      modal2: false,
      loading2: true,
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
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "创建时间", key: "createTime", sortable: false },
        { title: "所属冰场", key: "rinkName", editable: false },
        { title: "课包名称", key: "packetName" },
        { title: "学员信息", key: "studentName" },
        { title: "教练信息", key: "coachName" },
        { title: "应付金额", key: "price" },
        { title: "实付金额", key: "money" },

        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("div", [
              h("span", `${statusobj[params.row.status] || "没有数据"}`),
            ]);
          },
        },
        {
          title: "操作",

          key: "action",

          width: 200,

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
                      this.look(params.row);
                    },
                  },
                },

                "编辑"
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
                      this.look(params.row);
                    },
                  },
                },

                "删除"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
      DatePickerStart: "",
      DatePickerEnd: "",
      ke_bao_data: [],
    };
  },
  methods: {
    async ok2() {
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
    cancel2() {
      // 取消后，重置表单
      this.$refs["setGold"].resetFields();
    },
    handleSubmit2(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
    },
    add_order() {
      //获取所有课包
      this.modal2 = true;
      this.getCoursePacketPage({
        isUseTemplate: 0,
        isMemberGoods: 0,
        status: 1,
        pageNum: 1,
        pageSize: 30,
      });
    },
    onCancel() {
      this.kcddxqModal = false;
    },
    look(params) {
      this.row = params;
      this.kcddxqModal = true;
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    getTrainCampOrdersPage(params) {
      this.axios
        .post("/api/v2/business/trainOrder/getPacketOrdersPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getPacketOrdersPage"),
        })
        .then((res) => {
          console.log(res.data.data.list, "查询训练课包订单列表接口(分页)");
          this.tableData = res.data.data.list;
        });
    },
    getCoursePacketPage(params) {
      this.axios
        .post("/api/v2/data/course/getCoursePacketPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getCoursePacketPage"),
        })
        .then((res) => {
          this.ke_bao_data = [...res.data.data.list];
          console.log(JSON.stringify(this.ke_bao_data[0]), "课包列表");
        });
    },
    lei_xingchange(e) {
      this.getTrainCampOrdersPage({
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
    },
    zhuang_tai_select() {
      this.getTrainCampOrdersPage({
        stauts: this.zhuang_tai,
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
        // userId:JSON.parse(localStorage.getItem('user').id)
      });
    },
    searchenter(e) {
      if (e.target.value) {
        this.getTrainCampOrdersPage({
          studentName: e.target.value,
          stauts: this.zhuang_tai,
          pageNum: 1,
          pageSize: 10,
          orderType: this.lei_xing,
          isDelete: 0,
          // userId:JSON.parse(localStorage.getItem('user').id)
        });
      }
    },
    DatePickerchangeStart() {
      console.log(this.DatePickerStart);
    },
    DatePickerchangeEnd() {
      console.log(this.DatePickerEnd);
    },
    timeSearch() {
      console.log(2122);
    },
  },
  mounted() {
    this.getTrainCampOrdersPage({
      pageNum: 1,
      pageSize: 10,
      orderType: 1,
      isDelete: 0,
      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  },
};
</script>

<style scoped lang='scss'>
.header_wrap {
  display: flex;

  align-items: center;
}
</style>
