import { ref,onMounted, onUnmounted } from 'vue'
import mockData from '@/mock/apiData.json'

function random (val) {
  return Math.floor(Math.random() * val)
}

function genConfigDataArray (data) {
  for (let i = 0; i < 10; i++) {
    data.push([
      `同學${i + 1}`,
      Math.floor(Math.random() * 10 + 20),
      Math.floor(Math.random() * 10000 + 10000)
    ])
  }
}

export default function () { 
  const todayUser = ref(10000)
  const growthLastDay = ref(11.27)
  const growthLastMonth = ref(6.09)
  const ageData = ref(mockData.ageMockData)
  const averageAge = ref(0)
  const deviceData = ref(mockData.deviceMockData)
  const genderData = ref(mockData.genderMockData)
  const riderData = ref(mockData.riderMockData)
  const hotCategoryData = ref(mockData.hotCategoryMockData)
  const headerData = ref(mockData.headerMockData)
  const transformCategoryTabsData = ref(mockData.transformCategoryTabsMockData)
  const businessTabsData = ref(mockData.businessTabsMockData)
  const scrollListConfigData = ref(mockData.scrollListConfigMockData)
  const realTimeOrderData = ref(mockData.realTimeOrderMockData)
  const scheduleViewData = ref(mockData.scheduleViewMockData)
  const salesRankData = ref(mockData.salesRankMockData)
  let task
  onMounted(() => {
    console.log("loading.. hooks...")
    //
    // genConfigDataArray(scrollListConfigData.value.data)

    task = setInterval(() => {
      todayUser.value += 10
      growthLastDay.value += 1
      growthLastMonth.value += 1
      averageAge.value += 1
      // deviceData.value.totalDevices += 10 // 無淺拷貝
      // 淺拷貝
      const _ageData = [...ageData.value]
      _ageData.forEach(item => {
        item.startValue = item.value
        item.value = item.value + random(10)
      })
      ageData.value = _ageData
      
      // 淺拷貝
      const _deviceData = { ...deviceData.value }
      _deviceData.totalDevices += random(10)
      _deviceData.devices.forEach(item => {
        item.value  += random(100)
      })
      deviceData.value = _deviceData

      // 淺拷貝
      const _genderData = [...genderData.value]
      _genderData.forEach(item => {
        item.value += random(100)
      })
      genderData.value = _genderData

      // 淺拷貝
      const _riderData = { ...riderData.value }
      // 返回新數組，覆蓋
      _riderData.orderData.data1 = _riderData.orderData.data1.map(item => {
        item += random(100)
        return item
      })
      _riderData.orderData.data2 = _riderData.orderData.data2.map(item => {
        item += random(100)
        return item
      })
      _riderData.rateData.data1 = _riderData.rateData.data1.map(item => {
        item += random(100)
        return item
      })
      _riderData.rateData.data2 = _riderData.rateData.data2.map(item => {
        item += random(100)
        return item
      })
      riderData.value = _riderData

      // 淺拷貝
      const _hotCategoryData = { ...hotCategoryData.value }
      _hotCategoryData.data1.data1 = _hotCategoryData.data1.data1.map(item => {
        item += random(100)
        return item
      })
      hotCategoryData.value = _hotCategoryData

      //
    },3000)
  })

  onUnmounted(() => {
    task && clearInterval(task)
  })

  return {
    todayUser,
    growthLastDay,
    growthLastMonth,
    ageData,
    averageAge,
    deviceData,
    genderData,
    riderData,
    hotCategoryData,
    headerData,
    transformCategoryTabsData,
    businessTabsData,
    scrollListConfigData,
    scrollListData: mockData.scrollListMockData,
    realTimeOrderData,
    scheduleViewData,
    salesRankData
  }

}