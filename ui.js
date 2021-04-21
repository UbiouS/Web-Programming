class UI {
    constructor() {
        this.uiContainer = document.getElementById("content");
        this.city;
        this.defaultCity = "London";
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
        this.getCurrentLocation().then(({latitude, longitude}) => {
            Fetch.getByLocation(latitude, longitude).then(data2 => console.log(data2))
        })

    }

    clearUI() {
        uiContainer.innerHTML = "";
    }

    saveToLS(data) {
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLS() {
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return this.city;
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
        favouriteTempElement.innerHTML = `${data.main.temp - 273, 15}°C`;
        favouriteIconElement.innerHTML = `<img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="80px">`;


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
            this.clearLS(data.name);
        };
    }


}
