<script lang="ts">
import { i18n } from '@/locale'

export default {
  name: 'IaNoMore',
  props: {
    text: {
      type: String,
      default: () => i18n.global.t('not_more'),
    },
  },
  setup() {
    return {}
  },
}
</script>

<template>
  <div class="no-more">
    <span class="text">{{ text }}</span>
  </div>
</template>
