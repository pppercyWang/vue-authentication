<template>
  <div class="admin-layout">
    <div class="header">
      <div class="header-button__collapse" @click="collapse">
        <i class="iconfont percy-icon-menu"></i>
      </div>
      <div class="header-title">后台管理系统 - Content Manager System</div>
      <div class="header-exit" @click="loginOut">
        <i class="el-icon-switch-button"></i>
      </div>
    </div>
    <el-col :span="24" class="body">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
      >
        <el-submenu
          :index="index.toString()"
          v-for="(item,index) in backgroundMenuData"
          v-bind:key="index"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            :index="`${item.path}/${item2.path}`"
            v-for="(item2,index2) in item.children"
            v-bind:key="index2"
          >{{item2.name}}</el-menu-item>
        </el-submenu>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    ...mapGetters(["backgroundMenuData"])
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      this.$router.push("/admin/login");
    }
  },
  created() {
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
    .header-exit {
      float: right;
      padding: 0px 30px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      color: black;
      font-size: 20px;
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