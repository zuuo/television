<template>
  <div class="wrap">
    <div id="menu">
      <div class="swiper-wrapper">
        <template v-for="(menu, index) in menus">
          <div
            class="menu swiper-slide usePx"
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
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

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
      navSwiper: undefined,
    };
  },
  computed: {
    cursorInPart() {
      return this.$store.state.cursor.part == this.partName;
    },
    isFreeze() {
      return this.$store.state.cursor.freezeItem;
    },
  },
  watch: {
    cursorInPart(boo) {
      if (!boo && this.curItem) {
        this.$set(this.curItem, "isFocus", false);
      } else if (boo && !this.curItem) {
        this.freeze = this.curItemIndex = 0;
      } else {
        this.$set(this.curItem, "isFocus", true);
        // console.log(this.curItem);
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
      let curItemDom = this.$refs[itemRefString][0];

      curItemDom.scrollIntoView({
        block: "center",
      });

      this.$router.push(this.curItem.url)
    },
  },
  create() {
    this.menus.forEach((menu) => {
      this.$set(menu, "isFocus", false);
      this.$set(menu, "isActive", false);
    });
  },
  mounted() {
    this.navSwiper = new Swiper("#menu", {
      initialSlide: 0,
      direction: "horizontal",
      loop: false,
      slidesPerView: 8,
      on: {
        slideChangeTransitionEnd(e) {
          console.log(e);
        },
      },
    });
  },
  methods: {
    keyLeft() {
      if (!this.cursorInPart) return;
      if (this.curItemIndex > 0) {
        this.curItemIndex--;
        this.navSwiper.slidePrev();
      }
    },
    keyRight() {
      if (!this.cursorInPart) return;
      if (this.curItemIndex <= this.menus.length) {
        this.curItemIndex++;
        this.navSwiper.slideNext();
      }
    },
    keyDown() {
      if (!this.cursorInPart) return;
      this.$set(this.curItem, "isFocus", false);
      this.$store.commit("SET_PART", "main");
      this.$store.commit("FREEZE_ITEM", true);
    },
    keyUp() {
      if (!this.cursorInPart) return;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow: auto;
  box-sizing: border-box;
  padding: 10px 0;
  position: relative;

  #menu {
    width: calc(100% - 80px);
    height: calc(100% - 20px);
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }

  .menu {
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-radius: 20px;
    color: #fff;
    transition: 200ms;
    width: calc(100% / 6);
    text-align: center;
    float: left;
    background-position: center bottom;
    background-repeat: no-repeat;

    &.usePx {
      font-size: 20px;
    }
    
    &.active {
      background-image: url(/static/images/img/menu/menu_active.png);
    }

    &.focus {
      transform: scale(1.02);
      transition: 500ms;
      background-image: url(/static/images/img/menu/menu_focus.png);
    }
  }
}
</style>