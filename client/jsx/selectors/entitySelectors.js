import { createSelector } from 'reselect';
import _ from 'lodash';


/**
 * Returns 'key-entity' list of all entities of a type given in props.schema.entityType.
 * @return     {object}
 */
export const fullEntityListSelector = (state, props) => {
	const { entityType, filterBy } = props.schema;
	return state.entities[entityType];
}

/**
 * Returns current filter query string for entity of a type given in props.schema.entityType.
 * @return     {string}
 */
export const entityFilterQuerySelector = (state, props) => (
	state.app.filters[props.schema.entityType]
)

/**
 * Returns a list of entity field names witch can be used for filtration.
 * @return     {array}
 */
export const schemaFilterBySelector = (state, props) => (
	props.schema.filterBy
)

/**
 * Returns 'key-entity' list of entities of type given in props.schema.entityType.
 * Checks if a filter of the specified type exists. If so, it returns a filtered list, otherwise returns all.
 * Uses Reselect memoization.
 * @return     {object}
 */
export const entityListSelector = createSelector(
	fullEntityListSelector,
	entityFilterQuerySelector,
	schemaFilterBySelector,
	(allEntities, filterQuery, filterBy) => {
		if (!filterQuery) {
			return allEntities;
		}
		return _.filter(allEntities, (entity) => (
			_.find(filterBy, (searchFieldName) => (
				~entity[searchFieldName].indexOf(filterQuery)
			))
		));
	}
)

/**
 * Returns 'key-entity' list of all entities of type given in props.schema for related fields.
 * @return     {object}
 */
export const refEntityListSelector = (state, props) => {
	const { schema, fieldName } = props;
	const refEntityType = schema.properties[fieldName].refersTo;
	return state.entities[refEntityType];
}

/**
 * Returns array of title components for entity of type given in props.schema.
 * Used for options in ReferenceEditor.
 * @return     {array}
 */
export const refEntityTitlesSelector = (state, props) => {
	const { schema, fieldName } = props;
	return schema.properties[fieldName].referredTitles;
}

/**
 * Returns 'key-title' list of all entities of type given in props.schema for related fields.
 * Used for options in ReferenceEditor.
 * Uses Reselect memoization.
 * @return     {object}
 */
export const referredEntitiesSelector = createSelector(
	refEntityListSelector,
	refEntityTitlesSelector,
	(entities, titles) => (
		_.transform(entities, (refs, entity, id) => {
			refs[id] = titles.map(title => (entity[title])).join(' ');
		})
	)
)

/**
 * Returns entity by given entityType and id.
 * @return     {object}
 */
export const entitySelector = (state, entityType, id) => (
	state.entities[entityType][id]
)

/**
 * Returns app editing object.
 * @return     {object}
 */
export const editingSelector = (state) => (
	state.app.editing
)