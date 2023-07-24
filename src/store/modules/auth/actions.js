import axios from "axios";

export default {
  async login(context, payload) {
    try {
      const response = await axios.post(process.env.VUE_APP_FIREBASE_SIGNIN_URL, { ...payload, returnSecureToken: true });

      console.log('success signin auth ', response.data);

      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        tokenExpiration: response.data.expiresIn
      });
    } catch (error) {
      console.log('error in signin', error);
      console.error('Failed to authenticate the signin', error.response.data);
      throw new Error(error.response.data.message || 'Failed to authenticate the signup');
    }
  },
  async signup(context, payload) {
    try {
      const response = await axios.post(process.env.VUE_APP_FIREBASE_SIGNUP_URL, { ...payload, returnSecureToken: true });

      console.log('success signup auth ', response.data);

      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        tokenExpiration: response.data.expiresIn
      });
    } catch (error) {
      console.error('Failed to authenticate the signup', error.response.data);
      throw new Error(error.response.data.message || 'Failed to authenticate the signup');
    }
  },
  logout(context) {
    context.commit('setUser', {
      token : null,
      userId : null,
      tokenExpiration : null,
    })
  }

};
