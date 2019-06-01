<template>
  <div class="media">
    <div class="left">
      <img :src="item.img" alt="">
      <div class="info">
        <div class="top">{{item.top}}</div>
        <div class="bottom">{{item.bottom}}</div>
      </div>
    </div>
    <div class="right">
      <img :src="item.icon" alt="">
      <div class="tip">{{item.tip}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {// 授权 0不需要授权 1微信信息授权 2手机授权
      type: Object,
      default: {}
    }
  },
  computed: {
  },
  methods: {
    submit (res) {
      const { formId } = res.target
      console.log(formId)
    },
    handleTap () {
    }
  }
}
</script>

<style lang="scss" scoped>
.media{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>
