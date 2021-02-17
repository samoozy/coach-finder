export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB}requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    // We need to grab the unique id that was generated by firebase in the POST response
    const responseData = await response.json()

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to send requests')
      throw error
    }

    // Add the unique id generated by firebase to newRequest object
    // This is loocal data and not firebase
    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },
  // Fetches data from firebase and passes it to mutations so the data can be inserted into the requests state
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    // Retreive firebase token from auth store
    const token = context.rootGetters.token

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB}requests/${coachId}.json?auth=${token}`)

    const responseData = await response.json()

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests')
      throw error
    }

    const requests = []

    for(const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  }
}