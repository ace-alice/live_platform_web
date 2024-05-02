<script lang="ts">
import errImg from '@/assets/images/logo-error.png'
export default {
  name: 'IaLazyImg',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    errImg: {
      type: String,
      default: () => errImg,
    },
    isLazy: {
      type: Boolean,
      default: true,
    },
    fitType: { type: String, default: 'contain' },
  },

  setup() {
    return {}
  },
}
</script>

<template>
  <div class="lazy-image">
    <el-image :src="imgUrl" fit="contain" :lazy="isLazy">
      <template #error>
        <img :src="errImg" alt="">
      </template>
      <template #placeholder>
        <div />
      </template>
    </el-image>
  </div>
</template>
