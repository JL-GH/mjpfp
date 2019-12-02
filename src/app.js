import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Link, NavLink, Route, Switch} from 'react-router-dom'
import DaysContainer from './components/daysContainer.js'
import MonthHeader from './components/monthHeader.js'
// import {store, SET_TASKS} from './store.js'
// import axios from 'axios'



class App extends React.Component {

  render() {
    return (
      <div className='calendar'>
        <HashRouter>
          <Route path='/:id?' component={ MonthHeader } />
          <Route path='/:id?' component={ DaysContainer } />
        </HashRouter>
      </div>
    )
  }
}

export default App;
