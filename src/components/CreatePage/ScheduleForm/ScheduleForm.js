//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

//Material UI imports
// import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormHelperText } from 'material-ui/Form';


import { USER_ACTIONS } from '../../../redux/actions/userActions';

const mapStateToProps = reduxState => ({
    user: reduxState.user,
    scheduleGroup: reduxState.schedule.scheduleGroupReducer,
    items: reduxState.schedule.scheduleItemReducer
  });

  class ScheduleForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
          newSchedule: {
            name: '',
            date: '',
            group: ''
          }
      };
  }
  //FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
  handleChangeFor = (propertyName) => {
    return (event) => {
      this.setState({
        newSchedule: {
        ...this.state.newSchedule,
        [propertyName]: event.target.value
        }
      })
    }
  }

  //FUNCTION FOR SAVING SCHEDULE TO DATABASE
  addSchedule = () => {
    this.props.dispatch({
      type: 'ADD_SCHEDULE',
      payload: {
        newScheduleInfo: this.state,
        newScheduleItems: this.props.items
      }
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

  render(){
    let now = moment().format('YYYY-MM-DD');
    let scheduleGroupItem = this.props.scheduleGroup.map((group) => {
        return (<MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>)
      })

    return(
        <div>
        <TextField id="With-Placeholder" label="Schedule Name" onChange={this.handleChangeFor("name")}/>
          <br />
          <br />
          <TextField
            label="Schedule Date"
            type="date"
            onChange={this.handleChangeFor("date")}
            defaultValue={now}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <InputLabel>Group: </InputLabel>
          <Select
            value={this.state.newSchedule.group}
            onChange={this.handleChangeFor("group")}
            inputProps={{
              name: 'ScheduleGroupSelector',
              id: 'scheduleGroup',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {scheduleGroupItem}
          </Select>
          <FormHelperText>Please Select Group</FormHelperText>
          <br />
          <Button variant="raised" color="primary" onClick={() => this.addSchedule()}>
            Finalize Schedule
          </ Button>
        </div>
    )

  }
}

export default connect(mapStateToProps)(ScheduleForm);