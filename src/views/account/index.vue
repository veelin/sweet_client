<!-- <template>

  <div class="client-container">
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        值：{{account.unRealizedPnl.value}}
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24">
        值：{{account}}}
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <el-button type="primary" round @click="updateValue">修改值</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" round @click="updateValueb">修改值</el-button>
      </el-col>
    </el-row>
  </div>
</template>
 -->
<template>
  <div class="components-container">
    <div class="summary-container">
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <div class="summary-col">
            <span>投资组合</span>
            <span>{{ account.accountCode }}</span>
            <el-divider direction="vertical" />
          </div>
        </el-col>
        <el-col :span="3">
          <div class="summary-col">
            <div class="summary-col-title">净清算价值</div>
            <nbv class="summary-col-value" :val="account.netLiquidation" format="short" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="summary-col">
            <el-row type="flex" justify="space-between">
              <el-col>
                <div class="summary-col-title">当日盈亏</div>
                <nbv class="summary-col-value" :val="accountPnl.dailyPnL" />
              </el-col>
              <el-col>
                <div class="summary-col-title">当日盈亏%</div>
                <div>{{ parseFloat(accountPnl.dailyPnL.value*100/account.netLiquidation.value).toFixed(2) }}%</div>
              </el-col>
              <el-col>
                <div class="summary-col-title">未实现盈亏</div>
                <nbv class="summary-col-value" :val="accountPnl.unrealizedPnL" format="short" />
              </el-col>
            </el-row>
          </div>

        </el-col>
        <el-col :span="5">
          <div class="summary-col">
            <div class="summary-col-title">剩余流动性</div>
            <nbv class="summary-col-value" :val="account.fullExcessLiquidity" format="short" />
          </div>
        </el-col>
        <el-col :span="4">
          <div>Detail</div>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="center">
      <div class="summary-detail-container">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <div class="summary-detail-table">
              <table class="right">
                <tr>
                  <td>资金</td>
                  <td>合计</td>
                </tr>
                <tr>
                  <td>净清算值</td>
                  <td>
                    <nbv :val="account.netLiquidation" />
                  </td>
                </tr>
                <tr>
                  <td>含贷款的资产</td>
                  <td>
                    <nbv :val="account.equityWithLoanValue" />
                  </td>
                </tr>
                <tr>
                  <td>前日含贷款的资产</td>
                  <td>
                    <nbv :val="account.previousDayEquityWithLoanValue" />
                  </td>
                </tr>
                <tr>
                  <td>Reg T含贷款的资产</td>
                  <td>
                    <nbv :val="account.regTEquity" />
                  </td>
                </tr>
                <tr>
                  <td>特殊备忘录账户（SMA)</td>
                  <td>
                    <nbv :val="account.sma" />
                  </td>
                </tr>
                <tr>
                  <td>购买力</td>
                  <td>
                    <nbv :val="account.buyingPower" />
                  </td>
                </tr>
                <tr>
                  <td>证券总头寸价值</td>
                  <td>
                    <nbv :val="account.grossPositionValue" />
                  </td>
                </tr>
                <tr>
                  <td>现金</td>
                  <td>
                    <nbv :val="account.totalCashValue" />
                  </td>
                </tr>
                <tr>
                  <td>可用资金</td>
                  <td>
                    <nbv :val="account.availableFunds" />
                  </td>
                </tr>
                <tr>
                  <td>杠杆</td>
                  <td>{{ account.leverage_S.value }}</td>
                </tr>
              </table>
            </div>

          </el-col>
          <el-col :span="12">
            <div class="summary-detail-table">
              <table>
                <tr>
                  <td>保证金要求</td>
                  <td>合计</td>
                </tr>
                <tr>
                  <td>当前</td>
                  <td />
                </tr>
                <tr>
                  <td>初始保证金</td>
                  <td>
                    <nbv :val="account.initMarginReq" />
                  </td>
                </tr>
                <tr>
                  <td>维持保证金</td>
                  <td>
                    <nbv :val="account.maintMarginReq" />
                  </td>
                </tr>
                <tr>
                  <td>剩余流动性</td>
                  <td>
                    <nbv :val="account.fullExcessLiquidity" />
                  </td>
                </tr>
                <tr>
                  <td>隔夜</td>
                  <td />
                </tr>
                <tr>
                  <td>初始保证金</td>
                  <td>
                    <nbv :val="account.lookAheadInitMarginReq" />
                  </td>
                </tr>
                <tr>
                  <td>维持保证金</td>
                  <td>
                    <nbv :val="account.lookAheadMaintMarginReq" />
                  </td>
                </tr>
                <tr>
                  <td>剩余流动性</td>
                  <td>
                    <nbv :val="account.lookAheadExcessLiquidity" />
                  </td>
                </tr>
                <tr>
                  <td>交易限制</td>
                  <td />
                </tr>
                <tr>
                  <td>剩余日内交易 (T,...,T+4)</td>
                  <td>
                    {{ account.dayTradesRemaining }},{{ account.dayTradesRemainingT1 }},{{ account.dayTradesRemainingT2 }},{{ account.dayTradesRemainingT3 }},{{ account.dayTradesRemainingT4 }}
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="position-container">
        <div>
          <el-row type="flex" justify="space-between">
            <el-col :span="2">
              <div>{{ account.accountCode }}</div>
              <div>{{ account.accountCode }}</div>
            </el-col>
            <el-col :span="2">
              <div>盈亏/市场价值</div>
              <div><dbv style="" :val="accountPnl.dailyPnL.value" />/<dbv :val="account.netLiquidation.value" /></div>
            </el-col>
          </el-row>
        </div>
        <div>
          <div>
            <el-row type="flex" justify="space-between">
              <el-col :span="8">产品</el-col>
              <el-col :span="2">POSITION</el-col>
              <el-col :span="2">LAST</el-col>
              <el-col :span="2">CHANGE%</el-col>
              <el-col :span="2">COST BASIS</el-col>
              <el-col :span="2">MARCKET VALUE</el-col>
              <el-col :span="2">AVG PRICE</el-col>
              <el-col :span="2">DAILY P&L</el-col>
              <el-col :span="2">UNREALIZEDPNL P&L</el-col>
            </el-row>
          </div>
          <div v-for="position in portfolioMap">
            <el-row type="flex" justify="space-between">
              <el-col :span="8">
                <div><span><router-link target="_blank" :to="{path:'/stock/detail',query:{symbol:position[1].contract.symbol}}">{{ position[1].contract.symbol }}</router-link></span><span> {{ getContractName(contractMap.get(position[1].contract.symbol)) }}</span> <span> {{ position[1].contract.exchange }}</span></div>
                <div />
              </el-col>
              <el-col :span="2">{{ position[1].position }}</el-col>
              <el-col :span="2"><dbv :val="position[1].marketPrice" /></el-col>
              <el-col :span="2">-</el-col>
              <el-col :span="2"><dbv :val="position[1].averageCost * position[1].position" /></el-col>
              <el-col :span="2"><dbv :val="position[1].marketValue" /></el-col>
              <el-col :span="2"><dbv :val="position[1].averageCost" /></el-col>
              <el-col :span="2"><nbv :val="singlePnlMap.get(position[1].contract.conId).dailyPnL" /></el-col>
              <el-col :span="2"><nbv :val="singlePnlMap.get(position[1].contract.conId).unrealizedPnL" format="short" /></el-col>
            </el-row>
          </div>
        </div>

      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <div class="cash-container">
        D
      </div>
    </el-row>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import nbv from '@/components/Nbv'
