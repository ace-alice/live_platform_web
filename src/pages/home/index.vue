<script setup lang="ts" name="Home">
import normalMessage from '@/messages/normalMessage'
import messageImage from '@/assets/images/avatar.png'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
const onSwiper = (swiper: any) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}
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
      <SvgIcon
        @click="() => $router.push('/about-us')"
        name="logo"
        color="#fff"
        height="40px"
        width="40px"
      />
    </div>
    <div>
      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
