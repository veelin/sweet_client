import { SunContract } from '@/core/channel/dto/SunContract'

export class ContractDetailDTO {
    realExpirationDate = null
    cusip = null
    callable = false
    notes = null
    liquidHours = null
    industry = null
    mdSizeMultiplier = 0
    validExchanges = null
    couponType = null
    ratings = null
    nextOptionDate = null
    putable = false
    action = 'contractDetailData'
    issueDate = null
    secIdList = []
    descAppend = null
    coupon = 0.0
    maturity = null
    minTick = 0.0
    timeZoneId = null
    contract = new SunContract()
    convertible = false
    aggGroup = 0
    evMultiplier = 0.0
    priceMagnifier = 0
    evRule = null
    marketName = null
    marketRuleIds = null
    tradingHours = null
    nextOptionPartial = false
    underConId = 0
    orderTypes = null
    underSecType = null
    lastTradeTime = null
    nextOptionType = null
    bondType = null
    contractMonth = null
    underSymbol = null
    category = null
    subcategory = null
    longName = null
}
