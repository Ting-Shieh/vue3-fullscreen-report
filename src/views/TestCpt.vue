<template>
  <!-- 自動滾軸  -->
  <!-- <div class="parent-cpt test-page">
    <base-scroll-list 
    :config="config"
    />
  </div> -->

  <!-- Timeline  -->
  <!-- <div class="parent-cpt test-timeline">
    <my-vue-echarts id="test-echarts" :options="options"></my-vue-echarts>
  </div> -->
  
  <!-- MapWarning -->
  <!-- <div class="parent-cpt test-map-warning">
    <map-warning id="test-map-warning" :options="options" :mapDataName="mapDataName" :geo-data="geoData" ></map-warning>
  </div> -->
  <!-- RotatingEarth -->
  <div class="parent-cpt test-rotating-earth">
    <rotating-earth id="test-rotating-earth" :options="options"></rotating-earth>
  </div>
</template>

<!-- 自動滾軸  -->
<!-- <script setup>
import BaseScrollList from '@/components/BaseScrollList/components/BaseScrollList.vue'
import { ref } from "vue";
const headerData = ["姓名", "年齡", "月薪"]
const headerStyle = [{ color: 'red', width: '100px' }]
const headerFontSize = 24
const headerTextColor = "#fff"
const rowsStyle = [{ color: 'blue' }]
const rowsFontSize = 20
const rowsTextColor = "#000"
const rowBgColor = ["rgb(240,240,240)", "rgb(255,255,255)"]  // [奇數行, 偶數行]
const aligns = ['center']
const data = []
for (let i = 0; i < 15; i++) {
  data.push([
    `同學${i + 1}`,
    Math.floor(Math.random() * 10 + 20),
    Math.floor(Math.random() * 10000 + 10000)
  ])
}
const config = ref({
  headerData,
  headerStyle,
  rowsStyle,
  headerHeight: 40,
  headerFontSize,
  headerTextColor,
  headerIndex: true,
  data,
  rowNum: 10,
  rowBgColor,
  rowsFontSize,
  rowsTextColor,
  aligns
})
</script> -->
<!-- Timeline  -->
<!-- <script setup>
import MyVueEcharts from '@/components/MyVueEcharts/VueEcharts.vue'
import { onMounted, ref } from "vue";
const options = ref({})
const update = () => {
  options.value = {
    //
    baseOption: {
      timeline: {
        axisType: 'category',
        // 播放按鈕
        controlStyle: {
          position: 'right', // left | right | center
          color: 'red'
        },
        // timeline 自動播放
        autoPlay: true,
        // timeline播放 間隔
        playInterval: 1000,
        // 是否循環播放 =>false ，按播放按鈕也無用
        loop: true,
        // 是否反向播放 => 是否反向放置 timeline
        inverse: false,
        // 是否反向播放 => loop: true 才有效
        rewind: false,
        // 目前從哪個數據開始放
        currentIndex: 0,
        // 拖動圓點是否實時更新視圖
        realtime: true,
        // 時間軸每個節點的數據
        data: [
          {
            value: '2022/01/01',
            symbol: 'diamond',
            symbolSize: 18
          },
          '2022/03/01', '2022/04/01', '2022/05/01',
          {
            value: '2022/06/01',
            symbol: 'pin',
            symbolSize: 18
          }
        ],
        label: {
          // v 為 data 的值
          formatter (v) {
            return new Date(v).getMonth() + 1 + "月"
          }
        }
      }
    },
    // timeline 的數據，一個{}表示一個時間段。
    options: [
      // {

      // }
    ]
  }
}
onMounted(() => {
  update()
})
</script> -->

<!-- MapWarning -->
<!-- <script setup>
import MapWarning from '@/components/MapWarning'
import { onMounted, onUnmounted, ref, watch } from "vue";
import cloneDeep from 'lodash/cloneDeep'
const mapDataFrom = "http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json"
const mapDataName = "test"
const geoData = ref({})
const options = ref({})
let center
let timer
const initGeoData = () => {
  fetch(mapDataFrom)
    .then(response => response.json())
    .then(data => {
      // 處理城市數據
      center = []
      data.features.forEach(item => {
        if (item.properties) {
          center.push({
            key: item.properties.name,
            value: item.properties.center
          })
        }
      })
      geoData.value = data
      console.log("父 geoData+>", geoData.value)
    })
    .catch(err => { console.log(err) })
}

