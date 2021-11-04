import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'field' | 'default'
// 4、函数式组件，将message封装成函数式组件
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // 4.1、生成组件实例，创建节点并挂载到组件上
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    // 延时器关闭卸载并移除节点
    // messageInstance.unmount(mountNode)
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
