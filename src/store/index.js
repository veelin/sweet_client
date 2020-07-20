import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import client from './modules/client'
import account from './modules/account'
import contract from './modules/contract'
import top_mktdata from './modules/top_mktdata'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    client,
    account,
    contract,
    top_mktdata
  },
  getters
})

export default store
