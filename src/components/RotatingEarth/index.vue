<template>
  <div :class="[className,'my-rotating-earth']"></div>
</template>
<script setup>
import * as Echarts from 'echarts'
import 'echarts-gl'
import { v4 as uuidv4 } from 'uuid'
import { defineProps, onMounted, computed, watch } from "vue";
const props = defineProps({
  options: {
    type: Object
  }
})

const uuid = uuidv4()
const className = computed(() => `my-rotating-earth_${uuid}`)
let dom
let chart
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
.my-rotating-earth{
  @include setWh(100%, 100%);
}
</style>