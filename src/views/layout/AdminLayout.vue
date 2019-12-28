<template>
  <div class="admin-layout">
    <div class="header">
      <div class="header-button__collapse" @click="collapse">
        <i class="iconfont percy-icon-menu"></i>
      </div>
      <div class="header-title">后台管理系统 - Content Manager System</div>
    </div>
    <el-col :span="24" class="body">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/admin/user/index">
           <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/order/index">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/bill/index">
          <i class="el-icon-s-finance"></i>
          <span slot="title">财务管理</span>
        </el-menu-item>
      </el-menu>
      <el-col :span="24" class="content-wrapper">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-col>
  </div>
</template>
<script>
import "@/assets/icon.css";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style scoped lang="scss">
.admin-layout {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #e2e2e2;
    color: #3a3a3a;
    border-bottom: 1px solid #cccccc;
    box-sizing: border-box;
    .header-title {
      display: inline-block;
      height: 60px;
      color: #475669;
      font-size: 14px;
      line-height: 60px;
    }
    .header-button__collapse {
      display: inline-block;
      padding: 0px 23px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      color: #475669;
    }
  }
  .body {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .content-wrapper {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
    }
  }
}
</style>