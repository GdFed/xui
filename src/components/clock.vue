<template>
  <div class="clock">
    <span class="num">{{hour}}</span>
    <span class="dot">:</span>
    <span class="num">{{min}}</span>
    <span class="dot">:</span>
    <span class="num">{{sec}}</span>
    <span class="dot" v-if="mini">:</span>
    <span class="num" v-if="mini">{{msec}}</span>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 0
    }, // 毫秒
    mini: {
      type: Boolean,
      default: false
    }, // 是否到微秒
    repeat: { // 是否到循环
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      realTime: 0
    }
  },
  computed: {
    hour () {
      return this.decade(parseInt(this.realTime / 3600000))
    },
    min () {
      return this.decade(parseInt(this.realTime % 3600000 / 60000))
    },
    sec () {
      return this.decade(parseInt(this.realTime % 3600000 % 60000 / 1000))
    },
    msec () {
      return this.decade(parseInt(this.realTime % 3600000 % 60000 % 1000 / 10))
    }
  },
  watch: {
    time (val, oldVal) {
      if (val && oldVal && this.repeat) {
        this.timeGo()
      }
    }
  },
  methods: {
    decade (val) {
      val = val < 0 ? 0 : val
      return val > 9 ? val : '0' + val
    },
    timeGo () {
      this.realTime = this.time
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.realTime <= 0) {
          clearInterval(this.timer)
          this.$emit('timeover')
          return
        }
        this.realTime -= this.delayNum
      }, this.delayTime)
    }
  },
  mounted () {
    this.delayTime = 1000
    this.delayNum = 1000
    if (this.mini) {
      this.delayTime = 10
      this.delayNum = 10
    }
    this.timeGo()
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.clock{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 4px;
  .num{
    width: 18px;
    height: 24px;
    border-radius: 2px;
    line-height: 24px;
    text-align: center;
    background: #333;
    color: #fff;
  }
  .dot{
    font-size: 16px;
    line-height: 24px;
    margin: 0 2px;
    color: #333;
    text-align: center;
  }
}
</style>
