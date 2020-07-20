export class SunContract {
  // eslint-disable-next-line no-useless-constructor
  constructor() {

  }

  conId = 0
  symbol = ''
  secType = ''
  lastTradeDateOrContractMonth
  strike = false
  right = ''
  multiplier = '' // should be double
  exchange = ''
  primaryExch = '' // pick a non-aggregate (ie not the SMART exchange) exchange that the contract trades on.  DO NOT SET TO SMART.
  currency = ''
  localSymbol = ''
  tradingClass = ''
  secIdType = '' // CUSIP;SEDOL;ISIN;RIC
  secId = ''

  //    private DeltaNeutralContract m_deltaNeutralContract;
  includeExpired = false // can not be set to true for orders
  // COMBOS
  comboLegsDescrip = '' // received in open order version 14 and up for all combos
}
