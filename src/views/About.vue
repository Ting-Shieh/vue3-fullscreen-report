<template>
  <div class="about">
    <h1>使用 SvgIconAnimationComponent</h1>
    <svg-icon-animation-component></svg-icon-animation-component>
  </div>
</template>
<script setup>

// import svgIconComponent from '@/components/SvgIcon/svgIconComponent.vue'; 
import SvgIconAnimationComponent from '@/components/SvgIcon/SvgIconAnimationComponent.vue'; 
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
