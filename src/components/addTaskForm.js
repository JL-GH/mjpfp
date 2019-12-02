import React from 'react'
import ReactDOM from 'react-dom'
import {store, TOGGLE_POPUP, SET_TASKS, ON_TITLE_CHANGE, ON_TIME_CHANGE} from '../store.js'
import axios from 'axios'

const moment = require('moment')


class PopUpForm extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.taskTitle !== this.state.taskTitle) {
  //    store.getState()
  //   }
  // }

  closePopUpForm() {
    store.dispatch({
      type: TOGGLE_POPUP,
      toggle: !this.state.showPopUp,
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


  submitTask() {
    const { formDate, taskTitle, taskTimeDue } = this.state

    if (taskTitle === '' || taskTimeDue === '') {
      alert('look at console for error')
      throw new Error('must fill out both title and time')
    }
    else {
     axios.post('http://localhost:3000/api/tasks/', {
        taskDateDue: formDate,
        taskName: taskTitle,
        taskTimeDue: taskTimeDue
      })
        .then(() => {
          axios.get(`http://localhost:3000/api/tasks/`)
            .then(res => {
              store.dispatch({
                type: SET_TASKS,
                setTasks: res.data
              })
              this.closePopUpForm()
            })
        })

    }
  }

  // submitForm() {
  //   const { formDate, taskTitle, taskTimeDue } = this.state
  //   // console.log(formDate)

  //  document.getElementById(`${formDate}`).submit()
  // }

  // createTask() {
  //   const { formDate, taskTitle, taskTimeDue } = this.state
  //   store.dispatch({
  //     type: ADD_TASK,
  //     postTask: axios.post('http://localhost:3000/api/tasks', {formDate, taskTitle, taskTimeDue})
  //       .then(res => {
  //         console.log('taskTitle', taskTitle)
  //         console.log('taskTime', taskTimeDue)
  //         console.log('formDate', formDate)
  //       })
  //   })
  // }

  render() {
    const dateOrdinal = moment(this.state.formDate).format('Do')
    const { formDate, taskTitle, taskTimeDue } = this.state
    return (
      <div className='popUp' >
        <div className='popUpInner'>
          <div className='popUpTitle'>
            <h2>{`Create Task on ${this.props.curMonthLong} ${dateOrdinal}`}</h2>
          </div>
          <div>
            <form id={formDate}>
              <input type='text' placeholder='Title' onChange={(ev) => this.setState({ taskTitle: ev.target.value})} />
              <input type='time' placeholder='Time' onChange={(ev) => this.setState({ taskTimeDue: ev.target.value})} />
              <div>
                <button type='button' onClick={() => this.closePopUpForm()}>cancel</button>
                <button type='button' onClick={() => this.submitTask()}>create</button>
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

export default PopUpForm;
