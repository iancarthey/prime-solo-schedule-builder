//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

//component imports
import ViewSchedule from '../../ManageSchedulePage/ViewSchedule/ViewSchedule';
import Nav from '../../../components/Nav/Nav';

//connect redux state 
const mapStateToProps = state => ({
    user: state.user,
    schedule: state.schedule.viewScheduleReducer
  });

class StudentView extends Component{
    render(){

        return (
            <div>
                <Nav />
                <div className="studentViewDiv">
                    <h3 className="viewHeader">Today's Schedule</h3>
                    <ViewSchedule />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(StudentView);