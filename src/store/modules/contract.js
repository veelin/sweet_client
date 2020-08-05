import { ContractDetailDTO } from '@/core/channel/dto/contract/response/ContractDetailDTO'

const state = {
  contractMap: new Map(),
  conId: null,
  contract: new ContractDetailDTO()
}

const mutations = {
  CONTRACT_DETAIL: (state, data) => {
    console.log(data)
    state.contractMap.set(data.contract.conId, data)
    if (state.conId === data.contract.conId) {
      state.contract = data
    }
  },
  CONTRACT_CONID: (state, data) => {
    state.conId = data
  }
}

const actions = {
  contractDetail({ commit }, data) {
    commit('CONTRACT_DETAIL', data)
  },
  contractConId({ commit }, data) {
    commit('CONTRACT_CONID', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
