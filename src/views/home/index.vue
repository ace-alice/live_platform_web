<script setup lang="ts" name="Home">
import normalMessage from '@/messages/normalMessage'
import messageImage from '@/assets/images/avatar.png'
</script>

<template>
  <div style="height: 2000px">
    <div>
      <Iconify
        name="ep:add-location"
        @click="normalMessage({ id: 'test-message', message: '这是一个测试弹窗', messageImage })"
        :style="{ color: 'red', height: '40px', width: '40px' }"
      />
    </div>
    <div>
      <VueCountTo :start-val="0" :end-val="105090.97" />
    </div>
    <div>
      <SvgIcon name="community" color="#fff" height="40px" width="40px" />
    </div>
    <LiveBox url="http://127.0.0.1/live/livestream.m3u8" />
  </div>
</template>

<style lang="scss" scoped></style>
