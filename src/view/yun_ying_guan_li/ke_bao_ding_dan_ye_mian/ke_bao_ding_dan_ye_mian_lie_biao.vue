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
            @on-change="DatePickerchangeStart"

          ></DatePicker
          >至:
          <DatePicker
            type="datetime"
            placeholder="请选择结束时间"
            style="width: 130px"
            v-model="DatePickerEnd"
            @on-change="DatePickerchangeEnd"

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
        <Page
          show-total
          :total="total"
          show-elevator
          @on-change="Pageonchange"
          @on-page-size-change="onpagesizechange"
        ></Page>
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
        <FormItem label="选择课包" prop="packetName">
          <Select
            :disabled="isLook !== 'add'"
            v-model="formValidate.packetName"
            placeholder="请选择课包"
            label-in-value
            @on-change="packetNamechange"
          >
            <Option
              :value="v.packetId.toString()"
              v-for="(v, i) in ke_bao_data"
              :key="i"
              >{{ v.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="选择学员" prop="studentName">
          <Select
            :disabled="isLook !== 'add'"
            v-model="formValidate.studentName"
            placeholder="请选择学员"
          >
            <Option
              :value="v.studentId.toString()"
              v-for="(v, i) in xue_yuan_data"
              :key="i"
              >{{ v.studentName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="选择教练" prop="coachName">
          <Select
            :disabled="isLook !== 'add'"
            v-model="formValidate.coachName"
            placeholder="请选择教练"
          >
            <Option
              :value="v.coachId.toString()"
              v-for="(v, i) in jiao_lian_data"
              :key="i"
              >{{ v.coachName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="应付金额" prop="price">
          <Input
            :value="formValidate.price"
            disabled
            placeholder="请输入实付金额"
          />
        </FormItem>
        <FormItem label="实付金额" prop="money">
          <Input
            :disabled="isLook !== 'add'"
            v-model="formValidate.money"
            placeholder="请输入实付金额"
          />
        </FormItem>

        <FormItem label="备注" prop="remark">
          <Input
            :disabled="isLook === 'look'"
            v-model="formValidate.remark"
            placeholder="请输入备注"
          />
        </FormItem>
        <FormItem>
          <Button @click="handleReset2('setGold')" style="margin-left: 8px"
            >取消</Button
          >
          &emsp;
          <Button
            type="primary"
            :disabled="isLook === 'look'"
            @click="handleSubmit2('setGold')"
            >保存</Button
          >
        </FormItem>
      </Form>
      <div slot="footer"></div>
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

import untilMd5 from "../../../utils/md5";
import moment from "moment";
import Kcddxq from "./ke_bao_ding_dan_ye_mian_xiang_qing";
export default {
  name: "tables_page",
  components: {
    Tables,
    Kcddxq,
  },
  data() {
    return {
      xue_yuan_data: [],
      jiao_lian_data: [],
      kcddxqModal: false,
      row: {},
      modal2: false,

      loading2: true,
      formValidate: {
        packetName: "",
        studentName: "",
        coachName: "",
        price: "0.00",
        money: "",
        remark: "",
      },
      ruleValidate: {
        packetName: [
          {
            required: true,
            message: "课包不能为空",
            trigger: "blur",
          },
        ],
        studentName: [
          {
            required: true,
            message: "学员不能为空",
            trigger: "blur",
          },
        ],
        coachName: [
          {
            required: true,
            message: "教练不能为空",
            trigger: "blur",
          },
          // { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            message: "请输入应付金额",
            trigger: "change",
          },
        ],
        money: [
          {
            required: false,
            message: "请输入实付金额",
            trigger: "change",
          },
        ],
        remark: [
          {
            required: false,
            message: "请输入备注",
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
                      this.edit(params.row);
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
                      this.deleteitem(params.row);
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
      pageNum: 1,
      total: 0,
      pageSize: 10,
      lei_xing: "全部类型",
      zhuang_tai: "全部状态",
      DatePickerStart: "",
      DatePickerEnd: "",
      ke_bao_data: [],
      //是否是查看还是编辑还是新增
      isLook: "look",
      //克鲍总数据
      ke_bao_data_zong: [],
      //当前编辑像
      currentEditItem: {},
    };
  },
  methods: {
    async ok2() {},

    cancel2() {
      // 取消后，重置表单
      this.$refs["setGold"].resetFields();
    },
    handleSubmit2(name) {
      this.$refs.setGold.validate(async (valid) => {
        if (valid) {
          if (this.isLook !== "look") {
            if (this.isLook == "add") {
              let r = await this.bindingCoursePacketOrder({
                rinkId: JSON.parse(localStorage.user).rinkId,
                userId: JSON.parse(localStorage.user).id,
                rinkName: JSON.parse(localStorage.user).rinkName,
                packetId: this.formValidate.packetName,
                studentName: this.xue_yuan_data.find(
                  (v) => v.studentId == this.formValidate.studentName
                ).studentName,
                studentId: this.formValidate.studentName,
                coachName: this.jiao_lian_data.find(
                  (v) => v.coachId == this.formValidate.coachName
                ).coachName,
                coachId: this.formValidate.coachName,
              });

              if (r.data.code === 200) {
                this.getTrainCampOrdersPage({
                  pageNum: this.pageNum,
                  pageSize: this.pageSize,
                  orderType: 1,
                  isDelete: 0,
                  // userId:JSON.parse(localStorage.getItem('user').id)
                });
                this.$Message.info("添加成功");
                this.$refs[name].resetFields();
                this.modal2 = false;
              } else {
                this.$Message.info("添加失败");
              }
            } else {
              this.modifyCoursePacketOrder({
                id: this.currentEditItem.id,
                coachId: this.currentEditItem.coachId,
                coachName: this.currentEditItem.coachName,
                remarks: this.formValidate.remark,
              }).then((r) => {
                if (r.data.code === 200) {
                  this.modal2 = false;
                  this.$refs[name].resetFields();
                  this.currentEditItem = {};
                  this.getTrainCampOrdersPage({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    orderType: 1,
                    isDelete: 0,
                    // userId:JSON.parse(localStorage.getItem('user').id)
                  });
                  this.$Message.info("编辑成功");
                } else {
                  this.$Message.info("编辑失败");
                }
              });
            }
          }
        } else {
          // 对话框校验失败，取消loading状态
          this.loading = false;
          setTimeout(() => {
            this.$nextTick(() => {
              this.loading = true;
            });
          }, 100);
        }
      });
    },
    handleReset2(name) {
      this.$refs[name].resetFields();
      this.modal2 = false;
    },
    async add_order() {
      //获取所有课包
      this.isLook = "add";
      this.modal2 = true;
    },
    onCancel() {
      this.kcddxqModal = false;
    },
    look(params) {
      this.isLook = "look";
      this.modal2 = true;

      this.formValidate = JSON.parse(
        JSON.stringify({
          packetName: params.packetId,
          studentName: params.studentId,
          coachName: params.coachId,
          price: params.price,
          money: params.money,
          remark: params.remark,
        })
      );
    },
    edit(params) {
      this.isLook = "edit";
      this.modal2 = true;

      this.currentEditItem = params;
      this.formValidate = JSON.parse(
        JSON.stringify({
          packetName: params.packetId,
          studentName: params.studentId,
          coachName: params.coachId,
          price: params.price,
          money: params.money,
          remark: params.remark,
        })
      );
    },
    packetNamechange(v) {
      if (v && v.value) {
        let { value } = v;
        let item = this.ke_bao_data_zong.find((v) => v.id === value);
        this.formValidate.price = item.cost;
      }
    },
    deleteitem(params) {
      let r = this.delCoursePacketOrder({
        id: params.id,
      }).then((v) => {
        if (v.data.code === 200) {
          this.modal2 = false;

          this.getTrainCampOrdersPage({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            orderType: 1,
            isDelete: 0,
            // userId:JSON.parse(localStorage.getItem('user').id)
          });
          this.$Message.info("删除成功");
        } else {
          this.$Message.info("删除失败");
        }
      });
    },
    handleDelete(params) {},
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
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    getCoursePacketPage(params) {
      this.axios
        .post("/api/v2/data/course/getCoursePacketPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getCoursePacketPage"),
        })
        .then((res) => {
          let arr = [];
          [...res.data.data.list].forEach((v) => {
            let obj = {
              packetId: v.id,
              name: v.title,
            };
            arr.push(obj);
          });

          this.ke_bao_data = arr;
          this.ke_bao_data_zong = [...res.data.data.list];

          console.log([...res.data.data.list], arr, "课包");
        });
    },
    getStudentPage(params) {
      this.axios
        .post("/api/v2/user/student/getStudentPage", {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "getStudentPage"
          ),
        })
        .then((res) => {
          let arr = [];
          [...res.data.data.list].forEach((v) => {
            let obj = {
              studentId: v.id,
              studentName: v.name,
            };
            arr.push(obj);
          });

          this.xue_yuan_data = arr;
        });
    },
    getCoachPage(params) {
      this.axios
        .post("/api/v2/user/coach/getValidCoachList", {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "getValidCoachList"
          ),
        })
        .then((res) => {
          let arr = [];
          [...res.data.data].forEach((v) => {
            let obj = {
              coachId: v.id,
              coachName: v.name,
            };
            arr.push(obj);
          });

          this.jiao_lian_data = arr;
        });
    },
    bindingCoursePacketOrder(params) {
      return this.axios.post(
        "/api/v2/business/trainOrder/bindingCoursePacketOrder",
        {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "bindingCoursePacketOrder"
          ),
        }
      );
    },
    //编辑
    modifyCoursePacketOrder(params) {
      return this.axios.post(
        "/api/v2/business/trainOrder/modifyCoursePacketOrder",
        {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "modifyCoursePacketOrder"
          ),
        }
      );
    },
    //删除
    delCoursePacketOrder(params) {
      return this.axios.post(
        "/api/v2/business/trainOrder/delCoursePacketOrder",
        {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "delCoursePacketOrder"
          ),
        }
      );
    },
    lei_xingchange(e) {
      this.getTrainCampOrdersPage({
        pageNum: 1,
        pageSize: 10,
        orderType: this.lei_xing,
        isDelete: 0,
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
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          orderType: this.lei_xing,
          isDelete: 0,
          // userId:JSON.parse(localStorage.getItem('user').id)
        });
      }
    },
    Pageonchange(pageNum) {
      this.pageNum = pageNum;
      this.getTrainCampOrdersPage({
        pageNum: pageNum,
        pageSize: this.pageSize,
        orderType: 1,
        isDelete: 0,
      });
    },
    onpagesizechange(pageNum) {
      console.log(pageNum, "1");
      this.Pageonchange(pageNum);
    },
    DatePickerchangeStart() {
      // console.log(this.DatePickerStart);
    },
    DatePickerchangeEnd() {
      // console.log(this.DatePickerEnd);
    },
    timeSearch() {
      this.getTrainCampOrdersPage({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderType: 1,
        isDelete: 0,
        searchStartTime: Date.now(this.DatePickerStart),
        searchEndTime: Date.now(this.DatePickerEnd)
        // searchStartTime: moment(this.DatePickerStart).format(
        //   "YYYY-MM-DD HH:mm:ss"
        // ),
        // searchEndTime: moment(this.DatePickerEnd).format("YYYY-MM-DD HH:mm:ss"),
      });

      // console.log(moment(this.DatePickerStart).format("YYYY-MM-DD HH:mm:ss"));
    },
  },
  async created() {
    await this.getCoursePacketPage({
      // isUseTemplate: 0,
      // isMemberGoods: 0,
      status: 1,
      isDelete: 0,
      rinkId: JSON.parse(localStorage.getItem("user")).rinkId,
      pageNum: 1,
      pageSize: 30,
    });
    await this.getStudentPage({
      //  userId: '0',
      pageNum: 1,
      pageSize: 10,
      // status: 1,
      isDelete: 0,
      rinkId: JSON.parse(localStorage.getItem("user")).rinkId,
    });
    await this.getCoachPage({
      // status: 1,
      isDelete: 0,
      rinkId: JSON.parse(localStorage.getItem("user")).rinkId,
      // workType: 1,
      // gender: 0,
      authStatus:1,
      pageNum: 1,
      pageSize: 30,
      // coachType: 2,
    });
  },
  mounted() {
    this.getTrainCampOrdersPage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
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
