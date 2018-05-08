import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { Edit } from '@material-ui/icons';
import { Delete } from '@material-ui/icons';

//connect redux state
const mapStateToProps = state => ({
    user: state.user,
  });

class ScheduleGroupItem extends Component {

    handleDeleteSchedule = (schedule) => {
        this.props.dispatch({
            type: 'DELETE_SCHEDULE',
            payload: schedule
        })
    }

    render(){
        return(
            <tr>
                <td className="scheduleGroupExpansionItem">{this.props.schedule.name}</ td>
                <td><Button color="primary">View</Button></td>
                <td><IconButton onClick={() => this.handleDeleteSchedule(this.props.schedule)}><Delete /></IconButton></td>
            </tr>    
        )
    }
}

export default connect(mapStateToProps)(ScheduleGroupItem);