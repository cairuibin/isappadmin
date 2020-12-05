<template>
  <div>
    <Card>
      <div style="margin-bottom:10px;">
       收益时间   <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>至
          <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
           <i-button type="primary">搜索</i-button>&emsp;

      </div>
    
      <tables ref="tables"   v-model="tableData" :columns="columns" @on-delete="handleDelete" />
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
        { title: '订单类型', key: 'name', sortable: false },
        { title: '订单名称', key: 'email', editable: false },
        { title: '付款时间', key: 'createTime' },
        { title: '收益类型', key: 'createTime' },
        { title: '付款金额', key: 'createTime' },
          { title: '付款状态', key: 'createTime' },
       
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
        .post("/api/v2/user/payment/getPaymentPageByUserId", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getPaymentPageByUserId"),
        })
        .then((res) => {
 
          this.tableData = res.data.data?res.data.data.list:[];
        });
    },
  },
  mounted () {
    this.getPaymentPageByUserId({
      pageNum: 1,
      pageSize: 10
    });
  }
}
</script>

<style>
</style>
