<template>
  <div id="app" class="app">
    <!--    <dv-full-screen-container>-->
    <top-header />
    <div class="main-content">
      <digitalFlop />
      <div class="block-left-right-content">
        <rankBoard_ip />
      </div>
      <div class="block-left-right-contents">
        <rankBoard_location />
      </div>
      <div class="block-left-right-contents">
        <scrollBoard />
      </div>
      <div class="block-left-right-contents">
        <polylineBoard />
      </div>
      <div />
    </div>
    <!--    </dv-full-screen-container>-->
  </div>
</template>

<script>

import topHeader from '../components/topHeader'
import digitalFlop from '../components/digitalFlop'
import rankBoard_ip from '../components/rankBoard_ip'
import rankBoard_location from '../components/rankBoard_location'
import scrollBoard from '../components/scrollBoard'
import polylineBoard from '../components/polylineBoard'

export default {
  components: {
    topHeader,
    digitalFlop,
    rankBoard_ip,
    rankBoard_location,
    scrollBoard,
    polylineBoard
  },
  data() {
    return {
      fullscreen: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
  #app {
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .block-left-right-content {
      flex: 1;
      display: flex;
      margin-top: 20px;
    }
    .block-top-bottom-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 20px;
    }
    .block-top-content {
      height: 55%;
      display: flex;
      flex-grow: 0;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
  }

</style>
