import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadFavoriteLocations } from '../store/actions/LocationsAction';
import LocationsList from '../components/LocationsList';
import backgroundImg from "../assets/weather-page-wallpaper.jpg";

class FavoriteLocationsPage extends Component {

    async componentDidMount(){
        this.getFavoriteLocations();
    }



    getFavoriteLocations = async() => {
        const { dispatch } = this.props;
        dispatch(loadFavoriteLocations());
    }

    render() {
        const {favoriteLocations} = this.props;
        return (
            <section className = "favorite-locations-page">
                <div className = "favorite-locations-header flex">
                    <img src = {backgroundImg} className = "favorite-locations-img" alt = ""/>
                    <h2 className = "favorite-location-header">{!favoriteLocations.length ? 'No Favorite Locations' :'Favorite Locatios' }</h2>
                </div>
                <div style={{ paddingLeft:'35%'}}>
                    <Link to = "/" >
                        <div className = "add-location-preview">
                            <h1 className = "preview-title">+ Add New Location</h1>
                        </div>
                    </Link>
                </div>
                { favoriteLocations.length ?
                    <LocationsList favoriteLocations = { favoriteLocations } />
                    : ""
                }
            </section>
        )

    }
}



const mapStateToProps = ({LocationReducer}) => {
    const { favoriteLocations } = LocationReducer;
  
    return {
      favoriteLocations
    }
}
  
export default connect(mapStateToProps)(FavoriteLocationsPage);