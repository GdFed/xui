<template>
  <div class="contain" :style="{background: bgStyle}">
    <skeleton selector="skeleton" loading="spin" :bgcolor="bgStyle" v-if="showSkeleton"></skeleton>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import crypto from '@/libs/crypto.standard'
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
      showSkeleton: true,
      time: 0,
      direct: 0,
      bgStyle: '',
      bgCode: '',
      esifData: '',
      locationData: '',
      formatMoney: 0
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
  },
  onLoad () {
    this.bgStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, .2)`
    this.bgCode = '#'.padEnd(7, Math.floor(Math.random() * 0xffffff).toString(16))
  },
  onHide () {
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
text{
  text-align: left;
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