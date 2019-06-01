<template>
  <div class="progress-bar" :class="[direct]">
    <div class="progress-track-left" :style="{width: percentLeft+'%', background: left}"></div>
    <div class="progress-track-right" :style="{width: percentRight+'%', background: right}"></div>
  </div>
</template>

<script>
export default {
  props: {
    percent: Number,
    bg: {
      type: Object,
      default: {
        left: 'linear-gradient(90deg, #FA384E 0%, #FFAE44 100%)', // '#FFC6CC'
        right: 'linear-gradient(-90deg, #4A6BF6 0%, #66A7FC 100%)' // '#B4D1FF'

      }
    },
    direct: { // 0无运动 1单向向左 2单向向右 3双向
      type: [Number, String],
      default: 1
    },
    current: Boolean,
    gap: { // none normal bold
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      percentLeft: 0,
      left: '',
      percentRight: 0,
      right: ''
    }
  },
  watch: {
    current (val) {
      if (val) {
        this.getPercent()
      } else {
        this.initPrecent()
      }
    }
  },
  computed: {
    gapPrecent () {
      switch (this.gap) {
        case 'normal':
          return 0.2
        case 'bold':
          return 0.4
        default:
          return 0
      }
    }
  },
  methods: {
    initPrecent () {
      switch (this.direct) {
        case 0:
          this.percentLeft = (this.percent - this.gapPrecent > 0 ? this.percent - this.gapPrecent : 0).toFixed(2)
          this.percentRight = (100 - this.percent - this.gapPrecent > 0 ? 100 - this.percent - this.gapPrecent : 0).toFixed(2)
          this.left = '#FFC6CC'
          this.right = '#B4D1FF'
          break
        case 1:
          this.percentLeft = 0
          this.percentRight = 100
          this.left = this.bg.left
          this.right = '#B4D1FF'
          break
        case 2:
          this.percentLeft = 100
          this.percentRight = 0
          this.left = '#FFC6CC'
          this.right = this.bg.right
          break
        default:
          this.percentLeft = 0
          this.percentRight = 0
          this.left = this.bg.left
          this.right = this.bg.right
          break
      }
    },
    getPercent () {
      this.initPrecent()
      if (+this.direct !== 0) {
        setTimeout(() => {
          if (+this.direct === 2) {
            this.percentRight = (this.percent - this.gapPrecent > 0 ? this.percent - this.gapPrecent : 0).toFixed(2)
            this.percentLeft = (100 - this.percent - this.gapPrecent > 0 ? 100 - this.percent - this.gapPrecent : 0).toFixed(2)
          } else {
            this.percentLeft = (this.percent - this.gapPrecent > 0 ? this.percent - this.gapPrecent : 0).toFixed(2)
            this.percentRight = (100 - this.percent - this.gapPrecent > 0 ? 100 - this.percent - this.gapPrecent : 0).toFixed(2)
          }
        }, 500)
      }
    }
  },
  mounted () {
    this.getPercent()
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  position: relative;
  height: 10px;
  border-radius: 5px;
  background: #efefef;
  overflow: hidden;
}
.progress-track-right {
  transition: all 1s;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
.progress-track-left {
  transition: all 1s;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
