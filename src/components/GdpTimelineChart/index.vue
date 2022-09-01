<template>
  <my-vue-echarts :options="options"></my-vue-echarts>
</template>
<script setup>
import MyVueEcharts from '@/components/MyVueEcharts/VueEcharts.vue'
import { onMounted, ref } from "vue";

const options = ref({})
const update = () => { }

onMounted(() => {
  update()
})
</script>
<style lang="scss" scoped>

</style>