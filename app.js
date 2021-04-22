//inst classes//

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data.name);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  const citiesPromises = [];

  ui.requestWeatherByLocation().then((data) => ui.populateMainUI(data));


  dataSaved.forEach((city)=>{
    citiesPromises.push(ft.getCurrent(city))
  })

  Promise.all(citiesPromises).then((cities)=>{
    cities?.forEach((city) => ui.populateUI(city));
  })
});
