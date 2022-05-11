import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
    
function Table({locations}) {
  const [order, setOrder] = useState(true)
  const [input, setInput] = useState("")
  const [option, setOption] = useState("Location")

  function sortByLatitude() {
    // When Latitude title is clicked
    if (order == true){
      setOrder(false)
    } else 
    if (order == false){
      setOrder(true)
    }
  }

  function onChangeHandler(e){
    // Get input value e.target.value
      setInput(e.target.value)  
  }

  function onChange(e){
    setOption(e.target.value)
  }

  if (locations.length == 0) return <div></div>

  // HTML + JS section
  return (
    <>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
        <th onClick={sortByLatitude}>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {
        locations
          .sort(function(a, b){
            if (order) {
              return a.locationData.latitude - b.locationData.latitude
            } else {
              return b.locationData.latitude - a.locationData.latitude
            }
          })
          .filter(function(location) {
            if (input === "") {
              return location
            } else {
              if (option === "Location"){
                return location.locationName.toLowerCase().includes(input.toLowerCase())}
              else if (option === "Latitude"){
                return location.locationData.latitude.toString().includes(input)
              }
              else if (option === "Longitude"){
                return location.locationData.longitude.toString().includes(input)
              }
            }
          })
          .map((location, index) => (
          <tr key={location.lid}>
            <td> <Link href={`/location/${location.lid}`}>{location.locationName}</Link></td>
            <td>{location.locationData.latitude}</td>
            <td>{location.locationData.longitude}</td>
          </tr>
        ))
      }
        </tbody>
    </table>
  </div>
  </>
  )
}

export default Table;