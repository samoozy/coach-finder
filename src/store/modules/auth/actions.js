export default {
  async login(context, payload){
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
    const responseData = await response.json()

    // Error handling
    if(!response.ok) {
      console.log(responseData)
      const error = new Error(responseData.message || 'Failed to authenticate.')
      throw error
    }

    // Commit the response from firebase to mutations
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  },
  async signup(context, payload){
    // Send API key to firebase for authentication
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })
    const responseData = await response.json()

    // Error handling
    if(!response.ok) {
      console.log(responseData)
      const error = new Error(responseData.message || 'Failed to authenticate.')
      throw error
    }

    // Commit the response from firebase to mutations
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  }
}