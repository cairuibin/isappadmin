<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value)
      let seriesData = Object.values(this.value)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        	legend: {
    			show:true,
    			x:'center',
    			y:'35',
    			icon: 'stack',
    			itemWidth:10,
    			itemHeight:10,
    			textStyle:{
    				color:'#1bb4f6'
    			},
    			data:['已采纳','已发布']
    		},
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: [{
            type: 'value',
            name: '',
            min: 0,
            max: 200,
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#2ad1d2'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#27b4c2'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#11366e'
                }
            }
        },],
        // seriesData
        series: [{
            name: '已采纳',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            // symbolSize: 8,
            itemStyle: {
                normal: {
                    color: '#0092f6',
                    lineStyle: {
                        color: "#0092f6",
                        width: 1
                    },
                    //           areaStyle: { 
                    // 			//color: '#94C9EC'
                    // 			color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    // 				offset: 0,
                    // 				color: 'rgba(7,44,90,0.3)'
                    // 			}, {
                    // 				offset: 1,
                    // 				color: 'rgba(0,146,246,0.9)'
                    // 			}]),
                    //           }
                }
            },
            markPoint: {
                itemStyle: {
                    normal: {
                        color: 'red'
                    }
                }
            },
            data: [10, 13, 101, 14, 90, 30, 10, 18]
        },
        {
            name: '已发布',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            // symbolSize: 8,

            itemStyle: {
                normal: {
                    color: '#00d4c7',
                    lineStyle: {
                        color: "#00d4c7",
                        width: 1
                    },
                }
            },
            data: [142, 118, 44, 114, 29, 33, 131, 21]
        },]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
