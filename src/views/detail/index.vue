<template>
  <div class="detailPage">
    
  </div>
</template>
<script>
import keyboardControl from "@/utils/keyboardControl.js";
export default {
  name: "detailPage",
  mixins: [keyboardControl],
	data() {
		return {
      partName: "detail",
		}
	},
	props: {
		showDetail: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
    cursorInPart() {
      return this.$store.state.cursor.part == this.partName;
    },
    isFreeze() {
      return this.$store.state.cursor.freezeItem;
    },
  },
	methods: {
		keyBack() {
      if (!this.cursorInPart) return;
			this.$emit("update:showDetail", false)
      this.$store.commit("SET_PART", this.$store.state.cursor.lastPart);
		}
	},
};
</script>
<style lang="scss">
.detailPage {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #042b5a;
	top: 0;
	left: 0;
  z-index: 9;
}
</style>