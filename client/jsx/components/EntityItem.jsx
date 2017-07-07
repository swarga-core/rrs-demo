import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import Button  from 'react-bootstrap/lib/Button';
import Glyphicon  from 'react-bootstrap/lib/Glyphicon';

import StringEditor  from './StringEditor';
import ReferenceEditor  from './ReferenceEditor';
import { editingSelector } from '../selectors/entitySelectors';



class EntityItem extends Component {

  shouldComponentUpdate(nextProps) {
    const { id } = this.props.item;
    const thisEditing = editingSelector(this.props.state);
    const nextEditing = editingSelector(nextProps.state);
    return (thisEditing.id == id || nextEditing.id == id) || !(isEqual(this.props.item, nextProps.item));
  }

  isEditing(fieldName) {
    const { item, state, schema } = this.props;
    const editing = editingSelector(state);
    const isFieldMatched = fieldName ? editing.field == fieldName : true;
    return editing && isFieldMatched && editing.entityType == schema.entityType && editing.id == item.id;
  }

  onStartEditing = (event) => {
    const { item, schema, actions } = this.props;
    const fieldName = event.target.closest('td').dataset.fieldname;
    if (fieldName && fieldName != 'id') {
      actions.startEntityEditing(schema.entityType, item.id, fieldName);
    }
  }

  onEditorUpdate = (value) => {
    const { item, state, schema, actions } = this.props;
    actions.updateEntityField(schema, item.id, editingSelector(state).field, value);
    actions.stopEntityEditing();
  }

  onEditorCancel = () => {
    const { actions } = this.props;
    actions.stopEntityEditing();
  }

  onRemoveEntity = () => {
    const { item, schema, actions } = this.props;
    actions.removeEntity(schema.entityType, item.id);
  }

  renderField(fieldName) {
    const { item, schema, state } = this.props;
    const fieldDesc = schema.properties[fieldName];
    if (fieldName == 'id') {
      return <div>{item.id}</div>;
    }
    switch(fieldDesc.type) {
      case 'string':
        return (
          <StringEditor
            fieldName={fieldName}
            item={item}
            state={state}
            schema={schema}
            isEditing={this.isEditing(fieldName)}
            onEditorUpdate={this.onEditorUpdate}
            onEditorCancel={this.onEditorCancel}
          />
        );
      case 'number':
        if (fieldDesc.refersTo) {
          return (
            <ReferenceEditor
              fieldName={fieldName}
              item={item}
              state={state}
              schema={schema}
              isEditing={this.isEditing(fieldName)}
              onEditorUpdate={this.onEditorUpdate}
              onEditorCancel={this.onEditorCancel}
            />
          );
        }
    }
  }

  renderFields() {
    const fieldNames = Object.keys(this.props.schema.properties);
    return [ 'id', ...fieldNames ].map(fieldName => {
      const isEditable = (fieldName != 'id' && !this.isEditing(fieldName)) ? 'editable' : '';
      return (
        <td key={fieldName} data-fieldname={fieldName} className={isEditable}>
          {this.renderField(fieldName)}
        </td>
      );
    });
  }

  getRowClass() {
    if (this.props.item.id == 'new') {
      return 'success';
    } else if (this.isEditing()) {
      return 'info';
    } else {
      return '';
    }
  }

  render() {
    return (
      <tr className={this.getRowClass()} onClick={this.onStartEditing}>
        {this.renderFields()}
        <td className="control-cell">
          <Button bsStyle="danger" bsSize="xsmall" onClick={this.onRemoveEntity}>
            <Glyphicon glyph="remove" />
          </Button>
        </td>
      </tr>
    );
  }

}

EntityItem.propTypes = {
  item: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default EntityItem;