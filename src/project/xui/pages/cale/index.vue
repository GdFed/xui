<template>
  <div class="contain">
    <skeleton selector="skeleton" loading="chiaroscuro" v-if="showSkeleton"></skeleton>
    <div class="skeleton">
      <div class="cale">
        <img src="/static/img/jingbi.png" alt="" class="bg blur">
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from '@/components/skeleton'
export default {
  data () {
    return {
      showSkeleton: true
    }
  },
  components: {
    skeleton
  },
  computed: {
  },
  onLoad () {
  },
  onHide () {
  },
  async onShow () {
    setTimeout(() => {
      this.showSkeleton = false
    }, 1000)
  },
  methods: {
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
  .skeleton{
    height: 100vh;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    .blur{
      filter: blur('10px');
    }
  }
}
</style>