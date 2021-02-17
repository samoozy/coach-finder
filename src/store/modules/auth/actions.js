export default {
  login(){

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

    console.log(responseData)

    // Commit the response from firebase to mutations
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.userId,
      tokenExpiration: responseData.expiresIn
    })
  },
}