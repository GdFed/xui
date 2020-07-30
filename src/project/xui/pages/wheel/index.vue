<template>
  <div class="contain">
    <canvas canvas-id='bgCanvas' id='canvas-bg' class='canvasII'></canvas>
    <div class='canvasI' :style="{transform: 'rotate('+isRotate+'deg)'}">
      <canvas canvas-id='canvasI' id="canvas-one" class='canvasI'></canvas>
    </div>
    <img class='start' src="../../static/img/start.png" @tap='start'/>
  </div>
</template>

<script>
const ctx = wx.createCanvasContext('canvasI') // 创建id为canvasI的绘图
const ctx2 = wx.createCanvasContext('bgCanvas')// 创建id为bgCanvas的背景绘图
var lamp = 0 // 判断跑马灯闪烁标记
var w2 = ''
var h2 = ''
var w1 = ''
var h1 = ''
export default {
  data () {
    return {
      // itemsNum: 7, // 大转盘等分数
      // itemsArc: 0, // 大转盘每等分角度
      color: ['#FFB932', '#FFD57C'], // 扇形的背景颜色交替；
      lightColor: ['#FBF1A9', '#FBB936'], // light颜色交替；
      bgColor: ['#DF1E14', '#F5AD26'], // 背景颜色；
      prizes: [
        {
          text: '外卖',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: 'DIY',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '下馆子',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '不吃',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '吃别人家',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '请客',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '别人做',
          pic: require('../../static/img/quan.jpg')
        },
        {
          text: '再来一次',
          pic: require('../../static/img/quan.jpg')
        }
      ], // 每个扇形中的文字填充
      isRotate: 0,
      bingoIndex: 0
    }
  },
  computed: {
    itemsNum () {
      return this.prizes.length
    },
    itemsArc () {
      return 360 / this.itemsNum
    }
  },
  onLoad () {
    wx.createSelectorQuery().select('#canvas-bg').boundingClientRect(rect => { // 监听canvas的宽高
      w2 = parseInt(rect.width / 2) // 获取canvas宽度的一半；
      h2 = parseInt(rect.height / 2) // 获取canvas高度的一半
      console.log('w2,h2', w2, h2) // 获取canvas宽高一半的原因是为了便于找到中心点
      this.mytime = setInterval(this.light, 1000) // 启动跑马灯定时器。
    }).exec()
    wx.createSelectorQuery().select('#canvas-one').boundingClientRect(rect => {
      w1 = parseInt(rect.width / 2)
      h1 = parseInt(rect.height / 2)
      console.log('w1,h1', w1, h1)
      this.drawPrize() // 每一份扇形的内部绘制。
    }).exec()
  },
  onHide () {
    clearInterval(this.mytime)
  },
  onUnload () {
    clearInterval(this.mytime)
  },
  async onShow () {
  },
  methods: {
    start () {
      this.bingo(3)
    },
    bingo (index) { // 点击抽奖按钮, 为了达到慢速开始慢速结束的效果，在这里使用css3的过渡效果
      console.log('start')
      let itemsNum = this.itemsNum
      let itemsArc = this.itemsArc
      let oldIndex = this.isRotate % 360 / itemsArc
      let randomNum = 0
      if (typeof index === 'undefined') {
        // 随机获奖结果
        randomNum = parseInt((Math.random() + 2) * itemsNum)
      } else {
        // 指定获奖结果
        randomNum = (parseInt(Math.random() * 2 + 3) * itemsNum - index - oldIndex)
      }
      console.log(randomNum)
      this.isRotate += randomNum * itemsArc
    },
    light () { // 跑马灯的绘制
      let itemsNum = this.itemsNum
      ctx2.beginPath()
      ctx2.arc(w2, h2, w2, 0, 2 * Math.PI) // 绘制底色为红色的圆形
      ctx2.setFillStyle(this.bgColor[0])
      ctx2.fill()
      ctx2.beginPath()
      ctx2.arc(w2, h2, w2 - 15, 0, 2 * Math.PI) // 绘制底色为深黄的圆形
      ctx2.setFillStyle(this.bgColor[1])
      ctx2.fill()
      lamp++
      for (let i = 0; i < itemsNum * 2; i++) { // 跑马灯小圆圈比大圆盘等分数量多一倍。
        ctx2.save()
        ctx2.beginPath()
        ctx2.translate(w2, h2)
        ctx2.rotate((this.itemsArc / 2) * i * Math.PI / 180)
        ctx2.arc(0, w2 - 15, 8, 0, 2 * Math.PI) // 绘制坐标为(0,-135)的圆形跑马灯小圆圈。
        // 跑马灯第一次闪烁时与第二次闪烁时绘制相反的颜色，再配上定时器循环闪烁就可以达到跑马灯一闪一闪的效果了。
        if (lamp % 2 === 0) { // 第一次闪烁时偶数奇数的跑马灯各绘制一种颜色
          if (i % 2 === 0) {
            ctx2.setFillStyle(this.lightColor[0])
          } else {
            ctx2.setFillStyle(this.lightColor[1])
          }
        } else { // 第二次闪烁时偶数奇数的跑马灯颜色对调。
          if (i % 2 === 0) {
            ctx2.setFillStyle(this.lightColor[1])
          } else {
            ctx2.setFillStyle(this.lightColor[0])
          }
        }
        ctx2.fill()
        ctx2.restore() // 恢复之前保存的上下文，可以将循环出来的跑马灯都保存下来。没有这一句那么每循环出一个跑马灯则上一个跑马灯绘图将被覆盖，
      }
      ctx2.draw()
    },
    drawPrize () { // 绘制奖品
      let prizes = this.prizes // 放奖品的数组
      let itemsArc = this.itemsArc
      for (let i = 0; i < prizes.length; i++) {
        // 绘制扇形
        ctx.beginPath()
        ctx.moveTo(w1, h1)
        ctx.arc(w1, h1, w1 - 10, (itemsArc * (i - 0.5) - 90) * Math.PI / 180, (itemsArc + (itemsArc * (i - 0.5) - 90)) * Math.PI / 180)// 绘制扇形，注意下一个扇形比上一个扇形多一个itemsArc的角度。
        ctx.closePath()
        ctx.setFillStyle(this.color[i % 2])// 绘制偶数扇形和奇数扇形的颜色不同
        ctx.fill()
        // 绘制文字与图片
        ctx.save()
        ctx.beginPath()
        ctx.setFontSize(12)// 设置文字字号大小
        ctx.setFillStyle('#000')// 设置文字颜色
        ctx.setTextAlign('center')// 使文字垂直居中显示
        ctx.setTextBaseline('middle')// 使文字水平居中显示
        ctx.translate(w1, h1)
        ctx.rotate(itemsArc * i * Math.PI / 180)
        // prizes[i].pic && ctx.drawImage(prizes[i].pic, -(w1 * 0.2), -(h1 * 0.6), (w1 * 0.4), (h1 * 0.2))
        prizes[i].text && ctx.fillText(prizes[i].text, 0, -(h1 * 0.7))
        ctx.restore()
      }
      ctx.draw(true)// 参数为true的时候，保存当前画布的内容，继续绘制
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
}
.canvasI{
  width: 250px;
  height: 250px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  transition:all 3s ease;
}
.canvasII{
  width: 300px;
  height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
}
.start{
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
}
</style>