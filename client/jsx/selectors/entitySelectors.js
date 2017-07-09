import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _transform from 'lodash/transform';
import _values from 'lodash/values';
import _gt from 'lodash/gt';
import _lt from 'lodash/lt';


/**
 * Returns 'key-entity' list of all entities of a type given in props.schema.entityType.
 * @return     {object}
 */
export const fullEntityListSelector = (state, props) => {
  const { entityType } = props.schema;
  return state.entities[entityType];
};

/**
 * Returns current filter query string for entity of a type given in props.schema.entityType.
 * @return     {string}
 */
export const entityFilterQuerySelector = (state, props) => (
  state.app.lists.filters[props.schema.entityType]
);

/**
 * Returns an entity schema.
 * @return     {object}
 */
export const schemaSelector = (state, props) => (
  props.schema
);

/**
 * Returns sorting options.
 * @return     {object}
 */
export const listSortingSelector = (state, props) => (
  state.app.lists.sorting[props.schema.entityType]
);

/**
 * Returns sorted list of entities of type given in props.schema.entityType.
 * Checks if a filter of the specified type exists. If so, it returns a filtered list, otherwise returns all.
 * Uses Reselect memoization.
 * @return     {array}
 */
export const entityListSelector = createSelector(
  fullEntityListSelector,
  entityFilterQuerySelector,
  schemaSelector,
  listSortingSelector,
  (allEntities, filterQuery, schema, sorting) => {
    const filterBy = schema.filterBy;
    const entityMap = !filterQuery ? 
      allEntities :
      _filter(allEntities, (entity) => (
        _find(filterBy, (searchFieldName) => (
          ~entity[searchFieldName].indexOf(filterQuery)
        ))
      ));
    let entities = _values(entityMap);
    if (sorting && sorting.fieldName) {
      const { fieldName } = sorting;
      const compare = sorting.order == 'asc' ? _gt : _lt;
      if (fieldName == 'id') {
        entities = entities.sort((e1, e2) => (compare(e1.id, e2.id) ? 1 : -1));
      } else if (schema.properties[fieldName].type == 'string') {
        entities = entities.sort((e1, e2) => (
          compare(e1[fieldName].toLowerCase(), e2[fieldName].toLowerCase()) ? 1 : -1
        ));
      } else {
        entities = entities.sort((e1, e2) => (compare(e1[fieldName], e2[fieldName]) ? 1 : -1));
      }
    }
    return entities;
  }
);

/**
 * Returns 'key-entity' list of all entities of type given in props.schema for related fields.
 * @return     {object}
 */
export const refEntityListSelector = (state, props) => {
  const { schema, fieldName } = props;
  const refEntityType = schema.properties[fieldName].refersTo;
  return state.entities[refEntityType];
};

/**
 * Returns array of title components for entity of type given in props.schema.
 * Used for options in ReferenceEditor.
 * @return     {array}
 */
export const refEntityTitlesSelector = (state, props) => {
  const { schema, fieldName } = props;
  return schema.properties[fieldName].referredTitles;
};

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
    _transform(entities, (refs, entity, id) => {
      refs[id] = titles.map(title => (entity[title])).join(' ');
    })
  )
);

/**
 * Returns entity by given entityType and id.
 * @return     {object}
 */
export const entitySelector = (state, entityType, id) => (
  state.entities[entityType][id]
);

/**
 * Returns app editing object.
 * @return     {object}
 */
export const editingSelector = (state) => (
  state.app.lists.editing
);