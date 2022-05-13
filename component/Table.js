import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Table({ locations }) {
  const [order, setOrder] = useState(true);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("Location");

  function sortByLatitude() {
    // When Latitude title is clicked
    if (order == true) {
      setOrder(false);
    } else if (order == false) {
      setOrder(true);
    }
  }

  function onChangeHandler(e) {
    // Get input value e.target.value
    setInput(e.target.value);
  }

  function onChange(e) {
    setOption(e.target.value);
  }

  if (locations.length == 0) return <div></div>;

  // HTML + JS section
  return (
    <>
      <br />
      <FormControl fullWidth>
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
      <br /> <br />
      <div className="text-center">
        <h2>You can sort by latitude by clicking "Latitude" in below</h2>
      </div>
      <br />
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
            {locations
              .sort(function (a, b) {
                if (order) {
                  return a.locData.latitude - b.locData.latitude;
                } else {
                  return b.locData.latitude - a.locData.latitude;
                }
              })
              .filter(function (location) {
                if (input === "") {
                  return location;
                } else {
                  if (option === "Location") {
                    return location.locData.name
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  } else if (option === "Latitude") {
                    return location.locData.latitude.toString().includes(input);
                  } else if (option === "Longitude") {
                    return location.locData.longitude
                      .toString()
                      .includes(input);
                  }
                }
              })
              .map((location, index) => (
                <tr key={location._id}>
                  <td className="text-center">
                    {" "}
                    <Link href={`/location/${location._id}`}>
                      {location.locData.name}
                    </Link>
                  </td>
                  <td className="text-center">{location.locData.latitude}</td>
                  <td className="text-center">{location.locData.longitude}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
    </>
  );
}

export default Table;
