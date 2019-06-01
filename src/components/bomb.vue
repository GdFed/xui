<template>
  <div class="bomb">
    <div class="inner">
      <swiper :autoplay="true" 
              :interval="intervalTime"
              :duration="durationTime"
              :circular="true"
              :vertical="true"
              :display-multiple-items="multipleItems"
              @change="bindchange">
        <swiper-item @touchmove.stop="none;" v-for="(item, index) in list" :key="index">
          <div class="cont" :class="{next: currentIndex==index-1 || ((currentIndex==list.length-1)&&index==0), current: currentIndex==index, null: !item.avatar}">
            <img v-if="item.avatar" class="avatar" :src="item.avatar" alt="">
            <div v-if="item.userName" class="info">{{item.userName || ''}}</div>
            <div v-if="item.multiple" class="multiple">
              <slot :item="item"></slot>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: Array,
      multi: Number,
      interval: Number,
      duration: Number,
      tips: String
    },
    computed: {
      multipleItems () {
        return this.multi || 1
      },
      intervalTime () {
        return this.interval || 2000
      },
      durationTime () {
        return this.duration || 500
      }
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      bindchange (e) {
        this.currentIndex = e.mp.detail.current
      }
    }
  }
</script>

<style lang="scss" scoped>
.bomb{
  width: 100%;
  height: 42px;
  overflow-y: hidden;
  swiper{
    height: 100%;
    swiper-item{
      height: 100%;
      .cont{
        max-width: auto;
        height: 32px;
        margin: 5px 0;
        font-size: 12px;
        line-height: 32px;
        color: #2e2820;
        opacity: .9;
        box-sizing: border-box;
        background-image: linear-gradient(0deg, #ff8569 0%, #ffb598 86%), linear-gradient(#d1d1d1, #d1d1d1);
        background-blend-mode: normal, normal;
        border-radius: 32px;
        overflow: hidden;
        display: inline-block;
        .avatar{
          width: 23px;
          height: 23px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .info{
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
          vertical-align: middle;
        }
        .multiple{
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
