<template>
  <div :id="id" />
</template>

<script>

import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

import { mapState } from 'vuex'

import { EventEnum } from '@/core/channel/event/EventEnum'
import { BarSizeEnum } from '@/core/channel/enums/mktdata/BarSizeEnum'
import { WhatToShowEnum } from '@/core/channel/enums/mktdata/WhatToShowEnum'

import { PageCancelSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageCancelSubscribeCommand'
import { PageSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageSubscribeCommand'
import { HistoricalDataCommand } from '@/core/channel/dto/mktdata/command/HistoricalDataCommand'

const subscribeEvent = [EventEnum.historicalMktData, EventEnum.incrementalHistoricalMktData]
var subscribeEventSet = new Set()

stockInit(Highcharts)

Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: ''
  },
  global: { useUTC: false }
})
export default {
  name: 'HChart',
  components: {
    highcharts: Chart
  },
  props: {
    id: {
      type: String,
      default: function() {
        return ''
      }
    },
    queryParams: {
      type: Object,
      default: function() {
        return {
          barSize: BarSizeEnum._1_day,
          whatToShows: [WhatToShowEnum.TRADES]
        }
      }
    }
  },
  data() {
    return {
      hcInstance: null,
      chartOptions: {
        rangeSelector: {
          selected: 0,
          allButtonsEnabled: true,
          inputDateFormat: '%Y-%m-%d',
          buttons: [
            {
              type: 'hour',
              count: 1,
              text: '1 h'
            },
            {
              type: 'day',
              count: 1,
              text: '1 d'
            },
            {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'month',
              count: 3,
              text: '3m'
            }, {
              type: 'month',
              count: 6,
              text: '6m'
            }, {
              type: 'ytd',
              text: 'YTD'
            }, {
              type: 'year',
              count: 1,
              text: '1y'
            }, {
              type: 'all',
              text: 'All'
            }]
        },
        title: {
          text: '标题'
        },
        xAxis: {
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%y-%m',
            year: '%Y'
          }
        },
        plotOptions: {
          series: {
            showInLegend: true
          }
        },
        tooltip: {
          split: false,
          shared: true
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: '股价'
          },
          height: '65%',
          resize: {
            enabled: true
          },
          lineWidth: 2
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: '成交量'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        series: [{
          type: 'candlestick',
          name: '平安银行',
          color: 'green',
          lineColor: 'green',
          upColor: 'red',
          upLineColor: 'red',
          tooltip: {
          },
          navigatorOptions: {
            color: Highcharts.getOptions().colors[0]
          },
          data: [],
          id: 'sz'
        }, {
          type: 'column',
          data: [],
          yAxis: 1
        }]
      },
      methods: {
        myCallback() {
          console.log('this is callback function')
        }
      }
    }
  },
  computed: {
    ...mapState({
      sunClient: state => state.client.sunClient,
      historicalMktDataMap: state => state.historical_mktdata.historicalMktDataMap,
      incrementalHistoricalMktDataMap: state => state.historical_mktdata.incrementalHistoricalMktDataMap,
      initTrack: state => state.historical_mktdata.initTrack,
      updateTrack: state => state.historical_mktdata.updateTrack
    })
  },
  watch: {
    initTrack(newValue, oldValue) {
      const datas = this.historicalMktDataMap.get(this.conId + '_' + this.queryParams.barSize + '_' + this.queryParams.whatToShows)
      for (const e of datas.values()) {
        this.hcInstance.series[0].addPoint([e.time, e.open, e.high, e.low, e.close], false)
        this.hcInstance.series[1].addPoint([e.time, e.volume], false)
      }
      this.hcInstance.redraw()
    },
    updateTrack(newValue, oldValue) {
      const datas = this.incrementalHistoricalMktDataMap.get(this.conId + '_' + this.queryParams.barSize + '_' + this.queryParams.whatToShows)
      console.log(datas)
      for (const e of datas.entries()) {
        const val = e[1]
        this.hcInstance.series[0].addPoint([val.time, val.open, val.high, val.low, val.close], true)
        this.hcInstance.series[1].addPoint([val.time, val.volume], true)
        datas.delete(e[0])
      }
    }
  },
  created() {
    this.conId = parseInt(this.$route.query.conId)
    console.log(this.queryParams)
    const sendMessage = new PageSubscribeCommand()
    subscribeEvent.forEach((e) => subscribeEventSet.add({ 'action': e, 'primerId': this.conId }))
    sendMessage.actions = Array.from(subscribeEventSet)
    this.sunClient.send(JSON.stringify(sendMessage))

    this.queryParams.whatToShows.forEach((e) => {
      const sendHistoricalDataMessage = new HistoricalDataCommand()
      sendHistoricalDataMessage.conId = this.conId
      sendHistoricalDataMessage.barSize = this.queryParams.barSize
      sendHistoricalDataMessage.whatToShow = e
      this.sunClient.send(JSON.stringify(sendHistoricalDataMessage))
    })
  },
  mounted() {
    this.hcInstance = Highcharts.stockChart(this.id, this.chartOptions)
  },
  beforeDestroy() {
    const sendMessage = new PageCancelSubscribeCommand()
    sendMessage.actions = Array.from(subscribeEventSet)
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  methods: {
  }
}
</script>

<style>
.highcharts-container {
  width: 600px;
  height: 400px;
  border: 1px solid #ddd;
  margin: auto;
}
</style>
