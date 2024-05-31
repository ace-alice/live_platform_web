<template>
  <Icon :icon="name" />
</template>
<script setup name="Iconify" lang="ts">
import { Icon, addCollection } from '@iconify/vue'
import ep from '@iconify-json/ep/icons.json'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  addCollection(ep)
})
</script>

<style scoped></style>
