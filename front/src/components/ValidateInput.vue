<template>
  <div class="input-box">
    <input
      class="form-input w-full box-sizing"
      :class="{'is-invalid': inputRef.error}"
      @blur="validateInput"
      v-model="inputRef.val"
      v-bind="$attrs"
    >
    <div class="invalid-feedback"><span class="fs-14 text-red" v-if="inputRef.error">{{inputRef.message}}</span></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 抽象验证规则
interface RuleProp {
  type: 'required' | 'email' | 'nickname';
  message: string;
  validator?: () => boolean; // 自定义验证规则
}
export type RulesProp = RuleProp[]
// 父子组件双向绑定modelValue
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String // 子组件创建prop属性modelValue
  },
  inheritAttrs: false,
  setup (props, context) {
    // 子组件使用$attrs使父组件支持默认属性
    const inputRef = reactive({
      // 利用computed计算属性来实现对属性的监听，并使用其自身的get和set方法分别获取和改变属性
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'nickname':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

<style lang="less" scoped>
.input-box {
  .form-input {
    border: 1px solid #e3e3e3;
    border-radius: 3px;
    padding: 7px;
    outline-color: var(--main-color);
  }
  .invalid-feedback {
    height: 30px;
    line-height: 30px;
  }
}
</style>
