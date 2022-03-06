<template>
  <div id="app">
    <div class="headBar usePx"></div>
    <topMenu class="topMenu usePx"></topMenu>
    <div class="main usePx">
      <router-view />
    </div>
  </div>
</template>
<script>
import topMenu from "@/components/topMenu.vue";
export default {
  components: {
    topMenu,
  },
  created() {
    this.$store.commit("SET_PART", "menu")
  },
  methods: {},
};
</script>
<style lang="scss">
@import "@/assets/style/app.scss";
$headHeight: 50px;
$menuHeight: 50px;
.headBar.usePx {
  width: 100%;
  height: $headHeight;
  background-color: rgba(236, 185, 193, 0.1);
}

.topMenu.usePx {
  width: 100%;
  height: $headHeight;
}

.main.usePx {
  width: 100%;
  height: calc(100% - $headHeight - $headHeight);
}
</style>
