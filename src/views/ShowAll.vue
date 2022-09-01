<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
  <div style="color:red;">
    <test></test>
  </div>
  <div>
    <h3>使用svgIconComponent</h3>
    <svg-icon-component icon-name="#filledArrowRight" :style="{'width':'50px','height':'50px', 'color':'red'}"></svg-icon-component>
  </div>
</template>

<script setup>
import svgIconComponent from '@/components/SvgIcon/svgIconComponent.vue'; 
import Test from '@/components/SvgIcon/Test.vue'
</script>
