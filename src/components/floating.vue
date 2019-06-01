<template>
  <div class="floating" :class="{hide}" @click="$emit('todo')">
      <img :animation="coinAnimationData" src="../static/img/img2.png" alt="" class="coin">
      <img class="box" src="../static/img/img1.png" alt="">
      <img :animation="arrawAnimationData" src="../static/img/more.png" alt="" class="arraw">
  </div>
</template>

<script>
export default {
  data () {
    return {
      coinAnimationData: {},
      arrawAnimationData: {}
    }
  },
  props: {
    hide: Boolean
  },
  methods: {
    coinMove () {
      let coinAnimation = wx.createAnimation({
        duration: 800,
        timingFunction: 'linear'
      })
      coinAnimation.translateY(-1).step()
      this.coinAnimationData = coinAnimation.export()
      setTimeout(() => {
        coinAnimation.translateY(-6).step()
        this.coinAnimationData = coinAnimation.export()
      }, 800)
      this.coinTimer = setInterval(() => {
        coinAnimation.translateY(-6).step()
        this.coinAnimationData = coinAnimation.export()
        setTimeout(() => {
          coinAnimation.translateY(-1).step()
          this.coinAnimationData = coinAnimation.export()
        }, 800)
      }, 1600)
    },
    arrawMove () {
      let arrawAnimation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      })
      arrawAnimation.translateX(1).step()
      this.arrawAnimationData = arrawAnimation.export()
      setTimeout(() => {
        arrawAnimation.translateX(-1).step()
        this.arrawAnimationData = arrawAnimation.export()
      }, 1000)
      this.arrawTimer = setInterval(() => {
        arrawAnimation.translateX(1).step()
        this.arrawAnimationData = arrawAnimation.export()
        setTimeout(() => {
          arrawAnimation.translateX(-1).step()
          this.arrawAnimationData = arrawAnimation.export()
        }, 1000)
      }, 2000)
    }
  },
  mounted () {
    clearInterval(this.coinTimer)
    clearInterval(this.arrawTimer)
    this.coinMove()
    this.arrawMove()
  },
  destroyed () {
    clearInterval(this.coinTimer)
    clearInterval(this.arrawTimer)
  }
}
</script>

<style lang="scss" scoped>
.floating{
    z-index: 2;
    position: fixed;
    width: 69px;
    height: 69px;
    transition: all 2s;
    transform: translateX(0);
    &.hide{
      transform: translateX(100%);
    }
    .coin{
      width: 69px;
      height: 69px;
      position: absolute;
    }
    .box{
      position: absolute;
      width: 69px;
      height: 69px;
    }
    .arraw{
      position: absolute;
      width: 9px;
      height: 9px;
      bottom: 9px;
      right: 11px;
    }
  }
</style>
