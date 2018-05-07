//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
// import AddIcon from '@material-ui/icons/Add';
import Modal from 'material-ui/Modal';
// import Typography from 'material-ui/Typography';

//Other views imports
import Nav from '../../components/Nav/Nav';
import ScheduleItemForm from '../ScheduleItemForm/ScheduleItemForm';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import ScheduleForm from '../ScheduleForm/ScheduleForm';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = reduxState => ({
  user: reduxState.user,
  scheduleGroup: reduxState.schedule.scheduleGroupReducer
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

class CreateSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openScheduleItemForm: false
    };
  }

  handleOpen = () => {
    this.setState({ openScheduleItemForm: true });
  };

  handleClose = () => {
    this.setState({ openScheduleItemForm: false });
  };


  showForm = () => {
    this.setState({
      showScheduleItem: !this.state.showScheduleItem
    })
  }

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
    const { classes } = this.props;
    let scheduleItemForm = (
      <div>
      <Button onClick={this.handleOpen} color="primary" variant="raised" size="small">Add Schedule Item</Button>
        <Modal
          aria-labelledby="scheduleItemModal"
          aria-describedby="ScheduleItemForm"
          open={this.state.openScheduleItemForm}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
              <ScheduleItemForm />
          </div>
        </Modal>
      </ div>
    )

    if (this.props.user.userName) {
      content = (
        <div>
          <ScheduleForm />
          <hr />
          {scheduleItemForm}
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

const createScheduleStyle = withStyles(styles)(CreateSchedule);

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(createScheduleStyle);
