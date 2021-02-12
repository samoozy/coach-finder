export default {
  async registerCoach(context, formData) {
    const userId = context.rootGetters.userId

    const coachData = {
      firstName: formData.first,
      lastName: formData.last,
      description: formData.desc,
      hourlyRate: formData.rate,
      areas: formData.areas
    }

    const response = await fetch(`${process.env.FIREBASE_DB}coaches/${userId}.json`, {
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
  async loadCoaches(context) {
    const response = await fetch(`${process.env.FIREBASE_DB}coaches.jso`)
    const responseData = await response.json()

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
  }
}