const update = () => {
  console.log("父組件 update:")
  options.value = {
    visualMap: {
      show: true, // false
      max: 100,
      seriesIndex: [0], // 默認為0 => 當series [{},{},...] 多個，可選index
      inRange: {
        color: ['#a5dc4f', '#006edd'] // 色差條
      }
    },
    // 為了讓地圖更有層次感，所以採用疊加 geo + series
    // roam 都設 false。zoom 要相同
    geo: [
      {
        map: mapDataName,
        zoom: 1,
        // 滾輪
        roam: false, 
        // 控制最大最小縮放比例
        scaleLimit: {
          min: 0,
          max: 3
        },
        // 地圖區域屬性
        itemStyle: {
          areaColor: '#013c62',
          shadowColor: '#013c62',
          shadowBlur: 20,
          shadowOffsetX: -5, // 陰影向左
          shadowOffsetY: 10 // 陰影向上
        }
      }
    ],
    series: [
      //
      {
        type: 'map',
        mapType: mapDataName,
        zoom: 1,
        roam: false, 
        label: {
          show: true,
          color: "#fff",
          emphasis: {
            color: "red",
            show: true
          }
        },
        // 會覆蓋 geo itemStyle默認直
        itemStyle: {
          normal: {
            borderColor: '#2980b9',
            borderWidth: 1,
            areaColor: '#12235c',
            color: "#fff"
          },
          emphasis: {
            areaColor: '#2980b9',
            borderWidth: 0    
          }
        },
        // data
        data: center.map(centerItem => {
          // // console.log("centerItem: ", centerItem)
          // // Object.keys() = return array
          // const key = Object.keys(centerItem)[0]
          // console.log("centerItem key: ", key)
          return {
            name: centerItem.key,
            value: Math.random() * 100 // ex:人口數(單位:百萬)
          }
        })
      },
      // scatter 做預警警告
      {
        type: "effectScatter",
        data: [],
        coordinateSystem: 'geo',
        symbolSize: 15, // 閃點圖大小
        itemStyle: {
          color: '#feae21'
        },
        // 閃點圖文字面板
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              console.log("文本: ", params)
              return `{title|${params.data.city}}\n{content|發生數值變化}`
            },
            backgroundColor: 'rgba(254,174,33,.8)',
            padding: [0, 0],
            borderRadius: 3,
            lineHeight: 32,
            color: "#f7fafb",
            rich: {
              title: {
                padding: [0, 10, 10, 10],
                color: '#fff'
              },
              content: {
                padding: [10, 10, 0, 10],
                color: 'red'
              }
            
            }
          },
          emphasis: {
            show: true   
          }
        }
      },
      {
        type: "effectScatter",
        data: [],
        coordinateSystem: 'geo',
        symbolSize: 15, // 閃點圖大小
        itemStyle: {
          color: '#e93f42'
        },
        // 閃點圖文字面板
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              console.log("文本: ", params)
              return `{title|${params.data.city}}\n{content|發生數值變化}`
            },
            backgroundColor: 'rgba(233,63,66,.9)',
            padding: [0, 0],
            borderRadius: 3,
            lineHeight: 32,
            color: "#ffffff",
            rich: {
              title: {
                padding: [0, 10, 10, 10],
                color: '#fff'
              },
              content: {
                padding: [10, 10, 0, 10],
                color: 'red'
              }
            
            }
          },
          emphasis: {
            show: true   
          }
        }
      },
      {
        type: "effectScatter",
        // data: [{ value: center[0].value, city: center[0].key }],
        data: [],
        coordinateSystem: 'geo',
        symbolSize: 15, // 閃點圖大小
        itemStyle: {
          color: '#08baec'
        },
        // 閃點圖文字面板
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (params) {
              console.log("文本: ", params)
              return `{title|${params.data.city}}\n{content|發生數值變化}`
            },
            backgroundColor: 'rgba(8,186,236,.9)',
            padding: [0, 0],
            borderRadius: 3,
            lineHeight: 32,
            color: "#ffffff",
            rich: {
              title: {
                padding: [0, 10, 10, 10],
                color: '#fff'
              },
              content: {
                padding: [10, 10, 0, 10],
                color: 'red'
              }
            
            }
          },
          emphasis: {
            show: true   
          }
        }
      }
    ]
  }
  // 測試 隨機展示事件
  timer = setInterval(() => {
    randomShowEvent()
  },2000)
}

const randomShowEvent = () => {
  const _options = cloneDeep(options.value)
  // init 數據
  for (let i = 1; i < 4; i++) {
    _options.series[i].data = []
  }
  // 生成城市隨機數
  const cityLength = center.length
  const cityIndex = Math.floor(Math.random() * cityLength)
  const eventIndex = Math.floor(Math.random() * 3) + 1
  _options.series[eventIndex].data = [{
    city: center[cityIndex].key,
    value: center[cityIndex].value
  }]
  options.value = _options
}

watch(() => geoData.value, () => {
  console.log("父 change")
  update()
})

onMounted(() => {
  initGeoData()
  // update()
})

onUnmounted(() => timer && clearInterval(timer))
</script>
-->
<!-- RotatingEarth -->
<script setup>
import RotatingEarth from '@/components/RotatingEarth'
import { onMounted, ref } from "vue";
const ROOT_PATH = './'
const TextureImg = 'datav-gl-texture.jpg'
const BgImg = 'star-bg.jpg'
const options = ref({})
const update = () => { 
  options.value = {
    // 地球
    globe: {
      // 基礎紋理貼圖
      baseTexture: `${ROOT_PATH}assets/${TextureImg}`,
      // 會有立體感(高度紋理貼圖)
      heightTexture: `${ROOT_PATH}assets/${TextureImg}`,
      // 地球頂點位置
      displacementScale: 0.03,
      // 三維圖形著色效果
      shading: 'realistic',
      // 真實感材質想官配置項
      realisticMaterial: {
        roughness: 0.5
      },
      // 背景環境貼圖
      environment: `${ROOT_PATH}assets/${BgImg}`,
      // environment: "#fff",
      postEffect: {
        enable: true
      },
      light: {
        // 主光源
        main: {
          intensity: 5,
          shadow: true
        },
        // 環境光源
        ambient: {
          intensity: 5
        }
      }
    } 
  }
}
onMounted(() => {
  update()
})
</script>
<style lang="scss" scoped> 
.parent-cpt{
  @include setWh(100%,100%);
}
// .test-page{
//   @include setWh(500px, 400px);
// }

// // timeline
// .test-timeline{
//   @include setWh(100%,100%);
// }
// #test-echarts{
//   @include setWh(800px, 600px);
// }

// MapWarning
.test-map-warning{
  @include setWh(100%,100%);
}
#test-map-warning{
  @include setWh(800px, 600px);
}
#test-rotating-earth{
  @include setWh(100%,100vh);
}
</style>