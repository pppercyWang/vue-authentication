<template>
  <div class="foreground-home">
    <div class="alert">前台未进行鉴权</div>
    <div class="alert">中台：/agent 后台：/admin</div>
    <h1>这里是前台首页</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.foreground-home {
  text-align: center;
  .alert {
    text-align: center;
    margin-top: 30px;
  }
  h1 {
    margin-top: 240px;
  }
}
</style>
