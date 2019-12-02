import React from 'react'
import ReactDOM from 'react-dom'
import {store, DELETE, SET_FORM_EDIT, SET_TASKS} from '../store.js'
import axios from 'axios'

const moment = require('moment')


const deleteData = (task) => {
  axios.delete(`http://localhost:3000/api/tasks/${task.id}`)
    .then(() => {
      store.dispatch({
        type: DELETE,
        delete: task.id
      })
    })
}

class Tasks extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidUpdate(prevProps) {
    const { task } = this.props
    if (task.taskName !== prevProps.task.taskName) {
      axios.get(`http://localhost:3000/api/tasks/`)
      .then(res => {
        store.dispatch({
          type: SET_TASKS,
          setTasks: res.data
        })
      })
    }
  }

  clickDelete() {
    const { task } = this.props
    console.log('hi')
    axios.delete(`http://localhost:3000/api/tasks/${task.id}`)
    .then(() => {
      store.dispatch({
        type: DELETE,
        delete: task.id
      })
    })
  }

  togglePopUpEdit(ev) {
    const { task } = this.props
    store.dispatch({
      type: SET_FORM_EDIT,
      editFormDate: task.taskDateDue,
      editTaskTitle: task.TaskName,
      editTimeDue: task.taskTimeDue,
      getId: task.id,
      toggle: !this.state.showPopUpEdit,
    })
  }

  // editTask() {
  //   const { task } = this.props
  //   console.log(task)
  // }

  render() {
    const { task } = this.props
    // console.log('task props', this.props.task)
    return (
      <div>
        <div className='taskContainer'>
          <div className='taskName'>{task.taskName}</div>
          <div className='taskDue'>Task due @ {moment(`${task.taskTimeDue}`, 'HH:mm').format('h:mm a').toString()}</div>
          <button type='button' onClick={() => this.togglePopUpEdit()}>Edit</button>
          <button type='button' onClick={() => this.clickDelete()}>Done</button>
        </div>
      </div>
    )
  }
}


export default Tasks;
