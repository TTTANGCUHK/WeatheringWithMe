import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";
import axios from "axios";
import fetchWeatherAPI from "../../backend/dataFetch/fetchAPI";

function LocationPage() {
  const router = useRouter();
  const { locationid } = router.query;

  const [libraries] = useState(["places"]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState("");
  const [res, setRes] = useState("");

  useEffect(() => {
    // Fetch location data from API to locations state
    if (locationid) {
      console.log("Calling get single location API");
      axios
        .post("/api/location", {
          action: "get",
          payload: locationid,
        })
        .then(function (response) {
          // response.data is what we want
          console.log(response.data);
          setLocation(response.data); // Meaning is : locations = hardcodedData

          console.log("Calling get weather API");
          const thing = fetchWeatherAPI({ name: response.data.locData.name });
          thing.then(function (res) {
            console.log({ res });
            setWeather(res.data.current);
            setLoading(false);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [router.query]);

  useEffect(() => {
    console.log("Set Center");
    if (location) {
      setCenter({
        lat: location.locData.latitude,
        lng: location.locData.longitude,
      });
    }
  }, [location]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAw6wxQHqtInbxZz-O6kdq0JOs_DGNkAA4",
    libraries,
  });

  const mapContainerStyle = {
    width: "70%",
    height: "700px",
  };

  const [center, setCenter] = useState({
    lat: 123,
    lng: 112,
  });

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return "";
  if (!isLoaded) return "";

  if (loading) return <div></div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
      >
        <Marker
          key={location._id}
          position={{
            lat: location.locData.latitude,
            lng: location.locData.longitude,
          }}
        />
      </GoogleMap>
      <h1>{location.locData.name}</h1>
      <div className="w-full">
        <table className="table-auto w-full ">
          <thead>
            <tr>
              <th>Temperature</th>
              <th>wind_kph</th>
              <th>wind_dir</th>
              <th>humidity</th>
              <th>precip_mm</th>
              <th>vis_km</th>
            </tr>
          </thead>
          <tbody>
            <tr key={location._id}>
              <td className="text-center"> {weather.temp_c} </td>
              <td className="text-center">{weather.wind_kph}</td>
              <td className="text-center">{weather.wind_dir}</td>
              <td className="text-center">{weather.humidity}</td>
              <td className="text-center">{weather.precip_mm}</td>
              <td className="text-center">{weather.vis_km}</td>
            </tr>
          </tbody>
        </table>
        <p>Last updated: {location.updatedAt}</p>
      </div>
      <button />
    </>
  );
}
// HTML + JS section

export default LocationPage;
