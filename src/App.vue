<template>
  <div id="app">
    <div class="headBar usePx"></div>
    <div class="topMenus usePx"></div>
    <div class="main usePx">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    
  },
};
</script>
<style lang="scss">
@import "@/assets/style/app.scss";
.headBar.usePx {
  width: 100%;
  height: 80px;
  background-color: rgba(236, 185, 193, 0.1);
}

.topMenus.usePx {
  width: 100%;
  height: 120px;
  background-color: rgba(243, 243, 140, 0.1);
}

.main.usePx {
  width: 100%;
  height: calc(100% - 80px - 120px);
}
</style>
