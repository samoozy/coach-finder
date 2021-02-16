export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  // Check to verify whether the user is a registered coach or not
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    return coaches.some(coach => coach.id === userId)
  },
  // Returns true if loadCoaches was triggered more than a minute ago
  // Use this in actions
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    if(!lastFetch) {
      return true
    }
    const currentTimeStamp = new Date().getTime()

    return (currentTimeStamp - lastFetch) / 1000 > 60
  }
}