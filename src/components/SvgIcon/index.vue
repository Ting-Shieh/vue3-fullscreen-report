<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup>
import { defineProps,computed  } from 'vue'
import { isExternal as external } from '@/utils/validate.js'
const props = defineProps({
  // icon
  icon: {
    type: String,
    required: true
  },
  // 圖標類名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 項目內圖標
 */
const iconName = computed(() => `#icon-${props.icon}`)

/**
 * 外部圖標样式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 判斷是否為外部圖標
 */
const isExternal = computed(() => external(props.icon))
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>