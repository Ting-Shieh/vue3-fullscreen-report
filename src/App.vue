<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/show-loading">ShowLoading</router-link>
  </div> -->
  <div class="">
    <router-view/>
  </div>
</template>
<script setup>
import ProjectContainer from '@/components/Container/Container.vue'
import ProjectHeader from '@/components/Layout/TopHeader'
</script>
<style lang="scss">
html, body, #app{
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.this{
  border: 1px solid red;
  // background: yellow;
}
.home{
  width: 100%;
  height: 100vh;
  background: rgb(29,29,29);
  color:#fff;
  font-size: 48px;
  position: relative;
  @include setCenter;
    
  #project-container{
    @include setCenter;
    flex-direction: column;
  }
}
</style>
