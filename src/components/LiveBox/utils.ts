import FlvPlayer from 'xgplayer-flv.js'
import HlsPlayer from 'xgplayer-hls.js'
import { type IMiniScreenConfig } from 'xgplayer/es/plugins/miniScreen'
import { type IVolumeConfig } from 'xgplayer/es/plugins/volume'
import { type IPlaybackRateConfig } from 'xgplayer/es/plugins/playbackRate'
import { type ICssConfig } from 'xgplayer/es/plugins/cssFullScreen'
import { type IPlayerOptions } from 'xgplayer'
import Danmu, { type IDanmuConfig } from 'xgplayer/es/plugins/danmu'
import 'xgplayer/es/plugins/danmu/index.css'
import icons from './icons'

export function setPlugins(url: string) {
  const plugins = [Danmu]
  const flvTag = url.indexOf('.flv') !== -1
  const m3u8Tag = url.indexOf('.m3u8') !== -1
  flvTag && plugins.push(FlvPlayer)
  m3u8Tag && plugins.push(HlsPlayer)
  return { url, plugins, isLive: flvTag || m3u8Tag, id: 'dPlayer' }
}

export const defaultPlayerOptions:
  | IPlayerOptions
  | {
      crossOrigin: boolean
      mini: IMiniScreenConfig
      volume: IVolumeConfig
      playbackRate: IPlaybackRateConfig
      cssFullscreen: ICssConfig
      danmu: IDanmuConfig
    } = {
  // 是否自动播放
  id: 'dPlayer',
  autoplay: true,
  autoplayMuted: true,
  // 是否显示视频首帧
  videoInit: true,
  crossOrigin: true,
  fitVideoSize: 'fixed',
  lang: 'zh-cn',
  volume: {
    default: 0.5,
    showValueLabel: true
  },
  dynamicBg: {
    disable: false
  },
  mini: {
    width: 600,
    height: 360,
    isScrollSwitch: true,
    scrollTop: 100,
    isShowIcon: true
  },
  cssFullscreen: {},
  controls: true,
  width: '100%',
  height: '100%',
  closeVideoPreventDefault: true,
  defaultPlaybackRate: 3,
  rotateFullscreen: true,
  ignores: ['fullscreen', 'playbackRate'],
  screenShot: {
    iconText: '截图'
  },
  errorTips: `请<span>刷新</span>试试`,
  // 修改播放器的控制器图标  https://v3.h5player.bytedance.com/plugins/icons.htm/
  icons,
  danmu: {
    comments: []
  }
}
