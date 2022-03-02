<template>
  <div class="full">
    <div class="row" v-for="(row, rowIndex) in rowItems" :key="rowIndex">
      <div
        class="item"
        :class="item.isFocus ? 'focus' : ''"
        v-for="(item, itemIndex) in row.items"
        :key="itemIndex"
        :ref="'item-' + rowIndex + '-' + itemIndex"
      ></div>
    </div>
  </div>
</template>

<script>
import keyboardControl from "@/utils/keyboardControl.js";
export default {
  name: `recommend`,
  mixins: [keyboardControl],
  data() {
    return {
      rowItems: [
        {
          items: [{ isFocus: false }, { isFocus: false }],
        },
        {
          items: [{ isFocus: false }, { isFocus: false }, { isFocus: false }],
        },
        {
          items: [
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
          ],
        },
        {
          items: [{ isFocus: false }, { isFocus: false }],
        },
        {
          items: [{ isFocus: false }, { isFocus: false }, { isFocus: false }],
        },
        {
          items: [
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
            { isFocus: false },
          ],
        },
        {
          items: [{ isFocus: false }, { isFocus: false }],
        },
      ],
      curItemCoord: {
        row: 0,
        item: 0,
      },
      curItem: undefined,
      lastItemCoord: {
        row: 0,
        item: 0,
      },
      lastItem: undefined,
    };
  },
  watch: {
    curItemCoord: {
      deep: true,
      immediate: true,
      handler(newCoord) {
        let nextItem = this.rowItems[newCoord.row].items[newCoord.item];
        if (this.curItem) {
          this.curItem.isFocus = false;
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

        this.curItem.isFocus = true;
      },
    },
  },
  mounted() {},
  methods: {
    keyLeft() {
      if (this.curItemCoord.item <= 0) {
        this.itemShake();
      } else {
        this.curItemCoord.item--;
      }
    },
    keyRight() {
      let row = this.rowItems[this.curItemCoord.row];
      let itemNum = row.items.length;

      if (this.curItemCoord.item >= itemNum - 1) {
        this.itemShake();
      } else {
        this.curItemCoord.item++;
      }
    },
    keyUp() {
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
    itemShake() {
      console.log("shake");
    },
    skip(originSize, targetSize, originIndex) {
      let targetIndex = 0;

      targetIndex = (targetSize / originSize) * originIndex;
      // if (originSize <= targetSize) {
      //   targetIndex = Math.ceil(targetIndex);
      // } else {
      //   targetIndex = Math.floor(targetIndex);
      // }
      console.log(targetIndex);
      targetIndex = Math.round(targetIndex);
      if (targetIndex < 0) {
        targetIndex = 0
      } else if (targetIndex > targetSize - 1) {
        targetIndex = targetSize - 1
      }

      return targetIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    height: 100px;
    border: 1px solid #fff;
    margin-left: 20px;
    border-radius: 5px;

    &.focus {
      transform: scale(1.25);
      box-shadow: 0 0 2px 5px #fff;
      word-break: break-all;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>