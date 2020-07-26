<template>
  <div>
    <Modal v-model="modal2" width="660">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>订单详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>平台订单ID：</span>
          {{'1101021987'}}
        </div>
        <div class="div_content">
          <span>订单标题：</span>
          {{'2020年暑期专家青训营杭州站'}}
        </div>

        <div class="div_content">
          <span>订单创建时间：</span>
          {{'2020-05-03 12:00:01'}}
        </div>
        <div class="div_content">
          <span>订单类型：</span>
          {{'青训营'}}
        </div>
        <div class="div_content">
          <span>支付渠道：</span>
          {{'支付宝支付'}}
        </div>
        <div class="div_content">
          <span>渠道订单号</span>
          {{220000019876543321}}
        </div>
        <div class="div_content">
          <span>应付金额：</span>
          {{'15800.00元'}}
        </div>
        <div class="div_content">
          <span>实收金额：</span>
          {{'15800.00元'}}
        </div>
        <div class="div_content">
          <span>订单支付时间：</span>
          {{'2020-05-03 12:00:01'}}
        </div>
        <div class="div_content">
          <span>支付用户：</span>
          {{'豆豆龙/18611587069'}}
        </div>
        <div class="div_content">
          <span>联系方式：</span>
          {{'豆豆龙/18611587069'}}
        </div>
        <div class="div_content">
          <span>学员信息：</span>
          {{'尤硕/18611587069'}}
        </div>

        <div class="div_content">
          <span>教练信息：</span>
          {{'李双/18611587069'}}
        </div>

        <div class="div_content">
          <span>订单状态：</span>
          {{'待完结'}}
        </div>
        <div class="div_content">
          <span>订单状态：</span>
        </div>
        <div class="div_content">
          <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
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
      this.tableData = res.data;
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