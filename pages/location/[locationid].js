// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import fetchWeatherAPI from "../../backend/dataFetch/fetchAPI";
import CommentBox from "../../component/CommentBox";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Button } from "@mui/material";

function LocationPage() {
  const router = useRouter();
  const { locationid } = router.query;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/forms/login");
    },
  });

  const [libraries] = useState(["places"]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState("");
  const [res, setRes] = useState("");
  const [fav, setFav] = useState(false);

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

  useEffect(() => {
    if (session) {
      axios
        .post("/api/favoriteLocation", {
          action: 'get',
          payload: session.user.username
        })
        .then(res => res.data.favLoc.forEach((loc) => {
          if (loc.lid == locationid) {
            setFav(true)
          }
        }))
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [session])

  function handleFavourite(e) {
    e.preventDefault();
    axios.post("/api/favoriteLocation", {
      action: (fav ? 'delete' : 'add'),
      payload: { username: session.user.username, lid: locationid }
    }).then(res => {
      if (!fav)
        alert("Added to favorite location!")
      else
        alert("Removed from favorite location!")
    })
    setFav(!fav)
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAw6wxQHqtInbxZz-O6kdq0JOs_DGNkAA4",
    libraries,
  });

  const mapContainerStyle = {
    width: "100%",
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

  if (loading || !session) return <div></div>;

  return (
    <>
      <div className="grid grid-cols-10 grid-row-1">
        <div className="col-span-7">
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
        </div>
        <div className="col-span-3">
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemText primary="Location" secondary={location.locName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Temperature (C)" secondary={weather.temp_c} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Wind Speed (km/h)" secondary={weather.wind_kph} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Wind Direction" secondary={weather.wind_dir} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Humidity (%)" secondary={weather.humidity} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Precipitation (mm)" secondary={weather.precip_mm} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Visibility (km)" secondary={weather.vis_km} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last updated" secondary={location.updatedAt} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Favourite" />
              <Button startIcon={fav ? <StarIcon /> : <StarBorderOutlinedIcon />} onClick={handleFavourite} />
            </ListItem>
          </List>
        </div>
      </div>
      <div sx={{ maxHeight: '500px', overflow: 'auto' }}>
        <CommentBox locName={location.locName} uid={session.user.uid} />
      </div>
      {/* <a href="../..">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Back to home page
        </button>
      </a> */}
    </>
  );
}
// HTML + JS section

export default LocationPage;
