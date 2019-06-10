<template>
  <div class="contain">
    <skeleton selector="skeleton" loading="chiaroscuro" v-if="showSkeleton"></skeleton>
    <div class="skeleton">
      <div class="cates" v-if="cates.length">
        <div class="cate" :style="{width: 100/cates.length+'%'}" v-for="(cate, index) in cates" :key="index">
          <div class="skeleton-radius">{{cate}}</div>
        </div>
      </div>
      <div class="inner">
        <scroll-view class="brands" scroll-y>
          <div class="brand skeleton-radius" v-for="(brand, index) in brands" :key="index">{{brand}}</div>
        </scroll-view>
        <scroll-view class="products" scroll-y>
          <div class="product skeleton-rect" v-for="(product, index) in products" :key="index">{{product}}</div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from '@/components/skeleton'
export default {
  data () {
    return {
      showSkeleton: true,
      cates: ['手机', '平板', '笔记本', '相机'],
      brands: ['苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果', '苹果'],
      products: ['iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7', 'iPhone 7']
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
      // this.showSkeleton = false
    }, 1000)
    // setTimeout(() => {
    //   this.showSkeleton2 = false
    // }, 1500)
    // setTimeout(() => {
    //   this.showSkeleton3 = false
    // }, 3000)
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
    .cates{
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 1px 1px 10px 2px rgba(0,0,0,.1);
      .cate{
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        font-size: 14px;
        text-align: center;
        div{
          padding: 2px;
        }
      }
    }
    .inner{
      width: 100%;
      flex: 1;
      display: flex;
      align-content: center;
      justify-content: center;
      .brands{
        width: 100px;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        // box-shadow: 1px 10px 10px 2px rgba(0,0,0,.2);
        border-right: 1px solid #eee;
        .brand{
          font-size: 14px;
          height: 40px;
          margin: 12px;
        }
      }
      .products{
        // background: #eee;
        height: 100%;
        overflow: hidden;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .product{
          font-size: 14px;
          height: 40px;
          margin: 12px;
        }
      }
    }
  }
}
</style>