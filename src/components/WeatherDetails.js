import React, {Component} from 'react';
import { connect } from 'react-redux';
import WeatherList from './WeatherList';
import { addToFavorite, removeFromFavorite} from '../store/actions/LocationsAction';
import backgroundImg from '../assets/weather-page-wallpaper.jpg'

class WeatherDetails extends Component {
    
    toggleFavorite = async () => {
        const { weather, dispatch } = this.props;
        weather.isFavorite ? dispatch(removeFromFavorite(weather)) : dispatch(addToFavorite(weather));
    }

    render () {
        const { weather } = this.props
        
        return (
            <section className = "weather-details-cmp">
                <div className = "weather-details-header">
                    <img 
                        src = { require(`../assets/${weather.isFavorite ? 'favorite' : 'not-favorite'}.png`)}
                        onClick = {this.toggleFavorite} 
                        className = "favorite-btn"
                        alt = ""
                    />
                    <img src = {backgroundImg} className = "weather-details-img" alt = ""/>
                    <h2 className = "weather-details-location-header">{weather.location.city}, {weather.location.country} </h2>
                </div>
                <WeatherList/>
            </section>
        )

    }
}


const mapStateToProps = ({WeatherReducer}) => {
    const { weather } = WeatherReducer;
    return {
        weather
    }
}
  
export default connect(mapStateToProps)(WeatherDetails);