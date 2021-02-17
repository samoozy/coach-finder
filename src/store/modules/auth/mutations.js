export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userId = payload.userId
    state.loggedout = false
  },
  setAutoLogout(state) {
    state.loggedout = true
  }
}