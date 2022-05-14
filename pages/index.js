// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import React, { useState, useEffect } from "react";
import Table from "../component/Table.js";
import Map from "../component/Map.js";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/forms/login");
    },
  });

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
        setLocations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);

  if (status === "loading") {
    return <h2>Loading...</h2>;
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
