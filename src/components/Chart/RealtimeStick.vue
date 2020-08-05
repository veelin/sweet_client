<template>
  <div :id="id" />
</template>

<script>

import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'

import { mapState } from 'vuex'
import store from '@/store'

import { EventEnum } from '@/core/channel/event/EventEnum'

import { PageCancelSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageCancelSubscribeCommand'
import { PageSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageSubscribeCommand'
import { TickDataCommand } from '@/core/channel/dto/mktdata/command/TickDataCommand'
import { TickTypeEnum } from '@/core/channel/enums/mktdata/TickTypeEnum'
const subscribeEvent = [EventEnum.topMktData, EventEnum.tickMktData, EventEnum.incrementalTopMktData]
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
    }
  },
  data() {
    return {
      hcInstance: null,
      chartOptions: {
        rangeSelector: {
          selected: 1,
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
          text: '阿里巴巴'
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
          name: '阿里巴巴',
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
      tickDataMap: state => state.top_mktdata.tickDataMap,
      incrementalTickDataMap: state => state.top_mktdata.incrementalTickDataMap,
      tickDataInitTrace: state => state.top_mktdata.tickDataInitTrace,
      tickDataUpdateTrace: state => state.top_mktdata.tickDataUpdateTrace
    })
  },
  watch: {
    tickDataInitTrace(newValue, oldValue) {
      const datas = this.tickDataMap.get(this.conId)
      for (const entry of datas.entries()) {
        if (entry[0] === TickTypeEnum.lastPrice) {
          for (const e of entry[1].entries()) {
            this.hcInstance.series[0].addPoint([e[0], e[1]], false)
          }
        }
      }
      this.hcInstance.redraw()
    },
    tickDataUpdateTrace(newValue, oldValue) {
      const datas = this.incrementalTickDataMap.get(this.conId)
      for (const entry of datas.entries()) {
        if (entry[0] === TickTypeEnum.lastPrice) {
          for (const e of entry[1].entries()) {
            this.hcInstance.series[0].addPoint([e[0], e[1]])
            entry[1].delete(e[0])
            console.log(entry[1])
          }
        }
      }
    }
  },
  created() {
    this.conId = parseInt(this.$route.query.conId)
    const sendMessage = new PageSubscribeCommand()
    subscribeEvent.forEach((e) => subscribeEventSet.add({ 'action': e, 'primerId': this.conId }))
    sendMessage.actions = Array.from(subscribeEventSet)
    this.sunClient.send(JSON.stringify(sendMessage))

    const sendTickDataCommand = new TickDataCommand()
    sendTickDataCommand.conId = this.conId
    sendTickDataCommand.field = [TickTypeEnum.lastPrice, TickTypeEnum.lastSize]
    const date = new Date()
    sendTickDataCommand.occurredBegin = date.getTime() - 8 * 60 * 60 * 1000
    this.sunClient.send(JSON.stringify(sendTickDataCommand))
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
