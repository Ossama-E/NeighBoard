import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const state = {
  posts: [
    {
      title: 'test',
      description: 'testing the desc',
      address: 'some place, BC',
    },
    {
      title: 'test2',
      description: 'testing the desc2',
      address: 'some place, BC22',
    },
    {
      title: 'test3',
      description: 'testing the desc3',
      address: 'some place, BC33',
    },
  ],
};
export default {
  state,
  mutations,
  getters,
  actions,
};
