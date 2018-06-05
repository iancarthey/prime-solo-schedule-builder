import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScheduleGroupItem from '../ScheduleGroupItem/ScheduleGroupItem';

//material ui import
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const mapStateToProps = state => ({
    state
  });

  const styles = theme => ({
    root: {
      width: '100%',
      border: '1px solid #009688'
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });

class ScheduleGroupExpansion extends Component {


    render() {
        //set a variable equal to reduxState reducer
        let allSchedule = this.props.state.schedule.scheduleReducer;
        //filter all Schedule so only correct schedules go to each group
        let scheduleList = allSchedule.filter(schedule => schedule.schedule_group_id === this.props.group.id);
        //map over return of filter function to display to DOM
        let scheduleItem = scheduleList.map((schedule) => {
                 return (<ScheduleGroupItem key={schedule.id} schedule={schedule}/>)
            });

        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{this.props.group.name}</Typography>
                </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <table>
                            <tbody>
                                {scheduleItem}
                            </tbody>
                        </table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}



const scheduleGroupExpansionStyle = withStyles(styles)(ScheduleGroupExpansion);

export default connect(mapStateToProps)(scheduleGroupExpansionStyle);