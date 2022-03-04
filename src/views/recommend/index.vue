<template>
  <div class="wrap">
    <div class="row" v-for="(row, rowIndex) in rowItems" :key="rowIndex">
      <template v-for="(item, itemIndex) in row.items">
        <div
          class="item"
          :class="
            (item.isFocus ? ' focus' : '') +
            (isShake(rowIndex, itemIndex) ? ' shake' : '')
          "
          :key="itemIndex"
          :ref="'item-' + rowIndex + '-' + itemIndex"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import keyboardControl from "@/utils/keyboardControl.js";
import recommendData from "@/assets/data/recommend1.json";
export default {
  name: `recommend`,
  mixins: [keyboardControl],
  data() {
    return {
      partName: "main",
      rowItems: recommendData,
      curItemCoord: {
        row: undefined,
        item: undefined,
      },
      curItem: undefined,
      lastItemCoord: {
        row: undefined,
        item: undefined,
      },
      lastItem: undefined,
      shakeItemCoord: {
        row: undefined,
        item: undefined,
      },
    };
  },
  computed: {
    cursorInPart() {
      return this.$store.state.cursor.part == this.partName;
    },
  },
  watch: {
    cursorInPart(boo) {
      console.log(boo);
      if (!boo && this.curItem) {
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
      let curItemDom = this.$refs[itemRefString][0];

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
  mounted() {},
  methods: {
    keyLeft() {
      if (!this.cursorInPart) return;

      if (this.curItemCoord.item <= 0) {
        this.itemShake();
      } else {
        this.curItemCoord.item--;
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
      }
    },
    keyUp() {
      if (!this.cursorInPart) return;

      if (this.curItemCoord.row <= 0) {
        this.itemShake();
      } else {
        let row = this.rowItems[this.curItemCoord.row];
        let rowItemNum = row.items.length;
        let nextRow = this.rowItems[this.curItemCoord.row - 1];
        let nextRowItemNum = nextRow.items.length;
        this.curItemCoord.row--;
        this.curItemCoord.item = this.skip(
          rowItemNum,
          nextRowItemNum,
          this.curItemCoord.item
        );
      }
    },
    keyDown() {
      if (!this.cursorInPart) return;

      if (this.curItemCoord.row >= this.rowItems.length - 1) {
        this.itemShake();
      } else {
        let row = this.rowItems[this.curItemCoord.row];
        let rowItemNum = row.items.length;
        let nextRow = this.rowItems[this.curItemCoord.row + 1];
        let nextRowItemNum = nextRow.items.length;
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

      if (!this.cursorInPart) {
        return;
      }
    },
    itemShake() {
      this.shakeItemCoord = {
        row: this.curItemCoord.row,
        item: this.curItemCoord.item,
      };
    },
    isShake(row, item) {
      return (
        row === this.shakeItemCoord.row && item === this.shakeItemCoord.item
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
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

  .item {
    flex: 1;
    height: 300px;
    border: 1px solid #fff;
    margin-left: 20px;
    border-radius: 5px;
    transition: 200ms;

    &.focus {
      transform: scale(1.05);
      box-shadow: 0 0 2px 5px #fff;
      word-break: break-all;
      transition: 500ms;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>