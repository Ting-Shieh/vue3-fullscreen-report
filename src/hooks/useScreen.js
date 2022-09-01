import { ref, onMounted } from 'vue'

export default function useScreen (domId) {
  // 螢幕寬高
  const width = ref(0)
  const height = ref(0)
  let dom
 
  // dom繪製是在 Mounted時，setup則在Mounted前。
  onMounted(() => {
    dom = document.getElementById(domId)
    console.log("I get dom: ", dom)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
    console.log("width,height= ", width.value, height.value)
  })
  
  return { width, height }
}