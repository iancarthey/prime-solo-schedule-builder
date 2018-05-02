import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state
  });


class ScheduleGroupItem extends Component {
    

    render() {
        return (
            <div>
                <p>{this.props.group.name}</p>
            </div>
        )
    }
}





export default connect(mapStateToProps)(ScheduleGroupItem);