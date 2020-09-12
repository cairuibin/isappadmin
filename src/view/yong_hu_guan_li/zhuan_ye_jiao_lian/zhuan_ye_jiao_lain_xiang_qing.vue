<template>
  <div>
    <Modal v-model="modal2" :maskClosable="false" footer-hide width="750" @on-cancel="Cancel">
      <p slot="header" style="text-align:center">
        <span>教练详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>教练ID：</span>
          <div>{{'1101021987'}}</div>
        </div>
        <div class="div_content">
          <span>手机账号：</span>
          <div>{{'18611587069'}}</div>
        </div>
        <div class="div_content">
          <span>注册时间：</span>
          <div>{{'yyyy-MM-dd HH:mm:ss'}}</div>
        </div>
        <div class="div_content">
          <span>账号级别：</span>
          <div>{{'专家账号'}}</div>
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          <div>{{'审核通过'}}</div>
        </div>
        <div class="div_content">
          <span>审核提交时间：</span>
          <div>{{'yyyy-MM-dd HH:mm:ss'}}</div>
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          <div>{{'尤硕'}}</div>
        </div>
        <div class="div_content">
          <span>昵称：</span>
          <div>{{"尤硕"}}</div>
        </div>
        <div class="div_content">
          <span>性别：</span>
          <div>{{"男"}}</div>
        </div>
        <div class="div_content">
          <span>身份证号：</span>
          <div>{{"110108198805041111"}}</div>
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <div>
            <img src alt />
          </div>
        </div>
        <div class="div_content">
          <span>头像：</span>
          <div>
            <img src alt />
          </div>
        </div>
        <div class="div_content">
          <span>工作性质：</span>
          <div>全职</div>
        </div>
        <div class="div_content">
          <span>所在城市：</span>
          <div>{{"北京市/北京市/海淀区"}}</div>
        </div>
        <div class="div_content">
          <span>所属机构：</span>
          <div>{{"喜悦-大兴店"}}</div>
        </div>
        <div class="div_content">
          <span>教练简介：</span>
          <div>{{"教练简介内容教练简介内容教练简介内容教练简介内容"}}</div>
        </div>
        <div class="div_content">
          <span>账户余额(i币)：</span>
          <div>{{"0"}}</div>
        </div>
        <div class="div_content">
          <span>消费总金额(元)：</span>
          <div>{{"0"}}</div>
        </div>
        <div class="div_content">
          <span>收益总金额(元)：</span>
          <div>{{"0"}}</div>
        </div>
        <div class="div_content">
          <span>认证状态:</span>
          <div>{{"审核通过"}}</div>
        </div>
        <div class="div_content">
          <span>认证提交时间：</span>
          <div>{{"yyyy-MM-dd HH:mm:ss"}}</div>
        </div>
        <div class="div_content">
          <span>专业项目：</span>
          <div>{{"花样滑冰"}}</div>
        </div>
        <div class="div_content">
          <span>专业滑冰开始时间：</span>
          <div>{{"yyyy-MM-dd HH:mm:ss"}}</div>
        </div>
        <div class="div_content">
          <span>运动生涯成绩：</span>
          <div>{{"运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩"}}</div>
        </div>
        <!-- <div class="div_content">
          <span>滑冰教学开始时间：</span>
          yyyy-MM
        </div>-->
        <div class="div_content">
          <span>教学特点：</span>
          <div>{{"运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩"}}</div>
        </div>
        <div class="div_content">
          <span>教学成果：</span>
          <div>{{"运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩运动生涯成绩"}}</div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    coachInfo: Object,
    onCancel: Function,
  },
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
    Cancel() {
      this.onCancel();
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
</style>