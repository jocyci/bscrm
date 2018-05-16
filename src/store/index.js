import Vue from 'vue'
import Vuex from 'vuex'
import globalModule from './global'
import fetchDataModule from './fetchData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    globalModule,
    fetchDataModule
  }
})
