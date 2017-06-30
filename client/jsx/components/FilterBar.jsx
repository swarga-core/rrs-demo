import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { entityFilterQuerySelector } from '../selectors/entitySelectors';



class FilterBar extends Component {

	onSetEntityFilter = () => {
		const { schema, actions } = this.props;
		const value = this.filter.value;
		if (value) {
			actions.setEntityFilter(schema, value);
		} else {
			actions.resetEntityFilter(schema);
		}
	}

	onResetEntityFilter = () => {
		const { schema, actions } = this.props;
		actions.resetEntityFilter(schema);
	}

	render() {
		const filterQuery = entityFilterQuerySelector(this.props.state, this.props) || '';
		return (
			<Form inline className="entity-filter">
				<FormGroup validationState={filterQuery ? 'success' : null}>
					<InputGroup>
					<InputGroup.Addon>
						<Glyphicon glyph="search"/>
					</InputGroup.Addon>
						<FormControl
							type="text"
							inputRef={filter => this.filter = filter}
							onChange={this.onSetEntityFilter}
							value={filterQuery}
						/>
						<Button
							className={!filterQuery ? 'hidden' : ''}
							onClick={this.onResetEntityFilter}
						>
							<Glyphicon glyph="remove"/>
						</Button>
					</InputGroup>
				</FormGroup>
			</Form>
		);
	}

}

FilterBar.propTypes = {
  schema: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default FilterBar;