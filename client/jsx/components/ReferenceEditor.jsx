import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';

import { referredEntitiesSelector } from '../selectors/entitySelectors';


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

  renderOptions(references) {
    const { item, fieldName } = this.props;
    const options = +item[fieldName] ? references : { '0': ' ', ...references };
    return _map(options, (value, id) => {
      const placeholderClass = +id ? '' : 'placeholder';
      return <option className={placeholderClass} key={id} value={id}>{value}</option>;
    });
  }

  render() {
    const { item, fieldName, isEditing, state } = this.props;
    const references = referredEntitiesSelector(state, this.props);
    if (isEditing) {
      return (
        <select
          className="form-control input-sm"
          defaultValue={item[fieldName]}
          ref={editor=> this.editor = editor}
          onChange={this.onChange}
          onKeyDown={this.onEditorKeyDown}
          onBlur={this.onBlur}
        >
          {this.renderOptions(references)}
        </select>
      );
    } else {
      const id = item[fieldName];
      return <div>{+id ? references[id] || '' : ''}</div>;
    }
  }

}

ReferenceEditor.propTypes = {
  fieldName: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEditorUpdate: PropTypes.func.isRequired,
  onEditorCancel: PropTypes.func.isRequired,
};

export default ReferenceEditor;