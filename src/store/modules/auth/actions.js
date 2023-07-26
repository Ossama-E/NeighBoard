import axios from "axios";

export default {
    async login(context, payload) {
        try {
            const response = await axios.post(process.env.VUE_APP_FIREBASE_SIGNIN_URL, {
                ...payload,
                returnSecureToken: true
            });

            context.commit('setUser', {
                token: response.data.idToken,
                userId: response.data.localId,
                tokenExpiration: response.data.expiresIn
            });
        } catch (error) {
            console.error('Failed to authenticate the signin', error.response.data);
            throw new Error(error.response.data.message || 'Failed to authenticate the signup');
        }
    },
    async signup(context, payload) {
        try {
            const response = await axios.post(process.env.VUE_APP_FIREBASE_SIGNUP_URL, {
                ...payload,
                returnSecureToken: true
            });

            context.commit('setUser', {
                token: response.data.idToken,
                userId: response.data.localId,
                tokenExpiration: response.data.expiresIn
            });
            // add name to the user's account
            console.log('the user name', payload)
            console.log('response' , response);
            axios.post(`${process.env.VUE_APP_FIREBASE_API_URL}/users/${response.data.localId}.json?auth=` + response.data.idToken,{name: payload.name})
  .then(res => console.log(res))
  .catch(err => console.log('error in adding name', err))


            
        } catch (error) {
            console.error('Failed to authenticate the signup', error.response.data);
            throw new Error(error.response.data.message || 'Failed to authenticate the signup');
        }
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null,
        })
    }

};