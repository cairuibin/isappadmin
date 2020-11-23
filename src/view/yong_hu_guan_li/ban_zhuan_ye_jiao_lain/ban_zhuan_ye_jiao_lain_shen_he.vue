<template>
  <div>
    <Modal
      v-model="modal2"
      :maskClosable="false"
      footer-hide
      width="750"
      @on-cancel="Cancel"
    >
      {{ rzsxInfo.authStatus }}

      <p slot="header" style="text-align: center">
        <span>账号专家认证</span>
      </p>
      <div>
        <div class="div_content">
          <span>教练ID：</span>
          <div>{{ rzsxInfo.id }}</div>
        </div>
        <div class="div_content">
          <span>手机账号：</span>
          <div>{{ rzsxInfo.mobile }}</div>
        </div>
        <div class="div_content">
          <span>注册时间：</span>
          <div>{{ rzsxInfo.createTime }}</div>
        </div>
        <div class="div_content">
          <span>账号状态：</span>
          <div>{{ rzsxInfo.status === 1 ? "有效" : "无效" }}</div>
        </div>
        <div>教练资料</div>
        <div class="div_content">
          <span>提交时间：</span>
          <div>{{ rzsxInfo.createTime }}</div>
        </div>
        <div class="div_content">
          <span>教练姓名：</span>
          <div>{{ zsxInfo.name }}</div>
        </div>
        <div class="div_content">
          <span>性别：</span>
          <div>{{ zsxInfo.gender == 1 ? "男" : "女" }}</div>
        </div>
        <div class="div_content">
          <span>身份证号：</span>
          <div>{{ zsxInfo.idCard }}</div>
        </div>
        <div class="div_content">
          <span>教练照：</span>
          <div>
            <img src="wq" alt />
          </div>
        </div>
        <div class="div_content">
          <span>工作性质：</span>
          <div>全职</div>
        </div>
        <div class="div_content">
          <span>所在城市：</span>
          <div>{{ zsxInfo && zsxInfo.city }}</div>
        </div>
        <div class="div_content">
          <span>所属机构：</span>
          <div>{{ "喜悦-大兴店" }}</div>
        </div>
        <div class="div_content">
          <span>教练简介：</span>
          <div>{{ zsxInfo.professionalIntroduce }}</div>
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
import untilMd5 from "../../../utils/md5";
export default {
  props: ["rzsxInfo", "onCancel"],
  // {
  //   rzsxInfo:Object,
  //   onCancel:Function,
  // },
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
      zsxInfo: {},
    };
  },
  methods: {
    updateCoachAuthStatus(params) {
    return  this.axios.post("/api/v2/user/coach/updateCoachAuthStatus", {
        ...params,
        sign: untilMd5.toSign({ ...params }, "updateCoachAuthStatus"),
      });
    },
    Cancel() {
      this.onCancel();
    },
    onAdopt() {
      this.updateCoachAuthStatus({
        id: this.rzsxInfo.id,
        userId: this.rzsxInfo.userId,
        authStatus: this.rzsxInfo.authStatus,
      }).then((res) => {
        console.log(res.data)
        if(res.data.code===200){
          this.$Message.info('更新成功')
         
        }else{
            this.$Message.info('更新失败')
        }
        console.log(res.data, "更新教练认证状态接口");
        // this.tableData = res.data.data.list;
      });
      // 通过接口
    },
    onReject() {
      // 驳回接口

      this.updateCoachAuthStatus({
        id: this.rzsxInfo.id,
        userId: this.rzsxInfo.userId,
        authStatus: this.rzsxInfo.authStatus,
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