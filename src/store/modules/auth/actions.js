import axios from "axios";

const FIREBASE_SIGNIN_URL = process.env.VUE_APP_FIREBASE_SIGNIN_URL;
const FIREBASE_SIGNUP_URL = process.env.VUE_APP_FIREBASE_SIGNUP_URL;
const FIREBASE_API_URL = process.env.VUE_APP_FIREBASE_API_URL;
let timer;

const handleUserAuthentication = async (context, payload, endpoint) => {

    try {
        const response = await axios.post(endpoint, {
            ...payload,
            returnSecureToken: true
        });

        // const expiresIn = +response.data.expiresIn * 1000
        const expiresIn = 5000
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(function() {
          context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', {
            token: response.data.idToken,
            userId: response.data.localId,
        });

        return response;

    } catch (error) {
        console.error(`Failed to authenticate user: ${error.response.data}`);
        throw new Error(error.response.data.message || 'Failed to authenticate user.');
    }
}

export default {
    async login(context, payload) {
        await handleUserAuthentication(context, payload, FIREBASE_SIGNIN_URL);
    },

    async signup(context, payload) {
        const response = await handleUserAuthentication(context, payload, FIREBASE_SIGNUP_URL);

        // add name to the user's account
        try {
            await axios.post(`${FIREBASE_API_URL}/users/${response.data.localId}.json?auth=` + response.data.idToken, {name: payload.name});
        } catch (error) {
            console.error('Failed to add name: ', error);
        }
    },

    tryLogin(context) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const tokenExpiration = localStorage.getItem('tokenExpiration')

      const expiresIn = +tokenExpiration - new Date().getTime()
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(function() {
        context.dispatch('autoLogout')
      }, expiresIn)

      if (token && userId) {
        context.commit('setUser', {
          token, userId 
        })
      }
    },

    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiration')
      clearTimeout(timer)
        
        context.commit('setUser', {
            token: null,
            userId: null,
        })
    },

    autoLogout(context) {
      context.commit('endSession')
      context.dispatch('logout')
    }
};
