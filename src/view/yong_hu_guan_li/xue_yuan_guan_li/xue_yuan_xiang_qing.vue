<template>
  <div>
    <Modal v-model="modal2" :maskClosable="false" footer-hide width="750" @on-cancel="Cancel">
      <p slot="header" style="text-align:center">
        <span>学员详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>用户ID：</span>
          {{student_detail_c.id}}
        </div>
        <div class="div_content">
          <span>账号信息：</span>
          {{student_detail_c.name}}
        </div>

        <div class="div_content">
          <span>注册时间：</span>
          {{student_detail_c.createTime}}
        </div>
        <div class="div_content">
          <span>学员姓名：</span>
          {{student_detail_c.name}}
        </div>
        <div class="div_content">
          <span>照片：</span>
          <img width="50px" :src="student_detail_c.logoUrl" alt />
        </div>
        <div class="div_content">
          <span>性别：</span>
          {{student_detail_c.gender===0?'女':"男"}}
        </div>
        <div class="div_content">
          <span>生日：</span>
          {{student_detail_c.birthday}}
        </div>
        <div class="div_content">
          <span>所属专项：</span>{{
            student_detail_c.studyType===0?'花样滑冰':'冰球'
          }}
        </div>
        <div class="div_content">
          <span>线下学习历史：</span>
          <tables
            class="detail_table"
            ref="tables"
            v-model="tableData"
            :columns="columns"
            @on-delete="handleDelete"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from "_c/tables";
// import { getTableData } from "@/api/data";
import untilMd5 from "../../../utils/md5";
export default {
  props: {
    studentInfo_id: String,
    onCancel: Function,
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
      columns: [
        { title: "课程名称", key: "packetName", sortable: false },
        { title: "实缴(元)", key: "money", editable: false },
        { title: "教练", key: "coachName" },
        { title: "状态", key: "status" },
      ],
      tableData: [],
      student_detail_c:{}
    };
  },
  methods: {
    Cancel() {
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
    getstudent_detail_c(params) {
     return this.axios
        .post("/api/v2/user/student/getStudentInfo", {
          ...params,
          sign: untilMd5.toSign(
            {
              ...params,
            },
            "getStudentInfo"
          ),
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
        });
    },
  },
  created() {
    console.log( this.studentInfo_id)
    this.getstudent_detail_c({
      id: this.studentInfo_id,
      coachId:null
    }).then((res) => {
          this.student_detail_c = res.data.data;
    });
    this.getTrainCampOrdersPage({
      pageNum: 1,
      pageSize: 99,
      orderType: 1,
      isDelete: 0,
      studentId: this.studentInfo_id,
      // userId:JSON.parse(localStorage.getItem('user').id)
    })
  },
};
</script>

<style scoped lang='scss'>
.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  > span {
    width: 115px;
    display: inline-block;
    text-align: right;
  }
  .detail_table {
    width: 590px;
  }
}
</style>