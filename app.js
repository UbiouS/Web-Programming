//inst classes//

const ft = new Fetch();
const ui = new UI();




function cityLoader() {
  const mainCityLoader = document.querySelector(".main-block");
  const loader = document.querySelector('.loader');

  loader.style.display = 'none';
  mainCityLoader.style.display = "grid";
}

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;
  console.log(currentVal);
  ft.getCurrent(currentVal).then((data) => {
    try{
      //call saveToLS
      ui.saveToLS(data.name);
      //call a UI method
      ui.populateUI(data);
    }
    catch (e){
      alert(e.message);
    }
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  const citiesPromises = [];

  ui.requestWeatherByLocation().then((data) => {
    cityLoader();
    ui.populateMainUI(data)});


  dataSaved.forEach((city)=>{
    citiesPromises.push(ft.getCurrent(city))
  })

  Promise.all(citiesPromises).then((cities)=>{
    cities?.forEach((city) => ui.populateUI(city));
  })
});

function handleKeyPress(e) {
  let key=e.keyCode || e.which;
  if (key === 13){
    curr = document.getElementById("searchUser");
    console.log(curr);
    onclick = document.getElementById('searchUser').value = '';
    ft.getCurrent(curr.value).then((data) => {
      try{
        //call saveToLS
        ui.saveToLS(data.name);
        //call a UI method
        ui.populateUI(data);
      }
      catch (e){
        alert(e.message);
      }
    });
  }
}