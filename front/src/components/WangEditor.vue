<template>
  <div :innerHTML="mdContent"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue'
import WangEditor from 'wangeditor'

export default defineComponent({
  props: {
    mdContent: {
      type: String,
      default: ''
    }
  },
  setup({mdContent}) {

    watch(() => mdContent, (txt) => {
      console.log(txt)
    })

    return {
      mdContent
    }
  }
})
</script>

<style scoped></style>
