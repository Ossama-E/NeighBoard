import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  state() {
    return {
      userId: 'test user',
      token: null, 
      tokenExpiration: null,
    }
  },
  namespaced: true,
  mutations,
  getters,
  actions
}