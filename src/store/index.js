import Vue from 'vue'
import Vuex from 'vuex'

import cursor from './modules/cursor'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        cursor,
    }
})