import { HistoricalDataDTO } from '@/core/channel/dto/mktdata/response/HistoricalDataDTO'

const state = {
  historicalMktDataMap: new Map(),
  incrementalHistoricalMktDataMap: new Map(),
  initTrack: 0,
  updateTrack: 0
}

const mutations = {
  HISTORICAL_MKTDATA: (state, data) => {
    state.initTrack++
    const key = getHistoricalDataKey(data)
    const appendBars = data.bars
    const appendBarMaps = new Map()
    for (const e of appendBars.values()) {
      appendBarMaps.set(e.time, e)
    }
    var newBars = appendBarMaps
    var allBars = state.historicalMktDataMap.get(key)
    if (allBars) {
      newBars = new Map([...allBars, ...appendBars])
    }
    state.historicalMktDataMap.set(key, newBars)
  },
  INCREMENTAL_HISTORICAL_MKTDATA: (state, data) => {
    console.log(data)
    state.updateTrack++
    const key = getHistoricalDataKey(data)
    var allBars = state.incrementalHistoricalMktDataMap.get(key)
    if (!allBars) {
      allBars = new Map()
      state.incrementalHistoricalMktDataMap.set(key, allBars)
    }
    for (const e of data.bars) {
      allBars.set(e.time, e)
    }
    console.log(state.incrementalHistoricalMktDataMap)
  }
}

const actions = {
  historicalMktData({ commit }, data) {
    commit('HISTORICAL_MKTDATA', data)
  },
  incrementalHistoricalMktData({ commit }, data) {
    commit('INCREMENTAL_HISTORICAL_MKTDATA', data)
  }
}

const getHistoricalDataKey = (data) => {
  return data.conId + '_' + data.barSize + '_' + data.whatToShow
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

const objToMap = function objToStrMap(obj) {
  const strMap = new Map()
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}
