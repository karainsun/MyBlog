<template>
  <teleport to="#message">
    <div class="alert pos-fix"
      :class="classObject" v-if="isVisible">
      <span>{{message}}</span>
      <button type="button" class="btn-close pointer" aria-label="Close" @click.prevent="hide">X</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    useDOMCreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      isVisible,
      hide
    }
  }
})

</script>
<style lang="less" scoped>
.alert{
  width: 300px;
  padding: 8px 15px;
  z-index: 9999;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  .btn-close {
    float: right;
    background: none;
    border: none;
    font-size: 18px;
    color: gray;
  }
}
.alert-success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
}
.alert-danger {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
}
.alert-primary {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
}
</style>
