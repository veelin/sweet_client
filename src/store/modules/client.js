const state = {
  sunClient: null
}

const mutations = {
  SET_SUN_CLIENT: (state, sunClient) => {
    state.sunClient = sunClient
  }
}

const actions = {
  setSunClient({
    commit
  }, sunClient) {
    commit('SET_SUN_CLIENT', sunClient)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
