import React from 'react'
import {store, TOGGLE_POPUP_EDIT, SET_TASKS, ON_TITLE_CHANGE, ON_TIME_CHANGE} from '../store.js'
import axios from 'axios'

const moment = require('moment')


class EditPopUpForm extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  closePopUpForm() {
    store.dispatch({
      type: TOGGLE_POPUP_EDIT,
      toggle: !this.state.showPopUpEdit,
    })
  }

  onTitleChange(ev) {
    store.dispatch({
      type: ON_TITLE_CHANGE,
      onChangeTitle: ev.target.value
    })
  }


  onTimeChange(ev) {
    store.dispatch({
      type: ON_TIME_CHANGE,
      onTimeChange: ev.target.value
    })
  }


  updateTask() {
    const { formDate, taskTitle, taskTimeDue, selectedTaskId } = this.state
    if (taskTitle === '' || taskTimeDue === '') {
      alert('look at console for error')
      throw new Error('must fill out both title and time')
    }
    else {
      axios.put(`http://localhost:3000/api/tasks/${selectedTaskId}`, {
        taskDateDue: formDate,
        taskName: taskTitle,
        taskTimeDue: taskTimeDue
      })
        .then(() => {
          console.log('GETTINGGGG!!!!!')
          axios.get(`http://localhost:3000/api/tasks/`)
            .then(res => {
              store.dispatch({
                type: SET_TASKS,
                setTasks: res.data
              })
            })
        })
      this.closePopUpForm()
    }
  }

  render() {
    const dateOrdinal = moment(this.state.formDate).format('Do')

    return (
      <div className='popUp' >
        <div className='popUpInner'>
          <div className='popUpTitle'>
            <h2>{`Update Task on ${this.props.curMonthLong} ${dateOrdinal}`}</h2>
          </div>
          <div>
            <form>
              <input type='text' placeholder='Title' onChange={(ev) => this.setState({ taskTitle: ev.target.value})} />
              <input type='time' placeholder='Time'  onChange={(ev) => this.setState({ taskTimeDue: ev.target.value})} />
              <div>
                <button type='button' onClick={() => this.closePopUpForm()}>Cancel
                </button>
                <button type='button' onClick={() => this.updateTask()}>Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditPopUpForm;
