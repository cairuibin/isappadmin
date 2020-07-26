<template>
  <div>
    <Card>
      <!-- <div style="margin-bottom:10px;">
       收益时间   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>至
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
           <i-button type="primary">搜索</i-button>&emsp;

      </div> -->
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
        { title: '提现时间', key: 'name', sortable: false },
        { title: '提现前金额', key: 'email', editable: false },
        { title: '提现渠道', key: 'createTime' },
        { title: '提现金额(元)', key: 'createTime' },
        { title: '状态', key: 'createTime' },
        //   { title: '付款状态', key: 'createTime' },
        {
          title: '操作',

          key: 'action',

          width: 350,

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

                '查看明细'
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

                '审核通过'
              ), h(
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
                      this.bohui(params.row, params.index)
                    }
                  }
                },

                '审核驳回'
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
    bohui(params){

    },
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
