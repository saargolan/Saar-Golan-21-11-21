import React from 'react';
import { connect } from 'react-redux';

const LocationPreview = (props) => {
    const {location,isFahrenheit} = props;

    
    return (
        <section className = "location-preview-cmp">
            <h1 className = "preview-title"> {location.location.city}, {location.location.country} </h1>
            <h3 className = "weather-temp">
                {(isFahrenheit) ? 
                `${location.forecast[0].minTemp.fTemp} - ${location.forecast[0].maxTemp.fTemp} F°`
                : `${location.forecast[0].minTemp.cTemp} - ${location.forecast[0].maxTemp.cTemp} C°`
                }
            </h3>
            <img src = {location.forecast[0].day.icon} className = "preview-icon" alt = "" />
            <h3 className = "preview-icon-parse">{location.forecast[0].day.iconPhrase}</h3>
        </section>
    )
}

const mapStateToProps = ({WeatherReducer}) => {
    const { isFahrenheit } = WeatherReducer;
    return {
        isFahrenheit
    }
}
  
export default connect(mapStateToProps)(LocationPreview)