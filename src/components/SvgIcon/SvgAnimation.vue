<template>
  <div class="">
    <div class="container">
      <svg width="500" height="200" viewBox="0 0 500 200">
        <rect
          x="0"
          y="0"
          width="100"
          height="50"
          fill="red"
          transform="translate(50,10) rotate(30) skewX(30) scale(0.5)"
        />
      </svg>
    </div>
    <!-- 環形進度條 -->
    <div class="container">
      <svg width="440" height="440" viewBox="0 0 440 440">
        <circle
          cx="220"
          cy="220"
          r="200"
          stroke-width="40"
          stroke="#d1d3d7"
          fill="transparent"
        ></circle>
        <!-- 第二個圓要重合 -->
        <!-- 加上 stroke-dasharray="10 20 30"-->
        <!-- 圓周長 2*PI*r=2*3.14159*200=1257 -->
        <!--  -->
        <circle
          class="circle"
          cx="220"
          cy="220"
          r="200"
          stroke-width="40"
          stroke="#00a5e0"
          fill="transparent"
          transform="matrix(0 -1 1 0 0 440)"
        ></circle>
      </svg>
    </div>
    <!-- Logo 描邊 -->
    <div class="container">
      <svg x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
        <path
          class="logo"
          d="M 33.978516 2 A 1.0001 1.0001 0 0 0 33.199219 3.5996094 C 33.199219 3.5996094 36 7.4 36 12 C 36 14.75 35.027566 16.5542 33.490234 18.048828 C 31.952902 19.543457 29.801727 20.667902 27.572266 21.720703 C 25.342804 22.773505 23.045773 23.746432 21.212891 25.121094 C 19.380008 26.495756 18 28.416667 18 31 C 18 32.166667 18.307266 32.971329 18.792969 33.457031 C 19.03582 33.699882 19.307103 33.844555 19.527344 33.917969 C 19.747585 33.991382 20 34 20 34 A 1.0001 1.0001 0 0 0 20.896484 33.441406 C 20.896484 33.441406 22.495731 30 27 30 C 28.71725 30 29.580414 30.640809 30.173828 31.509766 C 30.767242 32.378722 31 33.559245 31 34.392578 C 31 36.8108 28.982035 40 23.382812 40 C 21.082814 40 18.707609 39.300375 16.953125 37.853516 C 15.198641 36.406656 14 34.243714 14 31 C 14 28.263889 15.026718 26.39108 16.666016 24.794922 C 18.305313 23.198764 20.591096 21.947616 22.947266 20.769531 C 25.303436 19.591446 27.722282 18.491805 29.638672 17.029297 C 31.555062 15.566789 33 13.601852 33 11 C 33 9.9166667 32.866382 9.1850848 32.699219 8.6835938 C 32.615637 8.4328481 32.522774 8.2410825 32.435547 8.0957031 C 32.348319 7.9503238 32.207031 7.7929687 32.207031 7.7929688 A 1.0001 1.0001 0 0 0 30.5 8.5 C 30.5 10.268519 29.192822 11.625577 27.703125 12.599609 C 27.234322 12.906135 27.184509 12.84698 26.759766 13.054688 C 27.167602 11.205982 26.938663 9.5269381 26.470703 8.2539062 C 25.804227 6.4408331 24.722656 5.3085938 24.722656 5.3085938 A 1.0001 1.0001 0 0 0 23.060547 5.6582031 C 23.060547 5.6582031 22.08154 8.3388709 20.513672 10.992188 C 19.729738 12.318846 18.797716 13.627422 17.824219 14.558594 C 16.850721 15.489765 15.883333 16 15 16 C 13.920549 16 13.56563 15.724269 13.324219 15.357422 C 13.082807 14.990575 12.975837 14.338203 13.041016 13.585938 C 13.171373 12.081406 13.908203 10.417969 13.908203 10.417969 A 1.0001 1.0001 0 0 0 12.667969 9.0566406 C 12.667969 9.0566406 10.169601 9.946483 7.7675781 12.527344 C 5.3655549 15.108204 3.0019531 19.439178 3.0019531 26.169922 C 3.0019531 31.581344 4.8347384 37.024561 8.5234375 41.140625 C 11.982467 45.00041 17.146447 47.561593 23.728516 47.876953 A 1.0001 1.0001 0 0 0 24.615234 47.962891 C 24.750221 47.964827 24.86383 48 25 48 C 30.44865 48 35.92312 46.10683 40.068359 42.503906 C 44.213599 38.900983 47 33.555334 47 26.84375 C 47 23.695674 46.619735 21.63463 46.212891 20.326172 C 46.009469 19.671943 45.79947 19.207564 45.626953 18.890625 C 45.454437 18.573686 45.271484 18.349609 45.271484 18.349609 A 1.0001 1.0001 0 0 0 43.519531 19.074219 C 43.519531 19.074219 43.563371 19.936913 43.333984 20.722656 C 43.21929 21.115528 43.040661 21.45629 42.830078 21.664062 C 42.619496 21.871836 42.399682 22 41.910156 22 C 41.615486 22 41.498467 21.94181 41.414062 21.878906 C 41.329662 21.816006 41.243459 21.711874 41.162109 21.478516 C 40.99941 21.011798 40.962405 20.087637 41.072266 19.005859 C 41.291987 16.842303 42 14.118083 42 12 C 42 8.1666667 40.029246 5.5902229 38.117188 4.0878906 C 36.205128 2.5855583 34.275391 2.0390625 34.275391 2.0390625 A 1.0001 1.0001 0 0 0 33.978516 2 z M 36.490234 5.4238281 C 36.6322 5.5237874 36.739396 5.5494246 36.882812 5.6621094 C 38.470754 6.9097771 40 8.8333333 40 12 C 40 13.625917 39.32581 16.40229 39.082031 18.802734 C 38.960142 20.002956 38.921075 21.125936 39.273438 22.136719 C 39.449618 22.64211 39.751085 23.133888 40.21875 23.482422 C 40.686415 23.830956 41.286326 24 41.910156 24 C 42.86163 24 43.687911 23.628992 44.236328 23.087891 C 44.441664 22.885294 44.47608 22.638563 44.617188 22.412109 C 44.824064 23.503602 45 24.84889 45 26.84375 C 45 33.008166 42.50262 37.739517 38.755859 40.996094 C 35.110773 44.164298 30.253715 45.872711 25.404297 45.964844 L 25.976562 41.576172 C 30.558358 40.615712 33 37.421751 33 34.392578 C 33 33.225911 32.732758 31.710356 31.826172 30.382812 C 31.031428 29.219043 29.582892 28.389626 27.722656 28.171875 L 27.857422 27.132812 A 1.0001 1.0001 0 1 0 25.875 26.876953 L 25.695312 28.259766 C 22.464685 28.74904 20.902285 30.232032 20.074219 31.371094 C 20.042113 31.215546 20 31.296589 20 31 C 20 29.083333 20.869992 27.879244 22.412109 26.722656 C 23.954227 25.566068 26.157196 24.601495 28.427734 23.529297 C 30.698273 22.457098 33.047098 21.269043 34.884766 19.482422 C 36.722434 17.6958 38 15.25 38 12 C 38 9.4099497 37.256384 7.1307221 36.490234 5.4238281 z M 24.101562 8.0996094 C 24.317525 8.4538544 24.398359 8.4118207 24.59375 8.9433594 C 25.115524 10.362786 25.354956 12.251123 24.121094 14.523438 A 1.0001 1.0001 0 0 0 25.294922 15.955078 C 25.294922 15.955078 27.036572 15.426358 28.796875 14.275391 C 29.408794 13.87529 29.976276 13.263021 30.542969 12.679688 C 30.141451 13.699245 29.508189 14.611915 28.423828 15.439453 C 26.777718 16.695695 24.446564 17.783554 22.052734 18.980469 C 19.658904 20.177384 17.194687 21.488736 15.271484 23.361328 C 13.348282 25.23392 12 27.736111 12 31 C 12 34.756286 13.493171 37.593344 15.679688 39.396484 C 17.866202 41.199625 20.682812 42 23.382812 42 C 23.585749 42 23.719481 41.922012 23.916016 41.914062 L 23.402344 45.847656 C 17.52137 45.470127 13.052216 43.199403 10.011719 39.806641 C 6.6896677 36.099704 5.0019531 31.1285 5.0019531 26.169922 C 5.0019531 19.900665 7.1349451 16.144265 9.2324219 13.890625 C 10.003779 13.061839 10.667623 12.635512 11.318359 12.185547 C 11.223649 12.608046 11.088688 12.954017 11.048828 13.414062 C 10.962378 14.411798 11.030038 15.509425 11.652344 16.455078 C 12.274651 17.400731 13.472951 18 15 18 C 16.616667 18 18.024279 17.135235 19.207031 16.003906 C 20.389784 14.872578 21.395262 13.431154 22.236328 12.007812 C 23.396682 10.044137 23.6883 9.1211016 24.101562 8.0996094 z"
        ></path>
      </svg>
    </div>
    <!--  -->
    <div class="container">
      <svg width="400" height="400">
        <rect x="0" y="0" width="100" height="100" fill="red">
          <!-- set 要寫在預做動畫的元素內 -->
          <set attributeName="x" attributeType="XML" to="10" begin="1s" />
          <set attributeName="x" attributeType="XML" to="20" begin="1.5s" />
          <set attributeName="x" attributeType="XML" to="30" begin="2s" />
          <set attributeName="x" attributeType="XML" to="40" begin="2.5s" />
          <set attributeName="x" attributeType="XML" to="50" begin="3s" />
        </rect>
      </svg>
    </div>
    <!-- 移动的小球 -->
    <div class="container">
      <svg width="500" height="200" viewBox="0 0 500 200">
        <circle
          cx="0"
          cy="0"
          r="30"
          fill="blue"
          stroke="black"
          stroke-width="1"
        >
          <animate
            attributeName="cx"
            from="0"
            to="200"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            from="0"
            to="200"
            dur="5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            from="30"
            to="10"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    <!-- 形状补间动画 -->
    <div class="container">
      <svg width="400" height="400">
        <polygon points="30 30 70 30 90 70 10 70" fill="#fcc" stroke="black">
          <!-- fill=freeze|remove -->
          <animate
            attributeName="points"
            attributeType="XML"
            to="50 30 70 50 50 90 30 50"
            dur="5s"
            fill="freeze"
            repeatCount="1"
          />
        </polygon>
      </svg>
    </div>
    <!-- animateMotion 標籤:按 path 轨迹运动的正方形 -->
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="0" y="0" width="60" height="60" fill="red">
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="3s"
            type="scale"
            from="1"
            to="2"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
    <!-- animateMotion 標籤:按 path 轨迹运动的正方形 -->
    <div class="container">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <rect x="-5" y="-5" width="10" height="10" fill="red">
          <!--  path屬性要和path標籤一樣-->
          <animateMotion
            path="M 10 10 L 110 10 L 110 110 L 10 110 Z"
            dur="3s"
            rotate="auto"
            fill="freeze"
            repeatCount="indefinite"
          />
        </rect>
        <!-- M:開始 Z:結束 -->
        <path
          id="motion-path"
          d="M 10 10 L 110 10 L 110 110 L 10 110 Z"
          fill="none"
          stroke="green"
        />
      </svg>
    </div>
    <!-- animateMotion 標籤:混合动画 -->
    <div class="container">
      <svg viewBox="0 0 200 200" width="200" height="200">
        <rect x="0" y="0" rx="0" ry="0" width="10" height="10" fill="red">
          <!-- 去 -->
          <animateMotion
            id="forward-rect"
            path="M 10 10 L 110 10 L 110 110 L 10 110"
            dur="2s"
            rotate="0"
            fill="freeze"
            begin="0; backward-rect.end + 0.5s"
          />
          <!-- 回 begin="forward-rect.end + 0.5s" : 上個動畫結束時間+0.5s，在開始-->
          <animateMotion
            id="backward-rect"
            path="M 10 110 L 110 110 L 110 10 L 10 10"
            dur="2s"
            rotate="0"
            fill="freeze"
            begin="forward-rect.end + 0.5s"
          />
          <animate
            id="red-to-blue"
            attributeType="XML"
            attributeName="fill"
            begin="0; blue-to-red.end + 1s"
            from="red"
            to="blue"
            dur="2s"
            fill="freeze"
          />
          <animate
            id="blue-to-red"
            attributeType="XML"
            attributeName="fill"
            begin="red-to-blue.end + 1s"
            from="blue"
            to="red"
            dur="2s"
            fill="freeze"
          />
        </rect>
        <path
          d="M 10 10 L 110 10 L 110 110 L 10 110"
          fill="none"
          stroke-width="1"
          stroke="blue"
        />
      </svg>
    </div>
    <!-- animateMotion 標籤:点击变色或位移 -->
    <div class="container">
      <svg viewBox="0 0 200 200" width="200" height="200">
        <g id="rect1">
          <rect x="0" y="0" rx="0" ry="0" width="100" height="100" fill="red">
            <animate
              attributeType="XML"
              attributeName="fill"
              from="red"
              to="green"
              begin="rect1.click"
              dur="2s"
              fill="freeze"
            />
          </rect>
        </g>
        <animateTransform
          attributeType="XML"
          attributeName="transform"
          type="translate"
          from="0, 0"
          to="50, 50"
          begin="rect1.click"
          dur="2s"
          fill="freeze"
        />
        <rect x="0" y="100" width="100" height="100" fill="blue">
          <animate
            attributeType="XML"
            attributeName="fill"
            from="blue"
            to="green"
            begin="rect1.click"
            dur="2s"
            fill="freeze"
          />
        </rect>
      </svg>
    </div>

    <!-- 蒙版 -->
    <div class="container">
      <svg width="400" height="400">
        <defs>
          <!--蒙版顏色會和blue融合  -->
          <mask id="test-mask">
            <rect x="5" y="5" width="390" height="390" fill="#484DD4"></rect>
            <circle r="50" cx="150" cy="150"></circle>
          </mask>
        </defs>
        <rect x="5" y="5" width="390" height="390" fill="red"></rect>
        <rect x="5" y="5" width="390" height="390" fill="blue" mask="url(#test-mask)"></rect>
      </svg>
    </div>  
    <!-- 蒙版發光 -->
    <div class="container bg-grey">
      <svg width="400" height="400">
        <defs>
          <!--蒙版顏色會和blue融合  -->
          <mask id="test-mask">
            <rect x="5" y="5" width="390" height="390" fill="#484DD4"></rect>
            <circle r="50" cx="150" cy="150"></circle>
          </mask>
          <linearGradient id="test-linear-gradient">
            <stop offset="0%" stop-color="red" stop-opacity="1"></stop>
            <stop offset="50%" stop-color="green"></stop>
            <stop offset="100%" stop-color="blue" stop-opacity="0"></stop>
          </linearGradient>
          <!-- 外圈cx cy |內圈fx fy。皆默認50%-->
          <!-- 可以測試
            (cx,cy,fx,fy)
            (50%,50%,50%,50%)
            (30%,30%,50%,50%)
            (70%,70%,25%,75%)
          -->
          <radialGradient id="test-radial-gradient" cx="50%" cy="50%" fx="50%" fy="50%" r="50%">
            <!-- example-1: -->
            <!-- <stop offset="0%" stop-color="red" ></stop>
            <stop offset="100%" stop-color="blue" ></stop> -->

            <!-- example-2: cx="50%" cy="50%" fx="25%" fy="75%" r="50%"-->
            <!-- <stop offset="0%" stop-color="white" ></stop>
            <stop offset="10%" stop-color="yellow" ></stop>
            <stop offset="95%" stop-color="red" stop-opacity="1.5"></stop> -->

            <!-- example-3:素描小球陰影效果 cx="50%" cy="50%" fx="50%" fy="50%" r="50%"-->
            <stop offset="0%" stop-color="white" stop-opacity="1"></stop>
            <stop offset="100%" stop-color="white" stop-opacity="0"></stop>
          </radialGradient>
        </defs>
        <!-- 使用linear -->
        <!-- <rect x="5" y="5" width="390" height="390" fill="url(#test-linear-gradient)"></rect> -->
        <!-- 使用radial -->
        <!-- <rect x="5" y="5" width="390" height="390" fill="url(#test-radial-gradient)"></rect> -->

        <circle cx="200" cy="200" r="150"  fill="url(#test-radial-gradient)"></circle>
      </svg>
    </div>  
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
const logoDomLength = ref(0);
onMounted(() => {
  const logo = document.getElementsByClassName("logo")[0];
  // 獲取dom 總長度
  logoDomLength.value = logo.getTotalLength();
});
</script>
<style lang="scss" scoped>
.container {
  svg {
    border: 1px solid #000;
  }
}
.bg-grey{
  background: #333;
}

