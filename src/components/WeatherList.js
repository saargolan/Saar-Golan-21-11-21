import React from 'react';
import WeatherPreview from './WeatherPreview';
import { connect } from 'react-redux';

const WeatherList = (props) => {
    const { weather } = props;
    return (
        <section className = "weather-list-cmp">
            <ul className = "clean-list flex">
                {weather.forecast.map( (day) => (
                        <li key = {day.date}>
                            <WeatherPreview
                                currWeather = {day}
                            />
                        </li>
                ))}
            </ul>
        </section>
    )
}


const mapStateToProps = ({WeatherReducer}) => {
    const { weather } = WeatherReducer;
    return {
        weather
    }
}
  
export default connect(mapStateToProps)(WeatherList);