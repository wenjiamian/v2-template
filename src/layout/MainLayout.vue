<template>
  <div class="main-layout">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <img src="@/assets/logo-icon.svg" alt="logo" class="logo-icon" />
          <span class="logo-text">城市更新全流程管理系统</span>
        </div>
      </div>
      <div class="header-right">
        <el-button class="screen-btn" type="primary">
          <i class="el-icon-monitor"></i>
          可视化大屏
        </el-button>
        <div class="user-info">
          <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <el-dropdown trigger="click">
            <span class="user-name">
              陈广辉 <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>

    <div class="main-container">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>城市更新数字化管理</span>
          <i class="el-icon-s-unfold"></i>
        </div>
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          @select="handleMenuSelect"
          :unique-opened="true"
        >
          <el-menu-item index="workbench">
            <i class="el-icon-document"></i>
            <span>工作台</span>
          </el-menu-item>
          
          <el-menu-item index="project">
            <i class="el-icon-setting"></i>
            <span>项目管理</span>
          </el-menu-item>

          <el-submenu index="fund">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>资金管理</span>
            </template>
            <el-menu-item index="fund-overview">资金总览</el-menu-item>
            <el-menu-item index="fund-financing">融资管理</el-menu-item>
            <el-menu-item index="fund-source">资金来源</el-menu-item>
            <el-menu-item index="fund-usage">资金使用</el-menu-item>
            <el-menu-item index="fund-capital">项目资本金</el-menu-item>
            <el-menu-item index="fund-bank">银行账号</el-menu-item>
            <el-menu-item index="fund-unit">收款单位管理</el-menu-item>
            <el-menu-item index="fund-contract">支付合同管理</el-menu-item>
          </el-submenu>

          <el-menu-item index="construction">
            <i class="el-icon-office-building"></i>
            <span>建设管理</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      activeMenu: 'fund-usage'
    }
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index
      if (index === 'fund-usage') {
        this.$router.push('/fund/usage')
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.header {
  height: 56px;
  background: linear-gradient(90deg, #1e3a5f 0%, #2d5a87 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.screen-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 4px;
}

.screen-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.main-container {
  display: flex;
  padding-top: 56px;
  min-height: calc(100vh - 56px);
}

.sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e6e6e6;
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-menu {
  border-right: none;
}

.sidebar-menu .el-menu-item,
.sidebar-menu .el-submenu__title {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}

.sidebar-menu .el-menu-item.is-active {
  color: #409EFF;
  background-color: #ecf5ff;
}

.sidebar-menu .el-submenu .el-menu-item {
  padding-left: 50px !important;
  height: 44px;
  line-height: 44px;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 56px);
}
</style>
