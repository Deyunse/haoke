import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    city: '北京',
    houseID: 'AREA|88cff55c-aaa4-e2e0',
    sreaName: '',
    sreaNameID: ''
  },
  getters: {
  },
  mutations: {
    // 用户tken
    setUser (state, payload) {
      state.user = payload
    },
    // 保存选定的城市
    setCity (state, payload) {
      state.city = payload
    },
    // 保存选定城市的id
    setHous (state, payload) {
      state.houseID = payload
    },
    // 保存搜索城市的名字
    setAreaName (state, payload) {
      state.sreaName = payload
    },
    setAreaNameID (state, payload) {
      state.sreaNameID = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
