import { Nbv } from '@/core/channel/dto/Nbv'

export class SinglePnlDTO {
    pos = 0
    unrealizedPnL = new Nbv()
    action = 'singlePnlData'
    realizedPnL = new Nbv()
    conId = 0
    dailyPnL = new Nbv()
    value = new Nbv()
    reqId = 0
}
