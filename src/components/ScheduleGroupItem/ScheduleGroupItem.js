import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });

class ScheduleGroupItem extends Component {


    render() {
        let allSchedule = this.props.state.schedule.scheduleReducer;
        console.log('this is allSchedule in SGITEM: ', allSchedule);

        // if(allSchedule.length){
        //     scheduleList = allSchedule.filter(schedule => schedule.name === 'ian');
        //     scheduleItem = scheduleList.map((schedule) => {
        //         return <Typography key={schedule.id}>{schedule.name}</ Typography>
        //     })
        // }
        let scheduleList = allSchedule.filter(schedule => schedule.schedule_group_id === this.props.group.id);
        console.log('this is scheduleList', scheduleList);
        let scheduleItem = scheduleList.map((schedule) => {
                 return <Typography key={schedule.id}>{schedule.name}</ Typography>
            });

        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{this.props.group.name}</Typography>
                </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       {scheduleItem}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}



const scheduleGroupItemStyle = withStyles(styles)(ScheduleGroupItem);

export default connect(mapStateToProps)(scheduleGroupItemStyle);