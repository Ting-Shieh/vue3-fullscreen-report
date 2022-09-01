<template>
<div :class="[className,'my-echarts']"></div>
</template>
<script setup>
import { defineProps, watch, onMounted, computed } from 'vue';
import * as Echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'
const uuid = uuidv4()
const className = computed(() => `my-echarts_${uuid}`)
let dom;
let chart;
const props = defineProps({
  options: {
    type: Object
  },
  theme: {
    type: [String, Object]
  }
})
const initChart = () => {

  if (!chart) {
    dom = document.getElementsByClassName(className.value)[0]
    chart = Echarts.init(dom, props.theme)
  }
  if (props.options) {
    chart.setOption(props.options)
  }
  
}
watch(() => props.options, (newVal, oldVal) => {
  initChart()
})

onMounted(() => {
  initChart()
})
</script>
<style lang="scss" scoped>
.my-echarts{
  width: 100%;
  height: 100%;
}
</style>