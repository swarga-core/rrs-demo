import * as types from '../configs/ActionTypes';
import Immutable from 'seamless-immutable';
import * as schemas from '../configs/schemas/index';


function initEntityStore() {
  const initState = Object.keys(schemas).reduce((state, entityType) => {
    state[entityType] = {};
    return state;
  }, {});
  return Immutable(initState);
}

export default function entitiesReducer(state = initEntityStore(), action) {
  switch (action.type) {

    case types.ENTITIES_FETCH_SUCCEEDED: {
      const { entityType, entities } = action;
      return state.set(entityType, Immutable(entities));
    }

    case types.ENTITY_FETCH_SUCCEEDED: {
      const { entityType, entity, itWasNew } = action;
      let list = state[entityType].merge({[entity.id]: entity});
      if (itWasNew) {
        list = list.without('new');
      }
      return state.set(entityType, list);
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

    default:
      return state;
  }
}
