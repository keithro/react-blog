import _ from 'lodash';
import { FETCH_POSTS } from '../actions'; // don't need to specify file since it is index

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
      /* 
      // An alternative to using lodash:
      return action.payload.data.reduce((acc, val) => {
        return Object.assign(acc, { [val['id']]: val });
      }, {});
       */
    default:
      return state;
  }
}
