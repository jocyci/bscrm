import Apis from '@/common/js/apis'

const moduleState = {
  afterLoginData: null
}

const getters = {
  afterLoginGetter: state => state.afterLoginData
}

const actions = {
  async fetchAfterLoginData ({state}) {
    let response = await Apis.getAfterLoginData(null, true)
    if (response && response.data && response.data.msg) {
      state.afterLoginData = Object.assign({}, response.data.msg)
    }
    return response
  }
}

export default {
  state: moduleState,
  getters,
  actions
}
