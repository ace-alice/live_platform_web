<script setup lang="ts" name="=NotNet">
import { useI18n } from 'vue-i18n'
import notNetImage from '@/assets/images/not-net.png'
const i18n = useI18n()
const errorText = i18n.t('network_error')
const homeText = i18n.t('click_to_home')

const router = useRouter()

function toHome() {
  router.push({ name: 'MatchList' })
}
</script>

<template>
  <div class="not-net">
    <LazyImage :img-url="notNetImage" />
    <div class="text text1">
      {{ errorText }}
    </div>
    <div class="text text2" @click="toHome">
      {{ homeText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-net {
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
    cursor: pointer;
  }
}
</style>
