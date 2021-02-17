export default {
  userId(state) {
    return state.userId
  },
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    // Convert to boolean
    return !!state.token
  },
  loggedout(state) {
    return state.loggedout
  }
}