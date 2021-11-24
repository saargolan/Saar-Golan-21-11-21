import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import LocationReducer from './LocationReducer';

const combinedReducer = combineReducers({
    WeatherReducer,
    LocationReducer
})

export default combinedReducer