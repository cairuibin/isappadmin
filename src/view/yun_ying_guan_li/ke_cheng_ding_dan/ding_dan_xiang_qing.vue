<template>
  <div>
    <Modal v-model="modal2" width="660" @on-cancel="cancel">

      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>订单详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>平台订单ID：</span>
          {{ rowInfo.id }}
        </div>
        <div class="div_content">
          <span>订单标题：</span>
          {{ rowInfo.trainCampName }}
        </div>

        <div class="div_content">
          <span>订单创建时间：</span>
          {{ rowInfo.createTime }}
        </div>
        <div class="div_content">
          <span>订单类型：</span>
          {{ rowInfo.orderType == 1 ? "课包" : "训练营" }}
        </div>
        <div class="div_content">
          <span>支付渠道：</span>
          {{ "rowInfo.id" }}
        </div>
        <div class="div_content">
          <span>渠道订单号</span>
          {{ rowInfo.orderContent }}
        </div>
        <div class="div_content">
          <span>应付金额：</span>
          {{ rowInfo.price }}
        </div>
        <div class="div_content">
          <span>实收金额：</span>
          {{ rowInfo.money }}
        </div>
        <div class="div_content">
          <span>订单支付时间：</span>
          {{ rowInfo.payTime }}
        </div>
        <div class="div_content">
          <span>支付用户：</span>
          {{ rowInfo.id }}
        </div>
        <div class="div_content">
          <span>联系方式：</span>
          {{ rowInfo.studentName }}
        </div>
        <div class="div_content">
          <span>学员信息：</span>
          {{ rowInfo.studentId }}
        </div>

        <div class="div_content">
          <span>教练信息：</span>
          {{
            rowInfo.type == "0"
              ? "无推荐人"
              : rowInfo.type == "1"
              ? "教练"
              : rowInfo.type == "2"
              ? "客户"
              : rowInfo.type == "3"
              ? "系统"
              : ""
          }}
        </div>

        <div class="div_content">
          <span>订单状态：</span>
          {{ rowInfo.id }}
        </div>
        <div class="div_content">
          <span>订单状态：</span>
          {{
            {
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
            }[rowInfo.status]
          }}
        </div>
        <div class="div_content">
          <tables
            ref="tables"
            v-model="tableData"
            :columns="columns"
            @on-delete="handleDelete"
          />
        </div>
        <div class="div_content">
          <span>附加内容:</span>
        </div>
        <div class="div_content">
          <tables
            ref="tables"
            v-model="tableData"
            :columns="columns_nei_rong"
            @on-delete="handleDelete"
          />
        </div>
        <div class="div_content">
          <span>赠送内容：</span>
        </div>
        <div class="div_content">
          <tables
            ref="tables"
            v-model="tableData"
            :columns="columns_zeng_song"
            @on-delete="handleDelete"
          />
        </div>
      </div>
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
export default {
  props: {
    onCancel: Function,
    rowInfo: Object,
  },
  components: {
    Tables,
  },
  data() {
    return {
      modal2: true,
      modal_loading: false,
      shen_he_tong_guo: "",
      sheng_he_bo_hui: "",
      bo_hui_yuan_yin: "",
      qi_ta: "",
      tableData: [],
      columns: [
        { title: "序号", key: "name", sortable: false },
        { title: "课程名称", key: "email", editable: false },
        { title: "课程安排", key: "name" },
        { title: "课后训练", key: "name" },
        { title: "订单进度", key: "name" },

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
                      this.look(params.index);
                    },
                  },
                },

                "查看"
              ),
            ]);
          },
        },
      ],
      columns_nei_rong: [
        { title: "序号", key: "name", sortable: false },
        { title: "内容名称", key: "email", editable: false },
        {
          title: "金额(元)",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Input",

                {
                  props: {
                    type: "primary",
                    value: "11",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.index);
                    },
                  },
                },

                "查看"
              ),
            ]);
          },
        },
      ],
      columns_zeng_song: [
        { title: "序号", key: "name", sortable: false },
        { title: "内容名称", key: "email", editable: false },
        {
          title: "金额(元)",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Input",

                {
                  props: {
                    type: "primary",
                    value: "1331",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.index);
                    },
                  },
                },

                "查看"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    cancel() {
      this.onCancel();
    },
    handleDelete(params) {
      console.log(params);
    },
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modal2 = false;
        this.$Message.success("Successfully delete");
      }, 2000);
    },
  },
  mounted() {
    getTableData().then((res) => {
      this.tableData = [];
    });
  },
};
</script>

<style scoped lang='scss'>
.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .btn {
    margin-left: 65%;
  }
}
</style>
