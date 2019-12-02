import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
const moment = require('moment')

const NEXT_MONTH = 'NEXT_MONTH'
const PREV_MONTH = 'PREV_MONTH'
const ADD_TASK = 'ADD_TASK'
const TOGGLE_POPUP = 'TOGGLE_POPUP'
const TOGGLE_POPUP_EDIT = 'TOGGLE_POPUP_EDIT'
const SET_FORM_DATE = 'SET_FORM_DATE'
const ON_TITLE_CHANGE = 'ON_TITLE_CHANGE'
const ON_TIME_CHANGE = 'ON_TIME_CHANGE'
const SET_TASKS = 'SET_TASKS'
const DELETE = 'DELETE'
const SET_FORM_EDIT = 'SET_FORM_EDIT'
const TOGGLE_TASK_LIST = 'TOGGLE_TASK_LIST'


const initialState = {
  tasks: [],
  prevCounter: 1,
  nextCounter: 1,
  daysInMonth: moment().daysInMonth(),
  curDate: new Date(),
  curMonth: moment().format('MM').toString(),
  curYear: moment().format('YYYY').toString(),
  showPopUp: false,
  showPopUpEdit: false,
  formDate: '',
  taskTitle: '',
  taskTimeDue: '',
  selectedTaskId: '',
  taskListDisplay: false
}

// eslint-disable-next-line complexity
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return Object.assign({}, state, {
        tasks: action.setTasks
      })
    }
    case NEXT_MONTH: {
      return Object.assign({}, state, {
        curMonth: action.nextMonth,
        curYear: action.newYear,
        prevCounter: action.decCount,
        nextCounter: action.nextCount,
        daysInMonth: action.days
      })
    }
    case PREV_MONTH: {
      return Object.assign({}, state, {
        curMonth: action.prevMonth,
        curYear: action.newYear,
        prevCounter: action.decCount,
        nextCounter: action.nextCount,
        daysInMonth: action.days
      })
    }
    case TOGGLE_POPUP: {
      return Object.assign({}, state, {
        showPopUp: action.toggle
      })
    }
    case TOGGLE_POPUP_EDIT: {
      return Object.assign({}, state, {
        showPopUpEdit: action.toggle
      })
    }
    case SET_FORM_DATE: {
      return Object.assign({}, state, {
        formDate: action.setFormDate,
        showPopUp: action.toggle
      })
    }
    case SET_FORM_EDIT: {
      return Object.assign({}, state, {
        formDate: action.editFormDate,
        taskTitle: action.editTaskTitle,
        taskTimeDue: action.editTimeDue,
        selectedTaskId: action.getId,
        showPopUpEdit: action.toggle
      })
    }
    case ON_TITLE_CHANGE: {
      return Object.assign({}, state, {
        taskTitle: action.onChangeTitle,
      })
    }
    case ON_TIME_CHANGE: {
      return Object.assign({}, state, {
        taskTimeDue: action.onTimeChange
      })
    }
    case DELETE: {
      const updatedList = state.tasks.filter(task => task.id !== action.delete)
      return Object.assign({}, state, {tasks: updatedList})
    }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(logger))


export {
  store,
  NEXT_MONTH,
  PREV_MONTH,
  ADD_TASK,
  TOGGLE_POPUP,
  TOGGLE_POPUP_EDIT,
  SET_FORM_DATE,
  ON_TITLE_CHANGE,
  ON_TIME_CHANGE,
  SET_TASKS,
  DELETE,
  SET_FORM_EDIT
}
