import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchEntities } from '../actions/entityActions';

import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';

import departmentSchema from '../configs/schemas/departments';
import employeeSchema from '../configs/schemas/employees';
import Home  from '../components/Home';
import ListContainer  from './ListContainer';
import NavLink  from '../components/NavLink';


class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEntities('departments'));
    dispatch(fetchEntities('employees'));
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar inverse id="navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">RRS-DEMO</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav navbar>
              <NavLink to="/departments">Departments</NavLink>
              <NavLink to="/employees">Employees</NavLink>
            </Nav>
          </Navbar>
          <Grid fluid id="main">
            <Route exact path="/" component={Home}/>
            <Route path="/departments" render={(props) => ( <ListContainer {...props} schema={departmentSchema} />)} />
            <Route path="/employees" render={(props) => ( <ListContainer {...props} schema={employeeSchema} />)} />
          </Grid>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);