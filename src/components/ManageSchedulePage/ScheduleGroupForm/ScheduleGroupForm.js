import React, { Component } from 'react';
import { connect  } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const mapStateToProps = state =>({
    user: state.user
});

class ScheduleGroupForm extends Component{
    constructor(props){
        super(props); 
        this.state = {
            newScheduleGroup: {
                name: '',
                active: true,
            }
        }
    }
        //FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
        handleChangeFor = (propertyName) => {
            return (event) => {
              this.setState({
                newScheduleGroup: {
                ...this.state.newScheduleGroup,
                [propertyName]: event.target.value
                }
              })
            }
          }
    
          //FUNCTION FOR SENDING DISPATCH TO ADD SCHEDULE GROUP
          addNewScheduleGroup = event => {
            event.preventDefault();
            this.props.dispatch({ 
                type: 'ADD_SCHEDULE_GROUP', 
                payload: { 
                    newGroup: this.state.newScheduleGroup, 
                    user: this.props.user }
            });
        }
    
    render(){
        return(
            <div>
               <h3>Add a Group</h3>
               <form onSubmit={this.addNewScheduleGroup}>
                   <TextField type="text" onChange={this.handleChangeFor("name")} label="name" />
                   <br />
                   <br />
                   <Button type="submit" value="Add Schedule Group" color="primary" variant="raised">Add Group</Button>
               </form>
           </div> 
        )
    }
}

export default connect(mapStateToProps)(ScheduleGroupForm);