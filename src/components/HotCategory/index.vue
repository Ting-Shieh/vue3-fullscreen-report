<template>
  <div class="hot-category">
    <div class="hot-category-wrapper">
      <div class="hot-category-left">
        <div class="title">熱銷品類</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="hot-category-right">
        <div class="sub-title">最後更新時間：{{ date }} &nbsp; {{ time }}</div>
      </div>
    </div>
    <div id="hot-category-chart">
      <my-vue-echarts :options="options"/>
    </div>
  </div>
</template>
<script setup>
// import * as Echarts from 'echarts'
import { ref, watch, onMounted, defineProps } from 'vue'
import MyVueEcharts from '@/components/MyVueEcharts/VueEcharts.vue'
import { clock as useClock } from '@/hooks/useClock.js'
const props = defineProps({
  data: Object
})

const { date, time } = useClock()
const options = ref({})
// let chart
let currentChart = 0
const update = () => {
  function createOption () {
    
    const sourceData = []
    const { data1, data2 } = props.data
    if (currentChart === 0) {
      data1.axisX.forEach((axis, index) => {
        sourceData.push([axis, data1.data1[index], data1.data2[index]])
      })
    } else {
      data2.axisX.forEach((axis, index) => {
        sourceData.push([axis, data2.data1[index], data2.data2[index]])
      })
    }
    const source = [
      ['指標', '國內', '海外'],
      ...sourceData
    ]
    // console.log("source:",source)
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      color: ['rgb(209,248,138)', 'rgba(65,65,65,.5)'],
      grid: {
        left: 20,
        right: 0,
        bottom: 30,
        top: 20
      },
      dataset: {
        source
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(124,136,146)'
          }
        },
        axisLabel: {
          color: 'rgb(98,105,113)',
          fontSize: 16
        },
        axisTick: { show: false }
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: 'rgb(98,105,113)',
          fontSize: 16
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgb(124,136,146)'
          }
        }
      },
      series: [
        {
          type: 'bar',
          stack: 'total',
          barWidth: 40
        },
        {
          type: 'bar',
          stack: 'total'
        }
      ]
    }
  }
  // if (!chart) {
  //   chart = Echarts.init(document.getElementById('average-age-chart3'))
  // }
  // chart.setOption(createOption())
  options.value = createOption()
  currentChart === 0 ? currentChart = 1 : currentChart = 0
}
watch(() => props.data, () => {
  update()
})
onMounted(() => {
  update()
})
</script>
<style lang="scss" scoped>
  .hot-category {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .hot-category-wrapper {
      display: flex;

      .hot-category-right {
        flex: 1;
        text-align: right;
      }

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    #hot-category-chart {
      height: 220px;
    }
  }
</style>