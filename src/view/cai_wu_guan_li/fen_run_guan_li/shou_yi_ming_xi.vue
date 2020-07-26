<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
       收益时间   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>至
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
           <i-button type="primary">搜索</i-button>&emsp;

      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables ref="tables"   v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { title: '订单类型', key: 'name', sortable: false },
        { title: '订单名称', key: 'email', editable: false },
        { title: '付款时间', key: 'createTime' },
        { title: '收益类型', key: 'createTime' },
        { title: '付款金额', key: 'createTime' },
          { title: '付款状态', key: 'createTime' },
        // {
        //   title: '操作',

        //   key: 'action',

        //   width: 350,

        //   align: 'center',

        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',

        //         {
        //           props: {
        //             type: 'primary',

        //             size: 'small'
        //           },
        //           style: {
        //             marginRight: '5px'
        //           },
        //           on: {
        //             click: () => {
        //               this.look(params.index)
        //             }
        //           }
        //         },

        //         '收益明细'
        //       ),
        //       h(
        //         'Button',

        //         {
        //           props: {
        //             type: 'warning',

        //             size: 'small'
        //           },

        //           style: {
        //             marginRight: '5px'
        //           },

        //           on: {
        //             click: () => {
        //               this.editBus(params.row, params.index)
        //             }
        //           }
        //         },

        //         ' 提现历史'
        //       )
        //     ])
        //   }
        // }
      ],
      tableData: []
    }
  },
  methods: {
    editBus (item, index) {},
    look (params) {},
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    }
  },
  mounted () {
    getTableData().then((res) => {
      this.tableData = res.data
    })
  }
}
</script>

<style>
</style>
