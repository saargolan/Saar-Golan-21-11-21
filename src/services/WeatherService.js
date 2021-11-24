import axios from 'axios';
import {API_KEY} from '../config'
import LocalStorageService from './LocalStorageService'
import UtilService from './UtilService'
import LocationService from './LocationService'
import AlertService from './AlertService';

export default {
    getLocationInfo,
    getCurrectWeather,
    getWeatherInfo
}

const WEATHER_INFO = 'weather'

function getWeatherInfo( location ) {
    
    location = location || 'tel aviv'

    return new Promise( async(resolve, reject) => {
        try {
            let locationInfo = await getLocationInfo(location);
            locationInfo = locationInfo.data[0] 
            const weatherInfo = await getCurrectWeather(locationInfo.Key);
            
            const newLocationInfo = _createNewLocationObj(weatherInfo, locationInfo)
            newLocationInfo.isFavorite = await LocationService.isFavoriteLocation(newLocationInfo.location.city)
    
            await LocalStorageService.save(WEATHER_INFO, newLocationInfo)
            resolve(newLocationInfo) 
        } catch (err) {
            AlertService.handleAlerts( `Failed to get Details About Location`, 'error')
        }
    })
}

async function getLocationInfo(locationName) {
    try {
        return await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${locationName.replace(/ /g,"%20")}`)
    } catch (err) {
        throw err
    }
}

async function getCurrectWeather(locationKey) {
    try {
        return await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`)
    } catch (err) {
        throw err
    }
}

//--------------------------------------------------------
//SERVICE PRIVATE FUNCTIONS

function _createNewLocationObj (weather, location) {
    const locationInfo = {
        id: UtilService.makeId(),
        location: {
            city: location.AdministrativeArea.LocalizedName,
            country: location.Country.LocalizedName
        }, 
        forecast: weather.data.DailyForecasts.map(day => {
            const dayObj = {
                date: UtilService.formatDate(day.Date),
                day: {
                    name: UtilService.dateToDay(day.Date),
                    iconPhrase: day.Day.IconPhrase,
                    icon: _getWeatherIcon(day.Day.Icon)
                },
                night: {
                    iconPhrase: day.Night.IconPhrase,
                    icon: _getWeatherIcon(day.Night.Icon)
                },
                minTemp: {
                    fTemp: day.Temperature.Minimum.Value,
                    cTemp: _fahrenheitToCelsius(day.Temperature.Minimum.Value)
                },
                maxTemp: {
                    fTemp: day.Temperature.Maximum.Value,
                    cTemp: _fahrenheitToCelsius(day.Temperature.Maximum.Value)
                }
            }
            return dayObj
        })
    }
    return locationInfo
}

function _fahrenheitToCelsius(temp) {
    return Math.round((temp - 32) * (5/9))
}

function _getWeatherIcon(iconNum) {
    const num = (iconNum < 10) ? '0'+iconNum : iconNum;
    return `https://developer.accuweather.com/sites/default/files/${num}-s.png`
}