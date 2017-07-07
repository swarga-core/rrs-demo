import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


export default function NavLink(props) {
  const {to, children, matchExact} = props;
  return (
    <Route path={to} exact={matchExact} children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to}>{children}</Link>
      </li>
    )}/>
  );
}