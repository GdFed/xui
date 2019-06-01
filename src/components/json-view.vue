<template>
  <div class="json-view">
    <!-- {{value}} -->
    <div v-for="(item, key) in objValue" :key="key">
      <div v-if="item.length">
        <div v-for="(item1, key1) in item" :key="key1">
          <p>{{key1}}: {{item1}}</p>
        </div>
      </div>
      <p>{{key}}: {{item}}</p>
    </div>
  </div>
</template>

<script>
import jsonView from './json-view'
export default {
  data () {
    return {
    }
  },
  props: {
    value: {// json
      type: [Object, String],
      default: {}
    }
  },
  components: {
    jsonView
  },
  computed: {
    objValue () {
      let objValue = {}
      if (this.value && typeof this.value === 'string') {
        objValue = JSON.parse(this.value)
      } else {
        objValue = this.value || {}
      }
      // Object.entries()
      return objValue
    },
    objValueDeep () {
      return this.getDeeps(this.objValue, true)
    }
  },
  methods: {
    getDeeps (obj) {
      let walk = []
      ;(function walkTree (obj, deeppath) {
        if (Object.prototype.toString.call(obj) !== '[object Object]') {
          return walk.push(deeppath)
        }
        for (var i in obj) {
          walkTree(obj[i], deeppath + '.' + i)
        }
      })(obj, '')
      return Math.max.apply(null, walk.map(function (n) {
        return n.split('.').length
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.json-view{
  width: 100%;
  box-sizing: border-box;
  padding: 24px 12px;
  word-break: break-all;
  text-align: left;
  p{
    padding: 2px;
  }
}
</style>
