<template>
  <div class="change-tab-nav">
    <div
      class="one-tab"
      v-for="(item,index) in data" :key="index"
      @click="onClick(index)"
      @mouseenter="onMouseEnter(index)"
      @mouseleave="onMouseLeave(index)"
      @mousemove="onMouseEnter(index)"
    >
      <div :class="{ 'selected': index===selected,'hovered': index===hover }" >{{item}}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted, onUnmounted,computed } from 'vue'
const props = defineProps({
  data: Array,
  color: {
    type: Array,
    default () {
      return ['rgb(140, 160, 173)', 'rgb(80, 80, 80)'] // 高亮色, Hover 色
    }
  }
})
let task
const selectedColor = props.color[0]
const hoverColor = props.color[1]
const selected = ref(0)
const hover = ref(-1)
const isEnd = computed(() => selected.value + 1 > props.data.length - 1)

const onClick = (index) => {
  selected.value = index
}

/** 滑鼠移入 */
const onMouseEnter = (index) => {
  hover.value = index
}
/** 滑鼠移出 */
const onMouseLeave = (index) => {
  hover.value = -1
}

const update = () => {
  task && clearInterval(task)
  task = setInterval(() => {
    isEnd.value ? selected.value = 0 :  selected.value += 1
  }, 2000)
}
onMounted(() => {
  update()
})

onUnmounted(() => {
  task && clearInterval(task)
})
</script>
<style lang="scss" scoped>
  .change-tab-nav {
    display: flex;
    width: 100%;
    height: 100%;

    .one-tab {
      flex: 1;
      background: rgb(53, 57, 65);
      font-size: 28px; // 24px;
      color: rgb(144, 160, 174);

      .hovered {
        background: v-bind(hoverColor);// rgb(80, 80, 80);
        color: #fff;
      }

      .selected {
        background: v-bind(selectedColor); //rgb(140, 160, 173);
        color: #fff;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>