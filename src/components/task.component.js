import React, { Component } from 'react'

export default class Task extends Component {
  handleToggle(){
    this.props.toggleComplete(this.props.index)
  }

  render(){
    return(
      <div className='task' >
        <h3>
          <span className='task-message'>{this.props.task}</span>
          <i onClick = {this.handleToggle.bind(this)} className = { this.props.completed ? 'fa fa-check-circle fa-lg task-check green' : 'fa fa-times-circle fa-lg task-check red'}></i>
        </h3>
      </div>
    )
  }
}

Task.propTypes = {
  task: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired
}
