<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import dong_01 from '@/assets/images/dong_01.png'
import loadbg_01 from '@/assets/images/loadbg_01.png'
import iaText from '@/assets/images/font_01.png'

export default defineComponent({
  name: 'GlobalLoading',
  props: {
    period: {
      type: Number,
      default: 5,
    },
  },

  setup(props) {
    const percent = ref(0)
    const sourceLoad = ref(false)
    let timer: any = null

    function loading() {
      sourceLoad.value = true
      nextTick(() => {
        let speed = 10
        timer = setInterval(() => {
          percent.value += speed

          speed < 1 ? (speed = 1) : (speed = Math.floor(speed / 1.1))
          if (percent.value > 99) {
            percent.value = 99
          }
        }, 20)

        setTimeout(() => {
          if (timer) {
            percent.value = 100
            sourceLoad.value = false
            clearInterval(timer)
            timer = null
          }
        }, props.period * 1000)
      })
    }

    function done() {
      setTimeout(() => {
        if (timer) {
          percent.value = 100
          sourceLoad.value = false
          clearInterval(timer)
          timer = null
        }
      }, 30)
    }

    function end() {
      done()
    }

    return {
      percent,
      sourceLoad,
      loading,
      done,
      end,
      dong_01,
      loadbg_01,
      iaText,
    }
  },
})
</script>

<template>
  <Teleport to="body">
    <div
      v-show="sourceLoad"
      class="index_load_page"
      :style="{
        '--width': percent,
      }"
    >
      <div class="loadbg-box">
        <LazyImage class="loadbg_01" :img-url="loadbg_01" />
        <div class="loadbg_02">
          <LazyImage class="dong_01" :img-url="dong_01" />
          <LazyImage class="ia-text" :img-url="iaText" />
        </div>
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
  .dong_01 {
    height: 76px;
    width: 73px;
    position: absolute;
    right: 0;
    top: -62px;
  }
  .ia-text {
    height: 14px;
    width: 89px;
    margin-top: 16px;
    position: absolute;
    right: -16px;
    top: 16px;
  }
  .loadbg-box {
    position: relative;
  }
  .loadbg_01 {
    height: 16px;
    width: 702px;
  }
  .loadbg_02 {
    height: 12px;
    width: calc(var(--width) * 1%);
    border-radius: 8px;
    top: 2px;
    left: -1px;
    background-image: url("@/assets/images/loadbg_02.png");
    background-size: 702px 16px;
    position: absolute;
    box-shadow: 0px 3px #00000050;
  }
}
</style>
