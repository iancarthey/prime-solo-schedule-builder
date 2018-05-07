import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  user: reduxState.user
});

class NavBar extends Component{
  
  logout = () => {

    //calls the log out function
    this.props.dispatch(triggerLogout);
  }
  
  render(){
    return (
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
        <li>
          <Link to="/home" onClick={this.logout}>
            Logout
          </ Link>  
        </li>  
      </ul>
    </div>
  </div>
    );
  }
};

export default connect(mapStateToProps)(NavBar);
