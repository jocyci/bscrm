const moduleState = {
  token: null,
  storeId: ''
}

const getters = {
  globalTokenGetter: state => state.token,
  globalStoreIdGr: state => state.storeId
}

const actions = {
  updateToken ({state}, {token}) {
    state.token = token
  },
  updateStoreId ({state}, {id}) {
    state.storeId = id
  },
  getStoreId ({state}) {
    return state.storeId
  }
}

export default {
  state: moduleState,
  getters,
  actions
}