import dbv from '@/components/Dbv'
import { EventEnum } from '@/core/channel/event/EventEnum'
import { PageCancelSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageCancelSubscribeCommand'
import { PageSubscribeCommand } from '@/core/channel/dto/page/subscribe/command/PageSubscribeCommand'

const subscribeEvent = [EventEnum.accountData, EventEnum.positionData, EventEnum.accountPnlData, EventEnum.singlePnlData, EventEnum.contractDetailData, EventEnum.mktData]
export default {
  name: 'Dashboard',
  components: {
    dbv,
    nbv
  },

  data() {
    return {}
  },
  created() {
    const sendMessage = new PageSubscribeCommand()
    sendMessage.actions = subscribeEvent
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  beforeDestroy() {
    const sendMessage = new PageCancelSubscribeCommand()
    sendMessage.actions = subscribeEvent
    this.sunClient.send(JSON.stringify(sendMessage))
  },
  computed: {
    ...mapState({
      account: state => state.account.accountDTO,
      portfolioMap: state => state.account.portfolioMap,
      accountPnl: state => state.account.accountPnl,
      singlePnlMap: state => state.account.singlePnlMap,
      contractMap: state => state.contract.contractMap,
      sunClient: state => state.client.sunClient

    })

  },
  methods: {
    getContractName(contractDetail) {
      console.log(contractDetail)
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
