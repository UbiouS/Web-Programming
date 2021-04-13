class Fetch {
  async getCurrent(input) {

    const key = "39a9a737b07b4b703e3d1cd1e231eedc";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${key}`);

    const data = await response.json();

    console.log(data);

    return data;
  }
}
