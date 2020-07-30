<template>
  <div class="contain">
    <div class="num">命中：{{precent}}</div>
    <div class="num">分数：{{num}}</div>
    <div class="time">时间：{{time}}</div>
    <div class="again" @click="init">Again</div>
    <div :class="[item.class, 'rain']" v-for="(item, index) in rain" :key="index" :style="item.style">
      <img :src="item.src" @click="addOne(index)" alt="">
      <!-- <div class="num">+{{item.num}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rain: [],
      imgs: [require('../../static/img/jingbi.png'), require('../../static/img/red.png')],
      num: 0,
      time: 20
    }
  },
  computed: {
    rainlength () {
      return this.rain.length
    },
    gameOverStatus () {
      return this.time === 0
    },
    precent () {
      let numerator = 0
      let denominator = this.rainlength
      this.rain.forEach(item => {
        if (item.style.indexOf('display') !== -1) {
          numerator++
        }
      })
      return `${numerator}/${denominator}`
    }
  },
  watch: {
    rainlength (val) {
      val && this.rain.forEach(item => {
        if (item.style.indexOf('top') !== -1) return
        setTimeout(() => {
          item.style += 'top: 100%;'
        }, Math.random() * 200)
      })
    }
  },
  onLoad () {
    this.init()
  },
  onHide () {
    clearInterval(this.timer)
    clearInterval(this.goTimer)
  },
  onUnload () {
    clearInterval(this.timer)
    clearInterval(this.goTimer)
  },
  async onShow () {
  },
  methods: {
    init () {
      this.rain = []
      this.num = 0
      this.time = 20
      this.timgGo()
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let red = Math.random() > 0.8
        this.rain.push({
          style: this.raining(red),
          src: red ? this.imgs[1] : this.imgs[0],
          class: red ? 'red' : 'coin',
          num: red ? parseInt(Math.random() * 3 + 2) * 10 : parseInt(Math.random() * 9 + 2)
        })
      }, (Math.random() * 0.6 + 0.4 + parseInt(this.rainlength / 3)) * 600)
    },
    timgGo () {
      clearInterval(this.goTimer)
      this.goTimer = setInterval(() => {
        this.time--
        if (this.time <= 0) {
          clearInterval(this.goTimer)
          clearInterval(this.timer)
        }
      }, 1000)
    },
    addOne (index) {
      this.num += this.rain[index].num
      this.rain[index].style = 'display: none;'
      setTimeout()
    },
    raining (red) {
      let left = parseInt(Math.random() * 275) + 50
      let time = red ? parseInt(Math.random() + 1) : parseInt(Math.random() * 2 + 2)
      let rotate = parseInt(Math.random() * 60) - 60
      return `left:${left}px;transform: rotate(${rotate}deg);transition:all ${time}s linear;`
    }
  }
}
</script>

<style lang="scss" scoped>
.contain{
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  .again{
    position: fixed;
    top: 12px;
    left: 12px;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    border: 1px solid #333;
  }
  .rain{
    position: absolute;
    width: 30px;
    height: 30px;
    top: -50px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.red{
      width: 60px;
      height: 60px;
    }
    img{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .num{
      position: absolute;
      font-size: 12px;
      color: #000;
      // margin-bottom: 6px;
      opacity: 1;
    }
  }
}
</style>