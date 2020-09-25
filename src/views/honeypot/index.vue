<template>
  <div id="app" class="app">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
      <top-header />
      <digitalFlop />
    </fullscreen>
    <button type="button" @click="toggle">Fullscreen</button>
  </div>
</template>

<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'

import topHeader from './components/topHeader'
import digitalFlop from './components/digitalFlop'

Vue.use(fullscreen)
export default {
  components: {
    topHeader,
    digitalFlop
  },
  data() {
    return {
      fullscreen: false
    }
  },
  methods: {
    toggle() {
      this.$refs['fullscreen'].toggle() // recommended
      this.$refs['fullscreen'].background = '#ffffff'
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    }
  }
}
</script>

<style scoped>

</style>
