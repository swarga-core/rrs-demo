import Immutable from 'seamless-immutable';
import listsReducer from './listsReducer';

export default function app(state = Immutable({}), action) {
  return state.merge({
    lists: listsReducer(state.lists, action)
  });
}
