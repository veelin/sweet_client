import { SunContract } from '@/core/channel/dto/SunContract'

export class PositionDTO {
    marketPrice = 0.0
    unrealPnl = 0.0
    contract = new SunContract()
    action = 'positionData'
    marketValue = 0.0
    realPnl = 0.0
    position = 0.0
    averageCost = 0.0
    account = null
}
