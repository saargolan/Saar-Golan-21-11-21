import React from 'react';

const SearchSuggestions = (props) => {
    let { locationsSuggests } = props;
    
    const locationList = (!locationsSuggests) ? <h3>Location isn't found!</h3> : locationsSuggests.map(location => {
        return (
            <li key = { location.key } onClick = { () => props.searchLocation(location.name)}>
                <h3>{ location.name }</h3>
            </li>
        )
    }, this)

    return (
        <section className = "search-suggestion-cmp">
            <ul className = "clean-list suggestions-list">
                { locationList }
            </ul>
        </section>
    )
}

export default SearchSuggestions;
