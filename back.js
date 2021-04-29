async function getCitiesStorage() {
    return fetch(`${BACK_URL}/favourites`)
        .then((response) => {
            return response.json();
        });
}

function addCityToStorage(city) {
    console.log(city);
    return fetch(`${BACK_URL}/favourites?cityName=${city}`, {method: 'POST'})
        .then((response) => {
            return response.json();
        });
}


function deleteCityFromStorage(city) {
    const encodedCity = encodeURIComponent(city);
    fetch(`${BACK_URL}/favourites?cityName=${encodedCity}`, {method: 'DELETE'});
}
