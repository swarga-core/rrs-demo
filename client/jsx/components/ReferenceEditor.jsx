import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


class ReferenceEditor extends Component {

	componentDidMount() {
		if (this.editor) {
			this.editor.focus();
		}
	}

	componentDidUpdate() {
		if (this.editor) {
			this.editor.focus();
		}
	}

	onEditorKeyDown = (event) => {
		switch(event.keyCode) {
			case 27:
				this.props.onEditorCancel();
				break;
		}
	}

	onChange = () => {
		if (this.editor.value) {
			this.props.onEditorUpdate(this.editor.value);
		}
	}

	onBlur = () => {
		this.props.onEditorCancel();
	}

	renderOptions() {
		const { item, fieldName, references } = this.props;
		return _.map(+item[fieldName] ? references : { '0': ' ', ...references }, (value, id) => {
			const placeholderClass = +id ? '' : 'placeholder'
			return <option className={placeholderClass} key={id} value={id}>{value}</option>
		});
	}

	render() {
		const { item, fieldName, isEditing } = this.props;
		if (isEditing) {
			return (
				<select
					className="form-control input-sm"
					defaultValue={item[fieldName]}
					ref={(editor) => this.editor = editor}
					onChange={this.onChange}
					onKeyDown={this.onEditorKeyDown}
					onBlur={this.onBlur}
				>
					{this.renderOptions()}
				</select>
			);
		} else {
			const { item, fieldName, references } = this.props;
			const id = item[fieldName];
			return <div>{+id ? references[id] || '?' : '?'}</div>
		}
	}

}

ReferenceEditor.propTypes = {
  item: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  fieldName: PropTypes.string.isRequired,
  onEditorUpdate: PropTypes.func.isRequired,
  onEditorCancel: PropTypes.func.isRequired,
  references: PropTypes.object.isRequired,
};

export default ReferenceEditor;