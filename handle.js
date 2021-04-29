const BACK_URL = 'http://localhost:3000';

function getWeatherByCityFromBack(cityName){
    return fetch(`${BACK_URL}/weather/city?cityName=${cityName}`)
        .then(function(response) {
            return response.json();
        })
}

function getWeatherByCoordinateFromBack(latitude, longitude){
    return fetch(`${BACK_URL}/weather/coordinates?lat=${latitude}&lon=${longitude}`)
        .then(function(response){
            return response.json();
        })
}