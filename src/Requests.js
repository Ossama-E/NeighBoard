import axios from "axios";

const apiURL = process.env.VUE_APP_FIREBASE_API_URL;
// const userId = this.$store.getters['auth/userId'];
// const token =  this.$store.getters['auth/token'];

const sendPost = function(postData, userId, token) {
  console.log('got a post request with this post', postData);
  // post to neighbourhood
  axios.post(`${apiURL}/neighbourhoods/${postData.addressData.neighbourhood}/posts.json?auth=` + token, postData)
      .then(res => console.log(res))
      .catch(err => console.log(err));

  // post to user
  axios.post(`${apiURL}/users/${userId}/posts.json?auth=` + token, postData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
};

const getPostsByNeighbourhood = function(neighbourhood) {
  console.log('got request for posts for this neighbourhood ', neighbourhood);
  return axios.get(`${apiURL}/neighbourhoods/${neighbourhood}.json`)
    .catch(err => console.log('error in get posts by neighbourhood', err));
};

const getPostsByUser = function(userId) {
  console.log('got request for posts for this user ', userId);
  return axios.get(`${apiURL}/users/${userId}.json`)
    .catch(err => console.log('error in get posts by user', err));
};

export {sendPost, getPostsByNeighbourhood, getPostsByUser};
