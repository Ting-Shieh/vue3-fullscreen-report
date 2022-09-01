# vue3-fullscreen-report
## 
主要學習建構大屏幕數據展示，之後可以傳接api 做智慧家電或是智慧工廠數據展示用。

## 架構
* mock 存放靜態 mock data
* hooks 存放動態mock data，與二次重組mock data
* utils 
	* send.js 防止重發
	* validate.js 之後引入專案設計的svg icon 用
src>views>Home.vue (PS 有遷入3d模型，不要忘記!!)

## API 包規劃
之後上公開資訊網找台灣相關data，封裝成api
Flask 或 FastAPI 則一框架使用

## 需安裝紀錄
* [uuid庫](https://www.npmjs.com/package/uuid): `npm i uuid -S` (或是可以自己寫Js)
* [npm i -S vue-count-to](https://www.npmjs.com/package/vue-count-to)
  * 從node_modules copy 放入components 稍作修改，以符合Vue3使用。
* [vue2/vue3中样式scss的mixin用法](https://blog.csdn.net/weixin_44727080/article/details/122866672)
* 安裝vue-echarts [npm i -S vue-echarts](https://github.com/ecomfe/vue-echarts/blob/HEAD/README.zh-Hans.md)
  * 還需要安裝 npm install --save echarts/core
  * npm install echarts vue-echarts
  * [vue3中使用vue-charts和v-charts](https://www.jianshu.com/p/c4cd8667029f)
* * [Lodash庫](https://lodash.com/):
* 使用echarts 地球組件庫，需要再額外安裝[npm i -S echarts-gl]



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
