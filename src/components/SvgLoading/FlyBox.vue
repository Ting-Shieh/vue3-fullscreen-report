<template>
  <div class="fly-box-container " ref="flyBoxRef">
    <!-- 
      要處理自適應父容器寬高
      viewBox d 都要為動態
      預設=>viewBox = "0 0 width height"
    -->
    <svg :width="width" :height="height">
      <defs>
        <!--初始測試用: d="M5 5 L395 5 L395 395 L5 395 Z" id="fly-box-path" -->
        <path
          :id="pathId"
          :d="path"
          fill="none"
        ></path>
        <!-- 發光 -->
        <!--初始測試用: id="fly-box-radial-gradient" -->
        <radialGradient :id="radialGradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <!-- 蒙版 -->
        <!--初始測試用: id="fly-box-mask" -->
        <mask :id="maskId">
          <!-- 
            r:控制流星長度 
            fill: 試試 white -> url(#fly-box-radial-gradient) 
            初始測試用: fill="url(#fly-box-radial-gradient)"
          -->
          <circle :r="startLength" cx="0" cy="0" :fill="`url(#${radialGradientId})`">
            <!-- 初始測試用: path="M5 5 L395 5 L395 395 L5 395 Z" -->
            <animateMotion :dur="`${duration}s`" :path="path" rotate="auto" repeatCount="indefinite"></animateMotion>
          </circle>
        </mask>
      </defs>
      <!-- 初始測試用: href="#fly-box-path" -->
      <use :href="`#${pathId}`" :stroke-width="lineStrokeWidth" :stroke="lineColor"></use>
      <!-- 流星 -->
      <!-- 初始測試用: href="#fly-box-path" mask="url(#fly-box-mask)"-->
      <use :href="`#${pathId}`" :stroke-width="starStrokeWidth" :stroke="starColor" :mask="`url(#${maskId})`"></use>
      <!-- <circle r="150" cx="0" cy="0" fill="red"></circle> -->
      
    </svg>
    <div class="fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import { v4 as uuidv4 } from 'uuid'
defineProps({
  lineColor: {
    type: String,
    default: "#235fa7"
  },
  lineStrokeWidth: {
    type: [String,Number],
    default: "1"
  },
  starColor: {
    type: String,
    default: "#4fd2dd"
  },
  starStrokeWidth: {
    type: [String,Number],
    default: "3"
  },
  startLength: { // 流星長度
    type: [String,Number],
    default: 50
  },
  duration: {
    type: [String,Number],
    default: 3
  }
})
const uuid = uuidv4()
// 方塊id
const pathId = computed(() => `fly-box-path_${uuid}`)
// 發光id
const radialGradientId = computed(() => `fly-box-radial-gradient_${uuid}`)
// 蒙版id
const maskId = computed(() => `fly-box-mask_${uuid}`)

const width = ref(0)
const height = ref(0)
const flyBoxRef = ref(null)
const path = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`)

const init = () => {
  // 渲染完成後，獲取svg寬高
  console.log("flyBoxRef: ", flyBoxRef)
  console.log("uuid: ", uuid)
  width.value = flyBoxRef.value.clientWidth
  height.value = flyBoxRef.value.clientHeight
}
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
// .bg-grey{
//   background: #333;
// }
.fly-box-container{
  position: relative;
  width: 100%;
  height: 100%;
  svg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .fly-box-content{
    width: 100%;
    height: 100%;
    padding: 2px;// 5px;
    box-sizing: border-box;
  }
}
</style>
