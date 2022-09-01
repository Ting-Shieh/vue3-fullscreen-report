<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        background: actualConfig.headerBgColor,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: `${ actualConfig.headerTextColor }`
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, idx) in headerData"
        :key="headerItem + idx"
        :style="{
          width: `${columnWidths[idx]}px`,
          ...headerStyle[idx],
        }"
        :align="aligns[idx]"
        v-html="headerItem"
      ></div>
    </div>
    <div class="base-scroll-list-rows-wrapper" :style="{height:`${height - actualConfig.headerHeight}px`}">
      <div
        class="base-scroll-list-rows"
        v-for="(rowData, index) in currentRowsData"
        :key="rowData.rIdx"
        :style="{
            height: `${rowHeights[index]}px`,
            lineHeight: `${rowHeights[index]}px`,
            backgroundColor: rowData.rIdx % 2 === 0 ? rowBgColor[1] : rowBgColor[0],
            fontSize: `${actualConfig.rowsFontSize}px`,
            color: `${ actualConfig.rowsTextColor }`
          }"
      >
        <div 
          class="base-scroll-list-column base-scroll-list-text" 
          v-for="(colData, cIdx) in rowData.data"
          :key="colData+cIdx"
          :style="{
            width: `${columnWidths[cIdx]}px`,
            ...rowsStyle[cIdx],
          }"
          :align="aligns[cIdx]"
          v-html="colData"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, watch, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import useScreen from "@/hooks/useScreen.js";
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";
const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
});
const uuid = uuidv4();
const id = `base-scroll-list_${uuid}`;
const { width, height } = useScreen(id);
const defaultConfig = {
  // 標題數據
  headerData: [],
  // 標題數據樣式 [{},{},{}...]
  headerStyle: [],
  // 標題背景色
  headerBgColor: "rgb(90,90,90)",
  // 標題高
  headerHeight: 35,
  // 標題是否展示序號
  headerIndex: false,
  // 序號列標題內容
  headerIndexContent: "#",
  // 序號列數據內容
  headerIndexData: [],
  // 序號列標題樣式
  headerIndexStyle: {
    width: "50px"
  },
  // 標題文字大小
  headerFontSize: 28,
  // 標題文字顏色
  headerTextColor: "#fff",
  // 二維數據項
  data: [],
  // 每次顯示幾行數據
  rowNum: 10,
  // 行樣式
  rowsStyle: [],
  // 行序號列內容樣式
  rowIndexStyle: {
    width: "50px"
  },
  // 奇偶數行背景色
  rowBgColor: [],
  // 文字居中方式
  aligns: [],
  // 行數據文字大小
  rowsFontSize: 28,
  // 行數據文字顏色
  rowsTextColor: "#000",
  // 沒次移動多少行
  scrollNum: 1,
  // 動畫延遲時間
  duration: 2000
};

// =*=*=*=*=*=*=*=*=*=*=*=
//   共用
// =*=*=*=*=*=*=*=*=*=*=*=
const actualConfig = ref({});
const aligns = ref([]);

// =*=*=*=*=*=*=*=*=*=*=*=
//   header 列數據相關
// =*=*=*=*=*=*=*=*=*=*=*=
const headerData = ref([]);
const headerStyle = ref([]);
const columnWidths = ref([]);

/** 處理標題列 */
const handleHeader = (config) => {
  // console.log("config:", config)
  // 深拷貝
  const _headerData = cloneDeep(config.headerData);
  const _headerStyle = cloneDeep(config.headerStyle);
  const _rowsData = cloneDeep(config.data);
  const _rowsStyle = cloneDeep(config.rowsStyle);
  const _aligns = cloneDeep(config.aligns);
  if (_headerData.length === 0) {
    return;
  }

  // 標題是否展示序號
  if (config.headerIndex) {
    _headerData.unshift(config.headerIndexContent);
    _headerStyle.unshift(config.headerIndexStyle);
    _rowsStyle.unshift(config.rowIndexStyle);
    _rowsData.forEach((row, rIdx) => {
      // 處理序號列數據
      if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[rIdx]) {
        row.unshift(config.headerIndexData[rIdx]);
      } else {
        row.unshift(rIdx + 1);
      }
      
    })
    // 文字居中方式=>序號默認居中
    _aligns.unshift('center'); 
  }

  // ===== 動態計算header中每一列的寬度 ======
  // 使用過的 width
  let usedWidth = 0;
  // 多少個column做設定
  let usedColumnCount = 0;
  // 動態計算列寬時，使用剩餘的寬度/剩餘的列數
  const avgWidth =
    (width.value - usedWidth) / (_headerData.length - usedColumnCount);
  columnWidths.value = new Array(_headerData.length).fill(avgWidth);
  // 遍歷所有header column style 中的 width, 如果有設定
  _headerStyle.forEach((style,idx) => {
    if (style.width) {
      usedWidth += +style.width.replace("px", "");
      usedColumnCount += 1;
      columnWidths.value[idx] = +style.width.replace("px", "");
    }
  });
  // ????
  // const _columnWidths = new Array(_headerData.length).fill(avgWidth)
  // columnWidths.value = _columnWidths
  // columnWidths.value.fill(avgWidth)
  
  headerData.value = _headerData;
  headerStyle.value = _headerStyle;

  const { rowNum } = config 
  if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
    // 加入兩倍數據
    const newRowsData = [..._rowsData, ..._rowsData]
    rowsData.value = newRowsData.map((item, index) => ({
      data: item,
      rIdx: index
    }))
  } else {
    rowsData.value = _rowsData.map((item, index) => ({
      data: item,
      rIdx: index
    }))
  }
  
  rowsStyle.value = _rowsStyle
  aligns.value = _aligns
};

