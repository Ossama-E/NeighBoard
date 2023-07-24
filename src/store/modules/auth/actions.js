import axios from "axios";

export default {
  login() {
    // Your login logic here
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
  }
};
