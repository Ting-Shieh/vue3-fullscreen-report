<template>
  <div class="home">
    <loading-cpt v-if="loadingView" width="100" height="100" outsideColor="red" insideColor="yellow" :duration="2">
      <div class="loading-text" >數據大屏加載中...</div>
    </loading-cpt>
    <project-container v-else :options="{width:3840, height:2160}">
      <div class="header">
        <project-header />
      </div>
      <div class="separator"></div>
      <div class="main-content">
        <div class="left">
          <div class="left-1">
            <total-user :today-user="todayUser" :growth-last-day="growthLastDay" :growth-last-month="growthLastMonth"></total-user>
          </div>
          <div class="left-2">
            <average-age-cpt :data="ageData" :avg-age="averageAge"></average-age-cpt>
          </div>
          <div class="left-3">
            <total-device :data="deviceData"></total-device>
          </div>
          <div class="left-4">
            <total-gender :data="genderData"/>
          </div>
          <div class="left-5">
            <TotalRider :data="riderData" />
          </div>
          <div class="left-6">
            <hot-category :data="hotCategoryData"/>
          </div>
        </div>
        <div class="right">
          <div class="right-top-1">
            <center-header :data="headerData"/>
          </div>
          <div class="right-top-2">
            <transform-category :data="transformCategoryTabsData" />
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left-1">
                <!-- <map-warning></map-warning> -->
                <!-- 旋轉地圖 -->
                <!-- <rotating-earth :options="optionsRotatingEarth" /> -->
                <order-map :map-object="mapObj" />
              </div>
              <div class="right-left-2">
                <transform-category :data="businessTabsData" :color="['rgb(178,209,126)','rgb(116,166,49)']" />
              </div>
              <div class="right-left-3">
                <fly-box start-color="rgb(251,253,142)" duration="5">
                  <real-time-order :data="realTimeOrderData" />
                </fly-box>
              </div>
              <div class="right-left-4">
                <schedule-view :data="scheduleViewData"/>
              </div>
            </div>
            <div class="right-right">
              <div class="right-right-1">
                <base-scroll-list :data="scrollListData" />
              <div class="right-right-2">
                <sales-rank :data="salesRankData"/>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </project-container>
  </div>
</template>
<script setup>
import ProjectContainer from '@/components/Container/Container.vue'
import ProjectHeader from '@/components/Layout/TopHeader'
import AverageAgeCpt from '@/components/AverageAge'
import TotalUser from '@/components/TotalUser'
import LoadingCpt from '@/components/SvgLoading/Loading.vue';
import TotalDevice from '@/components/TotalDevice'
import TotalGender from '@/components/TotalGender'
import TotalRider from '@/components/TotalRider'
import HotCategory from '@/components/HotCategory'
import CenterHeader from '@/components/CenterHeader'
import TransformCategory from '@/components/TransformCategory'
import BaseScrollList from '@/components/BaseScrollList'
// import MapWarning from '@/components/MapWarning'
import RotatingEarth from '@/components/RotatingEarth'
import RealTimeOrder from '@/components/RealTimeOrder'
// OrderMap
import useOrderMapData from '@/hooks/useOrderMapData.js'
import OrderMap from '@/components/OrderMap'
import FlyBox from '@/components/SvgLoading/FlyBox.vue'; 
// 
import ScheduleView from '@/components/ScheduleView'
//
import SalesRank from '@/components/SalesRank'
import { ref, onMounted, reactive, watch } from 'vue'
import useScreenData from '@/hooks/useScreenData.js'
const loadingView = ref(true)
const {
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
  scrollListData,
  realTimeOrderData,
  scheduleViewData,
  salesRankData
} = useScreenData()

//  ============== RotatingEarth ================
const ROOT_PATH = './'
const TextureImg = 'datav-gl-texture.jpg'
const BgImg = 'star-bg.jpg'
const optionsRotatingEarth = ref({})
const update = () => { 
  optionsRotatingEarth.value = {
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
//  ============== OrderMap ================

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
const updateOrderMap = () => { 
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
  // loading.value = false
}
watch(() => mapObj.geoData, (nV,oV) => {
  if (Object.keys(nV).length !== 0) {
    updateOrderMap()
  }
  
}, { immediate: true })

onMounted(() => {
  initGeoData()
  update()
  setTimeout(() => {
    console.log("loadingView~~~")
    
    loadingView.value = false
  }, 2500)
  
})
</script>
<style lang="scss" scoped>

.home{
  width: 100%;
  height: 100vh;
  background: rgb(29,29,29);
  color:#fff;
  font-size: 48px;
  position: relative;
  @include setCenter;
  .loading-text{
    font-size: 50px;
    margin-top: 10px;
    color: red;
  }
    
  #project-container{
    @include setCenter;
    flex-direction: column;

    .header{
      @include setWh(100%,167px);
    }
    .separator{
      @include setWh(100%,10px);
      // background: rgb(92,88,89);
      background: black;
    }
    .main-content{
      flex: 1; // 撐滿剩下佈局
      background: black;
      @include setWh(100%,100%);
      display: flex;
      .left{
        flex: 0 0 860px;
        background: black;
        height: 100%;
        @include setFlexColumn;
        @include setWh(860px,100%);
        justify-content: space-between;
        box-sizing: border-box;
        padding-bottom: 20px;
        .left-1{
          height: 300px;
          background: grey;
        }
        .left-2{
          height: 320px;
          background: grey;
        }
        .left-3{
          height: 280px;
          background: grey;
        }
        .left-4{
          height: 230px;
          background: grey;
        }
        .left-5{
          height: 360px;
          background: grey;
          // @include setRandomBgColor;
        }
        .left-6{
          height: 360px;
          background: grey;
          // @include setRandomBgColor;
        }
      }
      .right{
        flex: 1; // 撐滿剩下佈局
        background: black; //blue;
        @include setFlexColumn;
        margin-left: 10px;
        .right-top-1{
          @include setWh(100%,206px);
          // @include setRandomBgColor;
        }
        .right-top-2{
          @include setWh(100%,48px);
          background: grey;
          margin: 10px 0;
          // @include setRandomBgColor;
        }
        .right-bottom{
          flex: 1; // 撐滿剩下佈局
          @include setFlexRow;
          .right-left{
            flex: 0 0 1917px;
            @include setWh(1917px,100%);
            @include setFlexColumn;
            justify-content: space-between;
            box-sizing: border-box;
            padding-bottom: 20px;
            .right-left-1{
              @include setWh(100%,999px);
              // @include setRandomBgColor;
            }
            .right-left-2{
              @include setWh(100%,80px);
              @include setRandomBgColor;
            }
            .right-left-3{
              @include setWh(100%,350px);
              // @include setRandomBgColor;
            }
            .right-left-4{
              @include setWh(100%,220px);
              // @include setRandomBgColor;
            }
          }
          .right-right{
            flex: 1;
            margin-left: 10px;
            @include setFlexColumn;
            justify-content: space-between;
            box-sizing: border-box;
            // padding-bottom: 20px;
            margin-right: 4px;
            .right-right-1{
              @include setWh(100%,999px);
            }
            .right-right-2{
              flex: 1;
              width: 100%;
              margin-top: 10px;
              // @include setRandomBgColor;
            }
          }
        }
      }
    }
  }
  
}

</style>
<!-- 
1.突破Chrome瀏覽器12像素問題
 利用css transform屬性突破 transform: scale(.5);
 但div也會被縮小
 所以需要ProjectContainer 輔助
 -->