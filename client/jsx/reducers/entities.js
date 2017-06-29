import * as types from '../configs/ActionTypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash';


const initialState = Immutable({
    departments: {},
    employees: {},
  });

export default function app(state = initialState, action) {
	switch (action.type) {

    case types.ENTITIES_FETCH_SUCCEEDED: {
      const { entityType, entities } = action;
      return state.set(
        entityType,
        Immutable(entities)
      );
    }

    case types.ENTITY_FETCH_SUCCEEDED: {
      const { entityType, entity, itWasNew } = action;
      let list = state[entityType].merge({[entity.id]: entity});
      if (itWasNew) {
        list = list.without('new');
      }
      return state.set(
        entityType,
        list
      );
    }

    case types.CHANGE_ENTITY_VALUE: {
      const { entityType, id, fieldName, newValue } = action;
      return state.setIn(
        [entityType, id, fieldName],
        newValue
      );
    }

    case types.ADD_NEW_ENTITY: {
      const { entityType } = action;
      return state.set(
        entityType,
        state[entityType].merge({'new': {id: 'new'}})
      );
    }

    case types.ENTITY_REMOVE_SUCCEEDED: {
      const { entityType, id } = action;
      return state.set(
        entityType,
        state[entityType].without(id)
      );
    }

    case types.REMOVE_NEW_ENTITY: {
      const { entityType, id } = action;
      return state.set(
        entityType,
        state[entityType].without('new')
      );
    }

    default:
    	return state;
  }
}
