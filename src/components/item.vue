<template>
  <div
    class="item"
    :class="
      (itemData.isFocus ? ' focus' : '') +
      (isShake(rowIndex, itemIndex) ? ' shake' : '')
    "
  ></div>
</template>
<script>
export default {
  name: "itemBlock",
  data() {
    return {};
  },
  props: {
    itemData: {
      type: Object,
      default() {
        return {
          id: undefined,
          postUrl: "",
        };
      },
    },
    rowIndex: {
      type: Number,
      default: 0,
    },
    itemIndex: {
      type: Number,
      default: 0,
    },
    shakeItemCoord: {
        type: Object,
        default() {
            return {
                row: 0,
                item: 0,
            }
        }
    }
  },
  methods: {
    isShake() {
      return (
        this.rowIndex === this.shakeItemCoord.row && this.itemIndex === this.shakeItemCoord.item
      );
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>