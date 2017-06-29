import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/lib/Button';
import Glyphicon  from 'react-bootstrap/lib/Glyphicon';

import StringEditor  from './StringEditor';
import ReferenceEditor  from './ReferenceEditor';


class EntityItem extends Component {

	isEditing(fieldName) {
		const { item, entityType, editing } = this.props;
		const { id } = item;
		const isFieldMatched = fieldName ? editing.field == fieldName : true;
		return editing && isFieldMatched && editing.entityType == entityType && editing.id == id;
	}

	onStartEdit(fieldName) {
		this.props.handlers.onStartEntityEditing(this.props.item.id, fieldName);
	}

	onRemoveEntity = () => {
		this.props.handlers.onRemoveEntity(this.props.item.id);
	}

	onEditorUpdate = (value) => {
		const fieldName = this.props.editing.field;
		this.props.handlers.onChangeEntityValue(this.props.item.id, fieldName, value, this.props.item);
		this.props.handlers.onCancelItemEditing();
	}

	onEditorCancel = () => {
		this.props.handlers.onCancelItemEditing();
	}

	renderField(fieldName) {
		const { item, schema, references, entityType } = this.props;
		const { id } = item;
		const fieldDesc = schema.properties[fieldName];
		if (fieldName == 'id') {
			return <div>{id}</div>
		}
		switch(fieldDesc.type) {
			case 'string':
				return (
					<StringEditor
						item={item}
						fieldName={fieldName}
						schema={schema}
						isEditing={this.isEditing(fieldName)}
						onEditorUpdate={this.onEditorUpdate}
						onEditorCancel={this.onEditorCancel}
					/>
				)
			case 'number':
				if (fieldDesc.refersTo) {
					return (
						<ReferenceEditor
							item={item}
							fieldName={fieldName}
							schema={schema}
							isEditing={this.isEditing(fieldName)}
							references={references[fieldDesc.refersTo]}
							onEditorUpdate={this.onEditorUpdate}
							onEditorCancel={this.onEditorCancel}
						/>
					)
				}
		}
	}

	renderFields() {
		const fieldNames = Object.keys(this.props.schema.properties);
		return [ 'id', ...fieldNames ].map(fieldName => {
			const clickHandler = {};
			if (fieldName != 'id') {
				clickHandler.onClick = this.onStartEdit.bind(this, fieldName)
			}
			const dataAttr = { 'data-field-name': fieldName };
			return (
				<td
					key={fieldName}
					{ ...clickHandler }
					{ ...dataAttr }
				>
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
			<tr className={this.getRowClass()}>
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
  entityType: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  editing: PropTypes.oneOfType([
  		PropTypes.object,
  		PropTypes.bool,
  	]).isRequired,
  references: PropTypes.object,
  handlers: PropTypes.object.isRequired,
};

export default EntityItem;