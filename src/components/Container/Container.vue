<template>
  <div id="project-container" ref="containerRef">
    <!-- 螢幕寬高比 {{width}}: {{height}} = {{width/height}}
    視口寬高比 {{originalWidth}}: {{originalHeight}} = {{originalWidth/originalHeight}} -->
    <template v-if="ready">
    <slot></slot>
    </template>
    
  </div>
</template>
<script setup>
import { watch, ref, defineProps, onMounted, onUnmounted, nextTick } from 'vue'
import { debounce } from '@/utils/send.js'
const props = defineProps({
  // 螢幕資訊 ex.寬高比
  options: {
    type: Object
  }
})
const containerRef = ref(null)
const ready = ref(false)
// 螢幕寬高
const width = ref(0)
const height = ref(0)
// 視口寬高
const originalWidth = ref(0)
const originalHeight = ref(0)

/**  外部有設置寬高 */
const _setWidthHeightByOutside = () => {
  width.value = props.options.width
  height.value = props.options.height
  // console.log("外部有設置寬高:",width.value ,height.value)
}

/** 外部無設置寬高，抓取客戶端瀏覽器寬高 */
const _setWidthHeightByDefault = () => {
  width.value = containerRef.value.clientWidth
  height.value = containerRef.value.clientHeight
  // console.log("外部無設置寬高:",width.value ,height.value)

}

/** 獲取視口區域 */
const _setViewArea = () => {
  // window.screen =  screen 通用
  console.log(window)
  originalWidth.value = window.screen.width
  originalHeight.value = screen.height
}

const updateSize = () => {
  if (width.value && height.value) {
    containerRef.value.style.width = `${width.value}px`
    containerRef.value.style.height = `${height.value}px`
  } else {
    containerRef.value.style.width = `${originalWidth.value}px`
    containerRef.value.style.height = `${originalHeight.value}px`
  }
}

const initSize = () => {
  // 將回調方便變成同步方法
  return new Promise((resolve) => {
    // nextTick 保證當前執行邏輯是在渲染更新後
    nextTick(() => {
      // console.log("nextTick:", containerRef.value)
      // 獲取大螢幕真實尺寸
      (props.options && props.options.width && props.options.height) ? _setWidthHeightByOutside() : _setWidthHeightByDefault()
      // 獲取畫布尺寸，且不會反覆執行
      if (!originalWidth.value || !originalHeight.value) {
        _setViewArea()
      }
      resolve()
    })
   
  })
  
}

/** 固定寬高比算法(壓縮) */
const updateScale = () => {
  // 獲取真實視口尺寸
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  // 獲取螢幕最終寬高
  const realWidth = width.value || originalWidth.value
  const realHeight = height.value || originalHeight.value
  // 計算寬高比
  const widthScale = currentWidth / realWidth
  const heightScale = currentHeight / realHeight
  containerRef.value && (containerRef.value.style.transform = `scale(${widthScale}, ${heightScale})`)
  //
}

/** 
 * 瀏覽器縮放時鎖定螢幕寬高比功能 
 * e 因為使用MutationObserver 而得
 * */
const onResize = async (e) => {
  console.log("onResize e: ", e)
  await initSize()
  updateScale()
}

/** 監聽dom屬性變化 */
let observer
const initMutationObserver = () => {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  observer = new MutationObserver(onResize)
  observer.observe(containerRef.value, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true
  })
}
/** 移除監聽dom屬性變化 */
const removeMutationObserver = () => {
  if (observer) {
    observer.disconnect()
    observer.takeRecords()
    observer = null
  }
}
watch(containerRef,(newv,oldv) => {
  console.log("newv:", newv)
  console.log("oldv:",oldv)
})
onMounted(async () => {
  ready.value = false
  console.log("containerRef:",containerRef)

  // 計算寬高
  await initSize()
  updateSize()
  updateScale()

  // 觸發resize，需重新獲取螢幕寬高比
  window.addEventListener('resize', debounce(300, onResize))
  //
  initMutationObserver()
  ready.value = true
})
onUnmounted(() => {
  // 事件解綁
  window.removeEventListener('resize', onResize)
  // 移除監聽dom屬性變化
  removeMutationObserver()
})
// console.log("此招可快速查vue api: ", require('vue'))
</script>
<style lang="scss" scoped>
#project-container{
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: top left; // 重要重新設定位置 預設是center, center
}
</style>
<!-- 
1.突破Chrome瀏覽器12像素問題
 利用css transform屬性突破 transform: scale(.5);
 但div也會被縮小
2.由外層options傳入的寬高和原本組件寬比不一致
3.onMounted導致問題
#project-container 渲染出來後再進行縮放,依據總比例進行縮放完後，區域也會發生變化(slot 的div會發生位移)

 -->