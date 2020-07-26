<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
       申请时间
   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>至
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
        { title: '付款类型', key: 'name', sortable: false , width: 86,},
        { title: '消费名称', key: 'email', editable: false , width: 86,},
        { title: '用户信息', key: 'createTime', width: 86, },
        { title: '申请退款时间', key: 'createTime' , width: 130,},
        { title: '支付方式', key: 'createTime' , width: 86,},
          { title: '第三方订单号', key: 'createTime', width: 136, },
           { title: '退款金额(元)', key: 'createTime' , width: 110,},
          { title: '状态', key: 'createTime' , width: 86,},
        {
          title: '操作',

          key: 'action',

          width: 130,

          align: 'center',

          render: (h, params) => {
            return h('div', [
              h(
                'Button',

                {
                  props: {
                    type: 'primary',

                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.look(params.index)
                    }
                  }
                },

                '查看'
              ),
              h(
                'Button',

                {
                  props: {
                    type: 'warning',

                    size: 'small'
                  },

                  style: {
                    marginRight: '5px'
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index)
                    }
                  }
                },

                '审核'
              )
            ])
          }
        }
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
