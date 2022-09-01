<template>
  <div class="total-user">
    <div class="title">用戶總數</div>
    <div class="sub-title">User Total Count</div>
    <div class="total">
      <!-- 自己自己算的count-to -->
      <!-- {{todayUser}} -->
      <!-- 用第三方庫 -->
      <vue-count-to :startVal='startVal' :endVal='todayUser' :duration='1000'></vue-count-to>
    </div>
    <div class="percent-text">
        <span class="percent-text-1">
          每日增長率: 
          <vue-count-to :startVal='startPercent' :endVal='growthLastDay' :duration='1000' :decimals="2" suffix="%"></vue-count-to>
          <!-- {{growthLastDay}} -->
        </span>
      <span class="percent-text-2">
        每月增長率:
        <vue-count-to :startVal='startPercent2' :endVal='growthLastMonth' :duration='1000' :decimals="2" suffix="%"></vue-count-to>
        <!-- {{growthLastMonth}} -->
      </span>
    </div>
    <div class="percent">
      <div class="percent-inner-wrapper">
        <div class="percent-inner" :style="{ width: `${growthLastDay }%` }"></div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
import VueCountTo from '@/components/VueCountTo/vue-countTo'; // 使用自己改過的
const props = defineProps({
  todayUser: {
    type: Number,
    default: 0
  },
  growthLastDay: {
    type: Number,
    default: 0
  },
  growthLastMonth: {
    type: Number,
    default: 0
  }
})

const startVal = ref(0)
const startPercent = ref(0.00)
const startPercent2 = ref(0.00)
watch(() => props.todayUser, (nextValue, prevValue) => {
  startVal.value = prevValue
})
watch(() => props.growthLastDay, (nextValue, prevValue) => {
  startPercent.value = prevValue
})
watch(() => props.growthLastMonth, (nextValue, prevValue) => {
  startPercent2.value = prevValue
})

</script>

<style lang="scss" scoped>
  .total-user {
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    box-shadow: 0 10px 10px rgba(0, 0, 0, .3);
    padding: 20px 40px;
    box-sizing: border-box;

    .title {
      font-size: 32px;
    }

    .sub-title {
      font-size: 16px;
      letter-spacing: 1px;
      margin-top: 10px;
    }

    .total {
      font-family: DIN;
      font-size: 68px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 10px 0;
    }

    .percent-text {
      font-size: 28px;
      font-family: DIN;
      letter-spacing: 2px;

      .percent-text-1 {
        color: rgb(197, 251, 121);
      }

      .percent-text-2 {
        color: rgb(99, 169, 0);
        margin-left: 10px;
      }
    }
    .percent{
      width: 100%;
      height: 20px;
      box-sizing: border-box;
      border: 1px solid #fff;     
      margin-top:10px;
      .percent-inner-wrapper{
        height: 100%;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid #fff; 
        overflow: hidden;
        .percent-inner{
          width: 10%;
          height: 100%;
          background: rgb(150, 150, 150);
          transition: width 1s linear;
        }
      }
    }
  }
</style>