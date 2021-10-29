<template>
  <teleport to="#back">
    <div class="loading w-full h-full pos-fix">
      <div class="loading-box d-flex pos-fix fs-18">
        <div class="act">L</div>
        <div class="act">o</div>
        <div class="act">a</div>
        <div class="act">d</div>
        <div class="act">i</div>
        <div class="act">n</div>
        <div class="act">g</div>
        <div class="act">.</div>
        <div class="act">.</div>
        <div class="act">.</div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  setup(){
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style lang="less" scoped>
.loading {
  top: 0;
  left: 0;
  background-color: var(--mask-bg);
  z-index: 999999;
  .loading-box {
    width: 60px;
    height: 30px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--main-color);
    .act {
      animation: bounce 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
      display: inline-block;
      transform: translate3d(0, 0, 0);
      margin-top: 0.5em;
      text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
    }
    .act:nth-child(1) {
      animation-delay: 0s;
    }
    .act:nth-child(2) {
      animation-delay: 0.0833333333s;
    }
    .act:nth-child(3) {
      animation-delay: 0.1666666667s;
    }
    .act:nth-child(4) {
      animation-delay: 0.25s;
    }
    .act:nth-child(5) {
      animation-delay: 0.3333333333s;
    }
    .act:nth-child(6) {
      animation-delay: 0.4166666667s;
    }
    .act:nth-child(7) {
      animation-delay: 0.5s;
    }
    .act:nth-child(8) {
      animation-delay: 0.58s;
    }
    .act:nth-child(9) {
      animation-delay: 0.64s;
    }
    .act:nth-child(10) {
      animation-delay: 0.72s;
    }
  }
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -1em, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
  }
}
</style>
