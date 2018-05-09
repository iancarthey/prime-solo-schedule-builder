//react imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Modal from 'material-ui/Modal';


//component imports
import Nav from '../../../components/Nav/Nav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import ScheduleGroupExpansion from '../ScheduleGroupExpansion/ScheduleGroupExpansion';
import ScheduleGroupForm from '../ScheduleGroupForm/ScheduleGroupForm';

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
  constructor(props) {
    super(props);
    this.state = {
      openScheduleGroupForm: false
    };
  }

  //function to show modal
  handleOpen = () => {
    this.setState({ openScheduleGroupForm: true });
  };

  //function to close modal
  handleClose = () => {
    this.setState({ openScheduleGroupForm: false });
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: 'FETCH_SCHEDULE_GROUP'});
    this.props.dispatch({type: 'FETCH_SCHEDULE'});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content;
    const { classes } = this.props;
    let scheduleGroup = this.props.scheduleGroup.scheduleGroupReducer.map((group) => {
      return <ScheduleGroupExpansion key={group.id} group={group} />
    })

    let scheduleGroupModal = (
      <div>
        <Button className="addGroupButton" onClick={this.handleOpen} color="primary" variant="raised" size="small">
          Add Schedule Group
        </Button>
        <h3>Manage Groups and Schedules</h3>
        <hr />
        <Modal
          aria-labelledby="scheduleGroupModal"
          aria-describedby="ScheduleGroupForm"
          open={this.state.openScheduleGroupForm}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
              <ScheduleGroupForm handleClose={this.handleClose}/>
          </div>
        </Modal>
      </ div>
    );

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          {scheduleGroupModal}
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

const mySchedulesStyle = withStyles(styles)(MySchedules);

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(mySchedulesStyle);

