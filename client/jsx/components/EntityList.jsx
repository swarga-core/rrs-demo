import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';

import Table  from 'react-bootstrap/lib/Table';
import Button  from 'react-bootstrap/lib/Button';

import EntityListFieldHeader from '../components/EntityListFieldHeader';
import EntityItem from '../components/EntityItem';
import FilterBar from '../components/FilterBar';
import { entityListSelector, listSortingSelector } from '../selectors/entitySelectors';



class EntityList extends Component {

  renderHeader() {
    const { state, schema } = this.props;
    const { properties, filterBy } = schema;
    const sorting = listSortingSelector(state, this.props);
    const fields = [ 'id', ...(Object.keys(properties)) ];
    return fields.map(fieldName => {
      const fieldDesc = fieldName != 'id' ?
        properties[fieldName] :
        {
          sortable: true,
          title: 'ID'
        };
      const isFilerable = filterBy.includes(fieldName);
      return <EntityListFieldHeader
        key={fieldName}
        fieldName={fieldName}
        fieldDesc={fieldDesc}
        sorting={fieldDesc.sortable && sorting && sorting.fieldName == fieldName ? sorting.order : false}
        filterable={isFilerable}
        onClick={this.onSortClick}
      />;
    });
  }

  renderList() {
    const { state, schema, actions } = this.props;
    const items = entityListSelector(state, this.props);
    const result = items.map((item => {
      return (<EntityItem
        key={item.id}
        item={item}
        state={state}
        schema={schema}
        actions={actions}
      />);
    }));
    return result;
  }

  renderAddNewBotton() {
    const { state } = this.props;
    const items = entityListSelector(state, this.props);
    if (_find(items, {id: 'new'}) ) {
      return false;
    }
    return (
      <Button className="add-new-item-btn" bsStyle="success" bsSize="small" onClick={this.onAddNewEntity}>
        Add new
      </Button>
    );
  }

  onSortClick = (event) => {
    event.preventDefault();
    const { schema, actions } = this.props;
    const fieldName = event.currentTarget.dataset.key;
    actions.sortEntityList(schema, fieldName);
  }

  onAddNewEntity = () => {
    const { schema, actions } = this.props;
    actions.addNewEntity(schema.entityType);
    actions.startEntityEditing(schema.entityType, 'new', schema.order[0]);
  }

  render() {
    const { state, schema, actions } = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1>{this.props.schema.title}</h1>
          <FilterBar state={state} schema={schema}  actions={actions}/>
        </div>
        <div className="panel-body">
          <Table striped hover>
            <thead>
              <tr>
                {this.renderHeader()}
                <th className="control-cell"></th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </Table>
        </div>
        <div className="panel-footer">
          {this.renderAddNewBotton()}
        </div>
      </div>
    );
  }

}

EntityList.propTypes = {
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default EntityList;