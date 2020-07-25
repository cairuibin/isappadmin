<template>
  <div>
    <Modal v-model="modalShow" width="800" title="图片上传" @on-ok="onOk" ref="modal">
      <!--操作菜单容器-->
      <Row class="action">
        <Checkbox v-model="checkAll">全选</Checkbox>
        <span v-if="chooseNum==1">{{chooseType ? '单选模式 ' : '删除模式 '}}<i-switch v-model="chooseType" @on-change="change"/></span>
        <span v-if="chooseNum!=1">{{chooseType ? '正常模式 ' : '删除模式 '}}<i-switch v-model="chooseType" @on-change="change"/></span>
        <Button type="info" @click="handleDelete">删除</Button>
        <Button type="info" @click="action.fileUpShow = !action.fileUpShow">{{action.fileUpShow ? '取消上传' : '裁剪上传'}}
        </Button>
      </Row>

      <!--图片展示容器-->
      <Card v-show="!action.fileUpShow">
        <div class="image-wrap">

          <div v-for="item,i in list" @click="optImage(i,item)"
               :class="{repairItem: item.hide}">
            <div class="item" :class="{active:item.opt}" v-if="!item.hide">
              <template v-if="item.status === 'finished'">
                <img class="Img" :src="item.linkUrl"></img>
                <div v-if="item.opt" class="opt">
                  <Icon type="md-checkmark"/>
                </div>
              </template>

              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>

            <div class="sm" v-if="item.hide && item.opt"></div>
          </div>

          <Upload class="item uploading"
                  :action="upUrl"
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="imageList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="5000"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  :data="data"
                  :headers="headerData"
                  :multiple="true"
          >
            <div style="width: 100%;height:100%;line-height: 120px;">
              <Icon type="ios-camera" size="50"></Icon>
            </div>
          </Upload>
        </div>
      </Card>

      <Card v-show="action.fileUpShow">
        <div class="cropper-example cropper-first">
          <cropper
            :src="imageSrc"
            crop-button-text="确认提交"
            @on-crop="handleCroped"
          ></cropper>
        </div>
      </Card>
    </Modal>

    <div @click="openModal">
      <slot></slot>
    </div>

  </div>
</template>

<script>

import { USER_FILE_API, UP_API } from '@/config/httpApi'
import Cropper from '@/components/cropper'
import { isPass, getToken } from '../../libs/util'
import { fileUP } from '@/api/file'
import config from '@/config'
import ajax from '@/libs/ajax'

