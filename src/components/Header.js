import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { toggleIsFahrenheit } from '../store/actions/WeatherAction';

class Header extends Component {

    toggleIsFahrenheit = async () => {
        const { dispatch } = this.props;
        dispatch(toggleIsFahrenheit());
    } 

    render () {
        const { isFahrenheit } = this.props;
        return (
            <section className = "header-cmp flex">
                <div className = "right-div flex">
                    <img src = {require('../assets/logo.png')}  className = "logo-img" alt=""/>
                    <h1 className = "header-title">My Weather</h1>
                </div>
                <nav className = "header-navbar flex">
                    <NavLink exact to="/" className = "nav-link" activeClassName="active">Home</NavLink>
                    <NavLink to="/favorite-locations" activeClassName="active" className = "nav-link">Favorites</NavLink>

                </nav>
                <div className="left-div flex">
                <button className = "temp-switch-btn flex" onClick = {this.toggleIsFahrenheit}>Switch to {isFahrenheit ? 'C°' : 'F°'}</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ WeatherReducer }) => {
    const { isFahrenheit } = WeatherReducer;
    return {
      isFahrenheit,
    }
}
  
export default connect(mapStateToProps)(Header)