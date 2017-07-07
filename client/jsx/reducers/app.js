import * as types from '../configs/ActionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
  editing: {},
  filters: {},
  sorting: {}
});

const initEditingState = Immutable({
  entityType: null,
  id: null,
  field: null
});

function editingReducer( state = initEditingState, action ) {
  switch (action.type) {

    case types.START_ENTITY_EDITING: {
      return state.replace({
        entityType: action.entityType,
        id: action.id,
        field: action.field
      });
    }

    case types.STOP_ENTITY_EDITING: {
      return state.replace(initEditingState);
    }

    case types.ADD_NEW_ENTITY: {
      return state.replace({
        entityType: action.entityType,
        id: 'new',
        field: false,
      });
    }

    default:
      return state;
  }
}

function filteringReducer( state = {}, action ) {
  switch (action.type) {

    case types.SET_ENTITY_FILTER: {
      const { schema, query } = action;
      return state.merge({ [schema.entityType]: query });
    }

    case types.RESET_ENTITY_FILTER: {
      const { schema } = action;
      return state.without(schema.entityType);
    }

    default:
      return state;
  }
}

function sortingReducer( state = {}, action ) {
  switch (action.type) {

    case types.SORT_ENTITY_LIST: {
      const { schema, fieldName } = action;
      let order = state[schema.entityType] ? state[schema.entityType].order : null;
      order = (order == 'desc') ? 'asc' : 'desc';
      return state.merge({ [schema.entityType]: {
        fieldName,
        order
      } });
    }

    default:
      return state;
  }
}

export default function app(state = initialState, action) {
  let newState = state.set('editing', editingReducer(state.editing, action));
  newState = newState.set('filters', filteringReducer(state.filters, action));
  newState = newState.set('sorting', sortingReducer(state.sorting, action));
  return newState;
}
