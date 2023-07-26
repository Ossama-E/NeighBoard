import axios from "axios";

const apiURL = process.env.VUE_APP_FIREBASE_API_URL;
// const userId = this.$store.getters['auth/userId'];
// const token =  this.$store.getters['auth/token'];

const sendPost = function(postData, userId, token) {
  // post to neighbourhood and then to user
  return axios.post(`${apiURL}/neighbourhoods/${postData.addressData.neighbourhood}/posts.json?auth=` + token, postData)
    .then(res => {
      console.log(res);
      return axios.post(`${apiURL}/users/${userId}/posts.json?auth=` + token, postData);
    })
    .catch(err => console.log(err));
};


const getPostsByNeighbourhood = function(neighbourhood) {
  return axios.get(`${apiURL}/neighbourhoods/${neighbourhood}.json`)
    .catch(err => console.log('error in get posts by neighbourhood', err));
};

const getPostsByUser = function(userId) {
  return axios.get(`${apiURL}/users/${userId}.json`)
    .catch(err => console.log('error in get posts by user', err));
};

const getAccount = function (apiURL, userId) {
  return axios.get(`${apiURL}/users/${userId}.json`)
}
export {getAccount, sendPost, getPostsByNeighbourhood, getPostsByUser};
