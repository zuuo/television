<template>
  <div class="wrap usePX">
    <template v-for="(row, rowIndex) in rowItems">
      <carousel
        v-if="row.type == 'carousel'"
        :curItemCoord.sync="curItemCoord"
        :rowData="row"
        :key="rowIndex"
      />
      <div v-else class="row" :key="rowIndex">
        <template v-for="(item, itemIndex) in row.items">
          <item
            :rowIndex="rowIndex"
            :itemIndex="itemIndex"
            :shakeItemCoord="shakeItemCoord"
            :itemData="item"
            :key="itemIndex"
            :ref="'item-' + rowIndex + '-' + itemIndex"
          />
        </template>
      </div>
    </template>

    <detailPage v-if="showDetail" :showDetail.sync="showDetail" />
  </div>
</template>

<script>
import keyboardControl from "@/utils/keyboardControl.js";
import detailPage from "@/views/detail/index.vue";
import carousel from "@/components/carousel.vue";
import item from "@/components/item.vue";

import recommendData from "@/assets/data/recommend1.json";
import recommendData2 from "@/assets/data/recommend2.json";

export default {
  name: `recommend`,
  mixins: [keyboardControl],
  components: {
    detailPage,
    carousel,
    item,
  },
  data() {
    return {
      partName: "main",
      rowItems: this.$route.path == "/" ? recommendData : recommendData2,
      curItemCoord: {
        row: undefined,
        item: undefined,
        direction: undefined
      },
      curItem: undefined,
      lastItemCoord: {
        row: undefined,
        item: undefined,
        direction: undefined
      },
      lastItem: undefined,
      shakeItemCoord: {
        row: undefined,
        item: undefined,
        direction: undefined
      },
      showDetail: false,
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
        this.curItemCoord = {
          row: 0,
          item: 0,
        };
      } else {
        this.$set(this.curItem, "isFocus", true);
      }
    },
    curItemCoord: {
      deep: true,
      immediate: true,
      handler(newCoord) {
        if (!this.cursorInPart) {
          return;
        }
        if (!newCoord.row) {
          newCoord.row = 0;
        }
        if (!newCoord.item) {
          newCoord.item = 0;
        }

        let nextItem = this.rowItems[newCoord.row].items[newCoord.item];
        if (this.curItem) {
          this.$set(this.curItem, "isFocus", false);
        }
        if (nextItem) {
          this.lastItemCoord = {
            row: newCoord.row,
            item: newCoord.item,
            direction: newCoord.direction,
          };
          this.lastItem = this.curItem;
          this.curItem = nextItem;
        } else if (this.lastItem) {
          this.curItemCoord = {
            row: this.lastItemCoord.row,
            item: this.lastItemCoord.item,
          };
          this.curItem = this.lastItem;
        }

        this.$set(this.curItem, "isFocus", true);
      },
    },
    curItem() {
      let itemRefString = `item-${this.curItemCoord.row}-${this.curItemCoord.item}`;
      let curItemDom = this.$refs[itemRefString];
      if(!curItemDom) {
        return
      }

      if (Array.isArray(curItemDom)) {
        curItemDom = curItemDom[0];
      }

      if (curItemDom.$el) {
        curItemDom = curItemDom.$el;
      }

      curItemDom.scrollIntoView({
        block: "center",
      });
    },
  },
  created() {
    this.rowItems.forEach((row) => {
      row.items &&
        row.items.forEach((item) => {
          this.$set(item, "isFocus", false);
        });
    });
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    keyLeft() {
      if (!this.cursorInPart) return;

      if (this.curItemCoord.item <= 0) {
        this.itemShake();
      } else {
        this.curItemCoord.item--;
        this.curItemCoord.direction = "left";
      }
    },
    keyRight() {
      if (!this.cursorInPart) return;

      let row = this.rowItems[this.curItemCoord.row];
      let itemNum = row.items.length;

      if (this.curItemCoord.item >= itemNum - 1) {
        this.itemShake();
      } else {
        this.curItemCoord.item++;
        this.curItemCoord.direction = "right";
      }
    },
    keyUp() {
      if (!this.cursorInPart) return;

      if (this.curItemCoord.row <= 0) {
        // this.$set(this.curItem, "isFocus", false);
        this.curItem.isFocus = false;
        this.$store.commit("SET_PART", "menu");
        this.$store.commit("FREEZE_ITEM", true);
        // this.itemShake();
      } else {
        let row = this.rowItems[this.curItemCoord.row];
        let rowItemNum = row.items.length;
        let nextRow = this.rowItems[this.curItemCoord.row - 1];
        let nextRowItemNum = nextRow.items.length;
        this.curItemCoord.row--;
        this.curItemCoord.direction = "up";
        this.curItemCoord.item = this.skip(
          rowItemNum,
          nextRowItemNum,
          this.curItemCoord.item
        );
      }
    },
    keyDown() {
      if (!this.cursorInPart) return;
      if (this.isFreeze) {
        this.$store.commit("FREEZE_ITEM", false);
        return;
      }

      if (this.curItemCoord.row >= this.rowItems.length - 1) {
        this.itemShake();
      } else {
        let row = this.rowItems[this.curItemCoord.row];
        let rowItemNum = row.items.length;
        let nextRow = this.rowItems[this.curItemCoord.row + 1];
        let nextRowItemNum = nextRow.items.length;
        this.curItemCoord.direction = "down";
        this.curItemCoord.row++;
        this.curItemCoord.item = this.skip(
          rowItemNum,
          nextRowItemNum,
          this.curItemCoord.item
        );
      }
    },
    keyEnter() {
      if (!this.cursorInPart) return;

      this.$store.commit("SET_PART", "detail");
      this.showDetail = true;
    },
    itemShake() {
      this.shakeItemCoord = {
        row: this.curItemCoord.row,
        item: this.curItemCoord.item,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap.usePX {
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 40px 50px;
  box-sizing: border-box;
}
.row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + .row {
    margin-top: 20px;
  }
}
</style>