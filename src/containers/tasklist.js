import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Task from '../components/task.component'
import { toggleComplete } from '../actions'

class TaskList extends Component {
  render(){
    return(
      <div className = 'tasklist' >
        <h2 className='tasklist-header'>Task List</h2>
        <div>
          {
            this.props.tasks.map((task,index)=>{
              return <Task key={index}  index={index} {...task} toggleComplete={this.props.toggleComplete}/>
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    tasks: state.tasks
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({toggleComplete},dispatch)
}



export default connect(mapStateToProps,matchDispatchToProps)(TaskList)
