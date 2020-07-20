import { ContractDetailDTO } from '@/core/channel/dto/contract/response/ContractDetailDTO'

const state = {
  contractMap: new Map(),
  symbol: null,
  contract: new ContractDetailDTO()
}

const mutations = {
  CONTRACT_DETAIL: (state, data) => {
    state.contractMap.set(data.contract.symbol, data)
    if (state.symbol === data.contract.symbol) {
      state.contract = data
    }
  },
  CONTRACT_SYMBOL: (state, data) => {
    state.symbol = data
  }
}

const actions = {
  contractDetail({ commit }, data) {
    commit('CONTRACT_DETAIL', data)
  },
  contractSymbol({ commit }, data) {
    commit('CONTRACT_SYMBOL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
