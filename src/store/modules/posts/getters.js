export default {
  posts(state) {
    console.log('state.posts', state.posts); 
    return state.posts
  },
  hasPosts(state) {
    return state.posts && state.posts.length > 0
  }
}