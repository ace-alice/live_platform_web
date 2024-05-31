<script setup lang="ts" name="LiveName">
const route = useRoute()
</script>

<template>
  <div style="height: 2000px">
    <div>Live {{ route.params.name }}</div>
    <RouterView></RouterView>
    <ElButton>Default</ElButton>
  </div>
</template>

<style lang="scss" scoped></style>
