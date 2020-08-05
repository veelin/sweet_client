<template>
  <div class="components-container">
    <el-row class="stock-top" type="flex" justify="center">
      <el-col :span="8">
        <el-row type="flex" justify="center" class="stock-symbol">
          <stockName :val="contract" />
        </el-row>
        <el-row type="flex" justify="center" class="stock-nbv">
          <el-col :span="8">{{ topMktData.lastPrice }} x {{ topMktData.lastSize }}</el-col>
          <el-col :span="8" />
          <el-col :span="8" />
        </el-row>
        <el-row type="flex" justify="center" class="stock-lit" />
      </el-col>
      <el-col :span="8">
        <el-row class="stock-exchange">
          <span>{{ topMktData.lastExchange }}</span>
        </el-row>
        <el-row class="stock-exchange-nbv">
          <span>卖价</span><span>{{ topMktData.askPrice }} x {{ topMktData.askSize }}</span>
        </el-row>
        <el-row class="stock-exchange-nbv">
          <span>买价</span><span>{{ topMktData.bidPrice }} x {{ topMktData.bidSize }}</span>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="stock-operation" />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <div>
          <el-row style="height: 500px">
            <candle-stick :id="'candle-stick'" :query-params="queryParams" />
          </el-row>
          <el-row style="height: 500px">
            <realtime-stick :id="'realtime-stick'" />
          </el-row>
          <el-row>
            <el-row type="flex">
              <span>市场数据</span>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="8">
                <el-row type="flex" justify="center">
                  <el-col :span="8">卖价 x 数量</el-col>
                  <el-col :span="8">{{ topMktData.askPrice }} x {{ topMktData.askSize }}</el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8">买价 x 数量</el-col>
                  <el-col :span="8">{{ topMktData.bidPrice }} x {{ topMktData.bidSize }}</el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8">历史/隐含 波动率</el-col>
                  <el-col :span="8">{{ topMktData.rtHistoricalVol }}/</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row type="flex" justify="center">
                  <el-col :span="8">收盘价</el-col>
                  <el-col :span="8">{{ topMktData.close }}</el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8">开盘价</el-col>
                  <el-col :span="8">{{ topMktData.open }}</el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8">日波动幅度</el-col>
                  <el-col :span="8">{{ topMktData.low }}-{{ topMktData.high }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row type="flex" justify="center">
                  <el-col :span="8">今日成交量</el-col>
                  <el-col :span="8">{{ topMktData.volume }}</el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="8">日均成交量</el-col>
                  <el-col :span="8">{{ topMktData.avgVolume }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
        </div>

      </el-col>
      <el-col :span="8">
        <div>
          <el-row type="flex" justify="start">
            {{ account.accountCode }}
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="12">头寸</el-col>
            <el-col :span="12">{{ singlePnl.pos }}</el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>当日盈亏</el-col>
            <el-col><nbv :val="singlePnl.dailyPnL" /></el-col>
            <el-col>市场价值</el-col>
            <el-col><dbv :val="position.marketValue" /></el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>未实现盈亏</el-col>
            <el-col><nbv :val="singlePnl.unrealizedPnL" /></el-col>
            <el-col>平均价格</el-col>
            <el-col><dbv :val="position.averageCost" /></el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col>已实现盈亏</el-col>
            <el-col><nbv :val="singlePnl.realizedPnL" /></el-col>
            <el-col>成本基础</el-col>
            <el-col />
          </el-row>
        </div>
        <div>
          <depth-data />
        </div>
        <div />

      </el-col>
    </el-row>
  </div>

</template>

<script>

import { mapState } from 'vuex'
import nbv from '@/components/Nbv'
import dbv from '@/components/Dbv'
import stockName from '@/components/StockName'
import store from '@/store'
import CandleStick from '@/components/Chart/CandleStick'
import RealtimeStick from '@/components/Chart/RealtimeStick'
import DepthData from '@/components/DepthData'

import { EventEnum } from '@/core/channel/event/EventEnum'
import { BarSizeEnum } from '@/core/channel/enums/mktdata/BarSizeEnum'
import { WhatToShowEnum } from '@/core/channel/enums/mktdata/WhatToShowEnum'
import { PageCancelSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageCancelSubscribeCommand'
import { PageSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageSubscribeCommand'

var subscribeEventSets = new Set()
const subscribeEvent = [EventEnum.accountData, EventEnum.positionData, EventEnum.accountPnlData, EventEnum.singlePnlData, EventEnum.contractDetailData, EventEnum.topMktData, EventEnum.historicalMktData]
export default {
  name: 'Dashboard',
  components: {
    dbv,
    nbv,
    stockName,
    CandleStick,
    RealtimeStick,
    DepthData
  },

  data() {
    return {
      queryParams: {
        barSize: BarSizeEnum._30_secs,
        whatToShows: [WhatToShowEnum.TRADES]
      }
    }
  },
  created() {
    this.conId = parseInt(this.$route.query.conId)
    store.dispatch('contract/contractConId', this.conId)
    store.dispatch('top_mktdata/topMktDataConId', this.conId)
    store.dispatch('account/conIdSignal', this.conId)
    subscribeEvent.forEach((e) => subscribeEventSets.add({ 'action': e }))
    const sendMessage = new PageSubscribeCommand()
    sendMessage.actions = Array.from(subscribeEventSets)
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  beforeDestroy() {
    const sendMessage = new PageCancelSubscribeCommand()
    sendMessage.actions = Array.from(subscribeEventSets)
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  computed: {
    ...mapState({
      account: state => state.account.accountDTO,
      portfolioMap: state => state.account.portfolioMap,
      accountPnl: state => state.account.accountPnl,
      singlePnlMap: state => state.account.singlePnlMap,
      contractMap: state => state.contract.contractMap,
      sunClient: state => state.client.sunClient,
      contract: state => state.contract.contract,
      topMktData: state => state.top_mktdata.topMktData,
      position: state => state.account.position,
      singlePnl: state => state.account.singlePnl

    })
  },
  methods: {
    getContractName(contractDetail) {
      if (contractDetail === undefined) {
        return ''
      }
      return contractDetail.longName
    }
  }
}
</script>

<style lang="scss" scoped>
  .client {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .components-container {
    position: relative;
    height: 100vh;

  }

  .summary-container {
    background-color: #192f4d;
    height: 6.25rem;
    color: #fff;
    font-size: 0.9375rem;
    width: 100%;
    line-height: 5rem;

    .summary-col {
      font-size: 1.875rem;

      .summary-col-title {
        font-size: 0.9375rem;
        line-height: 1.875rem;
      }

      .summary-col-value {
        font-size: 0.9375rem;
        line-height: 1.875rem;
      }
    }
  }

  .summary-detail-container {
    background-color: #17273c;
    width: 100%;
    height: 100%;
    margin: auto;

    .summary-detail-table {
      padding: 0.625rem;
      color: #fff;

      table {

      }
    }
  }

  .position-container {
    background-color: #BFCBD9;
    width: 100%;
    height: 100%;
  }

  .cash-container {
    width: 100%;
    height: 100%;
  }

  .right {
    float: right;
  }

</style>
