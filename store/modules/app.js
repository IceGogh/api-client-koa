const app = {
  state() {
    return {
      headers: ''
    }
  },
  mutations: {
    'SET_HEADERS': (state, H) => {
      state.headers = H
    }
  },
  actions: {
    'ACTION_SET_HEADERS'({ commit }, H) {
      commit('SET_HEADERS', H)
    }
  }
}

export default app
