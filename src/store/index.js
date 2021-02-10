import { createStore } from 'vuex'
import coachesModule from './modules/coaches/index.js'


const store = createStore({
  modules: {
    coaches: coachesModule
  },
  state() {
    return {
      // This is for user identification to verify whether the user has already registered as a coach
      // Authentication
      userId: 'c3'
    }
  },
  getters: {
    userId(state) {
      return state.userId
    }
  }
})

export default store