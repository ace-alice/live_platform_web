<script setup lang="ts" name="PlacardAlert">
import dayjs from 'dayjs'
import placardImage from '@/assets/images/placard.png'
import closeImage from '@/assets/icons/closed.png'
import { setLocal } from '@/utils/storage'
const show = ref(true)
const isTodayNot = ref(false)

function isTodayNotChange() {
  isTodayNot.value = !isTodayNot.value
}

function closePlacard() {
  show.value = false
  if (isTodayNot.value) {
    setLocal('closePlacardTime', dayjs().startOf('date').valueOf())
  }
}
</script>

<template>
  <teleport to="body">
    <div class="placard-alert" :class="{ 'close-placard': !show }">
      <div class="placard-alert-box">
        <LazyImage :img-url="placardImage" class="placard-image" :is-lazy="false" />
        <LazyImage
          :img-url="closeImage"
          class="close-image"
          :is-lazy="false"
          @click="closePlacard"
        />
        <div class="is-today-not">
          <div
            class="check-box"
            :class="{ checked: isTodayNot }"
            @click="isTodayNotChange"
          />
          <div>{{ $t('no_more_popups_today') }}</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.close-placard {
  height: 0 !important;
  width: 0 !important;
  overflow: hidden;
}
.placard-alert {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #ffffff;
  .placard-alert-box {
    position: relative;
    height: 614px;
    width: 951px;
    flex-shrink: 0;
    .is-today-not {
      position: absolute;
      bottom: 60px;
      right: 0;
      display: flex;
      align-items: center;
      .check-box {
        background: #262d34;
        border: 1px solid rgba(255, 255, 255, 0.19);
        border-radius: 8px;
        height: 30px;
        width: 30px;
        flex-shrink: 0;
        margin-right: 20px;
        cursor: pointer;
      }
      .checked {
        background-image: url("@/assets/icons/choose.png");
        background-size: 24px 24px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .placard-image {
      height: 100%;
      width: 100%;
    }
    .close-image {
      position: absolute;
      height: 48px;
      width: 48px;
      top: 60px;
      right: 14px;
      cursor: pointer;
    }
  }
}
</style>
