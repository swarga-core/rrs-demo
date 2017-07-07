import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import EntityList from '../components/EntityList';
import * as entityActions from '../actions/entityActions';


class ListContainer extends Component {
  render() {
    const {state, schema, actions} = this.props;
    return <EntityList  state={state} schema={schema} actions={actions} />;
  }
}

ListContainer.propTypes = {
  state: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(entityActions, dispatch)
  };
}

export default connect(state => ({state}), mapDispatchToProps)(ListContainer);