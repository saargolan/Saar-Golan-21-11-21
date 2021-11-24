import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LocationPreview from './LocationPreview';

const LocationList = (props) => {

    return (
        <section className = "favorite-location-list-cmp">
            <ul className = "clean-list flex">
                { props.favoriteLocations.map(location => (
                        <li key = { location.id }>
                            <Link to = {`/${location.location.city}`}>
                                <LocationPreview
                                    location = { location }
                                />
                            </Link>
                        </li>
                )) }
            </ul>
        </section>
    )
} 

const mapStateToProps = ({LocationReducer}) => {
    const { favoriteLocations } = LocationReducer;
  
    return {
      favoriteLocations
    }
}
  
export default connect(mapStateToProps)(LocationList);