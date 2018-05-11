//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../../redux/actions/userActions';

//connect redux state 
const mapStateToProps = state => ({
    user: state.user,
    schedule: state.schedule.viewScheduleReducer
  });

class ViewSchedule extends Component {
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    }
    
    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }


    render(){
        let scheduleItem = this.props.schedule.map((schedule) => {
            return (<div className="viewScheduleDiv">
                    <p key={schedule.id}>
                     {schedule.name} 
                     <br />
                     {schedule.github}, {schedule.description} 
                    </p>
                    </div>
                    
                )
        })
        return(
            scheduleItem
        )
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ViewSchedule);