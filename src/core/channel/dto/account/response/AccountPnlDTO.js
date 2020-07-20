import { Nbv } from '@/core/channel/dto/Nbv'

export class AccountPnlDTO {
    action = 'accountPnlData'
    realizedPnL = new Nbv()
    dailyPnL = new Nbv()
    account = ''
    unrealizedPnL = new Nbv()
}
