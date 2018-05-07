import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import ScheduleGroupItem from '../ScheduleGroupItem/ScheduleGroupItem'

//connect redux state
const mapStateToProps = state => ({
  user: state.user,
  scheduleGroup: state.schedule
});

//styling for modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  //for modal
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class MySchedules extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: 'FETCH_SCHEDULE_GROUP'})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content;
    let scheduleGroupForm = (
      <div>
      <Button onClick={this.handleOpen} color="primary" variant="raised" size="small">Add Schedule Group</Button>
        <Modal
          aria-labelledby="scheduleGroupModal"
          aria-describedby="ScheduleGroupForm"
          open={this.state.openScheduleItemForm}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
              <ScheduleItemForm />
          </div>
        </Modal>
      </ div>
    );

    let scheduleGroup = this.props.scheduleGroup.scheduleGroupReducer.map((group) => {
      return <ScheduleGroupItem key={group.id} group={group} />
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          
          {scheduleGroup}
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MySchedules);

