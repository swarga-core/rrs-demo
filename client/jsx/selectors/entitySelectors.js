import { createSelector } from 'reselect';


/**
 * Returns 'key-entity' list of all entities of type given in props.schema.entityType.
 * @return     {object}
 */
export const entityListSelector = (state, props) => (
	state.entities[props.schema.entityType]
);

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

export const entitySelector = (state, entityType, id) => (
	state.entities[entityType][id]
)
