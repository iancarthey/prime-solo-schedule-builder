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

//import other components
import EditScheduleDragAndDrop from '../EditScheduleDragAndDrop/EditScheduleDragAndDrop';
import ViewSchedule from '../ViewSchedule/ViewSchedule';

//connect redux state
const mapStateToProps = state => ({
    user: state.user,
    scheduleGroup: state.schedule
  });
  
  //styling for edit modal
  function getEditModalStyle() {
    const top = 0;
    const left = 0;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

    //styling for modal
    function getViewModalStyle() {
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
      opacity: .95,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

class ScheduleGroupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          openEditSchedule: false,
          openViewSchedule: false,
        };
      }

    //function to show edit modal
    handleEditOpen = (schedule) => {
        this.setState({ openEditSchedule: true });
        this.props.dispatch({
            type: 'VIEW_SCHEDULE',
            payload: schedule
        })
    };

    //function to close edit modal
    handleEditClose = () => {
        this.setState({ openEditSchedule: false });
    };  

    //function to show view modal
    handleViewOpen = (schedule) => {
        this.setState({ openViewSchedule: true });
        this.props.dispatch({
            type: 'VIEW_SCHEDULE',
            payload: schedule
        })
    };

    //function to close edit modal
    handleViewClose = () => {
        this.setState({ openViewSchedule: false });
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
        let viewDate = moment(scheduleDate).format('l');
        
        //declare modals
        let editModal;
        let viewModal
        const { classes } = this.props;

        //set up edit modal
        editModal = (
                <Modal
                    aria-labelledby="scheduleGroupModal"
                    aria-describedby="ScheduleGroupForm"
                    open={this.state.openEditSchedule}
                    onClose={this.handleEditClose}
                >
                <div style={getEditModalStyle()} className={classes.paper}>
                    <h3 className="editHeader">{viewDate}- {this.props.schedule.schedule_name}</h3>
                    <EditScheduleDragAndDrop />
                </div>
                </Modal>
        )

        //set up view modal
        viewModal = (
            <Modal
                aria-labelledby="scheduleGroupModal"
                aria-describedby="ScheduleGroupForm"
                open={this.state.openViewSchedule}
                onClose={this.handleViewClose}
            >
            <div style={getViewModalStyle()} className={classes.paper}>
                <h3 className="viewHeader">{viewDate}- {this.props.schedule.schedule_name}</h3>
                <div className="viewDiv">
                    <ViewSchedule />
                </ div>
            </div>
            </Modal>
        )

        return(
            <tr>
                <td className="scheduleGroupExpansionItem">{viewDate}- </td>
                <td className="scheduleGroupExpansionItem">{this.props.schedule.schedule_name}</ td>
                <td className="scheduleGroupExpansionItem"><Button color="primary" onClick={() => this.handleViewOpen(this.props.schedule)}>View</Button></td>
                {viewModal}
                <td className="scheduleGroupExpansionItem"><IconButton onClick={() => this.handleEditOpen(this.props.schedule)}><Edit /></IconButton></td>
                { editModal }
                <td className="scheduleGroupExpansionItem"><IconButton onClick={() => this.handleDeleteSchedule(this.props.schedule)}><Delete /></IconButton></td>
            </tr>    
        )
    }
}

let scheduleGroupItemStyle = withStyles(styles)(ScheduleGroupItem)

export default connect(mapStateToProps)(scheduleGroupItemStyle);