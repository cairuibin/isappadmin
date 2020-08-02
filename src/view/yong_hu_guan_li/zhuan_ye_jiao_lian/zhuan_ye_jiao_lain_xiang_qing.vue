<template>
  <div>
    <Modal v-model="modal2" width="460">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>教练详情</span>
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
          <span>账号级别：</span>
          {{'专家账号'}}
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          {{'审核通过'}}
        </div>
        <div class="div_content">
          <span>审核提交时间：</span>
          {{'yyyy-MM-dd HH:mm:ss'}}
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          {{'尤硕'}}
        </div>
        <div class="div_content">
          <span>昵称：</span>尤硕
        </div>
        <div class="div_content">
          <span>性别：</span>
          男
        </div>
        <div class="div_content">
          <span>身份证号：</span>
          110108198805041111
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <img src alt />
        </div>
        <div class="div_content">
          <span>头像：</span>
          <img src alt />
        </div>
        <div class="div_content">
          <span>工作性质：</span>
          全职
        </div>
        <div class="div_content">
          <span>所在城市：</span>
          北京市/北京市/海淀区
        </div>
        <div class="div_content">
          <span>所属机构：</span>
          喜悦-大兴店
        </div>
        <div class="div_content">
          <span>教练简介：</span>
          教练简介内容教练简介内容教练简介内容教练简介内容
        </div>
        <div class="div_content">
          <span>账户余额(i币)：</span>
          0
        </div>
        <div class="div_content">
          <span>消费总金额(元)</span>
          0
        </div>
        <div class="div_content">
          <span>收益总金额(元)：</span>
          999
        </div>
        <div class="div_content">
          <span>认证状态:</span>
          审核通过
        </div>
        <div class="div_content">
          <span>认证提交时间:</span>
          yyyy-MM-dd HH:mm:ss
        </div>
        <div class="div_content">
          <span>专业项目：:</span>
          花样滑冰
        </div>
        <div class="div_content">
          <span>专业滑冰开始时间:</span>
          yyyy-MM
        </div>
         <div class="div_content">
          <span>运动生涯成绩：:</span>
          运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩
        </div>
         <div class="div_content">
          <span>滑冰教学开始时间:

</span>
          yyyy-MM
        </div>
         <div class="div_content">
          <span>教学特点：:</span>
         运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩
        </div>
          <div class="div_content">
          <span>教学成果:</span>
         运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩
        </div>
      </div>
      
      <div slot="footer">
        <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal2: true,
      modal_loading: false,
      shen_he_tong_guo: "",
      sheng_he_bo_hui: "",
      bo_hui_yuan_yin: "",
      qi_ta: "",
    };
  },
  methods: {
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