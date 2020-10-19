<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="当日订单比例"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="近7日内订单" />
        </Card>
      </i-col>
    </Row>
    <Row>
      <!-- <Card shadow>
        <example style="height: 310px;" />
      </Card> -->
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import untilMd5 from '../../../utils/md5'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        {
          title: '用户数据',
          icon: 'md-person-add',
          count: 803,
          color: '#2d8cf0'
        },
        { title: '用户数据', icon: 'md-locate', count: 232, color: '#19be6b' },
        {
          title: '用户数据',
          icon: 'md-help-circle',
          count: 142,
          color: '#ff9900'
        },
        { title: '用户数据', icon: 'md-share', count: 657, color: '#ed3f14' },
        {
          title: '用户数据',
          icon: 'md-chatbubbles',
          count: 12,
          color: '#E46CBB'
        },
        { title: '用户数据', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 335, name: '线上订单' },
        { value: 310, name: '线下订单' },
        // { value: 234, name: '联盟广告' },
        // { value: 135, name: '视频广告' },
        // { value: 1548, name: '搜索引擎' }
      ],
      barData: {
        [`${new Date().getMonth()+1} 月 ${new Date().getDate()-6} 日`]: 13253,
        [`${new Date().getMonth()+1} 月 ${new Date().getDate()-5} 日`]: 34235,
       [`${new Date().getMonth()+1} 月 ${new Date().getDate()-4} 日`]: 26321,
       [`${new Date().getMonth()+1} 月 ${new Date().getDate()-3} 日`]: 12340,
        [`${new Date().getMonth()+1} 月 ${new Date().getDate()-2} 日`]: 24643,
       [`${new Date().getMonth()+1} 月 ${new Date().getDate()-1} 日`]: 1322,
       [`${new Date().getMonth()+1} 月 ${new Date().getDate()} 日`]: 1324
      }
    }
  },
  methods:{
     recommendList(params) {
      this.axios
        .post("/api/v2/data/iskate/recommendList", {
          ...params,
          sign: untilMd5.toSign({ ...params }, "recommendList"),
        })
        .then((res) => {
          console.log(res.data, "首页(分页)");
          this.tableData = res.data.data?res.data.data.list:[];
        });
    },
  },
  mounted () {
   this.recommendList({
      homepageType: 1,
      recommendType: 2,
      // userId:JSON.parse(localStorage.getItem('user').id)
    });
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