.circle {
  stroke-dasharray: 10 2 * 3.14159 * 180;
  animation: circle 5s linear infinite;
}
//補間動畫
@keyframes circle {
  from {
    stroke-dasharray: 0 2 * 3.14159 * 220;
  }
  to {
    stroke-dasharray: 2 * 3.14159 * 220 0;
  }
}

.logo {
  fill: none;
  stroke-width: 1;
  stroke: #333;
  animation: logo 10s linear 1 forwards;
}

@keyframes logo {
  // from {
  //   stroke-dasharray: v-bind(logoDomLength);
  //   stroke-dashoffset: v-bind(logoDomLength);
  // }
  // to {
  //   stroke-dasharray: v-bind(logoDomLength);
  //   stroke-dashoffset: 0;
  // }
  0% {
    fill: white;
    stroke: #333;
    stroke-dasharray: v-bind(logoDomLength);
    stroke-dashoffset: v-bind(logoDomLength);
  }
  50% {
    fill: white;
    stroke: #333;
    stroke-dasharray: v-bind(logoDomLength);
    stroke-dashoffset: 0;
  }
  75% {
    fill: rgb(15, 204, 194);
    stroke: white;
  }
  85% {
    fill: rgb(81, 142, 168);
    stroke: white;
  }
  100% {
    fill: rgb(9, 204, 243);
    stroke: white;
  }
}
</style>
