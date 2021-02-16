import { createStore } from 'vuex'
import coachesModule from './modules/coaches/index.js'
import requestModule from './modules/requests/index.js'


const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestModule
  },
  // global state
  state() {
    return {
      // This is for identifying whether the user has already registered as a coach
      // Authentication
      userId: 'c3'
    }
  },
  // global getters
  getters: {
    userId(state) {
      return state.userId
    }
  }
})

export default store