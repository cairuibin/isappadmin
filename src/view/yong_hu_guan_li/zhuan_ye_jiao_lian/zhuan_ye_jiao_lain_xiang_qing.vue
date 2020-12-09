<template>
  <div>
    <Modal v-model="modal2" :maskClosable="false" footer-hide width="750" @on-cancel="Cancel">
      <p slot="header" style="text-align:center">
        <span>教练详情</span>
      </p>
      <div>
        <div class="div_content">
          <span>教练ID：</span>
          {{ coachInfo.id }}
        </div>
        <div class="div_content">
          <span>手机账号：</span>
          <div>{{coachInfo.mobile}}</div>
        </div>
        <div class="div_content">
          <span>注册时间：</span>
          <div>{{coachInfo.createTime}}</div>
        </div>
        <div class="div_content">
          <span>账号级别：</span>
          <div>{{coachInfo.levelId||"无数据"}}</div>
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          <div>{{coachInfo.status===1?"有效":"无效"}}</div>
        </div>
        <div class="div_content">
          <span>审核提交时间：</span>
          <div>{{coachInfo.authTime}}</div>
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          <div>{{coachInfo.name}}</div>
        </div>
        <div class="div_content">
          <span>昵称：</span>
          <div>{{coachInfo.title}}</div>
        </div>
        <div class="div_content">
          <span>性别：</span>
          <div>{{coachInfo.gender===0?"女":coachInfo.gender===1?"男":"保密"}}</div>
        </div>
        <div class="div_content">
          <span>身份证号：</span>
          <div>{{coachInfo.idCard}}</div>
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <div>
            <img :src="coachInfo.logoUrl" alt :style="{display:'block',width:'70px'}"/>
          </div>
        </div>
        <div class="div_content">
          <span>头像：</span>
          <div>
            <img :src="coachInfo.logoUrl" alt :style="{display:'block',width:'70px'}"/>
          </div>
        </div>
        <div class="div_content">
          <span>工作性质：</span>
          <div>{{coachInfo.workType===1?"全职":"兼职"}}</div>
        </div>
        <div class="div_content">
          <span>所在城市：</span>
          <div>{{coachInfo.city}}</div>
        </div>
        <div class="div_content">
          <span>所属机构：</span>
          <div>{{coachInfo.rinkName}}</div>
        </div>
        <div class="div_content">
          <span>教练简介：</span>
          <div>{{coachInfo.introduce}}</div>
        </div>
        <div class="div_content">
          <span>账户余额(i币)：</span>
          <div>{{coachInfo.askPrice}}</div>
        </div>
        <div class="div_content">
          <span>消费总金额(元)：</span>
          <div>{{coachInfo.askPrice}}</div>
        </div>
        <div class="div_content">
          <span>收益总金额(元)：</span>
          <div>{{coachInfo.askPrice}}</div>
        </div>
        <div class="div_content">
          <span>认证状态:</span>
          <div>{{coachInfo.authStatus===0?"等待审核":coachInfo.authStatus===1?"审核通过":"审核驳回"}}</div>
        </div>
        <div class="div_content">
          <span>认证提交时间：</span>
          <div>{{coachInfo.updateTime}}</div>
        </div>
        <div class="div_content">
          <span>专业项目：</span>
          <div>{{coachInfo.specialType===1?"花样滑冰":"冰球"}}</div>
        </div>
        <div class="div_content">
          <span>专业滑冰开始时间：</span>
          <div>{{coachInfo.coachStartYear}}</div>
        </div>
        <div class="div_content">
          <span>运动生涯成绩：</span>
          <div>{{coachInfo.professionalIntroduce&&coachInfo.professionalIntroduce.athletic_achievement}}</div>
        </div>
        <div class="div_content">
          <span>教学特点：</span>
          <div>{{coachInfo.professionalIntroduce&&coachInfo.professionalIntroduce.features}}</div>
        </div>
        <div class="div_content">
          <span>教学成果：</span>
          <div>{{coachInfo.professionalIntroduce&&coachInfo.professionalIntroduce.teach_achievement}}</div>
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