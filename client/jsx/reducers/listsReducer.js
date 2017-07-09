import * as types from '../configs/ActionTypes';
import Immutable from 'seamless-immutable';
import * as schemas from '../configs/schemas/index';


const initListsStore = () => {
  const initState = {
    editing: {},
    filters: {},
    sorting: {},
  };
  Object.keys(schemas).reduce((state, entityType) => {
    state[entityType] = {
      fieldName: 'id',
      order: 'asc'
    };
    return state;
  }, initState.sorting);
  return Immutable(initState);
};

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
      const { schema, fieldName = 'id' } = action;
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

export default function listsReducer(state = initListsStore(), action) {
  return state.merge({
    editing: editingReducer(state.editing, action),
    filters: filteringReducer(state.filters, action),
    sorting: sortingReducer(state.sorting, action)
  });
}
