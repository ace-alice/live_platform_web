<script lang="ts" setup name="GlobalLoading">
import { ref } from 'vue'
import IaloadingIcon from '@/assets/icons/ialoading.png'

const sourceLoad = ref(true)

function done() {
  setTimeout(() => {
    sourceLoad.value = false
  }, 1200)
}

onMounted(() => {
  done()
})
</script>

<template>
  <Teleport to="body">
    <div v-show="sourceLoad" class="index_load_page">
      <!-- <canvas id="svga-g-loading" class="dong_01" /> -->
      <div class="loading-box">
        <div class="loading-bg" />
        <img class="loading-icon" :src="IaloadingIcon" alt="">
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.index_load_page {
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #181c22;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-box {
    height: 124px;
    width: 124px;
    position: relative;
  }
  .loading-bg {
    height: 124px;
    width: 124px;
    border-radius: 50%;
    border: 10px solid rgba(255, 255, 255, 0.8);
    position: absolute;
    animation: bgShow 1s ease-in-out;
  }
  .loading-icon {
    height: 107px;
    width: 107px;
    position: absolute;
    top: 8px;
    left: 7px;
    animation: iconShow 1s ease-in-out;
  }
}

@keyframes bgShow {
 0%{
  opacity: 0;
 }
 60%{
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
}

@keyframes iconShow {
 0%{
  opacity: 0.2;
  transform: scale(0) rotateZ(180deg);
 }
 60%{
  opacity: 1;
  transform: scale(1) rotateZ(0);
 }
 80%{
  opacity: 0.6;
  transform: scale(0.8) rotateZ(0);
 }
 100%{
  opacity: 1;
  transform: scale(1) rotateZ(0);
 }
}
</style>
