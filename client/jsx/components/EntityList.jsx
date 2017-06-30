import React, { Component } from 'react';
// import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Table  from 'react-bootstrap/lib/Table';
import Button  from 'react-bootstrap/lib/Button';

import EntityItem from '../components/EntityItem';
import { entityListSelector } from '../selectors/entitySelectors';



class EntityList extends Component {

	renderHeader() {
		const { properties } = this.props.schema;
		return Object.keys(properties).map(fieldName => {
			const fieldDesc = properties[fieldName];
			return <th key={fieldName}>{fieldDesc.title}</th>
		});
	}

	renderList() {
		const { state, schema, actions } = this.props;
		const items = entityListSelector(state, this.props);
		const result = Object.keys(items).map((id => {
			const item = items[id];
			return <EntityItem
					key={id}
					item={item}
					state={state}
  				schema={schema}
					actions={actions}
				/>
		}));
		return result;
	}

	renderAddNewBotton() {
		const { state, schema } = this.props;
		const items = entityListSelector(state, this.props);
		if (_.has(items, 'new')) {
			return false;
		}
		return (
			<Button className="add-new-item-btn" bsStyle="success" bsSize="small" onClick={this.onAddNewEntity}>
				Add new
			</Button>
		)
	}

	onAddNewEntity = () => {
		const { schema, actions } = this.props;
		actions.addNewEntity(schema.entityType);
		actions.startEntityEditing(schema.entityType, 'new', schema.order[0]);
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
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default EntityList;