class Fetch {


  static key = "39a9a737b07b4b703e3d1cd1e231eedc";

  async getCurrent(input) {


    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${input}&appid=${Fetch.key}`);

    const data = await response.json();

    console.log(data);

    return data;
  }

  static async getByLocation(lat, long) {

    const key = "39a9a737b07b4b703e3d1cd1e231eedc";

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&appid=${Fetch.key}&lat=${lat}&lon=${long}`);

    const data = await response.json();

    console.log(data);

    return data;
  }

}
