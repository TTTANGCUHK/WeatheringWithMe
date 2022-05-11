import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from 'next/router'

function Map({locations}) {
  const router = useRouter()
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
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
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={3}
      center={center}
      options={options}
    >
      {
        locations.map((location, index) => (
          <Marker
            key={location.lid}
            position={ {lat: location.locationData.latitude, lng: location.locationData.longitude }}
            onClick={() => {router.push("/location/" + location.lid)}}
          />
        ))
      }
    </GoogleMap>
    )
}

export default Map;