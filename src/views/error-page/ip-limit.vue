<script lang="ts">
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ErrPage',
  components: {},
  setup() {
    const i18n = useI18n()
    const route = useRoute()
    const error403 = ref(i18n.t('error_info_1'))
    const errorText: Ref<any> = ref('')

    const textLogo = new URL('@/assets/images/que_xianzhi.png', import.meta.url).href

    const ipc = ref('...')

    const cityname = ref('...')

    const script = document.createElement('script')

    script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'

    document.getElementsByTagName('head')[0].appendChild(script)

    setTimeout(() => {
      const script2 = document.createElement('script')
      const data2 = 'const Ip = returnCitySN.cip;const cityname = returnCitySN.cname;localStorage.setItem(\'Ip\', Ip);localStorage.setItem(\'cityname\', cityname)'

      script2.innerHTML = data2

      document.getElementsByTagName('head')[0].appendChild(script2)

      ipc.value = localStorage.getItem('Ip') || '...'
      cityname.value = localStorage.getItem('cityname') || '...'
    }, 2000)

    onMounted(() => {
      errorText.value = route.query.message
    })
    return {
      error403,
      textLogo,
      errorText,
      ipc,
      cityname,
    }
  },
})
</script>

<template>
  <div class="err_page">
    <LazyImage :img-url="textLogo" />
    <div class="text text1">
      {{ errorText || error403 }}
    </div>
    <div class="text text2">
      IP: {{ ipc }}（{{ cityname }}）
    </div>
  </div>
</template>

<style lang="scss" scoped>
.err_page {
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
