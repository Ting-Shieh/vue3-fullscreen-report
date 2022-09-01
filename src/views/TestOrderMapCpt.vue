<template>
  <!-- OrderMap -->
  <div class="parent-cpt test-order-map">
    <div v-if="loading" class="loading">加載中...</div>
    <order-map v-else id="test-order-map" :map-object="mapObj"></order-map>
  </div>
</template>
<script setup>
import OrderMap from '@/components/OrderMap'
import useOrderMapData from '@/hooks/useOrderMapData.js'
import { onMounted, ref, reactive, watch } from "vue";
const {
  barData,
  categoryData,
  mapData,
  geoCoordMap,
  geoGpsMap,
  colors,
  colorIndex,
  year
} = useOrderMapData()
const loading = ref(true)
const MAPNAME = "china-map"
const mapObj = reactive({
  options: {},
  mapDataName: MAPNAME,
  geoData: {}
})
const fetchDataUrl = 'http://www.youbaobao.xyz/datav-res/datav/map.json'

const initGeoData = () => {
  fetch(fetchDataUrl)
    .then(res => res.json())
    .then(data => {
      mapObj.geoData = data
      console.log("父 geoData+>", mapObj.geoData)
    })
    .catch(err => { console.log(err) })
}

const convertData = (data) => {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
const convertToLineData = (data, gps) => {
  const res = []
  for (let i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var toCoord = geoCoordMap[dataItem.name]
    var fromCoord = gps // 郑州
    //  var toCoord = geoGps[Math.random()*3];
    if (fromCoord && toCoord) {
      res.push([{
        coord: fromCoord,
        value: dataItem.value
      }, {
        coord: toCoord
      }])
    }
  }
  return res
}
const update = () => { 
  const cities = ['A', 'B', 'C', 'D', 'E']
  const _options = {
    timeline: {
      data: cities,
      // timeline 自動播放
      autoPlay: true,
      axisType: 'category',
      playInterval: 3000,
      loop: true,
      left: '10%',
      right: '5%',
      bottom: '3%',
      width: '88%',
      label: {
        normal: {
          textStyle: {
            color: '#ddd'
          }
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      symbolSize: 10,
      lineStyle: {
        color: '#555'
      },
      checkpointStyle: {
        borderColor: '#777',
        borderWidth: 2
      },
      // 播放按鈕
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: '#666',
          borderColor: '#666'
        },
        emphasis: {
          color: '#aaa',
          borderColor: '#aaa'
        }
      }
    },
    // 左側地圖
    baseOption: {
      geo: {
        map: MAPNAME,
        zoom: 1.1,
        // 滾輪
        roam: true, 
        // 控制最大最小縮放比例
        scaleLimit: {
          min: 0,
          max: 3
        },
        center: [113.83531246, 34.0267395887], // 中心座標，看data的城市要哪個為中心
        // 地圖區域屬性
        itemStyle: {
          normal: {
            borderColor: 'rgba(147,235,248,1)',
            borderWidth: 1.2,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              z: 0.8,
              colorStops: [                
                // 0% 處的顏色
                {
                  offset: 0,
                  color: 'rgba(147,235,248,0)'
                },
                // 100% 處的顏色
                {
                  offset: 1,
                  color: 'rgba(147,235,248,0.2)'
                }
              ],
              
              global: false
            },
            shadowColor: 'rgba(128,217,248,1)',
            shadowOffsetX: -2, // 陰影向左
            shadowOffsetY: 2, // 陰影向上
            shadowBlur: 10
          },
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      },
      backgroundColor: '#424446',
      // 自定義Bar 組件，避免重合
      grid: {
        right: '5%',
        top: '15%',
        bottom: '15%',
        width: '20%'
      },
      tooltip: {
        trigger: 'axis', // hover觸發器
        axisPointer: { // 坐標軸指示器，坐標軸觸發有效
          type: 'shadow', // 默認為直線，可選為：'line' | 'shadow'
          shadowStyle: {
            color: 'rgba(150,150,150,0.1)' // hover顏色
          }
        }
      }
    },
    options: []
  }
  for (var n = 0; n < year.length; n++) { 
    _options.options.push({
      backgroundColor: '#424446',
      title: [
        {
          text: '銷售大盤',
          subtext: '數據由網路上大佬提供',
          left: '2%',
          top: '2%',
          textStyle: {
            color: '#fff',
            fontSize: 35,
            fontWeight: 700
          }
        },
        {
          id: 'statistic',
          text: year[n] + '銷售額統計情況',
          left: '75%',
          top: '8%',
          textStyle: {
            color: '#fff',
            fontSize: 25
          }
        }
      ],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        min: 0,
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 2,
          textStyle: {
            color: '#aaa'
          }
        }
      },
      yAxis: {
        type: 'category',
        //  name: 'TOP 20',
        nameGap: 16,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd'
          }
        },
        data: categoryData[n]
      },
      series: [
        {
          // 文字和標誌
          name: 'light',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(mapData[n]),
          symbolSize: (val) => {
            return val[2] / 10
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: colors[colorIndex][n]
            }
          }
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75, // 長寬比
          showLegendSymbol: false, // 存在legend時顯示
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#FFFFFF'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: mapData
        },
        { // 地圖點的動畫效果
        // name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(mapData[n].sort((a, b) => {
            return b.value - a.value
          }).slice(0, 20)),
          symbolSize: (val) => {
            return val[2] / 10
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: colors[colorIndex][n],
              shadowBlur: 10,
              shadowColor: colors[colorIndex][n]
            }
          },
          zlevel: 1
        },
        { // 地圖線的動畫效果
          type: 'lines',
          zlevel: 2,
          // 線的動畫
          effect: {
            show: true,
            period: 4, // 箭頭指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾跡長度[0,1]值越大，尾跡越長重
            symbol: 'arrow', // 箭頭圖標
            symbolSize: 3 // 圖標大小
          },
          lineStyle: {
            normal: {
              color: colors[colorIndex][n],
              width: 0.1, // 尾跡線條寬度
              opacity: 0.5, // 尾跡線條透明度
              curveness: 0.3 // 尾跡線條曲直度
            }
          },
          data: convertToLineData(mapData[n], geoGpsMap[n + 1])
        },
        { // 柱狀圖
          zlevel: 1.5,
          type: 'bar',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: colors[colorIndex][n]
            }
          },
          data: barData[n]
        }
      ]
    })
  }
  mapObj.options = _options
  loading.value = false
}
watch(() => mapObj.geoData, (nV,oV) => {
  if (Object.keys(nV).length !== 0) {
    update()
  }
  
}, { immediate: true })
onMounted(() => {
  initGeoData()

  console.log("barData: ",barData)
  console.log("categoryData: ",categoryData)
  console.log("mapData: ",mapData)
})
</script>
<style lang="scss" scoped> 
.parent-cpt{
  @include setWh(100%,100vh);
}
#test-order-map{
  @include setWh(100%,100%);
  background: rgb(48, 48, 48);
}

.loading{
  @include setFlexCenter();
  @include setWh(100%,100%);
  font-size: 36px;
  background: rgb(48, 48, 48);
  color: #fff;
}
</style>