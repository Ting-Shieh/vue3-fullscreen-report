<template>
  <div class="average-age">
    <div class="title-wrapper">
      <div class="average-age-left">
        <div class="title">用戶年齡分布&平均年齡</div>
        <div class="sub-title">Distribution of Age</div>
      </div>
      <div class="average-age-right">
        <div class="age">
          <vue-count-to 
            :start-val="startAge"
            :end-val="avgAge"
            :duration="1000"
            :decimals="2">
          </vue-count-to>
          <span class="age-unit">歲</span>
        </div>
        
      </div>
    </div>
    <div id="average-age-chart" class="average-age-chart">
      <my-vue-echarts :options="options"></my-vue-echarts>
    </div>
    <div class="average-data-wrapper">
      <div class="average-data"  v-for="(item, index) in data" :key="index">
        <div class="average-data-value">
          <vue-count-to 
            :start-val="item.startValue"
            :end-val="item.value"
            :duration="1000">
          </vue-count-to>
        </div>
        <div class="average-data-axis">
          <div class="point" :style="{background: item.color}"></div>
          <div class="text">{{item.axis}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyVueEcharts from '@/components/MyVueEcharts/VueEcharts.vue'
import VueCountTo from '@/components/VueCountTo/vue-countTo'; // 使用自己改過的
import { ref,watch, defineProps, onMounted } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  avgAge: {
    type: Number,
    default: 0
  }
})
const startAge = ref(0)
const options = ref({})
const updateChart = () => {
  const data = ["指標"]
  const color = []
  const axis = ["指標"]
  let max = 0
  props.data.forEach(item => {
    data.push(+item.value)
    max += +item.value // 前面多個+表示強制轉換
    color.push(item.color)
    axis.push(item.axis)
  })
  options.value = {
    tooltip: {
      textStyle: {
        fontSize: 28
      },
      padding: 10
    },
    color,
    grid: {
      left: 40,
      right: 40,
      top: 0
    },
    dataset: {
      source: [
        axis, // 坐標系
        data
      ]
    },
    xAxis: {
      type: 'value',
      max,
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgb(98,105,113)',
        fontSize: 20
      },
      axisLine: {
        lineStyle: {
          color: 'rgb(50,51,53)',
          width: 3
        }
      }
    },
    yAxis: {
      type: 'category',
      show: false
    },
    series: [
      {
        type: 'bar',
        stack: 'total',// 按照甚麼分組
        barWidth: 15 
      },
      {
        type: 'bar',
        stack: 'total' // 按照甚麼分組
      },
      {
        type: 'bar',
        stack: 'total' // 按照甚麼分組
      },
      {
        type: 'bar',
        stack: 'total' // 按照甚麼分組
      }
    ] 
  }
}
watch(() => props.avgAge, (nextValue, prevValue) => {
  startAge.value = prevValue
})
watch(() => props.data, (nextValue, prevValue) => {
  updateChart()
})
onMounted(() => {
  updateChart()
})
</script>
<style lang="scss" scoped>
.average-age {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .title-wrapper {
      display: flex;
      align-items: center;

      .average-age-left {
        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .average-age-right {
        flex: 1;
        margin-left: 40px;
        font-weight: bold;

        .age {
          font-size: 68px;
          font-family: DIN;

          .age-unit {
            font-size: 20px;
          }
        }
      }
    }

    #average-age-chart {
      height: 120px;
    }

    .average-data-wrapper {
      display: flex;

      .average-data {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;

        .average-data-value {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .average-data-axis {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 5px;

          .point {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .text {
            margin-left: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>