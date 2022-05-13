import axios from "axios";

export default async function fetchWeatherAPI({ lat, lon, name }) {
  let URL = "http://api.weatherapi.com/v1/current.json";
  return await axios.get(URL, {
    params: {
      key: "bca6d87e69f74e0b84932316220805",
      q: (lat && lon ? lat + ',' + lon : name),
      aqi: true,
    },
  });
}
