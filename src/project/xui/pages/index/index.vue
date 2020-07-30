<template>
  <div class="contain" :style="{background: bgStyle}">
    <skeleton selector="skeleton" loading="spin" :bgcolor="bgStyle" v-if="showSkeleton"></skeleton>
    <map id="stores"
        :scale="16"
        @markertap="markerTap"
        @callouttap="calloutTap"
        :show-location="true"
        :markers="markers"></map>
        <button class="btn" open-type="contact"  @tap.stop="none;">
                <span>联系客服</span>
              </button>
    <div class="skeleton">
      <div class="title">Welcome 2 X-Ui</div>
      <p>{{bgCode}} {{formatMoney}}</p>
      <div class="inner">
        <clock :time="time" :mini="false" :repeat="true" @timeover="timeover"></clock>
        <clock :time="time" :mini="true" :repeat="true" @timeover="timeover"></clock>
        <authBtn :authStatus="authStatus" @get="getData">授权{{authStatus}}</authBtn>
        <progressDiy :percent="70"></progressDiy>
        <delView @delete="deleteMe">右滑删除</delView>
        <div class="get-img" @click="getImg">获取图片</div>
        <!-- <jsonView v-model="esifData"></jsonView> -->
        <text space>{{esifData}}</text>
        <text space>{{locationData}}</text>
      </div>
    </div>
    <div class="blur">
      <div class="css">
        <div class="before" :style="beforeStyle"></div>
        hahah
      </div>
      <swiper @change="change" @animationfinish="animationfinish" @transition="transition" indicator-dots circular>
        <swiper-item @touchend="touchend" @touchstart="touchstart" v-for="(item,index) in swipers" :key="index">
          <img mode="widthFix" v-if="index%2==0" src="https://s1.huishoubao.com/iosjc/dev/img/201812141453331789-t1.jpg" alt="">
          <img mode="widthFix" v-else src="https://s1.huishoubao.com/iosjc/dev/img/201905221415043417-1558505704.png" alt="">
        </swiper-item>
      </swiper>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import crypto from '@/libs/crypto.standard'
