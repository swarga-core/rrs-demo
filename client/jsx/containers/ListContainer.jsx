import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import EntityList from '../components/EntityList';
import * as appActions from '../actions/appActions';
import * as entityActions from '../actions/entityActions';


class ListContainer extends Component {
	
	render() {
		return <EntityList	{...this.props}	/>
	}

}

function mapStateToProps(state, ownProps) {
	const { schema } = ownProps;
	const { entityType } = schema;
  const items = state.entities[entityType];
  const editing = state.app.editing;

  const references = _.transform(schema.properties, (refs, fieldDesc, fieldName) => {
  	const { refersTo, type, referredTitle } = fieldDesc;
  	if (type == 'number' && refersTo) {
  		refs[refersTo] = _.mapValues(state.entities[refersTo], (entity, id) => {
  			return entity[referredTitle];
  		});
  	}
  })

  return {
  	entityType,
  	schema,
    items,
    editing,
    references
  };
}

function mapDispatchToProps(dispatch, ownProps) {
	const { schema } = ownProps;
	const { entityType } = schema;
  return {
  	handlers: {
	    onStartEntityEditing: (id, field) => {
				dispatch(appActions.startEntityEditing(entityType, id, field));
			},

			onCancelItemEditing: () => {
				dispatch(appActions.onCancelEntityEditing());
			},

			onAddNewEntity: () => {
				dispatch(entityActions.addNewEntity(entityType));
				dispatch(appActions.startEntityEditing(entityType, 'new', schema.required[0]));
			},

			onChangeEntityValue: (id, fieldName, newValue, oldEntity) => {
				if (id == 'new') {
					dispatch(entityActions.changeEntityValue(entityType, id, fieldName, newValue));
					const required = schema.required;
					let index = required.indexOf(fieldName);
					if (++index < required.length) {
						process.nextTick(()=>{ // по хорошему, такой маневр нужно выносить в сагу
							dispatch(appActions.startEntityEditing(entityType, 'new', required[index]));
						});
					} else {
						dispatch(entityActions.syncNewEntity(entityType));
					}
				} else {
					const updatedEntity = oldEntity.set(fieldName, newValue);
					dispatch(entityActions.updateEntity(entityType, updatedEntity));
				}
			},

			onAddNewItem: (itemData) => {
				dispatch(entityActions.addNewEntity(entityType, itemData));
			},

			onRemoveEntity: (id) => {
				if (id == 'new') {
					dispatch(entityActions.removeNewEntity(entityType));
				} else {
					dispatch(entityActions.removeEntity(entityType, id));
				}
			},
		}
	}
}

ListContainer.propTypes = {
  items: PropTypes.object.isRequired,
  entityType: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  editing: PropTypes.oneOfType([
  		PropTypes.object,
  		PropTypes.bool,
  	]).isRequired,
 	references: PropTypes.object,
  handlers: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
