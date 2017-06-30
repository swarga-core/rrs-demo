import * as types from '../configs/ActionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
		editing: {
            entityType: null,
            id: null,
            field: null
        },
	});

export default function app(state = initialState, action) {
	switch (action.type) {

    case types.START_ENTITY_EDITING:
    	return state.set('editing', {
        	entityType: action.entityType,
        	id: action.id,
        	field: action.field
        }
      );

    case types.STOP_ENTITY_EDITING:
    	return state.set('editing', initialState.editing);

    case types.ADD_NEW_ENTITY:
    	return state.set('editing', {
        	entityType: action.entityType,
        	id: 'new',
        	field: false,
        }
      );

    default:
    	return state;
  }
}
