import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _has from 'lodash/has';

import Table  from 'react-bootstrap/lib/Table';
import Button  from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import EntityItem from '../components/EntityItem';
import FilterBar from '../components/FilterBar';
import { entityListSelector } from '../selectors/entitySelectors';



class EntityList extends Component {

  renderHeader() {
    const { properties, filterBy } = this.props.schema;
    return Object.keys(properties).map(fieldName => {
      const fieldDesc = properties[fieldName];
      const isFilerable = filterBy.includes(fieldName);
      const title = fieldDesc.sortable ? <a href='#' data-key={fieldName} onClick={this.onSortClick}>{fieldDesc.title}</a> : fieldDesc.title;
      return (
        <th key={fieldName}>
          {title}
          {isFilerable ? <Glyphicon glyph="search" className="filterable-mark"/> : ''}
        </th>
      );
    });
  }

  renderList() {
    const { state, schema, actions } = this.props;
    const items = entityListSelector(state, this.props);
    const result = Object.keys(items).map((id => {
      const item = items[id];
      return (<EntityItem
        key={id}
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
    if (_has(items, 'new')) {
      return false;
    }
    return (
      <Button className="add-new-item-btn" bsStyle="success" bsSize="small" onClick={this.onAddNewEntity}>
        Add new
      </Button>
    );
  }

  onSortClick = (event) => {
    const { schema, actions } = this.props;
    event.preventDefault();
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
                <th data-fieldname="id">#</th>
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