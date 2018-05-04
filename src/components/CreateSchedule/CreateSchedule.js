//library imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';

//Material UI imports
// import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from 'material-ui/TextField';

//Other views imports
import Nav from '../../components/Nav/Nav';
import ScheduleItemForm from '../ScheduleItemForm/ScheduleItemForm';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  items: state.schedule.scheduleItemReducer
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

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


class CreateSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSchedule: {
        name: '',
        date: ''
      },
      showScheduleItem: false
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

  showForm = () => {
    this.setState({
      showScheduleItem: !this.state.showScheduleItem
    })
  }

  addSchedule = () => {
    this.props.dispatch({
      type: 'ADD_SCHEDULE',
      payload: {
        newSchedule: this.state,
        newScheduleItems: this.props.items
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;
    let scheduleForm;
    let now = moment().format('YYYY-MM-DD');

    if (this.state.showScheduleItem) {
      scheduleForm = <ScheduleItemForm />
    } else {
      scheduleForm = (           
        <Button color="primary" variant="raised" onClick={() => this.showForm()}>
          Add Schedule Item
          <AddIcon />
        </ Button>
      )}

    if (this.props.user.userName) {
      content = (
        <div>
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
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      );
    }

    return (
      <div>
        <Nav />
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
        <br />
        { scheduleForm }
        { content }
        <Button variant="raised" color="primary" onClick={() => this.addSchedule()}>
          Finish
        </ Button>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreateSchedule);
