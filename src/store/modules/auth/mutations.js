export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userId=  payload.userId
  },

  endSession(state) {
    state.sessionTimedOut = true
  }
}