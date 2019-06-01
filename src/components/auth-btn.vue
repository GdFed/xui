<template>
  <div class="form">
    <form
      report-submit
      @submit="submit">
      <button
        class="btn"
        :open-type="openType"
        form-type="submit"
        plain
        :disabled="authing"
        @click="handleTap"
        @getuserinfo="onGetUserInfo"
        @getphonenumber="onGetPhoneNumber">
        <slot></slot>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authing: false
    }
  },
  props: {
    authStatus: {// 授权 0不需要授权 1微信信息授权 2手机授权
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    openType () {
      let openType = ''
      if (+this.authStatus === 1) {
        openType = 'getUserInfo'
      } else if (+this.authStatus === 2) {
        openType = 'getPhoneNumber'
      }
      return openType
    }
  },
  methods: {
    submit (res) {
      const { formId } = res.target
      console.log(formId)
    },
    handleTap () {
      if (this.openType) return
      this.$emit('get')
    },
    async onGetPhoneNumber (res) {
      this.authing = true
      const { errMsg, encryptedData, iv } = res.target
      if (errMsg !== 'getPhoneNumber:ok') {
        wx.showToast({
          title: '授权失败,请稍后再试~',
          icon: 'none'})
        this.authing = false
      } else {
        let code = await this.getAuthCode()
        this.authing = false
        this.$emit('get', {code, encryptedData, iv})
      }
    },
    async onGetUserInfo (res) {
      this.authing = true
      const { userInfo, errMsg, encryptedData, iv } = res.target
      if (errMsg !== 'getUserInfo:ok') {
        wx.showToast({
          title: '授权失败,请稍后再试~',
          icon: 'none'})
        this.authing = false
      } else {
        let code = await this.getAuthCode()
        this.authing = false
        this.$emit('get', {code, userInfo, encryptedData, iv})
      }
    },
    getAuthCode () {
      return new Promise((resolve, reject) => {
        wx.login({
          success (res) {
            if (res.code) {
              resolve(res.code)
            } else {
              wx.showToast({
                title: res.errMsg,
                icon: 'none'})
              reject(res)
            }
          },
          fail (res) {
            wx.showToast({
              title: '授权失败,请稍后再试~',
              icon: 'none'})
            reject(res)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
