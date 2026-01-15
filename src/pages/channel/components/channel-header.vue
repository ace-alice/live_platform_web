<script setup lang="ts" name="ChannelHeader">
import logoIcon from '@/assets/images/common/logo.png'
</script>

<template>
  <div class="channel-header">
    <el-image style="width: 32px; height: 32px" :src="logoIcon" />
  </div>
</template>

<style lang="scss" scoped>
.channel-header {
  height: 76px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid var(--border-color);
}
</style>
