<template>
  <div>
    <Card>
      <div style="margin-bottom: 10px">
        <Input
          @on-search="search_keyfn"
          search
          enter-button="搜索"
          style="width: 200px"
          placeholder="用户名/手机账号"
        />
      </div>
      <!-- 表格 -->
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
    </Card>
    <Detail v-if="detailModal" :coachInfo="coachInfo" :onCancel="onCancel" />
    <Rzsx v-if="rzsxModal" :rzxsInfo="rzxsInfo" :onCancel="rzsxCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import Detail from "./zhuan_ye_jiao_lain_xiang_qing";
import Rzsx from "./zhuan_ye_jiao_lain_shen_he";
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
      detailModal: false,
      coachInfo: {},
      rzsxModal: false,
      rzxsInfo: {},
      columns: [
        {
          type: "selection",
          // width: 60,
          align: "center",
        },
        { title: "ID", key: "id", sortable: false},
        { title: "真实姓名", key: "name", editable: false, },
        { title: "教练照", key: "createTime",  render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.logoUrl} />
              </div>
            );
          }, },
        { title: "手机账号", key: "mobile", width:120},
        { title: "专项", key: "specialType", },
        { title: "专项运动开始时间", key: "coachStartYear",width: 140 },
        { title: "专项教学开始时间", key: "professionalCoachStartYear", width: 110},
        { title: "认证提交时间", key: "createTime",  width: 110 },
        { title: "账户余额(i币)", key: "askPrice",   width: 110},
        { title: "消费总金额(元)", key: "gender", width: 100 },
        { title: "收益总金额(元)", key: "createTime", width: 120 },
        { title: "状态", key: "status",  render: (h, params) => {
            return (
              <div>
               {status===0?"无效":"有效"}
              </div>
            );
          },  },

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
                    // marginBottom: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.row);
                      console.log(params.row)
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
                      this.rzsx(params.row);
                    },
                  },
                },

                "认证审核"
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
      console.log(row)
      this.coachInfo = row;
      this.detailModal = true;
    },
    onCancel() {
      this.detailModal = false;
    },
    rzsx(row) {
      this.rzxsInfo = row;
      this.rzsxModal = true;
    },
    rzsxCancel() {
      this.rzsxModal = false;
    },
    handleDelete(params) {
      console.log(params);
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
    search_keyfn(e) {
      this.gettabledata_c({
        pageNum: 1,
        pageSize: 10,
        coachType: 2,
        username: e,
      })
    },
    Pageonchange(pageNum) {
      this.gettabledata_c({
        pageNum: pageNum,
        pageSize: this.pageSize,
        coachType: 2,
      })
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
  },
  mounted() {
    this.gettabledata_c({
      pageNum: 1,
      pageSize: 10,
      coachType: 2,
    });
  },
};
</script>

<style>
</style>
