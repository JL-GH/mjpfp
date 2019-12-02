import React from 'react'
import ReactDOM from 'react-dom'
import Days from './days'
import {store, SET_TASKS} from '../store.js'
import axios from 'axios'


class DaysContainer extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:3000/api/tasks/`)
    .then(res => {
      store.dispatch({
        type: SET_TASKS,
        setTasks: res.data
      })
    })
  }
  render() {
    return <div className='daysContainerOutter'><Days /></div>
  }
}

export default DaysContainer;
