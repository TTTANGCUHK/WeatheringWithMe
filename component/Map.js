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

import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";

function Map({ locations }) {
  const router = useRouter()
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAw6wxQHqtInbxZz-O6kdq0JOs_DGNkAA4",
    libraries,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "700px",
  };

  const [center, setCenter] = useState({
    lat: 17.5806386,
    lng: 54.2365876,
  });

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return "";
  if (!isLoaded) return "";

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={center}
          options={options}
        >
          {locations.map((location, index) => (
            <Marker
              key={location._id}
              position={{
                lat: location.locData.latitude,
                lng: location.locData.longitude,
              }}
              onClick={() => {
                router.push("/location/" + location._id);
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;
