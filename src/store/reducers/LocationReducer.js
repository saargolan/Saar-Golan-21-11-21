import types from '../types';

const initState = {
    favoriteLocations: [],
    locationsSuggests: []
}

function LocationReducer( state = initState, action ) {
    switch (action.type) {
        case types.SET_FAVORITE_LOCATIONS :{
            return {...state, favoriteLocations: action.favoriteLocations};
        }
        case types.SET_LOCATION_SUGGEST : {
            return {...state, locationsSuggests: action.locationsSuggests};
        }
        case types.ADD_FAVORITE_LOCATION : {
            return {...state, favoriteLocations: [...state.favoriteLocations, action.location]}
        }
        case types.REMOVE_FAVORITE_LOCATION : {
            const newFavoriteList = state.favoriteLocations.filter (location => {
                return location.id !== action.locationId
            })
            return {...state, favoriteLocations: newFavoriteList}
        }
        case types.REMOVE_SUGGESTIONS : {
            return {...state, locationsSuggests: []}
        }
        default : 
            return state
    }
}

export default LocationReducer

