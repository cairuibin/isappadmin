<template>
  <Select ref="seleteTree"  :disabled = "disabled" v-model="selectModelId" @on-change="onChange">
    <Option value="" v-if="isToplevel">顶级目录</Option>
    <el-tree
      :data="data"
      @node-click="nodeClickSelectTree"
    >
    </el-tree>
  </Select>
</template>

<script>
export default {
  name: 'select-tree',
  data () {
    return {
      selectTreeModel: () => {
        return this.$refs.seleteTree.$el.querySelector('.ivu-select-placeholder') || this.$refs.seleteTree.$el.querySelector('.ivu-select-selected-value')
      },
      selectModelId: this.value,
      model: {}
    }
  },
  props: {
    disabled: Boolean,
    value: {
      type: [String, Number],
      default: ''
    },
    isToplevel: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted () {
    console.log(this.value)
  },
  methods: {
    // 修改selectTree中的数据
    nodeClickSelectTree (data, state) {
      this.model = data
      if (state) {
        this.selectModelId = data.id
        this.selectTreeModel().innerHTML = data.text
        this.$emit('update:value', data.id)
      } else {
        if (data.parentText && data.parentId) {
          this.selectModelId = data.parentId
          this.selectTreeModel().innerHTML = data.parentText
          this.$emit('update:value', data.parentId)
          this.$emit('update:key', data.key)
        } else {
          this.selectModelId = ''
          this.selectTreeModel().innerHTML = '顶级目录'
          this.$emit('update:value', data.parentId)
          this.$emit('update:key', data.key)
        }
      }
      this.selectTreeModel().style.color = '#000'
      this.$emit('nodeClickSelectTree', data)
    },
    onChange (val) {
      this.selectTreeModel().innerHTML = ''
      this.selectTreeModel().innerHTML = '顶级目录'
      this.$emit('update:value', '')
    }
  }

}
</script>

<style scoped>

</style>
