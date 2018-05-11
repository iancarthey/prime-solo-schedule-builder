import React from 'react';
import logo from '../../image/logo/logo.png'

const Header = ({ title }) => (
  <div className="instructions">
    <div className="logoHeader">
      <img src={logo} className="logo"/>
      <h1 className="lead">{ title }</h1>
    </div>
  </div>
);

export default Header;
