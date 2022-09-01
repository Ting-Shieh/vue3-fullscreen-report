import { ref, onMounted, onUnmounted } from 'vue'

const fillZero = (v) => { 
  return v < 10 ? ('0' + v) : ('' + v)
}

/**
 * 生成 YYYY-MM-DD 格式 
 * @param {*} v 
 * @returns 
 */
const dateFilter = (v) => {
  let month = v.getMonth() + 1
  month = fillZero(month)
  let date = v.getDate()
  date = fillZero(date)
  return `${v.getFullYear()}-${month}-${date}`
}

const timeFilter = (v) => {
  const hh = fillZero(v.getHours())
  const mm = fillZero(v.getMinutes())
  const ss = fillZero(v.getSeconds())

  return `${hh}:${mm}:${ss}`
}

export function clock () {
  const now = new Date()
  const date = ref(dateFilter(now))
  const time = ref(timeFilter(now))

  // 持續更新邏輯
  let task
  const start = () => {
    task && clearInterval(task)
    task = setInterval(() => {
      const now = new Date()
      date.value = ref(dateFilter(now))
      time.value = ref(timeFilter(now))

    }, 1000)
  }
  onMounted(start)
  onUnmounted(() => {
    task && clearInterval(task)
  })
  return { date, time }
}