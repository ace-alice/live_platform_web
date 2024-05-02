<script lang="ts">
import { defineComponent, getCurrentInstance, nextTick, onMounted } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'
import copyMessage from '@/utils/copyMessage'

export default defineComponent({
  name: 'ClipboardBox',
  props: ['content', 'parentNodeId', 'creacteId'],
  setup(props) {
    const { proxy }: any = getCurrentInstance()
    function copyHandle() {
      const clipboard = new Clipboard(proxy.$refs.copy, {
        text: () => {
          return props.content
        },
      })

      clipboard.on('success', () => {
        if (props.creacteId && props.creacteId) {
          copyMessage(props.parentNodeId, props.creacteId, '复制成功')
        }
        else {
          ElMessage('复制成功')
        }
      })
      clipboard.on('error', () => {
        if (props.creacteId && props.creacteId) {
          copyMessage(props.parentNodeId, props.creacteId, '复制失败')
        }
        else {
          ElMessage('复制失败')
        }
      })
    }
    onMounted(() => {
      nextTick(() => {
        copyHandle()
      })
    })
    return { copyHandle }
  },
})
</script>

<template>
  <span
    ref="copy"
    type="text"
    class="clipboard"
    data-clipboard-action="copy"
    :data-clipboard-text="content"
    @click.stop="copyHandle"
  >
    <slot name="label" />
  </span>
</template>

<style lang="scss" scoped>
.clipboard {
  cursor: url("@/assets/icons/home_mouse.png"), auto;
  &:hover {
    color: #fe5e00;
  }
}
</style>
