import { Nbv } from '@/core/channel/dto/Nbv'

export class AccountDTO {
    fundValue = new Nbv()
    optionMarketValue = new Nbv()
    grossPositionValue = new Nbv()
    accruedCash = new Nbv()
    equityWithLoanValue = new Nbv()
    excessLiquidity = new Nbv()
    baseUnit = 'USD'
    exchangeRate = new Nbv()
    fxCashBalance = new Nbv()
    postExpirationExcess = new Nbv()
    action = 'accountData'
    netLiquidation = new Nbv()
    previousDayEquityWithLoanValue = new Nbv()
    TBondValue = new Nbv()
    accountCode = null
    lookAheadMaintMarginReq = new Nbv()
    fullAvailableFunds = new Nbv()
    regTEquity = new Nbv()
    accountType = ''
    fullMaintMarginReq = new Nbv()
    accountOrGroup = ''
    fullExcessLiquidity = new Nbv()
    futureOptionValue = new Nbv()
    availableFunds = new Nbv()
    initMarginReq = new Nbv()
    accountReady = false
    downloadEndDate = 0
    realizedPnl = new Nbv()
    corporateBondValue = new Nbv()
    postExpirationMargin = new Nbv()
    regTMargin = new Nbv()
    netLiquidationByCurrency = new Nbv()
    sma = new Nbv()
    accruedDividend = new Nbv()
    warrantValue = new Nbv()
    buyingPower = new Nbv()
    cushion = 0.0
    cashBalance = new Nbv()
    TBillValue = new Nbv()
    currency = ''
    segmentTitle = ''
    maintMarginReq = new Nbv()
    moneyMarketFundValue = new Nbv()
    realCurrency = ''
    totalCashValue = new Nbv()
    lookAheadNextChange = null
    leverage_S = new Nbv()
    paSharesValue = new Nbv()
    futuresPNL = new Nbv()
    lookAheadAvailableFunds = new Nbv()
    availableFunds_S = new Nbv()
    billable = new Nbv()
    indianStockHaircut = new Nbv()
    lookAheadInitMarginReq = new Nbv()
    mutualFundValue = new Nbv()
    dayTradesRemaining = 0
    whatIfPMEnable = false
    issuerOptionValue = new Nbv()
    stockMarketValue = new Nbv()
    lookAheadExcessLiquidity = new Nbv()
    dayTradesRemainingT4 = 0
    tradingType_S = ''
    dayTradesRemainingT3 = 0
    dayTradesRemainingT2 = 0
    dayTradesRemainingT1 = 0
    availableFunds_C = new Nbv()
    fullInitMarginReq = new Nbv()
    totalCashBalance = new Nbv()
    netDividend = new Nbv()
    unRealizedPnl = new Nbv()
}
