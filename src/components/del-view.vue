<template>
  <div class="del-view">
    <div class="del" :style="{width: rightMost+'px'}" @click="deleteMe">删除</div>
    <div class="cont" @click="$emit('btn')" :class="{stop}" :style="leftStyle" @touchstart="touchS" @touchmove="touchM" @touchend="touchE">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      right: 0,
      rightMost: 80,
      stop: true
    }
  },
  computed: {
    leftStyle () {
      return this.right ? `right: ${this.right}px` : ''
    },
    delStatus () {
      return this.right >= this.rightMost
    }
  },
  methods: {
    deleteMe () {
      this.right = 0
      this.$emit('delete')
    },
    touchS (e) {
      this.stop = false
      if (this.delStatus) {
        this.rightNow = e.pageX + this.rightMost
      } else {
        this.rightNow = e.pageX
      }
    },
    touchM (e) {
      let right = this.rightNow - e.pageX
      if (right > this.rightMost * 1.2) {
        this.right = this.rightMost * 1.2
      } else if (right < 0) {
        this.right = 0
      } else {
        this.right = right
      }
    },
    touchE (e) {
      this.stop = true
      this.right = this.right >= this.rightMost * 0.6 ? this.rightMost : 0
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.del-view{
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  position: relative;
  background: rgb(240, 113, 104);
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 1px 1px 10px 2px rgba(10,10,10,.1);
  margin: 6px 0;
    .cont{
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      font-size: 16px;
      color: #333;
      box-shadow: 5px 0px 20px 5px rgba(10,10,10,.1);
      &.stop{
        transition: all .5s;
      }
    }
    .del{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      display: flex;
      font-size: 16px;
      // font-weight: bold;
      color: #fff;
      justify-content: center;
      align-items: center;
      background: rgb(240, 113, 104);
    }
  }
</style>
