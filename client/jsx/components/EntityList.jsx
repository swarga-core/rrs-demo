import React, { Component } from 'react';
import Table  from 'react-bootstrap/lib/Table';
import Button  from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import _ from 'lodash';

import EntityItem from '../components/EntityItem';



class EntityList extends Component {

	renderHeader() {
		const { properties } = this.props.schema;
		return Object.keys(properties).map(fieldName => {
			const fieldDesc = properties[fieldName];
			return <th key={fieldName}>{fieldDesc.title}</th>
		});
	}

	renderList() {
		const { items, entityType, schema, editing, references, handlers } = this.props;
		const result = Object.keys(items).map((id => {
			const item = items[id];
			return <EntityItem
					key={id}
					item={item}
					entityType={entityType}
  				schema={schema}
					editing={editing}
					references={references}
					handlers={handlers}
				/>
		}));
		return result;
	}

	renderAddNewBotton() {
		const { items, entityType, schema, editing } = this.props;
		if (_.has(items, 'new')) {
			return false;
		}
		return (
			<Button className="add-new-item-btn" bsStyle="success" bsSize="small" onClick={this.onAddNewItem}>
				Add new
			</Button>
		)
	}

	onAddNewItem = () => {
		const { entityType, handlers } = this.props;
		handlers.onAddNewEntity(entityType);
	}

	render() {

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h1>{this.props.schema.title}</h1>
				</div>
				<div className="panel-body">
					<Table striped hover>
					<thead>
						<tr>
							<th data-field-name="id">#</th>
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

export default EntityList;