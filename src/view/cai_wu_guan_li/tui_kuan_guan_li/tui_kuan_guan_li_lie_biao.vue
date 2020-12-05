<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
       申请时间
   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>至
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
           <i-button type="primary">搜索</i-button>&emsp;

      </div>
      <tables ref="tables"   v-model="tableData" :columns="columns" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>
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
        { title: '付款类型', key: 'type', sortable: false,},
        { title: '消费名称', key: 'email', editable: false,},
        { title: '用户信息', key: 'realName', },
        { title: '申请退款时间', key: 'createTime',},
        { title: '支付方式', key: 'alipayAccount',},
          { title: '第三方订单号', key: 'orderId',},
           { title: '退款金额(元)', key: 'refundMoney',},
          { title: '状态', key: 'status',},
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
    getAccountRefundsPage(params) {
      this.axios
        .post("/api/v2/user/refund/getAccountRefundsPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getAccountRefundsPage"),
        })
        .then((res) => {
          this.tableData = res.data.data.list;
        });
    },
  },
  mounted() {
    this.getAccountRefundsPage({
      pageNum: 1,
      pageSize: 10,
    });
  },
}
</script>

<style>
</style>
