import types from '../types';

const initState = {
    weather: {},
    isFahrenheit : false
}

function weatherReducer( state = initState, action ) {
    switch(action.type) {
        case types.SET_WEATHER: {
            
            return {...state, weather : {...action.weather}}
        }
        case types.TOGGLE_IS_FAHRENHEIT: {
            return {...state, isFahrenheit: !state.isFahrenheit}
        }
        case types.ADD_FAVORITE_LOCATION: {
            return {...state, weather: {...action.location}}
        }
        case types.REMOVE_FAVORITE_LOCATION: {
            return {...state, weather: {...action.location}}
        }
        default : 
            return state
    }
}

export default weatherReducer;