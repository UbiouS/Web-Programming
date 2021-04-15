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

  requestWeatherByLocation(){
    this.getCurrentLocation().then(({latitude, longitude}) => {
      Fetch.getByLocation(latitude, longitude).then(data => console.log(data))
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
    this.uiContainer.innerHTML = `
            <div class="secondary-city">
            <div class="name-of-secondary-block">
                <h4 class="card-title">${data.name}</h4>
                <div class="secondary-temperature">
                    ${data.main.temp  - 273,15}°C
                </div>
                <div class="secondary-icon-display">
                    <img class="weather-icon" src="svg/038-foggy-2.svg">
                </div>
                <div class="exit-buttons">
                    <button class="close-button" onclick="this.clearLS()">ͯ</button>
                </div>
            </div>

            <ul>
                <li>
                    <div class="inside-text">Ветер</div>
                    <div class="wind-and-stuff"> 6.0 m/s, North-northwest</div>
                </li>
                <li>
                    <div class="inside-text">Облачность</div>
                    <div class="wind-and-stuff">${data.weather[0].description}</div>
                </li>
                <li>
                    <div class="inside-text">Давление</div>
                    <div class="wind-and-stuff">${data.main.pressure} hpa</div>
                </li>
                <li>
                    <div class="inside-text">Влажность</div>
                    <div class="wind-and-stuff"> ${data.main.humidity}%</div>
                </li>
                <li>
                    <div class="inside-text">Координаты</div>
                    <div class="wind-and-stuff">[${data.coord.lat}, ${data.coord.lon}]</div>
                </li>
            </ul>
        </div>
        
        
        `;
  }

}