// =*=*=*=*=*=*=*=*=*=*=*=
//   行數據相關
// =*=*=*=*=*=*=*=*=*=*=*=
const rowsData = ref([]);
const rowHeights = ref([]);
const rowsStyle = ref([]);
const rowNum = ref(defaultConfig.rowNum)
const rowBgColor = ref([])
let avgHeight // 行高
/** 處理標題列 */
const handleRows = (config) => {
  console.log(config)
  // ===== 動態計算每行數據的高度 =====
  // header的高度
  const { headerHeight } = defaultConfig
  rowNum.value = config.rowNum
  const unusedHeight = height.value - headerHeight
  // console.log("unusedHeight: ", unusedHeight)
  // 如果 rowNum > data.length，以實際數據長度為主
  // 動態計算行高度，使用剩餘的高度/剩餘的行數
  if (rowNum.value > rowsData.value.length) {
    rowNum.value = rowsData.value.length
  } 
  avgHeight = unusedHeight / rowNum.value
  // 每行高度放入array
  rowHeights.value = new Array(rowNum.value).fill(avgHeight);

  // 獲取行背景色
  if (config.rowBgColor) {
    rowBgColor.value = config.rowBgColor
  }

};

// =*=*=*=*=*=*=*=*=*=*=*=
//   滾動動畫
// =*=*=*=*=*=*=*=*=*=*=*=
// 目前需要展示的
const currentRowsData = ref([]);
// 動畫指針
const currentIndex = ref(0)
const waitHeightDur = 300
const isAnimationStart = ref(true)
const stopAnimation = () => {
  isAnimationStart.value = false
}
const startAnimation = async () => {

  if (!isAnimationStart.value) return false
  // const config = actualConfig.value
  const { rowNum, scrollNum, duration } = actualConfig.value 
  const totalLength = rowsData.value.length
  if (totalLength < rowNum) return false
  const index = currentIndex.value
  const _rowsData = cloneDeep(rowsData.value)

  // 重新頭尾連接
  // [a,b,c,d,e,f,g]
  //    1
  // [b,c,d,e,f,g,a] 
  const temprows = _rowsData.slice(index)
  // console.log("temprows: ",temprows)
  temprows.push(..._rowsData.slice(0, index))
  // console.log("after push: ",temprows)
  currentRowsData.value = temprows

  // 先將所有行高度還原
  rowHeights.value = new Array(totalLength).fill(avgHeight);

  // 類似 sleep 
  if (!isAnimationStart.value) return false
  await new Promise(resolve => setTimeout(resolve, waitHeightDur))

  // 將scrollNum的行高度設為0
  rowHeights.value.splice(0, scrollNum, ...new Array(scrollNum).fill(0))
  //
  currentIndex.value += scrollNum
 
  // 是否到達最後一組數據
  const isLast = currentIndex.value - totalLength
  if (isLast >= 0) {
    currentIndex.value = isLast
  }

  // 類似 sleep 
  if (!isAnimationStart.value) return false
  await new Promise(resolve => setTimeout(resolve, duration - waitHeightDur))
  if (!isAnimationStart.value) return false
  startAnimation()
}

const update = () => {
  // 先停止上一個動畫
  stopAnimation()

  // 用props.config 覆蓋預設值(defaultConfig)
  const _actualConfig = assign(defaultConfig, props.config);

  // 賦值rowsData
  rowsData.value = _actualConfig.data || [];
  handleHeader(_actualConfig);
  handleRows(_actualConfig);
  actualConfig.value = _actualConfig;

  // 展示動畫
  isAnimationStart.value = true
  startAnimation()
}

watch(() => props.config, () => {
  update()
});
</script>
<style lang="scss" scoped>
.base-scroll-list {
  @include setWh(100%, 100%); // 100%, 100% 寬高交由父容器設定
  .base-scroll-list-text {
    white-space: nowrap; // 不換行
    overflow: hidden;
    text-overflow: ellipsis; // ....表示
    // padding: 0 10px;
    box-sizing: border-box;
  }
  .base-scroll-list-header {
    @include setFlexRow;
    align-items: center; //垂直居中
    .header-item {
    }
  }
  .base-scroll-list-rows-wrapper{
    overflow: hidden;
    .base-scroll-list-rows {
      @include setFlexRow;
      align-items: center; //垂直居中
      box-sizing: border-box;
      border-bottom: 1px solid#eee;
      // justify-content: center; //水平居中
      transition: all 0.3s linear;
      .base-scroll-list-column{
        height: 100%;
      }
    }
  }
}
</style>

<!-- 
  1. 動態計算寬: 
  先
  確定寬高
 -->
