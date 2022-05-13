import React, { useState, useEffect } from "react";
import Link from "next/link";
import Table from "../component/Table.js";
import Map from "../component/Map.js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'

function HomePage() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/form')
    },
  })

  const [locations, setLocations] = useState([]);

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

  // useEffect(() => {
  //   // When locations changed its value, then will execute this function
  //   console.log(locations);
  // }, [locations]);

  if (status === "loading") {
    return <h2>Loading...</h2>
  } else if (session.user.isAdmin) {
    router.push('/admin')
  }

  if (locations.length == 0) return <div></div>;

  // HTML + JS section
  return (
    <div className="grid grid-rows-2 grid-flow-row-dense auto-rows-min">
      <Map locations={locations} />
      <Table locations={locations} />
    </div>
  );
}

export default HomePage;
