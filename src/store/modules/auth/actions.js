// Timer for token expiration
let timer

export default {
  async login(context, payload){
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },
  async signup(context, payload){
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },
  async auth(context, payload) {
    const mode = payload.mode
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`

    if(mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
    }

    const response = await fetch(url, {
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

    // Get the expiration time and set it to miliseconds
    // the plus in front of responseData converts string into number
    const expiresIn = +responseData.expiresIn * 1000
    
    // Add the expiration time to the current time
    const expirationDate = new Date().getTime() + expiresIn

    // Store user data into browser's local storage
    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    // Set a timer to automatically logout the user when the token expires
    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    // Commit the response from firebase to mutations
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    // Get the updated expiration time by subtracting the current time from the locally stored time
    const expiresIn = +tokenExpiration - new Date().getTime()

    if(expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    // Clear the timer
    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null
    })
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
}