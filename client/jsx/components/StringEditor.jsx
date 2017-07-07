import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';


class StringEditor extends Component {

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

  shouldComponentUpdate(nextProps) {
    return (
      !isEqual(nextProps.item, this.props.item)
      || nextProps.isEditing !== this.props.isEditing
    );
  }

  onEditorKeyDown = (event) => {
    switch(event.keyCode) {
      case 13:
        if (this.editor.value) {
          this.props.onEditorUpdate(this.editor.value);
        }
        break;
      case 27:
        this.props.onEditorCancel();
        break;
    }
  }

  onBlur = () => {
    this.props.onEditorCancel();
  }

  render() {
    const { item, fieldName, isEditing } = this.props;
    if (isEditing) {
      return (
        <input
          type="text"
          className="form-control input-sm"
          defaultValue={item[fieldName]}
          ref={editor => this.editor = editor}
          onKeyDown={this.onEditorKeyDown}
          onBlur={this.onBlur}
        />
      );
    } else {
      return (<div>{item[fieldName]}</div>);
    }
  }

}

StringEditor.propTypes = {
  fieldName: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEditorUpdate: PropTypes.func.isRequired,
  onEditorCancel: PropTypes.func.isRequired,
};

export default StringEditor;