<template>
  <div :class="[className,'my-map-echarts']"></div>
</template>
<script setup>
import * as Echarts from 'echarts'
import { v4 as uuidv4 } from 'uuid'
import { defineProps, onMounted, computed, watch, ref } from "vue";
const uuid = uuidv4()
const className = computed(() => `my-map-echarts_${uuid}`)
const props = defineProps({
  options: {
    type: Object
  },
  theme: {
    type: [String, Object]
  },
  geoData: {
    type: Object
  },
  mapDataName: {
    type: String
  }
})

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
watch(() => props.geoData, (nV, oV) => {
  console.log("註冊地圖:",nV, oV)
  if (nV !== oV) {
    // 註冊地圖
    Echarts.registerMap(props.mapDataName, props.geoData)
  }
}, { immediate: true })

watch(() => props.options, (nV, oV) => {
  console.log("options:", nV, oV)
  if (nV !== oV && dom) {
    initChart()
  }
}, { immediate: true })

// watch(() => [props.geoData, props.options], ([newGeoVal,newOptVal], [oldGeoVal,oldOptVal]) => {
//   if (newGeoVal !== oldGeoVal || oldGeoVal) {
//     console.log("Geo 拿到了")
//     // 註冊地圖
//     Echarts.registerMap(props.mapDataName, props.geoData)
//   }
//   if (newOptVal !== oldOptVal) {
//     initChart()
//   }
  
// })
onMounted(() => {
  console.log("props.geoData:",props.geoData)
  initChart()
})
</script>
<style lang="scss" scoped>
.my-map-echarts{
  width: 100%;
  height: 100%;
}
</style>