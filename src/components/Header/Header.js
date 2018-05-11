import React from 'react';
import logo from '../../image/logo/logo'

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <img path={logo} />
      <h1 className="lead">{ title }</h1>
    </div>
  </div>
);

export default Header;
