// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

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