export default {
  name: 'image-up',
  data () {
    return {
      headerData: {
        accessToken: getToken()
      },
      modalShow: false,
      imageList: [],
      checkAll: false,
      imageSrc: '',
      action: {
        ordinary: false,
        fileUpShow: false
      },
      // upUrl: 'http://112.74.63.138:8082' + '/' + UP_API.UP_FILE,
      upUrl: 'http://iskate-pub.oss-cn-hangzhou.aliyuncs.com',
      imgName: '',
      visible: false,
      uploadList: null,
      optList: [],
      optIds: [],
      optUrls: [],
      memoryData: {},
      chooseType: true,
      params: {
        pageNum: 1,
        pageSize: 20
      },
      data: {}
    }
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    chooseNum: {
      type: [String, Number],
      default: 1
    },
    imgUrl: {
      type: String,
      default: ''
    },
    imgList: {
      type: [Array, String],
      default: () => {
        return []
      }
    }
  },
  mounted () {
    console.log(this.data)
  },
  components: {
    Cropper
  },
  computed: {
    list () {
      return this.uploadList
    }
  },
  methods: {
    async handleCroped (imgSrc, file) {
      // console.log(imgSrc)
      let res = await this.$http.get(UP_API.UP_GET_INFO, { fileName: file.name }),
        that = this

      if (!this.$pass(res)) {
        this.$Message.warning('上传失败')
        return false
      }
      //  let formData = new FormData()
      //
      let data = res.data.postObject,
        upUrl = res.data.urlStr
        // data.file = imgSrc
        // for(let key in data){
        //   console.log(key, data[key])
        //   formData.append(key,data[key]);
        // }
        // console.log('参数',formData)
        //
        // res = await this.$http.post(upUrl,data,true)

      ajax({
        headers: that.headerData,
        withCredentials: false,
        file: imgSrc,
        data,
        filename: 'file',
        action: upUrl,
        onProgress: e => {
          // this.handleProgress(e, file);
        },
        onSuccess: res => {
          console.log('', res)
          let imgData = {}
          imgData.opt = false
          imgData.status = 'finished'
          Object.assign(imgData, { linkUrl: res.data })
          that.action.fileUpShow = false
          that.uploadList.push(imgData)
          // this.handleSuccess(res, file);
        },
        onError: (err, response) => {
          console.log(err, response)
          // this.handleError(err, response, file);
        }
      })
    },
    // 选择图片
    optImage (i, item) {
      this.chooseType && this.chooseNum == 1 ? this.optOne(i, item) : this.optImg(i, item)
    },
    // 清空已选
    emptyOpt () {
      this.optList = []
      this.optIds = []
      this.optUrls = []
    },
    // 改变模式
    change () {
      for (let val of this.uploadList) {
        val.opt = false
      }
      this.emptyOpt()
    },
    // 开启弹框
    openModal () {
      this.modalShow = true
      this.initUi()
      this.readList()
    },
    // 模式化UI
    initUi () {
      let modalContent = this.$refs.modal.$el.children[1].children[0].children[0],
        modalBody = modalContent.children[2],
        ivuCard = modalBody.children[1]

      modalContent.style.height = window.innerHeight * 0.8 + 'px'
      modalBody.style.height = (window.innerHeight * 0.8 - 110) + 'px'
      ivuCard.style.height = (window.innerHeight * 0.8 - 110 - 80) + 'px'
    },
    // 获取最近上传列表
    async readList () {
      let res = await this.$http.get(USER_FILE_API.READ_LIST, this.params)

      if (!isPass(res)) return
      let list = res.data.list

      list.unshift({ opt: false, hide: true })
      for (let val of list) {
        val.opt = false
      }

      this.imageList = list

      setTimeout(() => {
        this.uploadList = this.$refs.upload.fileList
        this.emptyOpt()
        // this.uploadList = JSON.parse(JSON.stringify(this.$refs.upload.fileList))
      }, 200)
    },

    // 单选图片
    optOne (i, val) {
      if (val.status !== 'finished') return
      let preI = this.memoryData['pre']
      console.log(preI)
      this.uploadList[i].opt = !this.uploadList[i].opt
      this.uploadList[0].opt = !this.uploadList[0].opt
      if (this.uploadList[i].opt) {
        this.optList[0] = val
        this.optIds[0] = val.id
        this.optUrls[0] = val.linkUrl
      }
      if (preI && preI !== i) {
        this.uploadList[preI].opt = false
      }
      this.memoryData['pre'] = i
    },
    // 多选图片
    optImg (i, val) {
      let chooseNum = this.chooseNum,
        isExistId = this.optIds.indexOf(val.id)

      if (this.optList.length >= chooseNum && isExistId == -1 && this.chooseType) {
        this.$Message.warning('最多只能选择' + chooseNum + '张图！')
        return
      }

      if (val.status !== 'finished') return
      this.uploadList[i].opt = !this.uploadList[i].opt
      this.uploadList[0].opt = !this.uploadList[0].opt

      let { id, linkUrl } = val,
        data = { id, linkUrl },
        isHave = false

      for (let i = 0; i < this.optList.length; i++) {
        if (id == this.optList[i].id) {
          this.optList.splice(i, 1)
          this.optIds.splice(i, 1)
          this.optUrls.splice(i, 1)
          isHave = true
        }
      }

      if (!isHave) {
        // 存入选择参数对象
        this.optList.push(val)
        // 存入选择id
        this.optIds.push(id)
        this.optUrls.push(linkUrl)
      }
    },

    handleView (name) {
      this.imgName = name
      this.visible = true
    },

    handleRemove (file) {
      console.log(file)
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    // 上传成功回调
    handleSuccess (res, file) {
      console.log('上传成功', res, file)
      if (!isPass(res)) return
      file.opt = false
      file = Object.assign(file, { linkUrl: res.data })
    },

    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '文件格式不正确，请选择jpg或png。'
      })
    },

    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: file.name + '文件大小超过2M。'
      })
    },

    async handleBeforeUpload (file) {
      console.log('准备上传', file)
      this.data.key = file.name
      let res = await this.$http.get(UP_API.UP_GET_INFO, { fileName: file.name, attKey: 'library' })

      // if (!this.$pass(res)) {
      //   this.$Message.warning('上传失败')
      //   return false
      // }

      this.data = res.data.postObject
      this.upUrl = res.data.urlStr
      let i = this.uploadList.length - 1
      console.log('上传参数', res)
      // this.uploadList.push(this.uploadList[i])
      const check = this.uploadList.length < 5
      // if (!check) {
      //   this.$Notice.warning({
      //     title: '最多可上传五张照片。'
      //   });
      // }
      // this.uploadList = this.$refs.upload.fileList;
      // console.log(this.uploadList);
      return true
    },

    onOk () {
      this.$emit('update:imgUrl', this.optUrls[0])
      this.$emit('update:imgList', this.optUrls)
      this.$emit('getImage', this.optUrls, this.optIds, this.optList)
      this.modalShow = false
    },

    async handleDelete () {
      let res = await this.$http.post(USER_FILE_API.FILE_DELETE_TRUE, { ids: this.optIds.join(',') })
      if (!isPass(res)) return
      this.$Message.success('删除成功')
      this.readList()
    }
  }
}
</script>

<style lang="less">
  .action {
    padding-bottom: 16px;

    button {
      margin-left: 10px;
    }

    .ivu-upload {
      display: inline-block;
    }
  }

  .ivu-card-body {
    width: 100%;
    height: 100%;

    .image-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;

      .repairItem {
        float: left;
      }

      .uploading {
        cursor: pointer;

        .ivu-upload-drag {
          height: 98%;
          border: none;
        }
      }

      .item {
        width: 120px;
        height: 120px;
        border: 1px solid #eee;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        margin-right: 22px;
        position: relative;

        .Img {
          /*height: -webkit-fill-available;*/
          /*width: -webkit-fill-available;*/
          max-height: 100%;
          max-width: 100%;
          width: auto;
          height: auto;
          border-radius: 5px;
        }

        .opt {
          border-radius: 5px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          .ivu-icon {
            font-size: 20px;
          }
        }
      }

      .active {
        .Img {
          filter: brightness(50%);
        }

        .opt {
          background: rgba(138, 138, 138, .5);
          z-index: 1;

          .ivu-icon {
            color: #ffffff;
          }
        }
      }

    }
  }

</style>
