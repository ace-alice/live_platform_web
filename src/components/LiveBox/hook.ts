import Player, { type IPlayerOptions, Events } from 'xgplayer'
import { defaultPlayerOptions } from './utils'
import type { ComponentInternalInstance } from 'vue'

export default function createLiveVideo() {
  const player: Ref<Player | undefined> = ref()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  if (player.value) {
    player.value.destroy()
  }

  const playerRef = ref<HTMLDivElement>()

  const playerOptions: IPlayerOptions = {
    el: playerRef.value,
    url: ''
  }

  function initPlayer(options: IPlayerOptions) {
    player.value = new Player(Object.assign({}, defaultPlayerOptions, playerOptions, options))
    player.value.once('ready', () => {
      console.log('ready')
      player.value?.plugins.danmu?.updateComments(
        {
          duration: 10000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
          id: 1,
          txt: '这是一条弹幕'
        },
        false
      )
    })
    player.value.on(Events.MINI_STATE_CHANGE, (isMini) => {
      console.log(`miniScreen status: ${isMini}`)
    })
    player.value.on(Events.LOADING, (isLoading) => {
      if (player.value && player.value.playbackRate !== 1) {
        setTimeout(() => {
          player.value && player.value.playbackRate !== 1 && (player.value.playbackRate = 1)
        }, 1300)
      }
    })
  }

  const isInit = ref(false)

  onMounted(() => {
    nextTick(() => (isInit.value = true))
    proxy?.mittBus.on('setMiniPlayerBus', (isMinTag: boolean) => {
      if (player.value && player.value.plugins?.miniscreen?.isMini !== isMinTag) {
        isMinTag
          ? player.value?.plugins.miniscreen?.getMini()
          : player.value?.plugins.miniscreen?.exitMini()
      }
    })
  })
  onUnmounted(() => {
    isInit.value = false
    proxy?.mittBus.off('setMiniPlayerBus')
  })

  return { playerRef, initPlayer, isInit }
}
