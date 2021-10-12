<template>
  <div class="login pos-fix shadow-all p-20 box-sizing">
    <validate-form @form-submit="onFormSubmit">
      <div>
        <validate-input
          :rules="nicknameRules"
          v-model="nicknameVal"
          type="text"
          placeholder="起个昵称吧"
        ></validate-input>
      </div>
      <div>
        <!--子组件使用$attrs使父组件支持默认属性-->
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="QQ邮箱留下吧（仅获取头像）"
        ></validate-input>
      </div>
      <div>
        <validate-input
          v-model="blogVal"
          type="text"
          placeholder="博客/github地址(开头http://或https://)"
        ></validate-input>
      </div>
      <template #submit>
        <div class="sub-btn w-full text-c fs-16 pointer">登录</div>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, TouristProps } from '@/store'
import createMessage from '@/components/createMessage'
import { emitter } from '@/views/detail/index.vue'
import { touristMitt } from './Comment.vue'
import { messageMitt } from '@/views/message/index.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  setup(){
    const store = useStore<GlobalDataProps>()
    const emailVal = ref('')
    const nicknameVal = ref('')
    const blogVal = ref('')
    const route = useRoute()

    const emailRules: RulesProp = [
      { type: 'required', message: '邮箱地址不可为空！' },
      { type: 'email', message: '邮箱格式不正确！' }
    ]
    const nicknameRules: RulesProp = [
      { type: 'required', message: '请输入昵称！' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          qq_email: emailVal.value,
          nickname: nicknameVal.value,
          blog: blogVal.value
        }

        store.dispatch('getTourist', payload).then((data: TouristProps) => {
          if(route.path.split('/')[1] === 'detail') {
            emitter.emit('login-finish')
            touristMitt.emit('set-tourist', data)
          } else if (route.path.split('/')[1] === 'message'){
            messageMitt.emit('login-finish', data)
          }
          createMessage('登录成功', 'success')
        }).catch(error => console.log(error))
      }
    }

    return {
      emailVal,
      nicknameVal,
      blogVal,
      emailRules,
      nicknameRules,
      onFormSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 300px;
  height: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  z-index: 9999;
  background-color: var(--message-box-bg);
  .sub-btn {
    height: 32px;
    line-height: 32px;
    border: 1px solid var(--main-color);
    border-radius: 3px;
    color: var(--main-color);
    &:hover {
      color: #fff;
      background-color: var(--main-color);
    }
  }
}
</style>
