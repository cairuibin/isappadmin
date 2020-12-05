<template>
  <div>
    <Card>
      <div :style="{ 'margin-bottom': '10px', display: 'flex' }">
        <div>
          <Input
            search
            @on-search="search_keyfn"
            enter-button="搜索"
            :style="{ width: '200px' }"
            placeholder="用户名/手机账号"
          />
        </div>
        &emsp; &emsp;
        <div>
          <Select
            :style="{ width: '200' }"
            v-model="selectvalaue"
            placeholder="请选择审核状态"
            @on-change="selectvalaueonchange"
          >
            <Option value="0">半专业教练申请中</Option>
            <Option value="1">通过</Option>
            <Option value="2">驳回</Option>
            <Option value="3">高级教练申中</Option>
          </Select>
        </div>
          &emsp; &emsp;
        <div>
          <Select
            :style="{ width: '200' }"
            v-model="selectwork_typevalaue"
            placeholder="请选择工作性质"
            @on-change="selectvwork_type"
          >
            <Option value="1">全职</Option>
            <Option value="2">兼职</Option>
          </Select>
        </div>
          &emsp; &emsp;
        <div>
          <Select
            :style="{ width: '200' }"
            v-model="selectspecial_typeval"
            placeholder="请选择专业项目"
            @on-change="selectspecial_type"
          >
            <Option value="1">花样滑冰</Option>
            <Option value="2">冰球</Option>
          </Select>
        </div>
          &emsp; &emsp;
         <div>
          <Button type="primary" @click="getalllist">所有</Button>
        </div>
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
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
      <!-- <Button type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Detail v-if="detailModal" :coachInfo="coachInfo" :onCancel="onCancel" />
    <Rzsx v-if="rzsxModal" :rzsxInfo="rzsxInfo" :onCancel="rzsxCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import Detail from "./ban_zhuan_ye_jiao_lian_xiang_qing";
import Rzsx from "./ban_zhuan_ye_jiao_lain_shen_he";
// import { getTableData } from "@/api/data";
import untilMd5 from "../../../utils/md5";
export default {
  name: "tables_page",
  components: {
    Tables,
    Detail,
    Rzsx,
  },
  data() {
    return {
      //出巡条件
      selectvalaue: "",
      selectspecial_typeval: "",
      selectwork_typevalaue: "",
      detailModal: false,
      coachInfo: {},
      rzsxModal: false,
      rzsxInfo: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "ID", key: "id", sortable: false, width: 90 },
        { title: "真实姓名", key: "name", editable: false, width: 90 },
        {
          title: "教练照",
          key: "logoUrl",
          width: 90,
          render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.logoUrl} />
              </div>
            );
          },
        },
        { title: "手机账号", key: "mobile", width: 90 },
        {
          title: "工作性质",
          key: "workType",
          width: 90,
          render: (h, params) => {
            return <div>{params.workType === 0 ? "全职" : "兼职"}</div>;
          },
        },
        { title: "所在城市", key: "city", width: 90 },
        { title: "所属机构", key: "rinkName", width: 90 },
        // { title: "账户余额(i币)", key: "authTime", width: 119 },
        { title: "消费总金额(元)", key: "createTime", width: 119 },
        // { title: "消费总金额(元)", key: "createTime", width: 119 },
        // { title: "收益总金额(元)", key: "createTime", width: 119 },
        { title: "注册时间", key: "createTime", width: 119 },
        { title: "审核提交时间", key: "updateTime", width: 119 },
        {
          title: "状态",
          key: "status",
          width: 119,
          render: (h, params) => {
            return <div>{params.status === 0 ? "全职" : "兼职"}</div>;
          },
        },
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
                    marginBottom: "5px",
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
                    // disabled:true,
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.rzsx(params.row);
                    },
                  },
                },

                "账号审核"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    look(row) {
      console.log(row);
      this.coachInfo = row;
      this.detailModal = true;
    },
    onCancel() {
      this.detailModal = false;
    },
    rzsx(row) {
      this.rzsxInfo = row;

      this.rzsxModal = true;
    },
    rzsxCancel() {
      this.rzsxModal = false;
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    gettabledata_c(params) {
      this.axios
        .post("/api/v2/user/coach/getCoachPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getCoachPage"),
        })
        .then((res) => {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    selectvalaueonchange(v) {
      this.gettabledata_c({
        authStatus: v,

        pageNum: 1,
        pageSize: 10,
        coachType: 1,
      });
    },
    selectspecial_type(v) {
      this.gettabledata_c({
        specialType: v,

        pageNum: 1,
        pageSize: 10,
        coachType: 1,
      });
    },
    selectvwork_type(v) {
      this.gettabledata_c({
        workType: v,

        pageNum: 1,
        pageSize: 10,
        coachType: 1,
      });
    },
    getalllist(){
       this.gettabledata_c({
          pageNum: 1,
          pageSize: 10,
          coachType: 1,
        });
    },
    search_keyfn(e) {
      this.gettabledata_c({
        pageNum: 1,
        pageSize: 10,
        coachType: 1,
        username: e,
      })
    },
    Pageonchange(pageNum) {
      this.gettabledata_c({
        pageNum: pageNum,
        pageSize: this.pageSize,
        coachType: 1,
      })
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
  },
  mounted() {
    this.gettabledata_c({
      // gender: 0,
      pageNum: 1,
      pageSize: 10,
      coachType: 1,
    });
  },
};
</script>

<style>
</style>
