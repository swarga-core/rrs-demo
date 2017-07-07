import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import StringEditor from '../StringEditor';

const defaultNameValue = 'Test Department';
const defaultProps = {
  item: {id: 1, name: defaultNameValue},
  schema: {},
  state: {},
  isEditing: false,
  fieldName: 'name',
  onEditorUpdate: ()=>{},
  onEditorCancel: ()=>{}
};

describe('<String Editor />', ()=>{

  describe('in text mode', () => {

    it('has matched snapshot', ()=>{
      const component = renderer.create(
        <StringEditor {...defaultProps} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('has right value', ()=>{
      const editor = shallow(
        <StringEditor {...defaultProps} />);
      expect(editor.text()).toEqual(defaultNameValue);
    });

  });

  describe('in edit mode', () => {

    const editModeProps = { ...defaultProps, isEditing: true };

    it('has matched snapshot', ()=>{
      const component = renderer.create(
        <StringEditor {...editModeProps} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('calls props.actions.onEditorCancel() after pressing "Escape"', ()=>{
      const mockOnEditorCancel = jest.fn();
      const props = { ...editModeProps, onEditorCancel: mockOnEditorCancel };
      const editor = shallow(<StringEditor { ...props } />);
      editor.simulate('keydown', { keyCode: 27 });
      expect(mockOnEditorCancel.mock.calls.length).toBe(1);
    });

    it('calls props.actions.onEditorCancel() on blur event', ()=>{
      const mockOnEditorCancel = jest.fn();
      const props = { ...editModeProps, onEditorCancel: mockOnEditorCancel };
      const editor = shallow(<StringEditor { ...props } />);
      editor.find('input').simulate('blur');
      expect(mockOnEditorCancel.mock.calls.length).toBe(1);
    });

  });

});
