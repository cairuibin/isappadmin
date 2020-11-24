<template>
  <div>
    <Modal 
      v-model="modal2"
      :maskClosable="false" 
      footer-hide
      width="750" 
      @on-cancel="Cancel"
    >
      <p slot="header" style="text-align:center">
        <span>账号专家认证</span>
      </p>
      <div>
        <div class="div_content">
          <span>教练ID：</span>
          {{rzxsInfo.id}}
        </div>
        <div class="div_content">
          <span>手机账号：</span>
          {{rzxsInfo.mobile}}
        </div>

        <div class="div_content">
          <span>注册时间：</span>
          {{rzxsInfo.createTime}}
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          {{rzxsInfo.authStatus===0?"等待审核":rzxsInfo.authStatus===1?"审核通过":"审核驳回"}}
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          {{rzxsInfo.name}}
        </div>

        <div class="div_content">
          <span>性别：</span>
          {{rzxsInfo.gender===0?"女":rzxsInfo.gender===1?"男":"保密"}}
        </div>
        <div class="div_content">
          <span>身份证号：</span>
          {{rzxsInfo.idCard}}
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <img :src="rzxsInfo.logoUrl" alt :style="{display:'block',width:'70px'}"/>
        </div>
        <div class="div_content">
          <span>认证状态：</span>
          {{rzxsInfo.status}}
        </div>
        <div class="h1">认证资料</div>
        <div class="div_content">
          <span>提交时间：</span>
          {{rzxsInfo.updateTime}}
        </div>
        <div class="div_content">
          <span>专业项目：</span>
          {{rzxsInfo.specialType===1?"花样滑冰":"冰球"}}
        </div>
        <div class="div_content">
          <span>专项运动开始时间：</span>
          {{rzxsInfo.coachStartYear}}
        </div>
        <div class="div_content">
          <span>运动生涯成绩：</span>
          <div>{{rzxsInfo.professionalIntroduce&&rzxsInfo.professionalIntroduce.athletic_achievement}}</div>
        </div>
         <div class="div_content">
          <span>专项教学开始时间：</span>
          {{rzxsInfo.professionalCoachStartYear}}
        </div>
         <div class="div_content">
          <span>教学特点：</span>
          <div>{{rzxsInfo.professionalIntroduce&&rzxsInfo.professionalIntroduce.features}}</div>
        </div>
        <div class="div_content">
          <span>教学成果：</span>
          <div>{{rzxsInfo.professionalIntroduce&&rzxsInfo.professionalIntroduce.teach_achievement}}</div>
        </div>
         <div class="div_content">
          <span>审核通过：</span>
          {{rzxsInfo.authStatus===0?"等待审核":rzxsInfo.authStatus===1?"审核通过":"审核驳回"}}
          <Button type="primary" @click="onAdopt">审核通过</Button>
        </div>
        <div class="div_content">
          <span>审核驳回：</span>
          <div>
            <div class="c_item">
            <Checkbox v-model="single"></Checkbox>信息有误，请仔细核对
            </div>
            <div class="c_item">
              <Checkbox v-model="single1"></Checkbox>照片上传不清晰
            </div>
            <div class="c_item">
              <Checkbox v-model="single2"></Checkbox>其它
              <Input class="input" />
            </div>
             <Button type="error" @click="onReject">审核驳回</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import untilMd5 from "../../../utils/md5";
export default {
   props:{
    rzxsInfo:Object,
    onCancel:Function,
  },
  data() {
    return {
      modal2: true,
      modal_loading: false,
      shen_he_tong_guo: "",
      sheng_he_bo_hui: "",
      bo_hui_yuan_yin: "",
      qi_ta: "",
      single: "",
      single1: "",
      single2: "",
    };
  },
  methods: {
     updateCoachAuthStatus(params) {
    return  this.axios.post("/api/v2/user/coach/updateCoachAuthStatus", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "updateCoachAuthStatus"),
      });
    },
    Cancel(){
        this.onCancel()
    },
    onAdopt(){
        // 通过接口
          this.updateCoachAuthStatus({
        id: this.rzxsInfo.id,
        userId: this.rzxsInfo.userId,
        authStatus: this.rzxsInfo.authStatus,
      }).then((res) => {
        if(res.data.code===200){
         this.$Message.info('更新成功') 
        }else{
           this.$Message.info('更新失败')
        }
        console.log(res.data, "更新教练认证状态接口");
        // this.tableData = res.data.data.list;
      });
    },
    onReject(){
        this.updateCoachAuthStatus({
        id: this.rzxsInfo.id,
        userId: this.rzxsInfo.userId,
        authStatus: this.rzxsInfo.authStatus,
      }).then((res) => {
        if(res.data.code===200){
         this.$Message.info('更新成功') 
        }else{
           this.$Message.info('更新失败')
        }
        console.log(res.data, "更新教练认证状态接口");
        // this.tableData = res.data.data.list;
      });
      // 驳回接口
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
};
</script>

<style scoped lang='scss'>

.div_content {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  > span {
    width: 115px;
    text-align: right;
  }
  > div {
    flex: 1;
  }
}
.input {
  width: 100px;
}
</style>