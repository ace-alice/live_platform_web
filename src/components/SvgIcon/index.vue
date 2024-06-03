<script setup lang="ts" name="SvgIcon">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    default: '',
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  height: {
    type: String,
    default: 'auto'
  },
  width: {
    type: String,
    default: 'auto'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg
    aria-hidden="true"
    :style="{ color: color, '--height': height, '--width': width }"
    class="svg-icon"
  >
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  height: var(--height);
  width: var(--width);
}
</style>
