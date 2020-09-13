<template>
  <div class="dispaly_flex">
    <Card class="width_15">
      <!-- <ul>
        <li>哈哈哈哈</li>
        <li>哈哈哈哈</li>
        <li>哈哈哈哈</li>
        <li>哈哈哈哈</li>
        <li>哈哈哈哈</li>
      </ul> -->
      <div :class="['nav_left',index===navIndex?'nav_active':'']" @click="navClick(index)" v-for="(item,index) in navList" :key="index">{{item.title}}</div>
    </Card>
    <Card class="width_70">
      <div style="margin-bottom:10px;">
        <i-button type="primary" @click="onFlgl">分类管理</i-button>&emsp;
        <i-button type="primary" @click="onAdd">新增</i-button>&emsp;
        <i-button type="primary">上架</i-button>&emsp;
        <i-button type="error">下架</i-button>&emsp;
        <i-button type="error">删除</i-button>
      </div>
      <!-- editable 表格可编辑 -->
      <!-- searchable search-place="top" 搜索框-->
      <tables v-model="tableData" :columns="columns" @on-delete="handleDelete" />
      <!-- <div style="margin-top:20px">
        <Page show-total :total="tableData.length" show-elevator></Page>
      </div>-->
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <XinzengModal v-if="addModal" :onCancel="onCancel"></XinzengModal>
  </div>
</template>

<script>
import Tables from "_c/tables";
import XinzengModal from './xin_zeng_shang_pin';
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables,
    XinzengModal,
  },
  data() {
    return {
      addModal:false,
      navList: [{ title: "冰鞋" }, { title: "冰服" }, { title: "护具" }],
      navIndex:0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        { title: "商品名称", key: "name", sortable: false },
        { title: "封面图", key: "email", editable: false },
        { title: "所属品牌", key: "email", editable: false },
        { title: "总库存(件)", key: "email", editable: false },
        { title: "总销量(件)", key: "email", editable: false },
        { title: "单价(元)", key: "email", editable: false },
        { title: "点击量(次)", key: "email", editable: false },
        { title: "分润(元)", key: "email", editable: false },
        { title: "评论总数", key: "email", editable: false },
        { title: "推荐", key: "email", editable: false },
        { title: "是否上架", key: "email", editable: false },

        {
          title: "操作",

          key: "action",

          width: 200,

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
                      this.look(params.index);
                    },
                  },
                },

                "查看"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "warning",

                    size: "small",
                  },

                  style: {
                    marginRight: "5px",
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    },
                  },
                },

                "编辑"
              ),
              h(
                "Button",

                {
                  props: {
                    type: "error",

                    size: "small",
                  },

                  style: {
                    marginRight: "5px",
                  },

                  on: {
                    click: () => {
                      this.editBus(params.row, params.index);
                    },
                  },
                },

                "下架"
              ),
            ]);
          },
        },
      ],
      tableData: [],
    };
  },
  methods: {
    navClick(i){
        this.navIndex=i
    },
     onFlgl(){
        this.$router.push({
        name: 'fen_lei_guan_li',
        // params: { name: this.names[index] }
      })
    },
     onAdd(){
      this.addModal = true;
    },
     onCancel() {
      this.addModal = false;
    },
    editBus(item, index) {},
    look(params) {},
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`,
      });
    },
  },
  mounted() {
    getTableData().then((res) => {
      this.tableData = res.data;
    });
  },
};
</script>

<style>
.dispaly_flex {
  display: flex;
}
.width_15 {
  width: 15%;
}
.nav_left{
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
 .nav_active{
    color:#fff;
    background: rgb(0, 153, 153);
  }
.width_70 {
  flex: 1;
}
</style>
