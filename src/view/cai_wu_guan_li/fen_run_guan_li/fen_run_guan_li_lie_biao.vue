<template>
  <div>
    <Card>
      <!-- <div style="margin-bottom:10px;">
        <i-button type="primary">新增</i-button>&emsp;
        <i-button type="error">删除</i-button>
      </div> -->
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables ref="tables" searchable search-place="top"  v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import untilMd5 from '../../../utils/md5'
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
        { title: '用户类型', key: 'name', sortable: false },
        { title: '用户信息', key: 'email', editable: false },
        { title: '收益总额', key: 'createTime' },
        { title: '已提现收益(元)', key: 'createTime' },
        { title: '待分配收益', key: 'createTime' },
       
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

                '收益明细'
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

                ' 提现历史'
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
    },
     getPaymentPageByUserId(params) {
      this.axios
        .post("/api/api/v2/user/payment/getPaymentPageByUserId", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getPaymentPageByUserId"),
        })
        .then((res) => {
          console.log(res.data, "查询退款申请列表接口(分页)");
          this.tableData = res.data.data.list;
        });
    },
  },
  mounted () {
    this.getPaymentPageByUserId({
      pageNum: 1,
      pageSize: 10,
      userId:JSON.parse(localStorage.getItem('user').id)
    });
  }
}
</script>

<style>
</style>
