import React, { Component } from 'react';
import { connect  } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const mapStateToProps = state =>({
    user: state.user
});

class ScheduleItemForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            newScheduleItem: {
                name: '',
                url: '',
                description: '',
                schedule_id: ''
            }
        }
    }

    //FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
    handleChangeFor = (propertyName) => {
        return (event) => {
          this.setState({
            newScheduleItem: {
            ...this.state.newScheduleItem,
            [propertyName]: event.target.value
            }
          })
        }
      }

      //FUNCTION FOR SENDING DISPATCH TO ADD SCHEDULE ITEM
      addNewScheduleItem = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'SET_SCHEDULE_ITEM', payload: this.state.newScheduleItem })
        this.setState({
            newScheduleItem: {
                name: '',
                url: '',
                description: '',
                schedule_id: ''
            }
        })
    }

      render(){
        return(
           <div>
               <h3>Add a Schedule Item</h3>
               <form onSubmit={this.addNewScheduleItem}>
                   <TextField value={this.state.name} type="text" onChange={this.handleChangeFor("name")} label="name" />
                   <br />
                   <TextField value={this.state.url} type="text" onChange={this.handleChangeFor("url")} label="url" />
                   <br />
                   <TextField value={this.state.description} type="text" onChange={this.handleChangeFor("description")} label="description" />
                   <br />
                   <Button type="submit" value="Add Schedule Item" color="primary" variant="raised" className="scheduleItemButton">
                      Add Item
                   </Button>
               </form>
           </div> 
        )
    }





}

export default connect(mapStateToProps)(ScheduleItemForm);