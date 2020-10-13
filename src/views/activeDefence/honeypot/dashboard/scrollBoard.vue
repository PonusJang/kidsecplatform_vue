<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
export default {
  name: 'ScrollBoard',
  data() {
    return {
      config: {
        header: ['时间', 'IP', '地区', '服务'],
        data: [
          ['2019-07-01 19:25:00', '10.10.10.1', '5', 'SSH'],
          ['2019-07-02 17:25:00', '10.10.10.1', '13', 'SSH'],
          ['2019-07-03 16:25:00', '10.10.10.1', '6', 'SSH'],
          ['2019-07-04 15:25:00', '10.10.10.1', '2', 'SSH'],
          ['2019-07-05 14:25:00', '10.10.10.1', '1', 'SSH'],
          ['2019-07-06 13:25:00', '10.10.10.1', '3', 'SSH'],
          ['2019-07-07 12:25:00', '10.10.10.1', '4', 'SSH'],
          ['2019-07-08 11:25:00', '10.10.10.1', '2', 'SSH'],
          ['2019-07-09 10:25:00', '10.10.10.1', '5', 'SSH'],
          ['2019-07-10 09:25:00', '10.10.10.1', '3', 'SSH'],
          ['2019-07-10 09:25:00', '10.10.10.1', '3', 'SSH'],
          ['2019-07-10 09:25:00', '10.10.10.1', '3', 'SSH'],
          ['2019-07-10 09:25:00', '10.10.10.1', '3', 'SSH']
        ],
        index: true,
        columnWidth: [70, 250, 150, 150, 100],
        align: ['center'],
        rowNum: 10,
        headerBGC: '#1981f6',
        headerHeight: 45,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 50%;
  box-sizing: border-box;
  margin-left: 20px;
  height: 100%;
  overflow: hidden;
}
</style>
