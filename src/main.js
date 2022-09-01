import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCountTo from 'vue-count-to'; // .component('VueCountTo',VueCountTo) vue2 會出現與vue3不兼容的問題
// 手動引入模塊
import ECharts from 'vue-echarts'
import { use } from "echarts/core";
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])
const app = createApp(App)
app
  .use(store)
  .use(router)
  .component('vue-echarts', ECharts)
  .mount('#app')
