class UI {
    constructor() {
        this.uiContainer = document.getElementById("content");
        this.city;
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
                    resolve({latitude, longitude});
                },
                (err) => {
                    console.error(err);
                    reject(err);
                }, {enableHighAccuracy: true});
        })
    }

    requestWeatherByLocation() {
        return this.getCurrentLocation().then(({latitude, longitude}) => {
            getWeatherByCoordinateFromBack(latitude, longitude);
            return Fetch.getByLocation(latitude, longitude)
        })

    }


    saveToLS(data) {
        let cityNames = this.getFromLS();

        if(cityNames.find(city => city === data)){
            throw new Error("City already exists");
        }
        else {
            addCityToStorage(data);
            cityNames.push(data);
            localStorage.setItem("city", JSON.stringify(cityNames));
        }
    }

    getFromLS() {
        const cityNames = JSON.parse(localStorage.getItem("city")) ;
        if (!cityNames) {
            localStorage.setItem("city", JSON.stringify([]));
            return [];
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return cityNames;
    }

    deleteFromLS(cityName){
        const cities = this.getFromLS();
        deleteCityFromStorage(cityName);
        const filteredCities = cities.filter(city => city !== cityName);
        localStorage.setItem("city", JSON.stringify(filteredCities));
    }

    clearLS() {
        localStorage.clear();
    }

    populateUI(data) {
        const template = document.querySelector('#temp');

        const favouriteNameElement = template.content.querySelector(".name-of-secondary-block h4")
        const favouriteTempElement = template.content.querySelector(".secondary-temperature");
        const favouriteIconElement = template.content.querySelector(".secondary-icon-display");

        const favouriteWindElement = template.content.querySelector(".wind");
        const favouriteCloudElement = template.content.querySelector(".cloud");
        const favouritePressureElement = template.content.querySelector(".pressure");
        const favouriteHumidityElement = template.content.querySelector(".humidity");
        const favouriteCoordinateElement = template.content.querySelector(".coord")

        favouriteNameElement.innerHTML = data.name;
        favouriteTempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
        favouriteIconElement.innerHTML = `<img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80px">`;


        favouriteWindElement.innerHTML = `${data.wind.speed} m/s,`;
        favouriteCloudElement.innerHTML = `${data.weather[0].description}`;
        favouritePressureElement.innerHTML = `${data.main.pressure} hpa`;
        favouriteHumidityElement.innerHTML = `${data.main.humidity}%`;
        favouriteCoordinateElement.innerHTML = `[${Number(data.coord.lat).toFixed(2)}, ${Number(data.coord.lon).toFixed(2)}]`;

        const clone = template.content.querySelector('div').cloneNode(true);
        const newTemplate = document.querySelector("#favourite-weather-cities");
        newTemplate.appendChild(clone);

        clone.querySelector(".close-button").onclick = () => {
            newTemplate.removeChild(clone);
            this.deleteFromLS(data.name);
        };
    }

    populateMainUI(data) {
        const title = document.querySelector("#name-of-main-block");
        const icon = document.querySelector("#main-icon-display");
        const temp = document.querySelector(".main-temperature");
        const wind = document.querySelector(".main-city-wind")
        const description = document.querySelector(".main-city-clouds")
        const hpa = document.querySelector(".main-city-pressure")
        const humidity = document.querySelector(".main-city-humidity")
        const coordinants = document.querySelector(".main-city-coord")

        title.innerHTML = data.name;
        temp.innerHTML = `${Math.round(data.main.temp)}°C`;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        wind.innerHTML = `${data.wind.speed} m/s,`;
        description.innerHTML = `${data.weather[0].description}`;
        hpa.innerHTML = `${data.main.pressure} hpa`;
        humidity.innerHTML = `${data.main.humidity}%`;
        coordinants.innerHTML = `[${Number(data.coord.lat).toFixed(2)}, ${Number(data.coord.lon).toFixed(2)}]`;
    }
}
