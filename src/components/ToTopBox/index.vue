<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToTop',
  components: {},
  emits: ['toTop'],
  setup(props: any, { emit }: any) {
    const topImage = new URL('@/assets/icons/home_ live_top.png', import.meta.url).href

    function toTopHandle() {
      emit('toTop')
      const el: any = document.querySelector('.match-list')
      if (!el) {
        return
      }
      setTimeout(() => {
        el.scrollTo({ behavior: 'smooth', top: 0 })
      }, 360)
    }
    return { topImage, toTopHandle }
  },
})
</script>

<template>
  <teleport to=".layout">
    <div class="to-top" @click="toTopHandle">
      <LazyImage :img-url="topImage" :is-lazy="false" />
    </div>
  </teleport>
</template>
