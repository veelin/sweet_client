import { AccountDTO } from '@/core/channel/dto/account/response/AccountDTO'
import { AccountPnlDTO } from '@/core/channel/dto/account/response/AccountPnlDTO'
import { PositionDTO } from '@/core/channel/dto/account/response/PositionDTO'
import { SinglePnlDTO } from '@/core/channel/dto/account/response/SinglePnlDTO'

const state = {
  accountDTO: new AccountDTO(),
  accountPnl: new AccountPnlDTO(),
  portfolioMap: new Map(),
  singlePnlMap: new Map(),
  position: new PositionDTO(),
  singlePnl: new SinglePnlDTO(),
  conId: ''
}

const mutations = {
  UPDATE_ACCOUNT: (state, data) => {
    state.accountDTO = data
  },
  UPDATE_PORTFOLIO: (state, data) => {
    state.portfolioMap.set(data.contract.conId, data)
    if (data.contract.conId === state.conId) {
      state.position = data
    }
  },
  UPDATE_ACCOUNT_PNL: (state, data) => {
    state.accountPnl = data
  },
  UPDATE_SINGLE_PNL: (state, data) => {
    state.singlePnlMap.set(data.conId, data)
    if (state.position && state.position.contract.conId === data.conId) {
      state.singlePnl = data
    }
  },
  CONID_SIGNAL: (state, data) => {
    state.conId = data
  }
}

const actions = {
  updateAccountDTO({ commit }, data) {
    commit('UPDATE_ACCOUNT', data)
  },
  updatePortfolio({ commit }, data) {
    commit('UPDATE_PORTFOLIO', data)
  },
  updateAccountPnl({ commit }, data) {
    commit('UPDATE_ACCOUNT_PNL', data)
  },
  updateSinglePnl({ commit }, data) {
    commit('UPDATE_SINGLE_PNL', data)
  },
  conIdSignal({ commit }, data) {
    commit('CONID_SIGNAL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
