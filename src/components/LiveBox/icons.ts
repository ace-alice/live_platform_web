import { Util } from 'xgplayer'
import PlayIcon from '@/assets/images/icons/live_play.png'
import PauseIcon from '@/assets/images/icons/live_pause.png'
import ScreenshotIcon from '@/assets/images/icons/live_screenshot.png'
import CssFullscreenIcon from '@/assets/images/icons/spread_001.png'
import ExitCssFullscreenIcon from '@/assets/images/icons/spread_002.png'
import VolumeMutedIcon from '@/assets/images/icons/volume_muted.png'
import VolumeSmallIcon from '@/assets/images/icons/volume_small.png'
import VolumeLargeIcon from '@/assets/images/icons/volume_large.png'

export default {
  play: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${PlayIcon}" height="20" wight="20" />`,
      {},
      'live-image live-play-class'
    )
    return dom
  },
  pause: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${PauseIcon}" height="20" wight="20" />`,
      {},
      'live-image pause-play-class'
    )
    return dom
  },
  screenshotIcon: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${ScreenshotIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  },
  cssFullscreen: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${CssFullscreenIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  },
  exitCssFullscreen: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${ExitCssFullscreenIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  },
  volumeMuted: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${VolumeMutedIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  },
  volumeSmall: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${VolumeSmallIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  },
  volumeLarge: () => {
    const dom = Util.createDom(
      'div',
      `<img src="${VolumeLargeIcon}" height="20" wight="20" />`,
      {},
      'live-image live-screenshot-class'
    )
    return dom
  }
}
