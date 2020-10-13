<template>
  <div id="ranking-board">
    <div class="ranking-board-title">攻击Top 10 地区</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'RankingBoard',
  data() {
    return {
      config: {
        data: [
          {
            name: '北京',
            value: 55
          },
          {
            name: '北京',
            value: 120
          },
          {
            name: '北京1',
            value: 78
          },
          {
            name: '北京',
            value: 66
          },
          {
            name: '北京',
            value: 80
          },
          {
            name: '北京',
            value: 45
          },
          {
            name: '北京',
            value: 29
          },
          {
            name: '1北京',
            value: 29
          },
          {
            name: '北京1',
            value: 29
          }
        ],
        rowNum: 9
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
  background-color: rgba(6, 30, 93, 0.5);
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
