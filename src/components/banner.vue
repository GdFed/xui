<template>
  <div class="banner" v-if="list.length">
    <swiper
      class="swiper"
      :autoplay="true"
      interval="2000"
      :indicator-color="indicatorColor"
      :indicator-active-color="indicatorActiveColor"
      :indicator-dots="false"
      :current="currentSwiper"
      @change="onChange"
      :circular="true"
    >
      <div @click="switchPage(item)" v-for="item in list" :key="item.url">
        <swiper-item>
          <img class="slide-image" :src="item.src">
        </swiper-item>
      </div>
    </swiper>
    <view class="dots">  
      <block v-for="(item, index) in list" :key="index">
        <view class="dot" :class="{'active': index === currentSwiper}"></view>  
      </block>  
    </view>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    'indicator-active-color': '#fff',
    'indicator-color': 'rgba(0, 0, 0, .3)'
  },
  data () {
    return {
      currentSwiper: 0
    }
  },
  methods: {
    switchPage (item) {
      let urlArr = item.url.split('?')
      if (urlArr[0] === 'othermini') {
        let obj = {}
        let objArr = urlArr[1].split('&')
        for (let i = 0; i < objArr.length; i++) {
          let param = objArr[i].split('=')
          obj[param[0]] = param[1]
        }
        wx.navigateToMiniProgram({
          appId: obj.appid,
          path: obj.path,
          success (res) {
            console.log(res)
          }
        })
      } else {
        wx.navigateTo({ url: item.url })
      }
    },
    onChange (event) {
      this.currentSwiper = event.target.current
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  padding: 0 20px;
  padding-top: 10px;
}

.swiper {
  width: 100%;
  height: 220px;
  border-radius: 4px;
}

.slide-image {
  width: 100%;
  height: 100%;
}

.dots {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 16px;
}

.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 0 3px;
  opacity: .6;
  background: #fff;
  &.active {
    width: 8px;
    opacity: 1;
    border-radius: 2px;
  }
}
</style>
