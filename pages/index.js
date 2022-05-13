import React, { useState, useEffect } from "react";
import Link from "next/link";
import Table from "../component/Table.js";
import Map from "../component/Map.js";
import axios from "axios";
import {useSession} from "next-auth/react";
import Router from "next/router";

function HomePage() {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/form')
    },
  })
  if (session.user.isAdmin)
    Router.push('/admin')

  if (status === "loading") {
    return <h2>Loading...</h2>
  }


  const [locations, setLocations] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // When locations changed its value, then will execute this function
    console.log(locations);
  }, [locations]);

  if (locations.length == 0) return <div></div>;

  // HTML + JS section
  return (
    <>
      <Map locations={locations} />
      <Table locations={locations} />
    </>
  );
}

export default HomePage;
