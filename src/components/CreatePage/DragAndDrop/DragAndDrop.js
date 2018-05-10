//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//material ui
import Modal from 'material-ui/Modal';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import ScheduleItemForm from '../ScheduleItemForm/ScheduleItemForm';

import { USER_ACTIONS } from '../../../redux/actions/userActions';


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

//connect redux state 
const mapStateToProps = state => ({
    user: state.user,
    items: state.schedule.scheduleItemReducer
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

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class DragAndDrop extends Component{
  constructor(props) {
    super(props);
    this.state = {
      openScheduleItemForm: false
    };
  }

  handleOpen = () => {
    this.setState({ openScheduleItemForm: true });
  };

  handleClose = () => {
    this.setState({ openScheduleItemForm: false });
  };


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
    
        this.props.dispatch({type: 'UPDATE_SCHEDULE', payload: items})
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

      //setup modal
      const { classes } = this.props;
      let scheduleItemForm = (
        <div className="addScheduleButton">
        <Button onClick={this.handleOpen} color="primary" variant="raised" size="small">Add Schedule Item</Button>
          <Modal
            aria-labelledby="scheduleItemModal"
            aria-describedby="ScheduleItemForm"
            open={this.state.openScheduleItemForm}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
                <ScheduleItemForm />
            </div>
          </Modal>
        </ div>
      )

        return (
            <div className="dragNDrop">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
            {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.name} index={index}>
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
                     <br />
                     <span>{item.url}</span>
                     <br /> 
                     <span>{item.description}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {scheduleItemForm}
      </div>
        )
    }
}

const dragAndDropStyle = withStyles(styles)(DragAndDrop);

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(dragAndDropStyle);