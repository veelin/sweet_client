import { TopMktDataDTO } from '@/core/channel/dto/mktdata/response/TopMktDataDTO'

const state = {
  topMktDataMap: new Map(),
  symbol: null,
  topMktData: new TopMktDataDTO()
}

const mutations = {
  TOP_MKTDATA_DETAIL: (state, data) => {
    state.topMktDataMap.set(data.symbol, data)
    if (state.symbol === data.symbol) {
      state.topMktData = data
      console.log(state.topMktData)
    }
  },
  TOP_MKTDATA_SYMBOL: (state, data) => {
    state.symbol = data
  }
}

const actions = {
  topMktDataDetail({ commit }, data) {
    commit('TOP_MKTDATA_DETAIL', data)
  },
  topMktDataSymbol({ commit }, data) {
    commit('TOP_MKTDATA_SYMBOL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
