<script setup lang="ts">
import { userInfoStore } from '@/store/userInfo'
import langIcon1 from '@/assets/lang/lang-1.png'
import langIcon2 from '@/assets/lang/lang-2.png'
import langIcon3 from '@/assets/lang/lang-3.png'
import langIcon4 from '@/assets/lang/lang-4.png'
import langIcon5 from '@/assets/lang/lang-5.png'
import langIcon6 from '@/assets/lang/lang-6.png'
import langIcon7 from '@/assets/lang/lang-7.png'
import langIcon8 from '@/assets/lang/lang-8.png'
import tabIcon from '@/assets/icons/tab_ more_ 01.png'

const { langConfig, canChangeLang } = storeToRefs(userInfoStore())

const { updateLangConfig } = userInfoStore()

const show = ref(false)

function showDetail() {
  show.value = true
}

function hideDetail() {
  show.value = false
}

const langList = [
  {
    id: 1,
    lang: 'zh-CN',
    label: '简体中文',
    icon: langIcon1,
  },
  {
    id: 2,
    lang: 'en-US',
    label: 'English',
    icon: langIcon2,
  },
  {
    id: 3,
    lang: 'zh-TW',
    label: '繁體中文',
    icon: langIcon3,
  },
  {
    id: 4,
    lang: 'th-TH',
    label: 'ไทย',
    icon: langIcon4,
  },
  {
    id: 5,
    lang: 'vi-VN',
    label: 'Tiếng việt',
    icon: langIcon5,
  },
  {
    id: 6,
    lang: 'in-ID',
    label: 'Indonesia',
    icon: langIcon6,
  },
  {
    id: 7,
    lang: 'ja-JP',
    label: '日本語',
    icon: langIcon7,
  },
  {
    id: 8,
    lang: 'ko-KR',
    label: '한국어',
    icon: langIcon8,
  },
]

const currentLangInfo = computed<any>(() => {
  return (
    langList.find((info: any) => {
      return +langConfig.value === +info.id
    }) || {}
  )
})

// 更换语言
async function changeLang(lang: any) {
  updateLangConfig(lang.id)
  setTimeout(() => {
    window.location.reload()
  }, 50)
}
</script>

<template>
  <!-- v-show="!canChangeLang" -->
  <div
    class="lang-select"
    :class="{ 'lang-show': show }"
    @click="show = !show"
    @mouseleave="show = false"
  >
    <LazyImage
      :img-url="currentLangInfo.icon"
      class="current-lang-icon"
      :is-lazy="false"
      @mouseenter="show = true"
    />
    <div class="lang-info">
      <div class="lang-label">
        {{ currentLangInfo.label }}
      </div>
      <LazyImage :img-url="tabIcon" class="tab-icon" :is-lazy="false" />
    </div>

    <div class="lang-box" @click.stop>
      <div
        v-for="lang in langList"
        :key="lang.lang"
        class="lang-item"
        :class="{
          active: +langConfig === +lang.id,
        }"
        @click="changeLang(lang)"
      >
        <LazyImage :img-url="lang.icon" class="lang-icon" :is-lazy="false" />
        <div class="lang-label">
          {{ lang.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lang-show {
  .tab-icon {
    transform: rotateZ(180deg);
  }
  .lang-box {
    height: 316px !important;
    padding: 20px 24px !important;
  }
}
.lang-select {
  z-index: 5002;
  height: 44px;
  width: 162px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 22px;
  margin-right: 26px;
  cursor: pointer;

  &::after {
    content: "";
    width: 162px;
    height: 12px;
    position: absolute;
    top: 56px;
  }

  .lang-box {
    height: 0;
    padding: 0 24px;
    width: 162px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    position: absolute;
    top: 68px;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    .lang-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .lang-label {
        transition: transform 0.2s ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .lang-icon {
      height: 24px;
      width: 24px;
      margin-right: 20px;
    }
  }

  .active {
    .lang-label {
      opacity: 1;
    }
  }

  .lang-label {
    font-size: 14px;
    color: #fff;
    opacity: 0.6;
  }

  .current-lang-icon {
    height: 32px;
    width: 32px;
    flex-shrink: 0;
    margin: 0 24px 0 6px;
  }
  .lang-info {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .tab-icon {
      height: 24px;
      width: 24px;
      flex-shrink: 0;
      margin: 0 6px;
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
