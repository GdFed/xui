<template>
  <div class="bar">
      <img class="back" v-if="back" @click="$wxs.navigateBack()" src="../static/img/back.png" alt="">
      <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    back: Boolean,
    title: String
  }
}
</script>

<style lang="scss" scoped>
.bar{
    z-index: 2;
    position: fixed;
    top: 20px;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #333333;
    text-align: center;
    .back{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 24px;
      height: 24px;
      // background: #000;
    }
  }
</style>
