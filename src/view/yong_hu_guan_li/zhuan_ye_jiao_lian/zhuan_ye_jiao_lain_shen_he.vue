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
          {{'1101021987'}}
        </div>
        <div class="div_content">
          <span>手机账号：</span>
          {{'18611587069'}}
        </div>

        <div class="div_content">
          <span>注册时间：</span>
          {{'yyyy-MM-dd HH:mm:ss'}}
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          {{'审核通过(正常)'}}
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          {{'尤硕'}}
        </div>

        <div class="div_content">
          <span>性别：</span>
          男
        </div>
        <div class="div_content">
          <span>身份证号：</span>110108198805041111
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <img src alt />
        </div>
        <div class="div_content">
          <span>认证状态：</span>待认证
        </div>
        <div class="h1">认证资料</div>
        <div class="div_content">
          <span>提交时间：</span>
          yyyy-MM-dd HH:mm:ss
        </div>
        <div class="div_content">
          <span>专业项目：</span>花样滑冰
        </div>
        <div class="div_content">
          <span>专项运动开始时间：</span>2015-10
        </div>
        <div class="div_content">
          <span>运动生涯成绩：</span>
          <div>{{"教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容"}}</div>
        </div>
         <div class="div_content">
          <span>专项教学开始时间：</span>
          2015-10
        </div>
         <div class="div_content">
          <span>教学特点：</span>
          <div>{{"教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容"}}</div>
        </div>
        <div class="div_content">
          <span>教学成果：</span>
          <div>{{"教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容教练简介内容"}}</div>
        </div>
         <div class="div_content">
          <span>审核通过：</span>
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
export default {
   props:{
    rzsxInfo:Object,
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
    Cancel(){
        this.onCancel()
    },
    onAdopt(){
        // 通过接口
    },
    onReject(){
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