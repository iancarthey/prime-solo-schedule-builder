import React, { Component } from 'react';
import { connect  } from 'react-redux';
import Nav from '../../components/Nav/Nav';

const mapStateToProps = state =>({
    user: state.user
});

class ScheduleItemForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            newScheduleItem: {
                name: '',
                type: '',
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
    }

      render(){
        return(
           <div>
               <Nav />
               <h3>Add a Schedule Item</h3>
               <form onSubmit={this.addNewScheduleItem}>
                   <input type="text" onChange={this.handleChangeFor("name")} placeholder="name"></input>
                   <input type="text" onChange={this.handleChangeFor("type")} placeholder="type"></input>
                   <input type="text" onChange={this.handleChangeFor("url")} placeholder="url"></input>
                   <input type="text" onChange={this.handleChangeFor("description")} placeholder="description"></input>
                   <input type="submit" value="Add Schedule Item"></input>
               </form>
           </div> 
        )
    }





}

export default connect(mapStateToProps)(ScheduleItemForm);