<script setup lang="ts" name="ChannelHeader">
import logoImg from '@/assets/images/common/logo.png'
</script>

<template>
  <div class="channel-header">
    <!-- Left Logo -->
    <div class="logo-section">
      <div class="logo-icon">
        <el-image style="width: 140px; height: 140px" :src="logoImg" fit="contain" />
      </div>
      <!-- <span class="logo-text">华影汇</span> -->
    </div>

    <!-- Central Search Bar -->
    <div class="search-section">
      <div class="search-bar">
        <input type="text" placeholder="搜索" class="search-input" />
        <Search class="search-icon" size="18" />
      </div>
    </div>

    <!-- Right Buttons -->
    <div class="button-section">
      <button class="vip-button">V会员专区</button>
      <button class="download-button">
        <Download size="14" />
        下载客户端
      </button>
      <button class="login-button">登录</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.channel-header {
  height: 76px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: white;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.search-section {
  flex: 1;
  max-width: 400px;
  margin: 0 32px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 8px 16px;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
}

.search-icon {
  color: rgba(255, 255, 255, 0.7);
  margin-left: 8px;
}

.icon-menu {
  display: flex;
  gap: 24px;
  margin-right: 32px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);

  &:hover {
    color: white;
  }
}

.button-section {
  display: flex;
  gap: 12px;
}

.vip-button {
  background: linear-gradient(135deg, #d4af37, #f59e0b);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}

.download-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #5a5a5a;
  }
}

.login-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #5a5a5a;
  }
}
</style>
