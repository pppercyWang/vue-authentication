<template>
  <div class="layout">
    <div class="header">
      <h3>header</h3>
    </div>
    <router-view></router-view>
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
.layout {
  .header {
    text-align: center
  }
}
</style>
