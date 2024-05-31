<script setup lang="ts" name="SvgIcon">
import createLiveVideo from './hook'
import { setPlugins } from './utils'

const props = defineProps({
  url: {
    type: String,
    default: '',
    required: true
  },
  height: {
    type: String,
    default: '760px'
  },
  width: {
    type: String,
    default: '1080px'
  }
})

const liveBoxStyle = {
  width: props.width,
  height: props.height
}

const { initPlayer, playerRef, isInit } = createLiveVideo()

const currentVideoUrl = computed(() => {
  let currentUrl = ''
  if (props.url && props.url.includes('twitch')) {
    const startInx = props.url.indexOf('https')
    const endInx = props.url.indexOf('&parent')
    const host = props.url.substring(startInx, endInx)
    const parent = window.location.host
    let referrer = ''
    if (window.document.referrer) {
      const startInxR = window.document.referrer.indexOf('//')
      const len = window.document.referrer.length
      referrer = window.document.referrer.substring(startInxR + 2, len - 1)
      currentUrl = `<iframe src="${host}&parent=${parent}&parent=${referrer}" allowfullscreen ></iframe>`
    } else {
      currentUrl = `<iframe src="${host}&parent=${parent}" allowfullscreen ></iframe>`
    }
  } else {
    currentUrl = props.url
  }
  return currentUrl
})

const isIframe = computed(() => {
  return currentVideoUrl.value.includes('iframe')
})

watch(
  () => [currentVideoUrl.value, playerRef.value, isInit.value, isIframe.value],
  ([newUrl, ...arg]) => {
    if (newUrl && playerRef.value && isInit.value && !isIframe.value) {
      initPlayer(setPlugins(newUrl as string))
    }
  }
)
</script>

<template>
  <div class="live-box" :style="liveBoxStyle">
    <div class="live-video">
      <div v-if="!isIframe" id="dPlayer" ref="playerRef" />
      <div v-else class="iframe-box" v-html="currentVideoUrl" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.is-min {
  padding: 0 24px !important;
  min-height: 0 !important;
}
.live-box {
  // width: 100%;
  // height: 100%;
  // min-height: 460px;
  flex-shrink: 0;
  transition: all 0.5s ease-in-out;
  border-radius: 12px;
  overflow: hidden;
  .iframe-box {
    width: 100%;
    height: 100%;
  }
  overflow: hidden;
  .live-video {
    position: relative;
    width: 100%;
    height: 100%;
    &:hover .close-icon {
      display: block;
    }
    .close-icon {
      position: absolute;
      border-radius: 50%;
      right: 10px;
      top: 16px;
      z-index: 1000;
      cursor: pointer;
      background-color: #00000050;
      height: 32px;
      width: 32px;
      padding: 4px;
      display: none;
      .lazy-image {
        height: 24px;
        width: 24px;
      }
    }
  }
  .iframe-box iframe {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
  }
}
#dPlayer {
  z-index: 1000;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  .close-icon {
    display: block;
  }
}
</style>
