<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NotFind404',
  components: {},
  setup() {
    const i18n = useI18n()

    const route = useRoute()

    const notImage = new URL('@/assets/images/que_404.png', import.meta.url).href

    const errorText: Ref<any> = ref('')

    const error404 = ref(i18n.t('error_info_2'))

    onMounted(() => {
      errorText.value = route.query.message
    })

    return { errorText, notImage, error404 }
  },
})
</script>

<template>
  <div class="not-find-404">
    <LazyImage :img-url="notImage" />
    <div class="text text1">
      {{ errorText || error404 }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-find-404 {
  width: 100%;
  height: 100%;
  background-color: #161b21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .lazy-image {
    height: 348px;
    width: 362px;
  }
  .text {
    font-size: 16px;
    line-height: 32px;
  }
  .text1 {
    color: #ffffff;
  }
  .text2 {
    color: #fe5e00;
  }
}
</style>
