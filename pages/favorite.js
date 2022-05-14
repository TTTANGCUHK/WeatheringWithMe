import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";
import { Typography } from "@mui/material";

export default function favorite() {
  const [favLoc, setFavLoc] = useState([])
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/forms/login");
    },
  });
  const columns = [
    { field: 'locName', headerName: 'Location Name', width: 130, flex: 1 },
    { field: 'lat', headerName: 'Latitude', width: 130, flex: 1 },
    { field: 'lon', headerName: 'Longitude', width: 130, flex: 1 }
  ]

  function handleCellClick(e) {
    router.push(`/location/${e.row._id}`)
  }

  useEffect(() => {
    if (session) {
      axios
        .post("/api/favoriteLocation", {
          action: 'get',
          payload: session.user.username
        })
        .then(res => setFavLoc(res.data.favLoc)
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [session])

  useEffect(() => {
    if (!router.isReady) return;
    // Fetch location data from API to locations state
    axios
      .post("/api/location", {
        action: "get",
        payload: "all",
      })
      .then(function (response) {
        // response.data is what we want
        console.log(response.data);
        setLocations(response.data); // Meaning is : locations = hardcodedData
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);

  function inFav(location) {
    let returnVal = false
    favLoc.forEach((favLoc) => {
      if (favLoc.lid === location._id) returnVal = true
    })
    return returnVal
  }

  return (
    <>
      <Typography variant="h5" sx={{ my: 3, ml: 1 }}>Your Favorite Locations</Typography>
      <div style={{ height: '700px', width: '100%' }}>
        <DataGrid
          rows={
            locations
              .filter(inFav)
              .map((location, idx) => {
                return {
                  id: idx, locName: location.locName,
                  lat: location.locData.latitude,
                  lon: location.locData.longitude,
                  _id: location._id
                }
              })
          }
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          onCellClick={handleCellClick}
        />
      </div>
    </>
  )
}