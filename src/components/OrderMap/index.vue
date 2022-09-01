<template>
  <!-- <div :class="[className,'my-order-map']"></div> -->
  <map-warning :options="mapObject.options" :mapDataName="mapObject.mapDataName" :geo-data="mapObject.geoData" ></map-warning>
</template>
<script setup>
import MapWarning from '@/components/MapWarning'
import 'echarts-gl'
import { defineProps, onMounted,watch } from "vue";
const props = defineProps({
  mapObject: {
    type: Object
  }
})
watch(() => props.mapObject, (nV, oV) => {
}, { immediate: true })
onMounted(() => {
  console.log("OrderMap onMounted")
})
</script>
<style lang="scss" scoped>

</style>