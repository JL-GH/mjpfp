/* eslint-disable jsx-quotes */
import React from 'react'
import ReactDOM from 'react-dom'
import {store, TOGGLE_POPUP, SET_FORM_DATE} from '../store.js'
import PopUpForm from './addTaskForm'
import Tasks from './tasks.js'
import EditPopUpForm from './editTaskForm.js'

const moment = require('moment')
//.weekday() wil ignore the 0 idx. 0 is sunday and 7 is sunday
const dayLong = moment.weekdays(moment('2019-11-01').weekday())

class Days extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  togglePopUp(ev) {
    store.dispatch({
      type: SET_FORM_DATE,
      setFormDate: moment(ev.target.name).format('YYYY-MM-DD').toString(),
      toggle: !this.state.showPopUp
    })
  }


  arrDays() {
    const {curYear, daysInMonth} = this.state
    // const month = this.monthValidator()
    // const yearMonth = `${curYear}-${month}`
    const numDayInMonth = daysInMonth
    const arr = []

    for (let i = 1; i <= numDayInMonth; i++) {
      arr.push(i)
    }
    return arr
  }

  // curDayLong(YYYYMM, DD) {
  //   moment.weekdays(moment(`${YYYYMM}-${DD}`).day())
  // }

  render() {
    const {curMonth, curYear, tasks} = this.state
    const yearMonth = `${curYear}-${curMonth}`
    const curMonthShort = moment.monthsShort(parseInt(curMonth) - 1)
    const arrDays = this.arrDays()

    const curMonthLong = moment.months(parseInt(curMonth) - 1)
    console.log(moment(`${yearMonth}-1`).format('YYYY-MM-DD').toString())

    return (
      <div className='daysContainer'>
        {
          arrDays.map((date, idx) => {
            return (
            <div key={idx} className='outerDayContainer'>
              <div id={`${yearMonth}-${date}`} className='innerDayContainer'>
                <div className='monthDateContainer'>
                  <h3 className='dateContainer'><span className='date'>{curMonthShort} {date}</span>
                  <span>
                  <button type='button' className='addTask' name={`${yearMonth}-${date}`} onClick={(ev) => this.togglePopUp(ev)}>+</button>
                  </span></h3>
                  <br/>
                  <span className='day'>
                    {
                      moment.weekdays(moment(`${yearMonth}-${date}`).day())
                    }
                  </span>
                </div>
                <div className='totalTasks'>
                  <h5 className='numTasksComplete'>
                    {
                      tasks.filter(task => {
                        return task.taskDateDue === moment(`${yearMonth}-${date}`).format('YYYY-MM-DD').toString()
                      }).length > 0
                      ? tasks.filter(task => {
                          return task.taskDateDue === moment(`${yearMonth}-${date}`).format('YYYY-MM-DD').toString()
                        }).length + ` task(s) to do`
                      : `Day is free`
                    }
                  </h5>
                  {/* <h3 className='numTasksInc'></h3> */}
                </div>
                <div className='tasksToDoList'>
                  {
                    tasks.filter(task => {
                       return task.taskDateDue === moment(`${yearMonth}-${date}`).format('YYYY-MM-DD').toString()
                    }).map((task, i) => {
                      return (<Tasks key={i} task={task}/>)
                    })
                  }
                </div>
                {
                  tasks.filter(task => {
                    return task.taskDateDue === moment(`${yearMonth}-${date}`).format('YYYY-MM-DD').toString()
                  }).length > 0
                  ? <button type='button' className='expand'><span>Show Task(s)</span></button>
                  : null
                }
              </div>
            </div>
            )
          })
        }
        {
          this.state.showPopUp ?
          <PopUpForm
            curMonthLong={curMonthLong}
          />
          : null
        }
        {
          this.state.showPopUpEdit ?
          <EditPopUpForm
            curMonthLong={curMonthLong}
          />
          : null
        }
      </div>
    )
  }
}


export default Days;
