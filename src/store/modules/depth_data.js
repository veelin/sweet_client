
const state = {
  depthDataMap: new Map(),
  updateDepthDataMap: new Map(),
  initTrack: 0,
  updateTrack: 0
}

const mutations = {
  DEPTH_DATA: (state, data) => {
    state.initTrack++
    state.depthDataMap.set(data.conId, data.list)
  },
  UPDATE_DEPTH_DATA: (state, data) => {
    state.updateTrack++
    const conId = data.conId
    let positionMap = state.updateDepthDataMap.get(conId)
    if (!positionMap) {
      positionMap = new Map()
      state.updateDepthDataMap.set(conId, positionMap)
    }
    positionMap.set(data.data.position, data.data)

    // let symbolDepthDataMap = state.depthDataMap.get(symbol)
    // if (!symbolDepthDataMap) {
    //   symbolDepthDataMap = new Map()
    //   state.depthDataMap.set(symbol, symbolDepthDataMap)
    // }
    // symbolDepthDataMap.set(data.data.position, data.data)
  }
}

const actions = {
  depthData({ commit }, data) {
    commit('DEPTH_DATA', data)
  },
  updateDepthData({ commit }, data) {
    commit('UPDATE_DEPTH_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
