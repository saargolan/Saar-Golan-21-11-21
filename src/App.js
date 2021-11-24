//REACT
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
//PAGES
import WeatherPage from './pages/WeatherPage'
import FavoriteLocationsPage from './pages/FavoriteLocationsPage'

//COMPONENTS
import Header from './components/Header'

//STYLE
import './styles/global.scss'

const App = () => {

  return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path = "/favorite-locations" component = {() => <FavoriteLocationsPage />}/>
            <Route path = "/:location?" component = {WeatherPage}/>
          </Switch>
        </div>
      </Router>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(App)