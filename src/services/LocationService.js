import axios from 'axios';
import {API_KEY} from '../config'
import LocalStorageService from './LocalStorageService'
import AlertService from './AlertService'

export default {
    getFavoriteLocations,
    getLocationsSuggest,
    getLocationInfo,
    addToFavorite,
    isFavoriteLocation,
    removeFromFavorite
}

const FAVORITE_LOCATION_INFO = 'favorite-locations';
const WEATHER_INFO = 'weather';


function getFavoriteLocations() {
    return new Promise(async(resolve, reject) => {
        //go to the server and get the favorite-locations for the user
        //const favoriteLocations = await httpService.get('/favorite-locations')
        let favoriteLocations = LocalStorageService.load(FAVORITE_LOCATION_INFO);
        if (!favoriteLocations) return [];
        resolve(favoriteLocations);
    })
}

async function addToFavorite(location) {
    let weatherInfo = LocalStorageService.load(WEATHER_INFO);
    let favoriteLocations = LocalStorageService.load(FAVORITE_LOCATION_INFO);

    try {
        //go to the server and add to favorite-locations
        //const favoriteLocations = await httpService.post('/favorite-location', location)
        favoriteLocations = favoriteLocations || [];

        const isInFavorite = favoriteLocations.some(currLocation => {  
            return currLocation.location.city === location.location.city;
        })

        if (isInFavorite) return;
        
        favoriteLocations.push(location);
        weatherInfo.isFavorite = true;

        Promise.all([
            LocalStorageService.save(WEATHER_INFO, weatherInfo),
            LocalStorageService.save(FAVORITE_LOCATION_INFO, favoriteLocations)
        ])
        AlertService.handleAlerts( `${location.location.city} is Added to Favorites!`, 'success');

    } catch (err) {
        AlertService.handleAlerts( `Failed to Add ${location.location.city} to Favorite`, 'error')
    }
}

async function removeFromFavorite(locationName) {
    let favoriteLocations = LocalStorageService.load(FAVORITE_LOCATION_INFO)
    let weatherInfo = LocalStorageService.load(WEATHER_INFO)
    try { 
        //go to the server and delete from favorite-locations
        //const favoriteLocations = await httpService.delete('/favorite-location', locationId)

        weatherInfo.isFavorite = false;
        await LocalStorageService.save(WEATHER_INFO, weatherInfo);

        favoriteLocations = favoriteLocations.filter (currLocation => {
            return currLocation.location.city !== locationName;
        })
        
        await LocalStorageService.save(FAVORITE_LOCATION_INFO, favoriteLocations);
        AlertService.handleAlerts( `${locationName} is Deleted from Favorites!`, 'success');

    } catch (err) {
        AlertService.handleAlerts( `Failed to Delete ${locationName} from Favorites`, 'error');
    }
}

async function isFavoriteLocation(locationName) {
    const favoriteLocations = LocalStorageService.load(FAVORITE_LOCATION_INFO);
    if (!favoriteLocations) return false;
    return favoriteLocations.some(location => {
        return location.location.city === locationName;
    })
}

async function getLocationsSuggest(txt) {
    try {
        const suggestions = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${txt}&language=en`);
        
        if (!suggestions.data.length) return [];

        return suggestions.data.map(suggestion => {
            return {name: suggestion.LocalizedName, key: suggestion.Key} ;
        })
    } catch (err) {
        AlertService.handleAlerts( `Failed to get Location Suggest`, 'error');
    }
}

async function getLocationInfo(locationName) {
    try {
        return await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}=${locationName.replace(/ /g,"%20")}`);
    } catch (err) {
        throw err;
    }
}
