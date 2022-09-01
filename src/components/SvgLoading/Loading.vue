<template>
  <div class="loading-container">
    <svg viewBox="0 0 50 50" :width="width" :height="height" preserveAspectRatio="xMidYMid meet">
      <!-- 
        stroke-dasharray 公式: 2*pi*r/4
       -->
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        :stroke="outsideColor"
        stroke-width="3"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate attributeName="stroke" :values="outsideColorAnimation" :dur="`${+duration*2}s`" repeatCount="indefinite"></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        :stroke="insideColor"
        stroke-width="3"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 25 25"
          to="0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        ></animateTransform>
        <animate attributeName="stroke" :values="insideColorAnimation" :dur="`${+duration*2}s`" repeatCount="indefinite"></animate>
      </circle>
    </svg>
    <div class="loading-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps,computed } from 'vue'
const props = defineProps({
  width: {
    type: [Number, String],
    default: 50
  },
  height: {
    type: [Number, String],
    default: 50
  },
  outsideColor: {
    type: String,
    default: "#3be6cb"
  },
  insideColor: { 
    type: String,
    default: "#02bcfe"
  },
  duration: {
    type: [Number, String],
    default: 3
  }
})

const outsideColorAnimation = computed(() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`)
const insideColorAnimation  = computed(() => `${props.insideColor};${props.outsideColor};${props.insideColor}`)
</script>
<style lang="scss" scoped>
.loading-container{
  @include setCenter;
  flex-direction: column;
}
</style>
