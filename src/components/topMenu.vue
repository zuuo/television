<template>
  <div class="wrap">
    <template v-for="(menu, index) in menus">
      <div
        class="menu usePx"
        :class="
          (menu.isFocus ? 'focus' : '') + (menu.isActive ? ' active' : '')
        "
        :key="index"
        :ref="'item-' + index"
      >
        {{ menu.name }}
      </div>
    </template>
  </div>
</template>
<script>
import keyboardControl from "@/utils/keyboardControl.js";
import menuData from "@/assets/data/menu.json";
export default {
  name: "topMenu",
  mixins: [keyboardControl],
  data() {
    return {
      partName: "menu",
      menus: menuData,
      curItem: undefined,
      curItemIndex: 0,
    };
  },
  computed: {
    cursorInPart() {
      console.log(this.$store.state.cursor.part);
      return this.$store.state.cursor.part == this.partName;
    },
  },
  watch: {
    cursorInPart(boo) {
      console.log(boo);
      if (!boo && this.curItem) {
        this.$set(this.curItem, "isFocus", false);
        console.log(this.curItem.isFocus);
      }
    },
    curItemIndex: {
      deep: true,
      immediate: true,
      handler(index) {
        if (!this.cursorInPart) return;
        if (!index) index = 0;

        let nextItem = this.menus[index];
        if (this.curItem) {
          this.$set(this.curItem, "isFocus", false);
          this.$set(this.curItem, "isActive", false);
        }

        if (nextItem) {
          this.curItem = nextItem;
        }
        this.$set(this.curItem, "isFocus", true);
        this.$set(this.curItem, "isActive", true);
      },
    },
    curItem() {
      let itemRefString = `item-${this.curItemIndex}`;
      console.log(this.$refs[itemRefString]);
      let curItemDom = this.$refs[itemRefString][0];

      curItemDom.scrollIntoView({
        block: "center",
      });
    },
  },
  create() {
    this.menus.forEach((menu) => {
      this.$set(menu, "isFocus", false);
      this.$set(menu, "isActive", false);
    });
  },
  methods: {
    keyLeft() {
      if (!this.cursorInPart) return;
      console.log(this.curItemIndex);
      if (this.curItemIndex > 0) {
        this.curItemIndex--;
      }
      console.log(this.curItemIndex);
    },
    keyRight() {
      if (!this.cursorInPart) return;
      console.log(this.curItemIndex);
      if (this.curItemIndex <= this.menus.length) {
        this.curItemIndex++;
      }
      console.log(this.curItemIndex);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow: auto;

  .menu {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 300px;
    border-radius: 20px;
    color: #fff;
    transition: 200ms;

    &.usePx {
      font-size: 20px;
    }

    &.focus {
      transform: scale(1.05);
      box-shadow: 0 0 2px 5px #fff;
      word-break: break-all;
      transition: 500ms;
    }
  }
}
</style>