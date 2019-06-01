<template>
  <div class="botttom-bar" :class="{iphoneX}">
    <div v-for="item in tabsList" :key="item" class="tab" @click="switchTab(item.status)" :class="{checked: tabStatus==item.status}">
      <form
        report-submit
        @submit="submit">
        <button
          class="btn"
          :open-type="openType"
          form-type="submit"
          plain
          :disabled="!buttonAuthAllowClick || authCodeLoading"
          @getuserinfo="onGetUserInfo">
          <img v-if="tabStatus==item.status" :src="item.checkedIcon" alt="">
          <img v-else :src="item.icon" alt="">
          <p>{{item.text}}</p>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
  },
  data () {
    return {
      tabsList: [
        {
          icon: require('../static/img/home_icon_nor@2x.png'),
          checkedIcon: require('../static/img/home_icon_sel@2x.png'),
          text: '首页',
          status: 1
        },
        {
          icon: require('../static/img/my_icon_nor@2x.png'),
          checkedIcon: require('../static/img/my_icon_sel@2x.png'),
          text: '我的',
          status: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      needGetUnionId: 'user/needGetUnionId'
    }),
    ...mapState({
      iphoneX: state => state.iphoneX,
      tabStatus: state => state.tabStatus,
      authCodeLoading: state => state.user.authCodeLoading,
      buttonAuthAllowClick: state => state.user.buttonAuthAllowClick
    }),
    openType () {
      return this.needGetUnionId ? 'getUserInfo' : ''
    }
  },
  methods: {
    submit (res) {
      const { formId } = res.target
      this.$apis.reportFormId({ formId })
    },
    switchTab (status) {
      if (this.tabStatus === status) return
      if (status === 1 && !this.needGetUnionId) {
        this.$store.commit('setTabStatus', 1)
        wx.reLaunch({ url: '/pages/index/main' })
      }
      if (status === 2 && !this.needGetUnionId) {
        this.$store.commit('setTabStatus', 2)
        wx.reLaunch({ url: '/pages/account/main' })
      }
    },
    async onGetUserInfo (res) {
      const { errMsg } = res.target
      if (errMsg === 'getUserInfo:fail user deny') {
        wx.showModal({
          title: '系统提示',
          content: '您拒绝了授权，请重试',
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        await this.$store.dispatch('user/getAuthCode')
        await this.$store.dispatch('user/onButtonGetUserInfo', res)
        if (this.tabStatus === 1 && !this.needGetUnionId) {
          this.$store.commit('setTabStatus', 1)
          wx.reLaunch({ url: '/pages/index/main' })
        }
        if (this.tabStatus === 2 && !this.needGetUnionId) {
          this.$store.commit('setTabStatus', 2)
          wx.reLaunch({ url: '/pages/account/main' })
        }
      }
      await this.$store.dispatch('user/getAuthCode')
    }
  }
}
</script>

<style lang="scss" scoped>
.botttom-bar{
  background: #fff;
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  line-height: 49px;
  font-size: 16px;
  color: #333333;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &.iphoneX{
    padding-bottom: 34px;
    /deep/ .add-article {
      bottom: 46px;
    }
  }
  /deep/ .add-article {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
  }
  .tab{
    width: 50%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #999;
    &.checked{
      img{
        // background: red;
      }
      p{
        color: #333;
      }
    }
    img{
      // background: #333;
      width: 24px;
      height: 24px;
    }
    p{
      color: #999;
      font-size: 10px;
      font-weight: bold;
      line-height: 1.6;
    }
  }
  .btn{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    font-size: 33px;
    line-height: 44px;
    font-weight: lighter;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &[disabled]{
      background: transparent;
    }
    ::after{
      border: none;
    }
  }
}

</style>