import {hexToRgb, rgbToHex} from '@/libs/color'
import clock from '@/components/clock'
import progressDiy from '@/components/progress'
import authBtn from '@/components/auth-btn'
import delView from '@/components/del-view'
import jsonView from '@/components/json-view'
import skeleton from '@/components/skeleton'
import exif from '../../utils/exif'
import getAddress from '../../utils/gps2addr'
import {formatMoney, pretty} from '../../utils'
export default {
  data () {
    return {
      showSkeleton: false,
      time: 0,
      direct: 0,
      bgStyle: '',
      bgCode: '',
      esifData: '',
      locationData: '',
      formatMoney: 0,
      beforeStyle: '',
      swipers: ['#f4341a', '#a1d332', '#343458'],
      current: 0,
      canTouch: true,
      rgbs: [],
      markers: []
    }
  },
  components: {
    clock,
    authBtn,
    progressDiy,
    delView,
    jsonView,
    skeleton
  },
  computed: {
    ...mapGetters({
      needAuthInfo: 'needAuthInfo',
      needAuthTel: 'needAuthTel'
    }),
    ...mapState({
      userInfo: state => state.userInfo
    }),
    authStatus () {
      let authStatus = 0
      if (this.needAuthInfo) {
        authStatus = 1
      } else if (this.needAuthTel) {
        authStatus = 2
      }
      return authStatus
    }
    // bgStyle () {
    //   // let color = '#'.padEnd(7, Math.floor(Math.random() * 0xffffff).toString(16))
    //   return `background: rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, .2)`
    // }
    /**
{基本参数}
th:=max(o,c);
tl:=min(o,c);
{kdj}
short:=12;
long:=26;
mid:=9;
dif:=ema(c,short)-ema(c,long);
dea:=ema(dif,mid);
macd:=(dif-dea)*2;
{换手率}
hsl:=v/capital*100;
{ma}
ma5:=ma(c,5);
ma10:=ma(c,10);
ma20:=ma(c,20);
ma30:=ma(c,30);
{鸳鸯底}
lp4:=c/ref(c,1)<0.96&&c/o<0.97;
hp4:=c/ref(c,1)>1.04&&c/o>1.03;
鸳鸯底:ref(lp4,1)&&hp4&&v>ref(v,1);
{双峰贯耳}
hp6:=(c/ref(c,1)>1.06||c/o>1.06)&&c>ref(c,1)&&c>o;
hp7:=(c/ref(c,1)>1.07||c/o>1.07)&&c>ref(c,1)&&c>o;
dayshp6:=barslast(hp6);
dtSFGE:=hp7&&v>ref(v,dayshp6+1)&&o<ref(c,dayshp6+1)*0.97&&c>ref(o,dayshp6+1)*1.03;
双峰贯耳:dtSFGE&&ref(dayshp6,1)<15&&ref(dayshp6,1)>1;
{孤岛}
qd:=(th+h)<ref((tl+l),1)*0.99;
hd:=(tl+l)>ref((th+h),1)*1.01;
daysqd:=barslast(qd);
孤岛:hd&&daysqd<15&&th>hhv(c,5);
{8连阳回调20日均线}
8连阳:every(c>o,8);
{强势股回调}
强势股:count(c>o,15)>10;

     */
  },
  onLoad () {
    // this.bgStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, .2)`
    // this.bgCode = '#'.padEnd(7, Math.floor(Math.random() * 0xffffff).toString(16))
    // this.beforeStyle = `background-position: -38.5px -34.5px;
    //   background-image: url('https://s1.huishoubao.com/iosjc/dev/img/201812141453331789-t1.jpg');`
    this.mapCtx = wx.createMapContext('stores')
    this.bgStyle = `${this.swipers[this.current]}`
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        console.log(res)
        const {longitude, latitude} = res
        that.markers.push({
          id: 1,
          longitude,
          latitude,
          iconPath: require('&/static/img/jingbi.png'),
          width: 15,
          height: 15,
          callout: {
            content: '多岁的\n\n河北省石家庄市裕华区裕东街道鑫利国际广场B座鑫科国际广场\n\n距您0.02km\t\t立即预约',
            bgColor: '#ffffff',
            padding: 6,
            fontSize: 12
          }
        })
        that.mapCtx.includePoints({
          padding: [50, 50, 20, 50],
          points: [{longitude, latitude}]
        })
      }
    })
  },
  onHide () {
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  async onShow () {
    this.formatMoney = formatMoney(1)
    let res = await this.$func('uploadImg', {})
    console.log(res)
    setTimeout(() => {
      this.showSkeleton = false
    }, 2000)
  },
  methods: {
    touchend (e) {
      // console.log('touchend')
      this.touchStatus = false
    },
    touchstart (e) {
      // console.log('touchstart')
      this.touchStatus = true
    },
    change (e) {
      console.log('change', e)
      if (e.mp.detail.source === 'touch') {
        this.canTouch = false
        this.bgStyle = this.swipers[e.mp.detail.current]
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.swipers[e.mp.detail.current],
          success: res => {}
        })
      }
    },
    animationfinish (e) {
      // console.log('animationfinish', e)
      this.current = e.mp.detail.current
      if (e.mp.detail.source === 'touch') {
        this.canTouch = true
        this.bgStyle = this.swipers[this.current]
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.swipers[this.current],
          success: res => {}
        })
      }
    },
    transition (e) {
      // console.log(e)
      if (this.canTouch === false && this.touchStatus === false) return
      let dx = e.mp.detail.dx
      if (dx === 0) {
        this.bgStyle = this.swipers[this.current]
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.swipers[this.current],
          success: res => {}
        })
        return
      }
      let i = Math.round(Math.abs(dx)) > 375 ? 375 : Math.round(Math.abs(dx))
      let next = dx > 0 ? (this.current + 1) % this.swipers.length : (this.current + this.swipers.length - 1) % this.swipers.length
      // console.log(next, i)
      // 将 hex 转换为rgb
      let sColor = hexToRgb(this.swipers[this.current])
      let eColor = hexToRgb(this.swipers[next])
      // 计算R\G\B每一步的差值
      let rStep = (eColor[0] - sColor[0]) / 375
      let gStep = (eColor[1] - sColor[1]) / 375
      let bStep = (eColor[2] - sColor[2]) / 375
      let rgb = rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2]))
      this.bgStyle = rgb
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: rgb,
        success: res => {}
      })
      // this.beforeStyle = `background-position: ${-38.5 - dx}px -34.5px;
      // background-image: url('${this.current % 2 ? 'https://s1.huishoubao.com/iosjc/dev/img/201812141453331789-t1.jpg' : 'https://s1.huishoubao.com/iosjc/dev/img/201905221415043417-1558505704.png'}');`
    },
    getImg () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: async res => {
          // tempFilePath可以作为img标签的src属性显示图片
          let esifRes = await exif(res.tempFilePaths[0])
          console.log(esifRes)
          this.esifData = pretty(esifRes.exifdata)
          // wannaData.GPSAltitude = esifData.GPSAltitude // 海拔
          // wannaData.GPSDestBearing = esifData.GPSDestBearing // 目标方位
          // wannaData.GPSDestDistance = esifData.GPSDestDistance // 目标距离
          // wannaData.GPSLatitudeRef = esifData.GPSLatitudeRef
          // wannaData.GPSLatitude = esifData.GPSLatitude // 纬度
          // wannaData.GPSLongitudeRef = esifData.GPSLongitudeRef
          // wannaData.GPSLongitude = esifData.GPSLongitude // 经度
          // wannaData.DateTimeOriginal = esifData.DateTimeOriginal // 创建时间
          // wannaData.Make = esifData.Make // 生产者
          // wannaData.Model = esifData.Model // 型号
          // wannaData.Orientation = esifData.Orientation // 拍摄方向
          // wannaData.ResolutionUnit = esifData.ResolutionUnit // 分辨率单位
          // wannaData.PixelXDimension = esifData.PixelXDimension // 图像的有效宽度
          // wannaData.PixelYDimension = esifData.PixelYDimension // 图像的有效高度
          let locationRet = await getAddress(esifRes.exifdata)
          console.log(locationRet)
          if (+locationRet.status === 0) {
            this.locationData = pretty(locationRet.result)
            // wannaData.address = locationData.address
            // wannaData.address_component = locationData.address_component
            // wannaData.ad_info = locationData.ad_info
          }
        }
      })
    },
    deleteMe () {
      wx.showToast({
        title: '删除成功',
        icon: 'success'})
      wx.navigateTo({ url: '/pages/list/main' })
    },
    async getData (res) {
      if (res) {
        let {code, encryptedData, iv, userInfo} = res
        if (userInfo) {
          this.$store.commit('setUserInfo', Object.assign({...this.userInfo}, {...userInfo}))
        }
        let ret = await crypto({appid: this.$conf.appid, secret: this.$conf.secret, code, encryptedData, iv})
        this.$store.commit('setUserInfo', Object.assign({...this.userInfo}, {...ret}))
      }
    },
    timeover () {
      // this.time = parseInt(Math.random() * 10000 + 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
map{
    width: 100%;
    height: 400px;
  }
text{
  text-align: left;
}
.blur{
  position: relative;
  .css{
    line-height: 80px;
    text-align: center;
    font-size: 14px;
    color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 80px;
    border-radius: 40px;
    background: rgba(0,0,0,.2);
    overflow: hidden;
    z-index: 9;
    .before{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      filter: blur(5px);
      background-size: 375px 127.11px;
      background-position: -38.5px -34.5px;
      // background-attachment: fixed;
      z-index: -1;
    }
  }
  img{
    position: relative;
    width: 375px;
  }
}
.contain{
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  .skeleton{
    min-height: 100vh;
    box-sizing: border-box;
    .title{
      padding: 12px 0;
    }
    .inner{
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      .get-img{
        margin: 12px auto;
        width: 100px;
        box-sizing: border-box;
        padding: 12px;
        box-shadow: 5px 0px 20px 5px rgba(10,10,10,.1);
      }
    }
  }
}
</style>