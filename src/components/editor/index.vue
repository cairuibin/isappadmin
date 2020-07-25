<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea"/>

    <div class="editor-custom-btn-container">

      <Button class="btn" type="primary" @click="tapView">预览</Button>
      <my-up :showUploadList="false" class="btn" @getImage="getUpImg">
        <Button type="primary">上传图片</Button>
      </my-up>
      <imageUp chooseNum="10" @getImage="getImage">
        <Button type="primary">图库</Button>
      </imageUp>
      <!--<editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />-->
    </div>

    <div class="view-warp" v-show="viewModel">
      <card class="view-sprite">
        <div class="value-html" v-html="valueHtml"></div>
        <div class="off-btn">
          <Button @click="viewModel=false">关闭</Button>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
/**
   * docs:
   * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
   */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import imageUp from '_c/image-up'
import myUp from '_c/upload'
import sprite from '@/assets/images/device-sprite.jpg'

// why use this cdn, customerDetail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Editor',
  components: { editorImage, imageUp, myUp },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 500
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data () {
    return {
      modalModel: false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      viewModel: false,
      valueHtml: '',
      sprite
    }
  },
  computed: {
    containerWidth () {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value (val) {
      // console.log('状态', this.hasChange)
      if (!this.hasChange) {
        // console.log('监听重置')
        this.init()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log('生命周期');
      this.init()
    })
  },
  activated () {
    // console.log('激活周期');
    this.init()
  },
  // deactivated() {
  //   console.log('deactivated');
  //   this.destroyTinymce()
  // },
  destroyed () {
    this.destroyTinymce()
  },
  methods: {
    tapView () {
      this.valueHtml = window.tinymce.get(this.tinymceId).getContent()
      this.viewModel = true
      // console.log(window.tinymce.get(this.tinymceId).getContent())
    },
    openMdel () {
      // console.log(window.tinymce.get(this.tinymceId))
    },
    getUpImg (img) {
      window.tinymce.get(this.tinymceId).insertContent(`<img class="editor-img" style="width: 100%; height: auto" src="${img}">`)
    },
    getImage (arr) {
      arr.forEach(v => {
        window.tinymce.get(this.tinymceId).insertContent(`<img class="editor-img" style="width: 100%; height: auto" src="${v}" >`)
      })
    },
    init () {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$Message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce () {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }

      // console.log('this.tinymceId', this.tinymceId);

      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          // console.log('初始化完成')
          // console.log(_this.value);
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            // this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })

          editor.on('blur', (e) => {
            _this.hasChange = false
            // console.log(e)
          })

          editor.on('focus', (e) => {
            _this.hasChange = true
            // console.log(e)
          })
        }
      })
      window.tinymce.get(this.tinymceId).setContent(this.value || '')
      // console.log(window.tinymce.get(this.tinymceId).getContent())
    },
    destroyTinymce () {
      // console.log('毁灭')
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK (arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .tinymce-container {
    .view-warp {
      position: fixed;
      top: 0 !important;;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;
      justify-content: center;

      .view-sprite {
        width: 400px !important;
        height: 730px !important;
        display: block;
        transition: background-image 0.1s linear;
      }
      .off-btn {
        position: absolute;
        bottom: 5px;
        right: 16px;
      }
    }
    .value-html::-webkit-scrollbar {
      display: none;
    }
    .value-html {
      overflow: hidden;
      overflow-y: scroll;
      width: 365px !important;
      height: 667px !important;
      border: 1px solid #eeeeee;
      border-radius: 5px;
    }
  }

</style>

<style scoped>

  .tinymce-container {
    position: relative;
    line-height: normal;
  }

  .tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  .editor-custom-btn-container .btn {
    margin-right: 4px;
  }

  .editor-custom-btn-container {
    display: flex;
    position: absolute;
    right: 4px;
    top: 2px;
    /*z-index: 2005;*/
  }

  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>

<style>
  /*.tinymce-container .mce-container {*/
    /*width: auto !important;*/
  /*}*/
</style>
