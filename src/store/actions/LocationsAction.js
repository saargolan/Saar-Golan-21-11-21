import types from '../types'
import LocationService from '../../services/LocationService'

//-----------------------------------------------------

export const loadFavoriteLocations = () => {
    return async (dispatch) => {
        try  {
            const favoriteLocations = await LocationService.getFavoriteLocations()
            dispatch(setFavoriteLocations(favoriteLocations))
        } catch (err) {
            throw err;
        }
    }
}

export const setFavoriteLocations = (favoriteLocations) => {
    return {
        type: types.SET_FAVORITE_LOCATIONS,
        favoriteLocations
    }
}

//-----------------------------------------------------

export const getLocationsSuggestions = (txt) => {

    return async (dispatch) => {
        try {
            const locationsSuggests = await LocationService.getLocationsSuggest(txt)
            
            dispatch(setSuggestions(locationsSuggests))
        } catch (err){
            throw err
        }
    }
}

const setSuggestions = (locationsSuggests) => {
    return {
        type: types.SET_LOCATION_SUGGEST,
        locationsSuggests
    }
}

//-----------------------------------------------------

export const addToFavorite = (location) => {
    return async (dispatch) => {
        try {
            location.isFavorite = true;
            await LocationService.addToFavorite(location)
            dispatch(addFavorite(location))
        } catch (err) {
            throw err
        }
    }
}

const addFavorite = (location) => {
    return {
        type : types.ADD_FAVORITE_LOCATION,
        location
    }
}

//-----------------------------------------------------

export const removeFromFavorite = (location) => {
    return async (dispatch) => {
        try {
            location.isFavorite  = false;
            await LocationService.removeFromFavorite(location.location.city)
            dispatch(removeFavorite(location))
        } catch (err) {
            throw err
        }
    }
}

const removeFavorite = (location) => {
    return {
        type: types.REMOVE_FAVORITE_LOCATION,
        location
    }
}

//-----------------------------------------------------

export const clearLocationsSuggestions = () => {
    return async (dispatch) => {
        try {
            dispatch(removeSuggestions())
        }
        catch (err) {
            throw err
        }
    }
}

const removeSuggestions = () => {
    return {
        type: types.REMOVE_SUGGESTIONS
    }
}