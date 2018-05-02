import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/schedules">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create">
            Create Schedule
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
