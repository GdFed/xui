<template>
  <div class="contain">
   <canvas id="webgl" width="375" height="667"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three.js'
const ctx = wx.createCanvasContext('webgl')
let scene
let renderer
let camera
let cube
const {screenWidth, screenHeight} = wx.getSystemInfoSync()
export default {
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  onLoad () {
  },
  onHide () {
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  async onShow () {
    this.threeStart()
  },
  methods: {
    render () {
      requestAnimationFrame(this.render)
      cube.rotation.x += 0.1
      cube.rotation.y += 0.1
      renderer.render(scene, camera)
    },
    threeStart () {
      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000)

      renderer = new THREE.WebGLRenderer({ context: ctx })

      renderer.setSize(screenWidth, screenHeight)

      // document.body.appendChild(renderer.domElement)
      var geometry = new THREE.CubeGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      camera.position.z = 5
      this.render()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>