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
import Link from "next/link";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

function Table({ locations }) {
  const router = useRouter()
  const [order, setOrder] = useState(true)
  const [input, setInput] = useState("")
  const [option, setOption] = useState("Location")
  const columns = [
    { field: 'locName', headerName: 'Location Name', width: 130, flex: 1 },
    { field: 'lat', headerName: 'Latitude', width: 130, flex: 1 },
    { field: 'lon', headerName: 'Longitude', width: 130, flex: 1 }
  ]

  function sortByLatitude() {
    // When Latitude title is clicked
    if (order == true) {
      setOrder(false)
    } else
      if (order == false) {
        setOrder(true)
      }
  }

  function onChangeHandler(e) {
    // Get input value e.target.value
    setInput(e.target.value)
  }

  function onChange(e) {
    setOption(e.target.value)
  }

  function handleCellClick(e) {
    router.push(`/location/${e.row._id}`)
  }

  if (locations.length == 0) return <div></div>



  // HTML + JS section
  return (
    <>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Select"
          onChange={onChange}
        >
          <MenuItem value={"Location"}>Location</MenuItem>
          <MenuItem value={"Latitude"}>Latitude</MenuItem>
          <MenuItem value={"Longitude"}>Longitude</MenuItem>
        </Select>
      </FormControl>
      <TextField
        onChange={onChangeHandler}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search"
      />
      <div className="w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Location</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {
              locations
                .sort(function (a, b) {
                  if (order) {
                    return a.locData.latitude - b.locData.latitude
                  } else {
                    return b.locData.latitude - a.locData.latitude
                  }
                })
                .filter(function (location) {
                  if (input === "") {
                    return location
                  } else {
                    if (option === "Location") {
                      return location.locData.name.toLowerCase().includes(input.toLowerCase())
                    }
                    else if (option === "Latitude") {
                      return location.locData.latitude.toString().includes(input)
                    }
                    else if (option === "Longitude") {
                      return location.locData.longitude.toString().includes(input)
                    }
                  }
                })
                .map((location, index) => (
                  <tr key={location._id}>
                    <td> <Link href={`/location/${location._id}`}>{location.locData.name}</Link></td>
                    <td>{location.locData.latitude}</td>
                    <td>{location.locData.longitude}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div> */}
      <div style={{ height: '700px', width: '100%' }}>
        <DataGrid
          rows={
            locations
              .map((location, idx) => { return { id: idx, locName: location.locName, lat: location.locData.latitude, lon: location.locData.longitude, _id: location._id } }
              )
          }
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick}
        />
      </div>
    </>
  )
}

export default Table;
