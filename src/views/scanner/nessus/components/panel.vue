<template>
  <div class="placeholder-container">
    <el-row :gutter="10" class="panel-group">
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('intranet_IP')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              SSH
            </div>
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('internet_IP')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              FTP
            </div>
            <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('internet_site')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              Telnet
            </div>
            <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              Elastisearch
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              Mongo
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              MySQL
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              Memcached
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :lg="3" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-description">
            <div class="card-panel-text">
              TFTP
            </div>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-tooltip placement="top" content="tooltip">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50"
                   transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import BackToTop from '@/components/BackToTop'

  export default {
    components: {
      BackToTop,
      CountTo
    },
    data() {
      return {
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        }
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }


      .card-panel-description {
        float: none;
        font-weight: bold;
        margin: 26px;
        margin-left: 10px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
