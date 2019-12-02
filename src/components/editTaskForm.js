import React from 'react'
import ReactDOM from 'react-dom'
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
    console.log(selectedTaskId)
    console.log('formDate', formDate)
    console.log('taskTitle', taskTitle)
    console.log('taskTimeDue', taskTimeDue)
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
//DO THE EDIT SDDSOIFJODSJFLSD

  render() {
    const dateOrdinal = moment(this.state.formDate).format('Do')
    const { formDate, taskTitle, taskTimeDue } = this.state
    console.log('testafasdfasdfas',taskTitle)
    return (
      <div className='popUp' >
        <div className='popUpInner'>
          <div className='popUpTitle'>
            <h2>{`Update Task on ${this.props.curMonthLong} ${dateOrdinal}`}</h2>
          </div>
          <div>
            <form id={formDate}>
              <input type='text' placeholder='Title' onChange={(ev) => this.setState({ taskTitle: ev.target.value})} />
              <input type='time' placeholder='Time'  onChange={(ev) => this.setState({ taskTimeDue: ev.target.value})} />
              <div>
                <button type='button' onClick={() => this.closePopUpForm()}>cancel</button>
                <button type='button' onClick={() => this.updateTask()}>update</button>
                {/* <button type='submit' onClick={() => this.submitTask()}>create</button> */}
              </div>
            </form>
          </div>
          {/* <div>
            <button type='button' onClick={() => this.closePopUpForm()}>cancel</button>
            <button type='submit' onClick={(ev) => this.submitForm(ev)}>create</button>
            <button type='submit' onClick={() => this.submitTask()}>create</button>
          </div> */}
        </div>
      </div>
    )
  }
}

export default EditPopUpForm;
