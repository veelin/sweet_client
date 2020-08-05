import { TopMktDataDTO } from '@/core/channel/dto/mktdata/response/TopMktDataDTO'

const state = {
  topMktDataMap: new Map(),
  conId: null,
  topMktData: new TopMktDataDTO(),

  tickDataMap: new Map(),
  incrementalTickDataMap: new Map(),

  tickDataInitTrace: 0,
  tickDataUpdateTrace: 0
}

const mutations = {
  TOP_MKTDATA_DETAIL: (state, data) => {
    state.topMktDataMap.set(data.conId, data)
    if (state.conId === data.conId) {
      state.topMktData = data
    }
    console.log(state.topMktData)
  },
  TOP_MKTDATA_CONID: (state, data) => {
    state.conId = data
  },

  TICK_MKT_DATA: (state, data) => {
    const conId = data.conId
    const field = data.field
    var td = state.tickDataMap.get(conId)
    if (!td) {
      td = new Map()
      state.tickDataMap.set(conId, td)
    }
    var fieldMap = td.get(field)
    if (fieldMap == null) {
      fieldMap = new Map()
      td.set(field, fieldMap)
    }
    for (const timeValue of data.vals.values()) {
      fieldMap.set(timeValue.t, timeValue.v)
    }
    state.tickDataInitTrace++
  },
  INCREMENTAL_TICK_MKT_DATA: (state, data) => {
    const conId = data.conId
    const field = data.field
    var td = state.incrementalTickDataMap.get(conId)
    if (!td) {
      td = new Map()
      state.incrementalTickDataMap.set(conId, td)
    }
    var fieldMap = td.get(field)
    if (fieldMap == null) {
      fieldMap = new Map()
      td.set(field, fieldMap)
    }

    for (const timeValue of data.vals.values()) {
      fieldMap.set(timeValue.t, timeValue.v)
    }

    state.tickDataUpdateTrace++
  }
}

const actions = {
  topMktDataDetail({ commit }, data) {
    commit('TOP_MKTDATA_DETAIL', data)
  },
  topMktDataConId({ commit }, data) {
    commit('TOP_MKTDATA_CONID', data)
  },
  tickMktData({ commit }, data) {
    commit('TICK_MKT_DATA', data)
  },
  incrementalTickMktData({ commit }, data) {
    commit('INCREMENTAL_TICK_MKT_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
