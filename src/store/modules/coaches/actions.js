export default {
  // For registering a new coach and storing its data to firebase
  async registerCoach(context, formData) {
    const userId = context.rootGetters.userId
    console.log(userId)

    const coachData = {
      firstName: formData.first,
      lastName: formData.last,
      description: formData.desc,
      hourlyRate: formData.rate,
      areas: formData.areas
    }

    // Retreive firebase token
    const token = context.rootGetters.token

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB}coaches/${userId}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    const responseData = await response.json()

    console.log(responseData)

    // error handling
    if(!response.ok) {
      // error...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  },
  // Get coaches data from firebase
  async loadCoaches(context, payload) {
    // This is for caching data
    // Ends execution if shouldUpdate returns false
    if(!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB}coaches.json`)
    const responseData = await response.json()

    // console.log(responseData)

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!')
      // Throw the error so that the component can receive the same error message (CoachesList.vue)
      throw error
    }

    if(!response.ok) {
      // ...
    }

    const coaches = []

    // Format response data into an array
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    context.commit('setFetchTimestamp')
  }
}