//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI imports
import Button from 'material-ui/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from 'material-ui/Typography';

//Other views imports
import Nav from '../../../components/Nav/Nav';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

const mapStateToProps = reduxState => ({
  user: reduxState.user,
  scheduleGroup: reduxState.schedule.scheduleGroupReducer
});


class CreateSchedule extends Component {

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'FETCH_SCHEDULE_GROUP'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <ScheduleForm />
          <DragAndDrop />
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateSchedule);
