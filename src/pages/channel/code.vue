<script setup lang="ts" name="Channel">
const route = useRoute()
onMounted(() => {
  console.log(route.params.code)
})
</script>

<template>
  <div>code: {{ route.params.code }}</div>
</template>

<style lang="scss" scoped></style>
