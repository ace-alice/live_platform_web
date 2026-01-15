<script setup lang="ts" name="Channel">
import ChannelHeader from './components/channel-header.vue'
</script>

<template>
  <div class="channel-page">
    <ChannelHeader />
    <div class="channel-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.channel-page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.channel-content {
  flex-grow: 1;
  overflow: hidden;
}
</style>
