import axios from "axios";

export default async function fetchWeatherAPI(location) {
  let URL = "http://api.weatherapi.com/v1/current.json";
  let weatherData = "";
  return await axios.get(URL, {
    params: {
      key: "bca6d87e69f74e0b84932316220805",
      q: location,
      aqi: true,
    },
  });
}
