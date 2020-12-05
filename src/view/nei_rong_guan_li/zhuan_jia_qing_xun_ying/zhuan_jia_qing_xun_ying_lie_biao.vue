<template>
  <div>

    <Card>
      <div style="margin-bottom:10px;" class="header_wrap">

         <i-button type="primary" @click="handlAdd">新增</i-button>&emsp;
          <i-button type="primary">删除</i-button>
      </div>
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>

    </Card>

  </div>
</template>

<script>
import Tables from "_c/tables";
import untilMd5 from '../../../utils/md5'
import Xzxly from './xin_zeng_xun_lian_ying_xun_lian_ji_hua';

export default {
  name: "tables_page",
  components: {
      Tables,
      Xzxly,
  },
  data() {
    return {

      xzxlyModal:false,
      row:{},
      edit: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "创建时间", key: "createTime", },
        { title: "训练营名称", key: "title", },
        // { title: "课程安排", key: "coachList" },
        { title: "所属冰场", key: "rinkId" },
        { title: "学费原价(元)", key: "cost" },
        { title: "实际价格(元)", key: "specialPrice" },
        { title: "报名总数", key: "salesVolume" },
        {
            title: "状态",
            key: "status",
            render: (_,params) =>{
                switch(params.row.status){
                    case 0:
                        return <span>无效</span>;
                    case 1:
                        return <span>有效</span>;
                    case 2:
                        return <span>暂停</span>;
                }
            }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",

                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.look(params.row);
                    },
                  },
                },
                "查看"
              ), h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.editBus(params.row);
                    },
                  },
                },
                "编辑"
              )
            ]);
          },
        },
      ],
      tableData: [
        {
          title:"专家训练营无锡站"
        }
      ],
        pageNum: 1,
      pageSize: 10,
    };
  },
  methods: {
    handlAdd() {
      this.row = {};
      this.edit = false;
      this.xzxlyModal = true;
    },
    onCancel() {
      this.xzxlyModal = false;
    },
    look(params) {
      this.row = params;
      this.edit = true;
      this.xzxlyModal = true;
    },
    editBus(params) {
      this.row = params;
      this.edit = false;
      this.xzxlyModal = true;
    },
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
     getTrainCampPage(params) {
      this.axios
        .post("/api/v2/data/train/getTrainCampPage", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "getTrainCampPage"),
        })
        .then((res) => {
          this.tableData = res.data.data.list;
        });
    },
  },
  mounted() {
     this.getTrainCampPage({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  },
};
</script>

<style scoped lang='scss'>

</style>
