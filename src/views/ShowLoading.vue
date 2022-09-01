<template>
<div class=""></div>
  <loading width="100" height="100" outsideColor="red" insideColor="yellow" :duration="2">
    <div style="font-size:20px;color:#777;">數據大屏加載中...</div>
  </loading>
  <!-- 
    因為使用use 導致id每個component都相同
    需要利用uuid生成原則，將每個component生成不同id 
   -->
  <div class="fly-box-parent">
   <fly-box duration="5">
    <div style="padding:5px;">111</div>
    <div style="padding:5px;">222</div>
    <div style="padding:5px;">333</div>
   </fly-box>
  </div>
  <div style="width:100%; background:#333; color:white;">
   <fly-box duration="5">
    <div style="padding:5px;">111</div>
    <div style="padding:5px;">222</div>
    <div style="padding:5px;">333</div>
   </fly-box>
  </div>
</template>
<script setup>
// import { ref } from 'vue'
import Loading from '@/components/SvgLoading/Loading.vue'; 
import FlyBox from '@/components/SvgLoading/FlyBox.vue'; 
const flyBoxPWidth = "400px" // "50%"
const flyBoxPBackground = "#333" // "50%"
</script>
<style scoped lang="scss">

.fly-box-parent{
  width: v-bind(flyBoxPWidth);
  background: v-bind(flyBoxPBackground);
  color:white;
}
</style>
