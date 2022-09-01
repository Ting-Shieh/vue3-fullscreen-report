<template>
  <div class="icon-wrapper" :style="{...style}">
      <Test />
      <svg class="icon" >
        <use :href="iconName"></use>
      </svg>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import Test from '@/components/SvgIcon/Test.vue'; 
defineProps({
  // icon
  iconName: {
    type: String,
    required: true
  },
  style: {
    type: Object,
    required: true
  }
})
</script>
<style scoped lang="scss">
.icon-wrapper {
  display: inline-block;
}
.icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>