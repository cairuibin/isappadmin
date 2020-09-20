<template>
  <div class="upload-image">
    <Upload
      ref="upload"
      :action="upUrl"
      :data="data"
      :headers="headerData"
      :show-upload-list="showUpload"
      :format="format"
      :multiple="multiple"
      :max-size="maxSize"
      :imageUrl="imageUrl"
      :on-success="handleSuccess"
      :on-format-error="handleFormatError"
      :before-upload="handleBeforeUpload"
      :on-exceeded-size="handleMaxSize"
    >
      <slot></slot>
    </Upload>
  </div>
</template>

<script>
import { isPass, getToken, getUploadData } from '@/libs/util'
import { UP_API } from '@/config/httpApi'

export default {
  name: 'upload',
  data () {
    return {
      upUrl: '',
      headerData: {
        accessToken: getToken()
      },
      showUpload: this.showUploadList,
      uploadList: [],
      imgNum: 0,
      imgName: '',
      visible: false,
      data: {}
    }
  },
  props: {
    showUploadList: {
      type: Boolean,
      default: true
    },
    imageUrl: {
      type: String
    },
    maxSize: {
      type: Number,
      default: 204800
    },
    format: Array,
    multiple: {
      type: Boolean,
      default: false
    },
    uploadNum: {
      type: [Number, String],
      default: 3
    },
    isPrimary: {
      type: Boolean,
      default: true
    },
    imgUrl: {
      type: [Array, String],
      default: ''
    }
  },
  mounted () {
    this.uploadList = JSON.parse(JSON.stringify(this.imgUrl)) || []
  },
  watch: {
    imgUrl (val) {
      if (this.multiple) {
        // if(Object.prototype.toString.call(val)==="[object String]") return
        this.uploadList = JSON.parse(JSON.stringify(val)) || []
      }
    }
  },
  methods: {
    handleRemove (file) {
      let imgs = this.$refs.upload.imgList
      if (imgs) {
        this.$refs.upload.imgList.splice(imgs.indexOf(file), 1)
      } else if (this.imageList) {
        imgs = this.imageList
        this.imageList.splice(imgs.indexOf(file), 1)
      }
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: file.name + '文件大小超过2M。'
      })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '文件格式不正确，请选择jpg或png。'
      })
    },
    // 上传成功回调
    handleSuccess (res, file) {
      if (!isPass(res)) return
      this.showUpload = false
      if (this.multiple) {
        let arr = this.imgUrl || []
        arr.push(res.data)
        this.$emit('update:imgUrl', arr)
        this.$emit('getImage', arr)
      } else {
        if (this.isPrimary) {
          this.$emit('update:imgUrl', res.data)
          this.$emit('getImage', res.data)
        } else {
          this.$emit('update:imgUrl', res.data)
          this.$emit('getImage'.res.data)
        }
      }
      this.$Message.success('上传成功')
    },
    // 最多可上传多少张
    handleBeforeUpload (file) {

      console.log(file,'129')
      const check = this.multiple && this.uploadList && this.uploadList.length >= this.uploadNum
      this.$refs.upload.fileList = []
      if (this.multiple) {
        this.uploadList.push(file)
      }

      if (check) {
        this.$Notice.warning({
          title: '最多可上传' + this.uploadNum + '照片。'
        })
        return false
      } else {
        this.showUpload = true
        this.data.key = file.name
        let that = this
        return getUploadData(that, file, UP_API)
      }
    }
  }
}
</script>

<style lang="less">
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

  .upload-image {
    position: relative;

    .demo-upload-list-warp {
      z-index: 100;
      position: absolute;
      top: 40px;

    }

    .slot {
      /*position: absolute;*/
      /*top: 0px;*/
    }

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
