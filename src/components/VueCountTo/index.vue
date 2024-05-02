<script lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  cancelAnimationFrame,
  requestAnimationFrame,
} from './requestAnimationFrame'

export default {
  name: 'VueCountTo',
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0,
    },
    endVal: {
      type: Number,
      required: false,
      default: 2017,
    },
    duration: {
      type: Number,
      required: false,
      default: 500,
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true,
    },
    decimals: {
      type: Number,
      required: false,
      default: 2,
      validator(value: number) {
        return value >= 0
      },
    },
    decimal: {
      type: String,
      required: false,
      default: '.',
    },
    separator: {
      type: String,
      required: false,
      default: ',',
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    suffix: {
      type: String,
      required: false,
      default: '',
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true,
    },
    easingFn: {
      type: Function,
      default(t: number, b: number, c: number, d: number) {
        return (c * (-(2 ** ((-10 * t) / d)) + 1) * 1024) / 1023 + b
      },
    },
  },
  emits: ['callback', 'mountedCallback'],
  setup(props: any, { emit }: any) {
    function isNumber(val: any) {
      return !isNaN(parseFloat(val))
    }
    function formatNumber(num: any) {
      num = num.toFixed(props.decimals)
      num += ''
      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? props.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, `$1${props.separator}$2`)
        }
      }
      return props.prefix + x1 + x2 + props.suffix
    }

    const displayValue = ref(formatNumber(props.startVal))

    const state: any = {
      localStartVal: props.startVal,
      printVal: null,
      paused: false,
      localDuration: props.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
    }

    function start() {
      state.localStartVal = props.startVal
      state.startTime = null
      state.localDuration = props.duration
      state.paused = false
      state.rAF = requestAnimationFrame(count)
    }

    const countDown = computed(() => {
      return props.startVal > props.endVal
    })

    function count(timestamp: number) {
      if (!state.startTime) {
        state.startTime = timestamp
      }
      state.timestamp = timestamp
      const progress = timestamp - state.startTime
      state.remaining = state.localDuration - progress

      if (props.useEasing) {
        if (countDown.value) {
          state.printVal
            = state.localStartVal
            - props.easingFn(
              progress,
              0,
              state.localStartVal - props.endVal,
              state.localDuration,
            )
        }
        else {
          state.printVal = props.easingFn(
            progress,
            state.localStartVal,
            props.endVal - state.localStartVal,
            state.localDuration,
          )
        }
      }
      else {
        if (countDown.value) {
          state.printVal
            = state.localStartVal
            - (state.localStartVal - props.endVal)
              * (progress / state.localDuration)
        }
        else {
          state.printVal
            = state.localStartVal
            + (props.endVal - state.localStartVal)
              * (progress / state.localDuration)
        }
      }
      if (countDown.value) {
        state.printVal
          = state.printVal < props.endVal ? props.endVal : state.printVal
      }
      else {
        state.printVal
          = state.printVal > props.endVal ? props.endVal : state.printVal
      }

      displayValue.value = formatNumber(state.printVal)
      if (progress < state.localDuration) {
        state.rAF = requestAnimationFrame(count)
      }
      else {
        emit('callback')
      }
    }

    function pause() {
      cancelAnimationFrame(state.rAF)
    }
    function resume() {
      state.startTime = null
      state.localDuration = +state.remaining
      state.localStartVal = +state.printVal
      requestAnimationFrame(count)
    }

    function pauseResume() {
      if (state.paused) {
        resume()
        state.paused = false
      }
      else {
        pause()
        state.paused = true
      }
    }

    function reset() {
      state.startTime = null
      cancelAnimationFrame(state.rAF)
      displayValue.value = formatNumber(state.startVal)
    }

    watch(
      () => props.startVal,
      () => {
        if (props.autoplay) {
          start()
        }
      },
    )

    watch(
      () => props.endVal,
      () => {
        if (props.autoplay) {
          start()
        }
      },
    )

    onMounted(() => {
      if (props.autoplay) {
        start()
      }
      emit('mountedCallback')
    })

    onUnmounted(() => {
      cancelAnimationFrame(state.rAF)
    })

    return { displayValue }
  },
}
</script>

<template>
  <span>
    {{ displayValue }}
  </span>
</template>
