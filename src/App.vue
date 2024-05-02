<script lang="ts" setup name="App">
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import usEn from "element-plus/es/locale/lang/en";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import th from "element-plus/es/locale/lang/th";
import vn from "element-plus/es/locale/lang/vi";
import idID from "element-plus/es/locale/lang/id";
import ja from "element-plus/es/locale/lang/ja";
import ko from "element-plus/es/locale/lang/ko";
import { getLocal } from "./utils/storage";
import { GetParam } from "./utils/getCommonInfo";
import { socketServiceHook } from "@/service/webSocket";
import { LangCode } from "@/enum";

const { proxy } = getCurrentInstance() as any;

const { leaveRoom } = socketServiceHook(proxy);

const langObj: any = {
  "zh-CN": zhCn,
  "en-US": usEn,
  "zh-TW": zhTw,
  "th-TH": th,
  "vi-VN": vn,
  "in-ID": idID,
  "ja-JP": ja,
  "ko-KR": ko,
};

const currentLang = computed(() => {
  if (getLocal("lang")) {
    return langObj[LangCode[Number(getLocal("lang"))] || "zh-CN"];
  } else if (GetParam(window.location.href, "lang")) {
    return langObj[
      LangCode[Number(GetParam(window.location.href, "lang"))] || "zh-CN"
    ];
  } else {
    return langObj["zh-CN"];
  }
});

onMounted(() => {});

onUnmounted(() => {
  leaveRoom("room_type_index_content_push");
});
</script>

<template>
  <el-config-provider :locale="currentLang">
    <router-view />
  </el-config-provider>
</template>
