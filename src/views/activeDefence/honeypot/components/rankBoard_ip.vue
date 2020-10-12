<template>
  <div id="ranking-board">
    <div class="ranking-board-title">攻击Top10</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'RankingBoardIP',
  data() {
    return {
      config: {
        data: [
          {
            name: '10.10.8.10',
            value: 55
          },
          {
            name: '10.10.8.10',
            value: 120
          },
          {
            name: '10.10.8.10',
            value: 78
          },
          {
            name: '10.10.8.10',
            value: 66
          },
          {
            name: '10.10.8.10',
            value: 80
          },
          {
            name: '10.10.8.10',
            value: 45
          },
          {
            name: '10.10.8.10',
            value: 29
          },
          {
            name: '10.10.8.10',
            value: 29
          },
          {
            name: '10.10.8.10',
            value: 29
          },
          {
            name: '10.10.8.10',
            value: 29
          }
        ],
        rowNum: 10
      }
    }
  }
}
</script>

<style lang="less">
  #ranking-board {
    width: 20%;
 box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
   background-color: rgba(195, 199, 210, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;
    padding: 0px 30px;
    .ranking-board-title {
      font-weight: bold;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
    }
    .dv-scroll-ranking-board {
      flex: 1;
    }
  }
</style>
