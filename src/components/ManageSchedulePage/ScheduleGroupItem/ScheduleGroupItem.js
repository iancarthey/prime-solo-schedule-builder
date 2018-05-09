import React, { Component } from 'react';
import { connect } from 'react-redux';

//Material UI imports
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import Modal from 'material-ui/Modal';

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

class ScheduleGroupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openEditSchedule: false
        };
      }

    //function to show modal
    handleOpen = (schedule) => {
        this.setState({ openEditSchedule: true });
        this.props.dispatch({
            type: 'VIEW_SCHEDULE',
            payload: schedule
        })
    };

    //function to close modal
    handleClose = () => {
        this.setState({ openEditSchedule: false });
    };  

    //function to delete schedule
    handleDeleteSchedule = (schedule) => {
        this.props.dispatch({
            type: 'DELETE_SCHEDULE',
            payload: schedule
        })
    }

    render(){
        //format Date to post to Dom
        let scheduleDate = this.props.schedule.date
        let viewDate = moment(scheduleDate).format('L');
        
        //declare modal
        let editModal;
        const { classes } = this.props;

        //set up edit modal
        editModal = (
                <Modal
                    aria-labelledby="scheduleGroupModal"
                    aria-describedby="ScheduleGroupForm"
                    open={this.state.openEditSchedule}
                    onClose={this.handleClose}
                >
                <div style={getModalStyle()} className={classes.paper}>
                    <p>Ian</p>
                </div>
                </Modal>
        )

        return(
            <tr>
                <td>{viewDate}</td>
                <td className="scheduleGroupExpansionItem">{this.props.schedule.name}</ td>
                <td><Button color="primary">View</Button></td>
                { editModal }
                <td><IconButton onClick={() => this.handleOpen(this.props.schedule)}><Edit /></IconButton></td>
                <td><IconButton onClick={() => this.handleDeleteSchedule(this.props.schedule)}><Delete /></IconButton></td>
            </tr>    
        )
    }
}

let scheduleGroupItemStyle = withStyles(styles)(ScheduleGroupItem)

export default connect(mapStateToProps)(scheduleGroupItemStyle);