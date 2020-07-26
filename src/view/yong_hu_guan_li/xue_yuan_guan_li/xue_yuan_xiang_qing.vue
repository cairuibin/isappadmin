<template>
  <div>
    <Modal v-model="modal2" width="660">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>学员详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>用户ID：</span>
          {{'1101021987'}}
        </div>
        <div class="div_content">
          <span>账号信息：</span>
          {{'豆豆龙/18611587069'}}
        </div>

        <div class="div_content">
          <span>注册时间：</span>
          {{'yyyy-MM-dd HH:mm:ss'}}
        </div>
        <div class="div_content">
          <span>学员姓名：</span>
          {{'候森'}}
        </div>
        <div class="div_content">
          <span>照片：</span>
        <img width="50px" src="@/assets/images/logo-min.jpg" alt="">
        </div>
        <div class="div_content">
          <span>性别:</span>
          {{'女'}}
        </div>
        <div class="div_content">
          <span>生日：</span>
          {{'2008-05-04'}}
        </div>
        <div class="div_content">
          <span>所属专项：</span>花样滑冰
        </div>
        <div class="div_content">
          <span>线下学习历史：</span>
         <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
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
       columns: [
        { title: "课程名称", key: "name", sortable: false },
        { title: "实缴(元)", key: "email", editable: false  },
        { title: "教练", key: "createTime"  },
        { title: "状态", key: "createTime"  }
      ],
      tableData: [],
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
  },  mounted() {
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