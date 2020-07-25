<template>
  <div class="demo-upload-list-warp">
    <div class="demo-upload-list" v-if="imageUrl">
      <template>
        <img :src="imageUrl">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(imageUrl)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(imageUrl)"></Icon>
        </div>
      </template>
    </div>
    <div class="demo-upload-list" v-if="imageList" v-for="item in imageList">
      <template>
        <img :src="item">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
    </div>
    <Modal title="精彩瞬间详情" v-model="visible">
      <img :src="imgName" style="width: 100%">
    </Modal>
  </div>

</template>

<script>
export default {
  name: 'list-image',
  data () {
    return {
      imgNum: 0,
      imgName: '',
      visible: false
    }
  },
  props: {
    imageUrl: {
      type: String
    },
    imageList: {
      type: [Array, String]
    },
    imgUrl: {
      type: [Array, String],
      default: ''
    }
  },
  methods: {
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      if (this.imageList) {
        this.imageList.splice(this.imageList.indexOf(file), 1)
      } else if (this.imageUrl) {
        this.$emit('update:imageUrl', '')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .ivu-form {
  width: 100%;
}

//.ivu-input-wrapper,.ivu-select {
//  width: 500px;
//}

.menu-config-input{
  width: 180px;
}

.margin8-4{
  margin-right: 8px;
 i{
   margin-right: 4px;
   font-style: normal;
 }
}

.margin-left6{
  margin-left: 6px
}

.margin-right8{
  margin-right: 8px
}

  .handle-popup .ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body {
    justify-content: left;
  }

  .demo-upload-list {
    margin-top: 10px;
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 300px;
    padding-bottom: 10.48%;
    //background: #eee;

    .swiper-img {
      width: 100%
    }
  }
</style>
