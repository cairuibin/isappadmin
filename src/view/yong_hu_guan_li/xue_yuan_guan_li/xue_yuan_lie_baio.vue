<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
        <Input
          @on-search="search_keyfn"
          search
          enter-button="搜索"
          style="width:200px"
          placeholder="学员姓名"
        />
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page
          show-total
          @on-change="Pageonchange"
          @on-page-size-change="onpagesizechange"
          :total="total"
          show-elevator
        ></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Detail v-if="detailModal" :studentInfo_id="studentInfo_id" :onCancel="onCancel" />
  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from "../../../utils/md5";
import Detail from './xue_yuan_xiang_qing'
// import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables,
    Detail,
  },
  data() {
    return {
      detailModal:false,
      studentInfo_id:'',
      row:{},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "ID", key: "id", sortable: false },
        { title: "学员姓名", key: "name", editable: false  },
        { title: "头像", key: "logoUrl"  , render: (h, params) => {
            return (
              <div>
                <img style={{ width: "30px" }} src={params.row.logoUrl} />
              </div>
            );
          },},
        { title: "生日", key: "birthday"  },
        { title: "性别", key: "gender" ,render: (h, params) => {
            return (
              <span>{params.row.gender===0?"女":"男"}</span>
            );
          }, },
        { title: "所属专项", key: "studyType" ,render: (h, params) => {
         
            return (
             
              <span>{params.row.studyType===1?"花样滑冰":"冰球"}</span>
            );
          },    },
        { title: "所属教练", key: "rinkName"  },
        { title: "账号信息", key: "membershipType",render: (h, params) => {
         
            return (
             
              <span>{params.row.name}/{this.tableData_all.timestamp}</span>
            );
          },   },
        { title: "状态", key: "status", render: (h, params) => {
            return (
              <span>{params.row.status===0?"正常":"不正常"}</span>
            );
          },  },
        {
          title: "操作",
          key: "action",
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
                      // 参数为学员信息
                      this.look(params.row);
                      console.log(params.row)

                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      tableData_all:{},
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    look(row) {
      console.log(row.id,'2222')
      this.studentInfo_id=row.id
      this.detailModal=true
    },
    onCancel(){
        this.detailModal=false
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
    gettabledata_c(params){
      this.axios
      .post("/api/v2/user/student/getStudentPage", {
       ...params,
        sign: untilMd5.toSign(
          {
           ...params
          },
          "getStudentPage"
        ),
      })
      .then((res) => {
        this.tableData_all=res.data
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    search_keyfn(e) {
      this.gettabledata_c({
        pageNum: 1,
        pageSize: 10,
        name: e,
      })
    },
    Pageonchange(pageNum) {
      this.gettabledata_c({
        pageNum: pageNum,
        pageSize: this.pageSize,
      })
    },
    onpagesizechange(pageNum) {
      this.Pageonchange(pageNum);
    },
  },
  mounted() {
     this.gettabledata_c({
        //  userId: '0',
        pageNum: 1,
        pageSize: 10,
     })
  },
};
</script>

<style>
</style>
