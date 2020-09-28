<template>
  <div id="ranking-board">
    <div class="ranking-board-title">攻击Top10</div>
    <dv-scroll-ranking-board :config="config" style="width:500px;height:300px" />
  </div>
</template>

<script>
export default {
  name: 'RankingBoardLocation',
  data() {
    return {
      config: {
        data: [
          {
            name: '本地',
            value: 55
          },
          {
            name: '本地',
            value: 120
          },
          {
            name: '本地',
            value: 78
          },
          {
            name: '本地',
            value: 66
          },
          {
            name: '本地',
            value: 80
          },
          {
            name: '本地',
            value: 45
          },
          {
            name: '本地',
            value: 29
          },
          {
            name: '本地',
            value: 29
          },
          {
            name: '本地',
            value: 29
          },
          {
            name: '本地',
            value: 229
          }
        ],
        rowNum: 10
      }
    }
  }
}
</script>

<style lang="less">

</style>
