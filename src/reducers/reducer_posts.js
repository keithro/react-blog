import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'; // don't need to specify file since it is index

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      /* const post = action.payload.data;
      const newState = { ...state }; // actually previous state
      newState[post.id] = post;
      return newState; */

      // Add new key/value pair with the id as the key and the payload as the value
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');

      /* // An alternative to using lodash:
      return action.payload.data.reduce((acc, val) => {
        return Object.assign(acc, { [val['id']]: val });
      }, {}); */

    default:
      return state;
  }
}
