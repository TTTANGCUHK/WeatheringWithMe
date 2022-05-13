import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";

function Map({ locations }) {
  const router = useRouter();
  const [libraries] = useState(["places"]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAw6wxQHqtInbxZz-O6kdq0JOs_DGNkAA4",
    libraries,
  });

  const mapContainerStyle = {
    width: "70%",
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
