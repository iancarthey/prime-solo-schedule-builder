//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//material ui import
import Button from 'material-ui/Button';

import { USER_ACTIONS } from '../../../redux/actions/userActions';

//connect redux state 
const mapStateToProps = state => ({
    user: state.user,
    items: state.schedule.viewScheduleReducer
  });

  // a function to help with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const grid = 8;

//styling for each schedule item
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '12px',

  // change background colour if dragging
  background: isDragging ? 'black' : 'grey',
  color: 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#009688' : 'black',
  padding: grid,
  width: 250,
});

class EditScheduleDragAndDrop extends Component{
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    this.props.dispatch({type: 'DRAG_EDIT_SCHEDULE', payload: items})
  }

  //function to send update schedule order
  handleEdit = () => {
    let index = 0;
    for(let updateItem of this.props.items){
      let orderId = index += 1
      this.props.dispatch({
        type: 'UPDATE_EDIT_SCHEDULE',
        payload: {
          newScheduleItem: updateItem,
          newOrder: orderId
        }
      })
    }
  }

componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
}

componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render(){
    return (
        <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
        {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className="editDragNDrop"
        >
          {this.props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.name} index={index} >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                 <span>{item.name}</span> 
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  <Button color="primary" variant="raised" onClick={() => this.handleEdit()}>Finalize Edit</Button>
  </div>
    )
  }
}


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(EditScheduleDragAndDrop);