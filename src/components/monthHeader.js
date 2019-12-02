import React from 'react'
import ReactDOM from 'react-dom'
import {store, NEXT_MONTH, PREV_MONTH, ADD_TASK} from '../store.js';

const moment = require('moment')


class MonthHeader extends React.Component {

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

  nextBtnYearChecker() {
    const {curMonth, curYear} = this.state
    let  numMonth = parseInt(curMonth)
    let  numYear = parseInt(curYear)

    if ((numMonth + 1) > 12) {
      return numYear + 1
    }
    return numYear
  }

  prevBtnYearChecker() {
    const {curMonth, curYear} = this.state
    let  numMonth = parseInt(curMonth)
    let  numYear = parseInt(curYear)

    if ((numMonth - 1) < 12 || (numMonth - 1) > 0) {
      return numYear
    }
    else if ((numMonth - 1) === 0 || (numMonth - 1) < 0) {
      return numYear
    }
    return numYear
  }

  clickPrev() {
    const {curMonth, curYear, prevCounter, nextCounter, daysInMonth} = this.state
    store.dispatch({
      type: PREV_MONTH,
      prevMonth: moment().subtract(prevCounter, 'month').format('MM').toString(),
      newYear: moment().subtract(prevCounter, 'month').format('YYYY').toString(),
      days: moment().subtract(prevCounter, 'month').daysInMonth(),
      decCount: (prevCounter + 1),
      nextCount: (nextCounter - 1)
    })
  }

  clickNext () {
    const {curMonth, curYear, prevCounter, nextCounter, daysInMonth} = this.state
    store.dispatch({
      type: NEXT_MONTH,
      nextMonth: moment().add(nextCounter, 'month').format('MM').toString(),
      newYear: moment().add(nextCounter, 'month').format('YYYY').toString(),
      days: moment().add(nextCounter, 'month').daysInMonth(),
      nextCount: (nextCounter + 1),
      decCount: (prevCounter - 1),
    })
  }
  render() {
    const {curMonth, curYear} = this.state
    const curMonthLong = moment.months(parseInt(curMonth) - 1)

    return (
      <div>
        <div className='monthContainer'>
          <div className='innerMonthContainer'>
            <h1 className='monthyear'>{curMonthLong} {curYear}</h1>
            <div className='monthBtnContainer'>
              <button type='button' className='monthBtn' onClick={() => this.clickPrev()}>
                <span> prev </span>
              </button>
              <button type='button' className='monthBtn' onClick={() => this.clickNext()}>
                <span> next </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MonthHeader;
