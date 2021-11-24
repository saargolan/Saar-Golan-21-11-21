import types from '../types'
import WeatherService from '../../services/WeatherService'

//-----------------------------------------------------

export const getWeather = (txt) => {
    
    txt = txt || ""

    return async (dispatch) => {
        try {
            const weather = await WeatherService.getWeatherInfo(txt)
            dispatch(setWeather(weather))
        } catch (err) {
            throw err
        }
    }
}

const setWeather = (weather) => {
    return {
        type: types.SET_WEATHER,
        weather
    }
}

//-----------------------------------------------------

export const toggleIsFahrenheit = () => {
    return async (dispatch) => {
        try {
            dispatch(setIsFahrenheit())
        }
        catch (err) {
            throw err
        }
    }
}

const setIsFahrenheit = () => {
    return {
        type: types.TOGGLE_IS_FAHRENHEIT
    }
}

