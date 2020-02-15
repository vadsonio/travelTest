import Vue from 'vue'
import Vuex from 'vuex'

import Hotels from './modules/app';


Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    Hotels
  }
})

export default store;