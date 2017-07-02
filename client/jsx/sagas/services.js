import _ from 'lodash';


export const api = {

  fetchEntities(entityType) {
    return fetch('http://localhost:3000/' + entityType + '/')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return _.keyBy(json, (entity) => {
          return entity.id;
        });
      })
      .catch(() => {
        return {};
      });
  },

  updateEntity(entityType, entity) {
    return fetch('http://localhost:3000/' + entityType + '/' + entity.id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      })
      .catch(() => {
        return {};
      });
  },

  removeEntity(entityType, id) {
    return fetch('http://localhost:3000/' + entityType + '/' + id, {
        method: 'delete'
      })
      .then((response) => {
        return response.ok
      })
      .catch(() => {
        return false;
      });
  },

  syncNewEntity(entityType, entity) {
    return fetch('http://localhost:3000/' + entityType, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      })
      .catch(() => {
        return {};
      });
  },
  
}
